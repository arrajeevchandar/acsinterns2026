"""
Zenith Knowledge Service — Data loading, chunking, and vector-store ingestion.

Loads all JSON data files, chunks large entries, and feeds them into
the ChromaDB vector store for semantic retrieval.
"""
import json
import hashlib
import logging
import re
from pathlib import Path
from typing import List, Dict, Any

from app.services.vector_store import (
    ingest_documents,
    is_indexed,
    clear_collection,
    semantic_search,
    get_categories,
)

logger = logging.getLogger("zenith.knowledge")

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"

# Maximum characters per chunk (~300 tokens ≈ 1200 chars), with overlap
_CHUNK_SIZE = 1200
_CHUNK_OVERLAP = 200

# ── In-memory raw entries (for summary / fallback) ────────────
_raw_entries: List[Dict[str, Any]] = []


# ── Data loading ──────────────────────────────────────────────

def _load_all_data() -> List[Dict[str, Any]]:
    """Load and normalize all JSON data files into a flat list of knowledge entries."""
    global _raw_entries
    entries: List[Dict[str, Any]] = []

    # 1. Tips
    tips_path = DATA_DIR / "tips.json"
    if tips_path.exists():
        for tip in json.loads(tips_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "tip",
                "source": f"Tip from {tip.get('attribution', 'unknown')}",
                "title": tip.get("title", ""),
                "content": tip.get("description", ""),
                "category": tip.get("category", ""),
            })

    # 2. Projects
    projects_path = DATA_DIR / "projects.json"
    if projects_path.exists():
        for proj in json.loads(projects_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "project",
                "source": f"Project: {proj.get('name', '')}",
                "title": proj.get("name", ""),
                "content": f"{proj.get('pitch', '')} Stack: {', '.join(proj.get('stack', []))}. {proj.get('learnings', '')}",
                "category": proj.get("domain", ""),
            })

    # 3. Mentors
    mentors_path = DATA_DIR / "mentors.json"
    if mentors_path.exists():
        for m in json.loads(mentors_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "mentor",
                "source": f"Mentor: {m.get('name', '')}",
                "title": m.get("name", ""),
                "content": f"{m.get('name', '')} is a {m.get('title', '')} on the {m.get('team', '')} team.",
                "category": "Mentors",
            })

    # 4. Events
    events_path = DATA_DIR / "events.json"
    if events_path.exists():
        for ev in json.loads(events_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "event",
                "source": f"Event: {ev.get('name', '')}",
                "title": ev.get("name", ""),
                "content": f"{ev.get('description', '')} (Week {ev.get('week', '?')}, {ev.get('type', '')})",
                "category": "Timeline",
            })

    # 5. Interns
    interns_path = DATA_DIR / "interns.json"
    if interns_path.exists():
        for intern in json.loads(interns_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "intern",
                "source": f"Intern: {intern.get('name', '')}",
                "title": intern.get("name", ""),
                "content": (
                    f"{intern.get('name', '')} ({intern.get('role', '')}, {intern.get('team', '')} team). "
                    f"{intern.get('bio', '')}. Skills: {', '.join(intern.get('skills', []))}. "
                    f"Unforgettable moment: {intern.get('unforgettableMoment', '')}"
                ),
                "category": "Interns",
            })

    # 6. Internal manual knowledge
    internal_path = DATA_DIR / "internal_manual_knowledge.json"
    if internal_path.exists():
        for item in json.loads(internal_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "policy",
                "source": item.get("topic", item.get("category", "Adobe Policy")),
                "title": item.get("topic", ""),
                "content": item.get("content", ""),
                "category": item.get("category", ""),
            })

    # 7. Scraped knowledge
    scraped_path = DATA_DIR / "scraped_knowledge.json"
    if scraped_path.exists():
        for item in json.loads(scraped_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "scraped",
                "source": item.get("source", "Previous Portal"),
                "title": item.get("category", ""),
                "content": item.get("content", ""),
                "category": item.get("category", ""),
            })

    # 8. Gallery
    gallery_path = DATA_DIR / "gallery.json"
    if gallery_path.exists():
        for item in json.loads(gallery_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "gallery",
                "source": "Gallery",
                "title": item.get("title", item.get("caption", "")),
                "content": item.get("caption", item.get("description", "")),
                "category": "Gallery",
            })

    # 9. Kudos
    kudos_path = DATA_DIR / "kudos.json"
    if kudos_path.exists():
        for item in json.loads(kudos_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "kudos",
                "source": "Kudos",
                "title": item.get("from", ""),
                "content": item.get("message", item.get("content", "")),
                "category": "Kudos",
            })

    _raw_entries = entries
    logger.info("Loaded %d raw knowledge entries from %s", len(entries), DATA_DIR)
    return entries


