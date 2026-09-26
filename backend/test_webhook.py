import os
import asyncio
from fastapi.testclient import TestClient
from main import app, handle_incoming_user_message

client = TestClient(app)

def test_greeting_logic():
    expected_greeting = "Hi! I'm InsureMate. Send me your insurance policy PDF/image and ask me what you want to know."
    resp1 = asyncio.run(handle_incoming_user_message("919876543210", "Hi", "text", {}))
    assert resp1 == expected_greeting
    
    resp2 = asyncio.run(handle_incoming_user_message("919876543210", "hello", "text", {}))
    assert resp2 == expected_greeting

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "InsureMate WhatsApp RAG Backend"
    assert data["status"] == "online"
    assert "config" in data

def test_webhook_verification_success():
    os.environ["WHATSAPP_VERIFY_TOKEN"] = "test_verify_token_123"
    response = client.get("/webhook?hub.mode=subscribe&hub.verify_token=test_verify_token_123&hub.challenge=challenge_token_999")
    assert response.status_code == 200
    assert response.text == "challenge_token_999"

def test_webhook_verification_failure():
    os.environ["WHATSAPP_VERIFY_TOKEN"] = "test_verify_token_123"
    response = client.get("/webhook?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=challenge_token_999")
    assert response.status_code == 403

def test_webhook_post_incoming_text_message():
    payload = {
        "object": "whatsapp_business_account",
        "entry": [
            {
                "id": "1234567890",
                "changes": [
                    {
                        "value": {
                            "messaging_product": "whatsapp",
                            "metadata": {
                                "display_phone_number": "15550234567",
                                "phone_number_id": "987654321"
                            },
                            "contacts": [{"profile": {"name": "Test User"}, "wa_id": "919876543210"}],
                            "messages": [
                                {
                                    "from": "919876543210",
                                    "id": "wamid.HBgLM...",
                                    "timestamp": "1710000000",
                                    "text": {"body": "Hi"},
                                    "type": "text"
                                }
                            ]
                        },
                        "field": "messages"
                    }
                ]
            }
        ]
    }
    response = client.post("/webhook", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_webhook_post_delivery_status():
    payload = {
        "object": "whatsapp_business_account",
        "entry": [
            {
                "id": "1234567890",
                "changes": [
                    {
                        "value": {
                            "messaging_product": "whatsapp",
                            "metadata": {
                                "display_phone_number": "15550234567",
                                "phone_number_id": "987654321"
                            },
                            "statuses": [
                                {
                                    "id": "wamid.HBgLM...",
                                    "status": "delivered",
                                    "timestamp": "1710000005",
                                    "recipient_id": "919876543210"
                                }
                            ]
                        },
                        "field": "messages"
                    }
                ]
            }
        ]
    }
    response = client.post("/webhook", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

if __name__ == "__main__":
    test_greeting_logic()
    test_health_check()
    test_webhook_verification_success()
    test_webhook_verification_failure()
    test_webhook_post_incoming_text_message()
    test_webhook_post_delivery_status()
    print("All backend webhook tests executed successfully!")
