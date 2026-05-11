"""
Zenith Knowledge Service — Semantic search across all data sources.

Loads all JSON data files at startup and provides a fuzzy search
that matches user queries against the entire knowledge base.
"""
import json
import os
import re
from pathlib import Path
from typing import List, Dict, Any

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"

# ── In-memory knowledge store ──────────────────────────────────
_knowledge: List[Dict[str, Any]] = []


def _load_all_data():
    """Load and normalize all JSON data files into a flat list of knowledge entries."""
    global _knowledge
    entries = []

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
                "searchable": f"{tip.get('title', '')} {tip.get('description', '')} {tip.get('category', '')} {tip.get('attribution', '')}".lower(),
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
                "searchable": f"{proj.get('name', '')} {proj.get('pitch', '')} {proj.get('description', '')} {proj.get('learnings', '')} {' '.join(proj.get('stack', []))} {proj.get('domain', '')} {proj.get('status', '')}".lower(),
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
                "searchable": f"{m.get('name', '')} {m.get('title', '')} {m.get('team', '')} mentor".lower(),
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
                "searchable": f"{ev.get('name', '')} {ev.get('description', '')} {ev.get('type', '')} week {ev.get('week', '')}".lower(),
            })

    # 5. Interns
    interns_path = DATA_DIR / "interns.json"
    if interns_path.exists():
        for intern in json.loads(interns_path.read_text(encoding="utf-8")):
            entries.append({
                "type": "intern",
                "source": f"Intern: {intern.get('name', '')}",
                "title": intern.get("name", ""),
                "content": f"{intern.get('name', '')} ({intern.get('role', '')}, {intern.get('team', '')} team). {intern.get('bio', '')}. Skills: {', '.join(intern.get('skills', []))}. Unforgettable moment: {intern.get('unforgettableMoment', '')}",
                "category": "Interns",
                "searchable": f"{intern.get('name', '')} {intern.get('role', '')} {intern.get('team', '')} {intern.get('bio', '')} {' '.join(intern.get('skills', []))}".lower(),
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
                "searchable": f"{item.get('topic', '')} {item.get('content', '')} {item.get('category', '')}".lower(),
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
                "searchable": f"{item.get('content', '')} {item.get('category', '')}".lower(),
            })

    _knowledge = entries
    return len(entries)


def search_knowledge(query: str, top_k: int = 8) -> List[Dict[str, Any]]:
    """
    Fuzzy keyword search across all knowledge entries.
    Scores each entry by how many query words appear in its searchable text.
    """
    if not _knowledge:
        _load_all_data()

    query_lower = query.lower()
    words = [w for w in re.split(r'\W+', query_lower) if len(w) > 2]

    if not words:
        return _knowledge[:top_k]

    scored = []
    for entry in _knowledge:
        score = 0
        text = entry["searchable"]
        for word in words:
            if word in text:
                score += 1
                # Bonus for title match
                if word in entry.get("title", "").lower():
                    score += 2
        if score > 0:
            scored.append((score, entry))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [entry for _, entry in scored[:top_k]]


def get_all_knowledge_summary() -> str:
    """Returns a condensed summary of all knowledge for the system prompt."""
    if not _knowledge:
        _load_all_data()

    categories = {}
    for entry in _knowledge:
        cat = entry.get("category", "Other")
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(entry["title"])

    lines = []
    for cat, titles in categories.items():
        lines.append(f"- {cat}: {', '.join(titles[:5])}{'...' if len(titles) > 5 else ''}")

    return "\n".join(lines)


# Load on import
_load_all_data()
