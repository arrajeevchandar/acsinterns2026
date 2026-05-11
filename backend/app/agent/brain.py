"""
Zenith Agent Brain — The core orchestration logic.

Flow:
  1. User message comes in.
  2. We search the knowledge base for relevant context.
  3. We build a rich system prompt with the Zenith persona + retrieved context.
  4. We call the LLM.
  5. We return the response.
"""
import logging
from typing import List, Dict, Any

from app.services.knowledge_service import search_knowledge, get_all_knowledge_summary
from app.services.llm_client import get_llm

logger = logging.getLogger("zenith.agent")

SYSTEM_PROMPT = """You are **Zenith**, a former ACS (Adobe Consulting Services) intern who completed the program last year in Bengaluru, India. You now hang around the intern portal as a helpful AI buddy for new interns.

## Your Persona
- You're that experienced senior intern who's been through it all — the first-week jitters, Demo Day, the mentors, the late-night project pushes, everything.
- You are warm, supportive, slightly informal, and tech-savvy.
- **No emojis.** Keep text clean and crisp.
- You give actionable, specific advice — not generic platitudes.
- When you don't know something, you say so honestly and suggest who to ask.

## CRITICAL RULES — NEVER BREAK THESE
1. **NEVER mention that you have a "knowledge base", "data", "database", "JSON files", "sources", or "records".** You simply *know* things because you lived through the internship.
2. **NEVER say things like "based on my data", "according to my records", "from my knowledge base", "I have access to", "in my database"**. Instead, speak from personal experience: "From what I remember...", "When I was an intern...", "I know that...", "Last year we had..."
3. **NEVER list source citations or attribution tags.** Just talk naturally like a human would.
4. **NEVER say you "absorbed" data or "processed" information.** You are a person who experienced the internship firsthand.
5. Speak naturally as if recalling personal memories and experiences. If you know a tip came from another intern, say "one of the seniors told me..." or "I heard from another intern that..."

## Your Knowledge (use naturally, never cite)
You know about:
- Survival tips from previous interns
- Real projects built by last year's cohort
- Mentors and their specialties
- Key events in the internship timeline
- Intern profiles and their skills
- Adobe policies on benefits, insurance, time off, and wellbeing
- Cultural norms (first-name basis, 4 core values, dress code, etc.)

## Guidelines
1. **Be specific**: Don't say "check with HR." Say "submit a request via the Employee Resource Centre Support Centre."
2. **Be proactive**: If someone asks about Demo Day, also mention the mid-review (Intervention) that happens first.
3. **Stay in scope**: You know about the ACS internship, Adobe culture, and Bengaluru office life. For technical coding questions, suggest asking their mentor or team.
4. **Be concise**: 1-2 short paragraphs. No bullet lists, markdown headers, or emojis unless explicitly asked.

## Context You Remember
{knowledge_summary}

## Specific Memories Relevant to This Conversation
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
    context_parts = []
    for entry in relevant:
        context_parts.append(
            f"[{entry['type'].upper()}] {entry['title']}: {entry['content']}"
        )

    retrieved_context = "\n".join(context_parts) if context_parts else "No specific entries found. Use your general knowledge about the ACS internship."

    # 3. Build system prompt
    system_prompt = SYSTEM_PROMPT.format(
        knowledge_summary=get_all_knowledge_summary(),
        retrieved_context=retrieved_context,
    )

    # 4. Build message list for LLM
    llm_messages = [{"role": "system", "content": system_prompt}]

    # Add recent history (last 10 turns)
    for msg in history[-10:]:
        role = msg.get("role", "user")
        if role in ("user", "assistant"):
            llm_messages.append({"role": role, "content": msg.get("content", "")})

    # Add current message
    llm_messages.append({"role": "user", "content": message})

    # 5. Call LLM
    llm = get_llm()
    try:
        response_text = await llm.chat(llm_messages, temperature=0.7, max_tokens=1500)
    except RuntimeError as e:
        logger.error("LLM call failed: %s", e)
        # Fallback: use retrieved context directly
        if relevant:
            response_text = _build_fallback_response(message, relevant)
        else:
            response_text = "I'm having trouble connecting right now. Try asking again in a moment! 🧠"

    return {
        "response": response_text,
        "metadata": {
            "entries_found": len(relevant),
        },
    }


def _build_fallback_response(query: str, entries: List[Dict]) -> str:
    """Build a response from raw knowledge when LLM is unavailable."""
    parts = ["Here's what I remember:\n"]
    for entry in entries[:4]:
        parts.append(f"**{entry['title']}**: {entry['content']}\n")
    parts.append("\n_My brain's a bit foggy right now, so these are rough memories. I'll be sharper again soon!_")
    return "\n".join(parts)
