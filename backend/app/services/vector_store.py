"""
Zenith Vector Store — Pure-Python semantic search with TF-IDF + cosine similarity.

Uses scikit-learn's TfidfVectorizer for embeddings and cosine_similarity
for retrieval. No C++ compilation or external vector DB needed.
Persistence is handled via pickle to disk.
"""
import json
import logging
import pickle
from pathlib import Path
from typing import List, Dict, Any, Optional

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.core.config import get_settings

logger = logging.getLogger("zenith.vector_store")

# ── Domain-specific synonyms for query expansion ──────────────
_SYNONYMS = {
    "salary": ["stipend", "pay", "compensation", "payment"],
    "stipend": ["salary", "pay", "compensation", "payment"],
    "pay": ["salary", "stipend", "compensation"],
    "money": ["salary", "stipend", "pay", "compensation"],
    "leave": ["holiday", "vacation", "time off", "days off", "absence"],
    "holiday": ["leave", "vacation", "time off"],
    "vacation": ["leave", "holiday", "time off"],
    "sick": ["medical", "health", "illness"],
    "exam": ["university", "college", "academic"],
    "insurance": ["health cover", "medical", "gpa", "group personal accident"],
    "project": ["projects", "demo", "showcase", "work"],
    "demo": ["demo day", "showcase", "presentation", "final"],
    "mentor": ["mentors", "guide", "buddy", "manager"],
    "team": ["group", "squad", "department"],
    "food": ["cafeteria", "lunch", "canteen", "meals"],
    "gym": ["fitness", "workout", "exercise"],
    "dress": ["attire", "clothing", "outfit", "dress code"],
    "hr": ["human resources", "employee resource", "support"],
    "onboard": ["onboarding", "joining", "first day", "orientation"],
    "culture": ["values", "environment", "workplace"],
    "tools": ["software", "applications", "apps", "outlook", "teams", "slack"],
}


def _expand_query(query: str) -> str:
    """Expand a query with domain-specific synonyms for better TF-IDF matching."""
    words = query.lower().split()
    expansion_terms = []
    for word in words:
        if word in _SYNONYMS:
            expansion_terms.extend(_SYNONYMS[word])
    if expansion_terms:
        return f"{query} {' '.join(expansion_terms)}"
    return query


class VectorStore:
    """In-memory TF-IDF vector store with disk persistence."""

    def __init__(self, persist_path: str):
        self._persist_path = Path(persist_path)
        self._persist_path.mkdir(parents=True, exist_ok=True)
        self._index_file = self._persist_path / "tfidf_index.pkl"

        self._vectorizer: Optional[TfidfVectorizer] = None
        self._matrix = None  # sparse TF-IDF matrix
        self._documents: List[Dict[str, Any]] = []  # original docs with metadata
        self._loaded = False

    def _try_load(self):
        """Load persisted index from disk if available."""
        if self._loaded:
            return
        self._loaded = True

        if self._index_file.exists():
            try:
                with open(self._index_file, "rb") as f:
                    data = pickle.load(f)
                self._vectorizer = data["vectorizer"]
                self._matrix = data["matrix"]
                self._documents = data["documents"]
                logger.info(
                    "Loaded vector index from disk | docs=%d", len(self._documents)
                )
            except Exception as exc:
                logger.warning("Failed to load persisted index: %s", exc)

    def _persist(self):
        """Save the index to disk."""
        try:
            with open(self._index_file, "wb") as f:
                pickle.dump(
                    {
                        "vectorizer": self._vectorizer,
                        "matrix": self._matrix,
                        "documents": self._documents,
                    },
                    f,
                )
            logger.info("Persisted vector index to %s", self._index_file)
        except Exception as exc:
            logger.error("Failed to persist index: %s", exc)

    def is_indexed(self) -> bool:
        self._try_load()
        return len(self._documents) > 0

    def ingest(self, entries: List[Dict[str, Any]]) -> int:
        """
        Build TF-IDF index from entries.

        Each entry: { id, content, type, category, title, source }
        """
        if not entries:
            return 0

        self._documents = entries

        # Build searchable text: combine title + content + category for richer matching
        corpus = []
        for entry in entries:
            text = " ".join(
                filter(
                    None,
                    [
                        entry.get("title", ""),
                        entry.get("content", ""),
                        entry.get("category", ""),
                        entry.get("type", ""),
                    ],
                )
            )
            corpus.append(text)

        # Fit TF-IDF with bigrams for better semantic coverage
        self._vectorizer = TfidfVectorizer(
            max_features=10000,
            ngram_range=(1, 2),
            stop_words="english",
            sublinear_tf=True,
            min_df=1,
        )
        self._matrix = self._vectorizer.fit_transform(corpus)

        self._persist()
        logger.info("Indexed %d documents.", len(entries))
        return len(entries)

    def search(
        self,
        query: str,
        top_k: int = 5,
        category: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """Search for documents similar to query using cosine similarity."""
        self._try_load()

        if not self._documents or self._vectorizer is None or self._matrix is None:
            logger.warning("Vector store is empty — returning no results.")
            return []

        # Expand query with domain-specific synonyms
        expanded_query = _expand_query(query)

        # Transform expanded query
        query_vec = self._vectorizer.transform([expanded_query])
        similarities = cosine_similarity(query_vec, self._matrix).flatten()

        # Apply category filter
        if category:
            for i, doc in enumerate(self._documents):
                if doc.get("category", "").lower() != category.lower():
                    similarities[i] = -1.0

        # Get top_k indices
        top_indices = np.argsort(similarities)[::-1][:top_k]

        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            if score <= 0:
                continue
            doc = self._documents[idx]
            results.append({
                "id": doc.get("id", ""),
                "content": doc.get("content", ""),
                "metadata": {
                    "type": doc.get("type", ""),
                    "category": doc.get("category", ""),
                    "title": doc.get("title", ""),
                    "source": doc.get("source", ""),
                },
                "score": score,
            })

        return results

    def clear(self):
        """Clear the index."""
        self._documents = []
        self._vectorizer = None
        self._matrix = None
        if self._index_file.exists():
            self._index_file.unlink()
        logger.info("Vector store cleared.")

    def get_categories(self) -> List[str]:
        """Return distinct categories."""
        self._try_load()
        categories = set()
        for doc in self._documents:
            cat = doc.get("category", "")
            if cat:
                categories.add(cat)
        return sorted(categories)


# ── Module-level singleton ────────────────────────────────────
_store: Optional[VectorStore] = None


def _get_store() -> VectorStore:
    global _store
    if _store is None:
        settings = get_settings()
        _store = VectorStore(persist_path=settings.VECTOR_DB_PATH)
    return _store


def is_indexed() -> bool:
    return _get_store().is_indexed()


def ingest_documents(entries: List[Dict[str, Any]]) -> int:
    return _get_store().ingest(entries)


def semantic_search(
    query: str, top_k: int = 5, category: Optional[str] = None
) -> List[Dict[str, Any]]:
    return _get_store().search(query=query, top_k=top_k, category=category)


def clear_collection() -> None:
    _get_store().clear()


def get_categories() -> List[str]:
    return _get_store().get_categories()
