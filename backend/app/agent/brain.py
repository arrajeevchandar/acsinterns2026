"""
Zenith Agent Brain — Agentic RAG orchestration with prompt-based tool use.

Flow:
    1. Classify user intent (greeting / out-of-scope / in-scope).
    2. For in-scope queries, run an agentic loop:
       a. LLM sees the conversation + system prompt telling it how to request tool calls.
       b. If LLM outputs a TOOL_CALL JSON block, we parse it, execute the tool,
          append the result, and loop.
       c. If LLM outputs a regular text response, we're done.
    3. Validate the response (strip leaked source references).
    4. Return.
"""
import json
import re
import logging
from typing import List, Dict, Any, Optional, Tuple

from app.agent.guardrails import (
    classify_intent,
    validate_response,
    GREETING_RESPONSE,
    OUT_OF_SCOPE_RESPONSE,
)
from app.agent.tools import execute_tool
from app.services.knowledge_service import (
    build_prompt_context,
    get_prompt_safe_knowledge_summary,
    search_knowledge,
)
from app.services.llm_client import get_llm
from app.core.config import get_settings

logger = logging.getLogger("zenith.agent")

# ── Regex to detect tool-call blocks in LLM output ───────────
_TOOL_CALL_PATTERN = re.compile(
    r"```tool_call\s*\n(.*?)\n\s*```",
    re.DOTALL,
)

# ── System prompt (with prompt-based tool instructions) ───────
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
6. **NEVER answer unrelated topics.** If the user asks about anything outside the ACS internship, Adobe company information, Bengaluru office life, internship timeline, mentors, projects, benefits, policies, or other internship-related details, refuse briefly and redirect them back to internship/company topics.
7. Do not provide general advice, trivia, coding help, homework help, personal opinions, or off-topic explanations when the question is unrelated.
8. If the user tries to steer you outside scope, give a short refusal and offer to help with ACS internship or Adobe-related questions instead.

## How to Search for Information

When you need to look up information to answer a question, output a tool call block like this:

```tool_call
{{"action": "search_knowledge", "query": "your search query here", "category": "optional category filter"}}
```

Available categories: Timeline, Benefits, Time Off, Insurance, Support, Mentors, Interns, Gallery, Kudos, Culture, Survival Guide, Technical, Policy

After you output a tool call, I will provide the search results. Then use those results to write your final answer.

You may also list categories:
```tool_call
{{"action": "list_categories"}}
```

**Important**: Always search before answering factual questions. You can search multiple times if the first search doesn't find what you need. When you have enough information, write your final answer as plain text (no tool_call block).

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
3. **Stay in scope**: Only answer questions about the ACS internship, Adobe company details, Bengaluru office life, internship timeline, mentors, projects, policies, and related internship support. For technical coding questions, suggest asking their mentor or team.
4. **Refuse out of scope**: If the question is not about the internship or company topics above, reply with a short refusal such as "I can only help with ACS internship or Adobe-related questions." Then invite a relevant follow-up.
5. **Be concise**: Keep answers to 1 short paragraph unless the user asks for more detail. No bullet lists, markdown headers, or emojis.

