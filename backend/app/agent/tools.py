"""
Zenith Agent Tools — Tool definitions for the agentic RAG loop.

Each tool is:
  1. A callable async function
  2. Described by a JSON schema (for Groq function-calling)
  3. Registered in TOOL_REGISTRY for the dispatcher
"""
import json
import logging
from typing import Any, Dict, List, Optional

from app.services.vector_store import semantic_search, get_categories
from app.core.config import get_settings

logger = logging.getLogger("zenith.tools")


# ── Tool implementations ──────────────────────────────────────

async def tool_search_knowledge(
    query: str,
    category: Optional[str] = None,
    top_k: Optional[int] = None,
) -> List[Dict[str, Any]]:
    """Search the knowledge base for documents relevant to the query."""
    settings = get_settings()
    k = top_k or settings.RETRIEVAL_TOP_K

    results = semantic_search(query=query, top_k=k, category=category)

    # Return a simplified view for the LLM
    output = []
    for doc in results:
        output.append({
            "title": doc["metadata"].get("title", ""),
            "type": doc["metadata"].get("type", ""),
            "category": doc["metadata"].get("category", ""),
            "content": doc["content"],
        })
    return output


async def tool_list_categories() -> List[str]:
    """List all available knowledge categories."""
    return get_categories()


# ── JSON schemas for Groq function calling ────────────────────

TOOL_SCHEMAS = [
    {
        "type": "function",
        "function": {
            "name": "search_knowledge",
            "description": (
                "Search the internship knowledge base for relevant information. "
                "Use this to find details about intern projects, mentors, events, "
                "tips, policies, benefits, or anything related to the ACS internship "
                "at Adobe. You can optionally filter by category."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": (
                            "The search query. Be specific and use relevant keywords. "
                            "For example: 'machine learning projects', 'demo day timeline', "
                            "'intern leave policy'."
                        ),
                    },
                    "category": {
                        "type": "string",
                        "description": (
                            "Optional category filter to narrow results. "
                            "Examples: 'Timeline', 'Benefits', 'Mentors', 'Interns', etc."
                        ),
                    },
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_categories",
            "description": (
                "List all available knowledge categories. Use this when you need "
                "to know what categories exist before filtering a search."
            ),
            "parameters": {
                "type": "object",
                "properties": {},
                "required": [],
            },
        },
    },
]


# ── Tool dispatcher ───────────────────────────────────────────

async def execute_tool(tool_name: str, arguments: Dict[str, Any]) -> str:
    """
    Execute a tool by name with the given arguments.
    Returns a JSON string of the result (for inclusion in the LLM conversation).
    """
    logger.info("Executing tool: %s(%s)", tool_name, arguments)

    if tool_name == "search_knowledge":
        result = await tool_search_knowledge(
            query=arguments.get("query", ""),
            category=arguments.get("category"),
            top_k=arguments.get("top_k"),
        )
    elif tool_name == "list_categories":
        result = await tool_list_categories()
    else:
        result = {"error": f"Unknown tool: {tool_name}"}

    return json.dumps(result, ensure_ascii=False)