# ── Chunking ──────────────────────────────────────────────────

def _make_id(text: str) -> str:
    """Deterministic short ID from content."""
    return hashlib.md5(text.encode()).hexdigest()[:12]


def _chunk_text(text: str, chunk_size: int = _CHUNK_SIZE, overlap: int = _CHUNK_OVERLAP) -> List[str]:
    """Split text into overlapping chunks."""
    if len(text) <= chunk_size:
        return [text]

    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


def _chunk_entries(entries: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Chunk entries with long content into smaller pieces for better retrieval."""
    chunked = []
    for entry in entries:
        content = entry.get("content", "")
        if not content or not content.strip():
            continue

        chunks = _chunk_text(content)
        for i, chunk in enumerate(chunks):
            doc_id = _make_id(f"{entry.get('title', '')}-{entry.get('type', '')}-{i}")
            chunked.append({
                "id": doc_id,
                "type": entry.get("type", ""),
                "source": entry.get("source", ""),
                "title": entry.get("title", ""),
                "content": chunk,
                "category": entry.get("category", ""),
            })

    logger.info("Chunked %d entries into %d documents.", len(entries), len(chunked))
    return chunked


# ── Public API ────────────────────────────────────────────────

def index_knowledge(force: bool = False) -> int:
    """
    Load all data, chunk it, and ingest into the vector store.
    Skips if already indexed unless force=True.
    Returns the number of documents indexed.
    """
    if not force and is_indexed():
        logger.info("Vector store already populated — skipping indexing.")
        return 0

    if force:
        logger.info("Force re-index requested — clearing vector store.")
        clear_collection()

    entries = _load_all_data()
    chunked = _chunk_entries(entries)
    count = ingest_documents(chunked)
    logger.info("Indexing complete: %d documents.", count)
    return count


def search_knowledge(query: str, top_k: int = 5, category: str = None) -> List[Dict[str, Any]]:
    """Semantic search over the knowledge base. Returns list of result dicts."""
    return semantic_search(query=query, top_k=top_k, category=category)


def list_knowledge_categories() -> List[str]:
    """Return all distinct categories in the knowledge base."""
    return get_categories()


def get_prompt_safe_knowledge_summary() -> str:
    """Return a summary that excludes categories likely to expose personal names."""
    if not _raw_entries:
        _load_all_data()

    categories: Dict[str, List[str]] = {}
    for entry in _raw_entries:
        cat = entry.get("category", "Other")
        if cat not in categories:
            categories[cat] = []
        title = entry.get("title", "")
        if title:
            categories[cat].append(title)

    lines = []
    for cat, titles in categories.items():
        if cat in ("Interns", "Mentors"):
            continue
        sanitized_titles = [_sanitize_text(t) for t in titles[:5] if _sanitize_text(t)]
        if sanitized_titles:
            suffix = "..." if len(titles) > 5 else ""
            lines.append(f"- {cat}: {', '.join(sanitized_titles)}{suffix}")

    return "\n".join(lines)


def build_prompt_context(entries: List[Dict[str, Any]]) -> str:
    """Build a prompt-safe context string from search results."""
    context_parts = []
    for entry in entries:
        prompt_entry = _build_prompt_entry(entry)
        if prompt_entry:
            context_parts.append(prompt_entry)
    return "\n".join(context_parts)


def _build_prompt_entry(entry: Dict[str, Any]) -> str:
    entry_type = entry.get("type", entry.get("metadata", {}).get("type", "entry"))
    title = _sanitize_text(
        entry.get("title", entry.get("metadata", {}).get("title", ""))
    )
    content = _sanitize_text(entry.get("content", ""))

    if entry_type in {"intern", "mentor"}:
        if not content:
            return ""
        return f"[{entry_type.upper()}] {content}"

    if not title and not content:
        return ""

    if title and content:
        return f"[{entry_type.upper()}] {title}: {content}"
    if title:
        return f"[{entry_type.upper()}] {title}"
    return f"[{entry_type.upper()}] {content}"


def _sanitize_text(text: str) -> str:
    cleaned = re.sub(r"\([^)]*\)", "", text)
    cleaned = re.sub(r"\b[A-Z][a-z]+ [A-Z][a-z]+\b", "", cleaned)
    cleaned = re.sub(r"\s{2,}", " ", cleaned)
    return cleaned.strip(" -,:;")
