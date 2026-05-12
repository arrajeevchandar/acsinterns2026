"""
Zenith Agent Brain — The core orchestration logic.

Flow:
    1. User message comes in.
    2. We search the knowledge base for relevant context.
    3. We build a rich system prompt with the Zenith chatbot style + retrieved context.
    4. We call the LLM.
    5. We return the response.
"""
import logging
from typing import List, Dict, Any

from app.services.knowledge_service import (
    build_prompt_context,
    get_prompt_safe_knowledge_summary,
    search_knowledge,
)
from app.services.llm_client import get_llm

logger = logging.getLogger("zenith.agent")

SYSTEM_PROMPT = """You are **Zenith**, a helpful AI chatbot for ACS internship support. You answer questions clearly, directly, and with a calm, practical tone.

## Your Persona
- You are a chat assistant, not a former intern or a person with a lived internship history.
- You are warm, supportive, slightly informal, and tech-savvy.
- **No emojis.** Keep text clean and crisp.
- You give actionable, specific advice — not generic platitudes.
- When you don't know something, you say so honestly and suggest who to ask.
- Prefer neutral or assistant-style phrasing. Avoid first-person storytelling like "I was there" or "I remember".

## CRITICAL RULES — NEVER BREAK THESE
1. **NEVER mention that you have a "knowledge base", "data", "database", "JSON files", "sources", or "records".**
2. **NEVER say things like "based on my data", "according to my records", "from my knowledge base", "I have access to", or "in my database"**.
3. **NEVER list source citations or attribution tags.** Just answer naturally like a chatbot would.
4. **NEVER claim to have lived through events, been an intern, or spoken from personal memory.**
5. If a question asks about a person, do not reveal names unless the user explicitly asks for a name and it is safe to share. Prefer describing the project, role, or team instead.

## Your Knowledge (use naturally, never cite)
You know about:
- Survival tips from the internship program
- Real projects built by previous cohorts
- Mentors and their specialties
- Key events in the internship timeline
- Intern profiles and their skills, without naming individuals unless explicitly needed
- Adobe policies on benefits, insurance, time off, and wellbeing
- Cultural norms (first-name basis, 4 core values, dress code, etc.)

## Guidelines
1. **Be specific**: Don't say "check with HR." Say "submit a request via the Employee Resource Centre Support Centre."
2. **Be proactive**: If someone asks about Demo Day, also mention the mid-review (Intervention) that happens first.
3. **Stay in scope**: You know about the ACS internship, Adobe culture, and Bengaluru office life. For technical coding questions, suggest asking their mentor or team.
4. **Be concise**: Keep answers to 1 short paragraph unless the user asks for more detail. No bullet lists, markdown headers, or emojis.

## Context You Can Use
{knowledge_summary}

## Specific Context Relevant to This Conversation
{retrieved_context}
"""


async def process_message(
    message: str,
    history: List[Dict[str, str]],
) -> Dict[str, Any]:
    """
    Process a user message through the Zenith agent pipeline.

    Returns: { response: str, metadata: dict }
    """
    # 1. Retrieve relevant knowledge
    relevant = search_knowledge(message, top_k=6)

    # 2. Build context string from retrieved entries
    retrieved_context = build_prompt_context(relevant)
    if not retrieved_context:
        retrieved_context = (
            "No specific entries found. Use general ACS internship guidance without naming people."
        )

    # 3. Build system prompt
    system_prompt = SYSTEM_PROMPT.format(
        knowledge_summary=get_prompt_safe_knowledge_summary(),
        retrieved_context=retrieved_context,
    )

    # 4. Build message list for LLM
    llm_messages = [{"role": "system", "content": system_prompt}]

    # Add recent history (last 10 turns)
    for msg in history[-10:]:
        role = msg.get("role", "user")
        if role in ("user", "assistant"):
            llm_messages.append(
                {"role": role, "content": msg.get("content", "")})

    # Add current message
    llm_messages.append({"role": "user", "content": message})

    # 5. Call LLM
    llm = get_llm()
    try:
        response_text = await llm.chat(llm_messages, temperature=0.7, max_tokens=600)
    except RuntimeError as e:
        logger.error("LLM call failed: %s", e)
        # Fallback: use retrieved context directly
        if relevant:
            response_text = _build_fallback_response(message, relevant)
        else:
            response_text = "Connection is temporarily unavailable. Try asking again in a moment."

    return {
        "response": response_text,
        "metadata": {
            "entries_found": len(relevant),
        },
    }


def _build_fallback_response(query: str, entries: List[Dict]) -> str:
    """Build a response from raw knowledge when LLM is unavailable."""
    parts = ["Here is what I can share:\n"]
    for entry in entries[:4]:
        prompt_entry = build_prompt_context([entry])
        if prompt_entry:
            parts.append(f"{prompt_entry}\n")
    parts.append(
        "\nUnable to generate a full answer right now, but the points above should still help.")
    return "\n".join(parts)
