"""
Zenith Guardrails — Intent classification and response validation.

Provides fast pre-LLM filtering to reject out-of-scope queries
and post-LLM validation to strip accidental data-source leaks.
"""
import re
import logging
from typing import Literal

logger = logging.getLogger("zenith.guardrails")

IntentType = Literal["in_scope", "out_of_scope", "greeting"]

# ── Keyword / pattern sets ────────────────────────────────────

_GREETING_PATTERNS = re.compile(
    r"^\s*("
    r"h(i|ello|ey|owdy|ola)"
    r"|yo\b"
    r"|what'?s\s*up"
    r"|good\s*(morning|afternoon|evening)"
    r"|greetings"
    r")\s*[,!.]?\s*("
    r"who\s+are\s+you"
    r"|introduce\s+yourself"
    r"|what\s+can\s+you\s+do"
    r"|what\s+do\s+you\s+do"
    r"|help"
    r"|there"
    r")?\s*[?!.]*\s*$",
    re.IGNORECASE,
)

# Standalone greeting patterns (full message)
_STANDALONE_GREETING = re.compile(
    r"^\s*("
    r"who\s+are\s+you"
    r"|introduce\s+yourself"
    r"|what\s+can\s+you\s+do"
    r"|what\s+do\s+you\s+do"
    r"|help\s*$"
    r")\s*[?!.]*\s*$",
    re.IGNORECASE,
)

# Topics clearly within scope
_IN_SCOPE_KEYWORDS = {
    # Internship-specific
    "intern", "interns", "internship", "apprentice", "apprenticeship",
    "onboarding", "demo day", "demoday", "intervention", "alchemy",
    "lunch ninja", "expo", "mid-review", "showcase",
    # People & teams
    "mentor", "mentors", "buddy", "manager", "team", "cohort", "batch",
    # Projects & tech
    "project", "projects", "stack", "tech", "domain",
    # Adobe & office
    "adobe", "acs", "bengaluru", "bangalore", "office", "ptp",
    "cafeteria", "gym", "hub",
    # Policies & admin
    "stipend", "salary", "pay", "leave", "holiday", "vacation",
    "insurance", "benefit", "benefits", "wellbeing", "headspace",
    "workday", "hr", "policy", "policies",
    # Culture
    "culture", "values", "dress code", "first-name",
    # Timeline
    "timeline", "week", "schedule", "event", "events", "milestone",
    # Misc related
    "tip", "tips", "advice", "survival", "guide",
    "portal", "zenith", "chatbot",
    "github", "outlook", "teams", "slack",
}

# Patterns that are clearly out-of-scope
_OUT_OF_SCOPE_PATTERNS = re.compile(
    r"("
    r"write\s+(me\s+)?(a\s+)?(code|program|script|function|class|algorithm)"
    r"|(?:python|java|javascript|c\+\+|ruby|go)\s+\w*(sort|search|algorithm|code|program)"
    r"|\b(sort|search|binary)\w*\s+algorithm"
    r"|solve\s+(this|my)\s+(problem|equation|assignment|homework)"
    r"|explain\s+(how\s+to\s+)?(sort|search|implement|code|build)\s"
    r"|what\s+is\s+the\s+capital\s+of"
    r"|translate\s+(this|the)\s"
    r"|generate\s+(a\s+)?(poem|story|essay|song|joke)"
    r"|who\s+(is|was)\s+the\s+president"
    r"|tell\s+me\s+a\s+joke"
    r"|what\s+is\s+(\d+\s*[\+\-\*\/]\s*\d+)"
    r"|recipe\s+for"
    r"|how\s+to\s+cook"
    r"|help\s+(me\s+)?(with\s+)?(my\s+)?(homework|assignment|exam|test)"
    r"|what\s+is\s+the\s+(meaning|definition)\s+of"
    r")",
    re.IGNORECASE,
)

# Phrases that should never appear in a response
_LEAKED_SOURCE_PATTERNS = re.compile(
    r"("
    r"(based on|according to|from)\s+(my|the)\s+(knowledge\s*base|data(base)?|records|json|files|sources|documents)"
    r"|in\s+my\s+(knowledge\s*base|data(base)?|records)"
    r"|I\s+have\s+access\s+to"
    r"|my\s+data\s+(shows|indicates|suggests)"
    r"|retrieved\s+(from|entries|documents|results)"
    r"|vector\s*(store|search|database)"
    r"|chroma(db)?"
    r"|embedding"
    r")",
    re.IGNORECASE,
)


def classify_intent(message: str) -> IntentType:
    """
    Fast intent classification using pattern matching.

    Returns:
        "greeting"    — simple hello / intro question
        "out_of_scope" — clearly unrelated to internship / Adobe
        "in_scope"    — related to the internship program (default)
    """
    text = message.strip()

    # 1. Check greetings first (short messages)
    if _GREETING_PATTERNS.match(text) or _STANDALONE_GREETING.match(text):
        logger.debug("Intent: greeting — %r", text[:60])
        return "greeting"

    # 2. Check explicit out-of-scope patterns
    if _OUT_OF_SCOPE_PATTERNS.search(text):
        logger.debug("Intent: out_of_scope — %r", text[:60])
        return "out_of_scope"

    # 3. Check for in-scope keywords
    text_lower = text.lower()
    for keyword in _IN_SCOPE_KEYWORDS:
        if keyword in text_lower:
            logger.debug("Intent: in_scope (keyword=%s) — %r", keyword, text[:60])
            return "in_scope"

    # 4. Default: treat as in-scope and let the LLM system prompt handle it.
    #    This avoids false rejections for queries like "what should I expect?"
    logger.debug("Intent: in_scope (default) — %r", text[:60])
    return "in_scope"


def validate_response(response: str) -> str:
    """
    Post-process an LLM response to remove any accidental data-source leaks.

    Returns the cleaned response text.
    """
    cleaned = _LEAKED_SOURCE_PATTERNS.sub("", response)
    # Collapse any leftover double spaces
    cleaned = re.sub(r"  +", " ", cleaned)
    cleaned = cleaned.strip()
    return cleaned


# ── Canned responses ──────────────────────────────────────────

GREETING_RESPONSE = (
    "Hey there! I'm Zenith, your companion for everything about the ACS internship "
    "at Adobe. Ask me about projects from the previous batch, mentors, the internship "
    "timeline, survival tips, benefits, or anything else related to your time here."
)

OUT_OF_SCOPE_RESPONSE = (
    "I can only help with ACS internship or Adobe-related questions — things like "
    "projects, mentors, the timeline, office life, benefits, or tips from previous "
    "batches. Want to ask about any of those instead?"
)
