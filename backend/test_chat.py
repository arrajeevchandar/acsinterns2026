"""Quick test script for the chat endpoint."""
import asyncio
import httpx

async def test():
    async with httpx.AsyncClient() as client:
        payload = {
            "message": "Hi, who are you?",
            "history": []
        }
        r = await client.post(
            "http://localhost:8000/api/agent/chat",
            json=payload
        )
        print("STATUS:", r.status_code)
        print("RESPONSE:", r.json())

asyncio.run(test())