"""
Zenith AI Engine — Configuration
Uses python-dotenv for .env loading (no Rust/MSVC dependency).
"""
import os
from functools import lru_cache

from dotenv import load_dotenv

# Load .env from the backend root directory
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))


class Settings:
    """Simple settings class backed by environment variables."""

    # LLM (Groq)
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_BASE_URL: str = os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    # Service
    PORT: int = int(os.getenv("PORT", "8000"))
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")

    # Convenience: auto-populated from env file
    def __init__(self):
        pass


@lru_cache()
def get_settings() -> Settings:
    return Settings()