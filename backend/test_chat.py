"""Quick test script for the Zenith agentic RAG chatbot."""
import asyncio
import httpx

BASE = "http://localhost:8000"


async def test_chat(message: str, label: str = ""):
    async with httpx.AsyncClient(timeout=60.0) as client:
        payload = {"message": message, "history": []}
        r = await client.post(f"{BASE}/api/agent/chat", json=payload)
        data = r.json()
        print(f"\n{'='*60}")
        print(f"TEST: {label or message}")
        print(f"STATUS: {r.status_code}")
        print(f"INTENT: {data.get('metadata', {}).get('intent', '?')}")
        print(f"ENTRIES: {data.get('metadata', {}).get('entries_found', '?')}")
        print(f"ITERATIONS: {data.get('metadata', {}).get('iterations', '?')}")
        print(f"RESPONSE: {data.get('response', '')[:300]}")
        print(f"{'='*60}")
        return data


async def test_health():
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{BASE}/health")
        print(f"\nHEALTH: {r.json()}")


async def test_reindex():
    async with httpx.AsyncClient(timeout=120.0) as client:
        r = await client.post(f"{BASE}/api/admin/reindex")
        print(f"\nREINDEX: {r.json()}")


async def main():
    # Health check
    await test_health()

    # 1. Greeting
    await test_chat("Hi, who are you?", "Greeting")
    await asyncio.sleep(2)

    # 2. Out-of-scope
    await test_chat(
        "Write me a Python sorting algorithm",
        "Out-of-scope (coding help)"
    )
    await asyncio.sleep(2)

    # 3. In-scope: projects
    await test_chat(
        "What projects did the previous batch of interns work on?",
        "In-scope (projects)"
    )
    await asyncio.sleep(10)  # Longer wait for rate limit

    # 4. In-scope: semantic similarity (salary -> stipend)
    await test_chat(
        "When do I get my salary?",
        "Semantic search (salary -> stipend)"
    )
    await asyncio.sleep(10)

    # 5. In-scope: timeline
    await test_chat(
        "What happens during demo day?",
        "In-scope (demo day)"
    )
    await asyncio.sleep(10)

    # 6. Policy question
    await test_chat(
        "How many leaves do I get as an intern?",
        "In-scope (leave policy)"
    )

    print("\n\nAll tests completed.")


asyncio.run(main())