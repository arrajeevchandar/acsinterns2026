"""
Zenith AI Engine — FastAPI Backend v1.0
The brain of the Intern Portal Companion.

Endpoints:
  POST /api/agent/chat    Primary chat endpoint
  GET  /health            Health check
"""
import time
import uuid
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict, Optional

from app.core.config import get_settings
from app.services.llm_client import get_llm
from app.agent.brain import process_message

# ── Logging ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("zenith.api")


# ── Lifespan ─────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    logger.info("Zenith Engine started | model=%s | port=%s", settings.GROQ_MODEL, settings.PORT)
    yield
    llm = get_llm()
    await llm.close()
    logger.info("Zenith Engine shut down.")


# ── App ──────────────────────────────────────────────────────
app = FastAPI(
    title="Zenith AI Engine",
    description="Stateful mentor agent for Adobe ACS Interns.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Middleware ───────────────────────────────────────────────
@app.middleware("http")
async def request_logger(request: Request, call_next):
    rid = str(uuid.uuid4())[:8]
    request.state.request_id = rid
    start = time.perf_counter()
    response = await call_next(request)
    elapsed = (time.perf_counter() - start) * 1000
    response.headers["X-Request-ID"] = rid
    response.headers["X-Process-Time-Ms"] = f"{elapsed:.1f}"
    logger.info("rid=%s | %s %s | %d | %.1fms", rid, request.method, request.url.path, response.status_code, elapsed)
    return response


# ── Models ───────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = []


# ── Routes ───────────────────────────────────────────────────
@app.get("/health")
async def health():
    s = get_settings()
    return {
        "status": "online",
        "agent": "Zenith",
        "version": "1.0.0",
        "model": s.GROQ_MODEL,
    }


@app.post("/api/agent/chat")
async def chat(req: ChatRequest):
    """Primary chat endpoint. Processes message through the agent pipeline."""
    result = await process_message(
        message=req.message,
        history=req.history or [],
    )
    return result


# ── Exception Handlers ───────────────────────────────────────
@app.exception_handler(RuntimeError)
async def runtime_error_handler(request: Request, exc: RuntimeError):
    logger.error("Runtime error: %s", exc)
    return JSONResponse(
        status_code=503,
        content={"error": "service_unavailable", "detail": str(exc)},
    )


@app.exception_handler(Exception)
async def catch_all_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"error": "internal_error", "detail": "An unexpected error occurred."},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