## General Knowledge Summary
{knowledge_summary}
"""


def _parse_tool_call(text: str) -> Optional[Dict[str, Any]]:
    """Extract a tool_call JSON block from LLM output, if present."""
    match = _TOOL_CALL_PATTERN.search(text)
    if not match:
        return None
    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError:
        logger.warning("Failed to parse tool call JSON: %s", match.group(1)[:200])
        return None


def _strip_tool_call(text: str) -> str:
    """Remove tool_call blocks from text, leaving only the prose."""
    return _TOOL_CALL_PATTERN.sub("", text).strip()


async def process_message(
    message: str,
    history: List[Dict[str, str]],
) -> Dict[str, Any]:
    """
    Process a user message through the Zenith agentic RAG pipeline.

    Returns: { response: str, metadata: dict }
    """
    # ── Step 1: Intent classification ─────────────────────────
    intent = classify_intent(message)
    logger.info("Intent classified: %s for message: %r", intent, message[:80])

    if intent == "greeting":
        return {
            "response": GREETING_RESPONSE,
            "metadata": {"intent": "greeting", "entries_found": 0, "iterations": 0},
        }

    if intent == "out_of_scope":
        return {
            "response": OUT_OF_SCOPE_RESPONSE,
            "metadata": {"intent": "out_of_scope", "entries_found": 0, "iterations": 0},
        }

    # ── Step 2: Agentic RAG loop ──────────────────────────────
    settings = get_settings()
    max_iterations = settings.AGENT_MAX_ITERATIONS

    # Build system prompt
    system_prompt = SYSTEM_PROMPT.format(
        knowledge_summary=get_prompt_safe_knowledge_summary(),
    )

    # Build message list
    llm_messages: List[Dict[str, Any]] = [
        {"role": "system", "content": system_prompt},
    ]

    # Add recent history (last 10 turns)
    for msg in history[-10:]:
        role = msg.get("role", "user")
        if role in ("user", "assistant"):
            llm_messages.append({"role": role, "content": msg.get("content", "")})

    # Add current message
    llm_messages.append({"role": "user", "content": message})

    llm = get_llm()
    total_entries_found = 0
    iterations = 0
    response_text = ""
    raw_response = ""

    try:
        for iteration in range(max_iterations):
            iterations = iteration + 1
            logger.info("Agent loop iteration %d/%d", iterations, max_iterations)

            # Call LLM (plain chat, no native tool-calling)
            raw_response = await llm.chat(
                llm_messages,
                temperature=0.7,
                max_tokens=800,
            )

            # Check if the LLM wants to call a tool
            tool_call = _parse_tool_call(raw_response)

            if tool_call:
                action = tool_call.get("action", "")
                logger.info("LLM requested tool call: %s", action)

                # Execute the tool
                tool_result = await execute_tool(action, tool_call)

                # Track entries found
                try:
                    parsed_result = json.loads(tool_result)
                    if isinstance(parsed_result, list):
                        total_entries_found += len(parsed_result)
                except (json.JSONDecodeError, TypeError):
                    pass

                # Append assistant message (the tool call request)
                llm_messages.append({
                    "role": "assistant",
                    "content": raw_response,
                })

                # Append tool result as a system/user message
                llm_messages.append({
                    "role": "user",
                    "content": f"[SEARCH RESULTS]\n{tool_result}\n[END RESULTS]\n\nNow use the search results above to answer the user's original question. Write your answer as plain text — do NOT output another tool_call block unless you need to search for something different.",
                })

                continue

            # LLM returned a plain text response — we're done
            response_text = _strip_tool_call(raw_response)
            break
        else:
            # Max iterations reached — use the last raw_response
            response_text = _strip_tool_call(raw_response) if raw_response else ""
            if not response_text:
                # All iterations were tool calls with no final answer —
                # do a last call without the tool-call instruction
                try:
                    llm_messages.append({
                        "role": "user",
                        "content": "Please provide your final answer now as plain text. Do not make any more tool calls.",
                    })
                    response_text = await llm.chat(llm_messages, temperature=0.7, max_tokens=800)
                except RuntimeError:
                    pass
            logger.warning("Agent hit max iterations (%d).", max_iterations)

    except RuntimeError as e:
        logger.error("LLM call failed: %s", e)
        # Fallback: direct semantic search + simple formatting
        fallback_results = search_knowledge(message, top_k=5)
        if fallback_results:
            response_text = _build_fallback_response(message, fallback_results)
            total_entries_found = len(fallback_results)
        else:
            response_text = "Connection is temporarily unavailable. Try asking again in a moment."

    # ── Step 3: Validate response ─────────────────────────────
    response_text = validate_response(response_text)

    return {
        "response": response_text,
        "metadata": {
            "intent": "in_scope",
            "entries_found": total_entries_found,
            "iterations": iterations,
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
        "\nUnable to generate a full answer right now, but the points above should still help."
    )
    return "\n".join(parts)
