"""
Zenith LLM Client — Groq integration with tool/function-calling support.
"""
import httpx
import json
import logging
from typing import List, Dict, Any, Optional

from app.core.config import get_settings

logger = logging.getLogger("zenith.llm")


class ZenithLLM:
    """Async Groq chat-completion client with function-calling support."""

    def __init__(self):
        s = get_settings()
        self._client = httpx.AsyncClient(
            base_url=s.GROQ_BASE_URL,
            headers={"Authorization": f"Bearer {s.GROQ_API_KEY}"},
            timeout=httpx.Timeout(connect=5.0, read=60.0, write=5.0, pool=5.0),
        )
        self._model = s.GROQ_MODEL

    async def chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 1500,
    ) -> str:
        """Send a simple chat completion request to Groq (no tools)."""
        payload = {
            "model": self._model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": False,
        }

        try:
            resp = await self._client.post("/chat/completions", json=payload)
            resp.raise_for_status()
            data = resp.json()
            content = data["choices"][0]["message"]["content"]
            return content or ""
        except httpx.HTTPStatusError as exc:
            logger.error("LLM HTTP error %s: %s", exc.response.status_code, exc.response.text[:200])
            raise RuntimeError(f"LLM returned HTTP {exc.response.status_code}")
        except (httpx.ReadTimeout, httpx.ConnectTimeout) as exc:
            logger.error("LLM timeout: %s", exc)
            raise RuntimeError("LLM request timed out")
        except Exception as exc:
            logger.error("LLM unexpected error: %s", exc)
            raise RuntimeError(f"LLM error: {exc}")

    async def chat_with_tools(
        self,
        messages: List[Dict[str, Any]],
        tools: List[Dict[str, Any]],
        temperature: float = 0.7,
        max_tokens: int = 1500,
    ) -> Dict[str, Any]:
        """
        Send a chat completion request with tool definitions.

        Returns a dict with either:
          - {"content": str}           if the LLM produced a text response
          - {"tool_calls": [...]}      if the LLM wants to call tool(s)
        """
        payload: Dict[str, Any] = {
            "model": self._model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": False,
        }

        if tools:
            payload["tools"] = tools
            payload["tool_choice"] = "auto"

        try:
            resp = await self._client.post("/chat/completions", json=payload)
            resp.raise_for_status()
            data = resp.json()

            choice = data["choices"][0]
            message = choice["message"]

            # Check for tool calls
            if message.get("tool_calls"):
                return {"tool_calls": message["tool_calls"]}

            # Plain text response
            return {"content": message.get("content", "")}

        except httpx.HTTPStatusError as exc:
            logger.error(
                "LLM HTTP error %s: %s",
                exc.response.status_code,
                exc.response.text[:300],
            )
            raise RuntimeError(f"LLM returned HTTP {exc.response.status_code}")
        except (httpx.ReadTimeout, httpx.ConnectTimeout) as exc:
            logger.error("LLM timeout: %s", exc)
            raise RuntimeError("LLM request timed out")
        except Exception as exc:
            logger.error("LLM unexpected error: %s", exc)
            raise RuntimeError(f"LLM error: {exc}")

    async def close(self):
        await self._client.aclose()


# Singleton
_instance: Optional[ZenithLLM] = None


def get_llm() -> ZenithLLM:
    global _instance
    if _instance is None:
        _instance = ZenithLLM()
    return _instance
