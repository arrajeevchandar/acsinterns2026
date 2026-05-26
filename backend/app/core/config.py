"""
Zenith AI Engine — Configuration
Uses python-dotenv for .env loading (no Rust/MSVC dependency).
"""
import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

# Load .env from the backend root directory
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))


def _csv_env(name: str, default: str = "") -> list[str]:
    return [
        value.strip()
        for value in os.getenv(name, default).split(",")
        if value.strip()
    ]


class Settings:
    """Simple settings class backed by environment variables."""

    # LLM (Groq)
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_BASE_URL: str = os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    # Service
    PORT: int = int(os.getenv("PORT", "8000"))
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")
    CORS_ORIGINS: list[str] = _csv_env(
        "CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    )
    ADMIN_TOKEN: str = os.getenv("ADMIN_TOKEN", "")

    # RAG / Vector Store
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
    VECTOR_DB_PATH: str = os.getenv(
        "VECTOR_DB_PATH",
        str(Path(__file__).resolve().parent.parent.parent / "vector_db"),
    )
    AGENT_MAX_ITERATIONS: int = int(os.getenv("AGENT_MAX_ITERATIONS", "3"))
    RETRIEVAL_TOP_K: int = int(os.getenv("RETRIEVAL_TOP_K", "5"))

    # Convenience: auto-populated from env file
    def __init__(self):
        pass


@lru_cache()
def get_settings() -> Settings:
    return Settings()
