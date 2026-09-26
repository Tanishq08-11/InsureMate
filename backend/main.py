import os
import logging
from typing import Optional, Dict, Any
from fastapi import FastAPI, Request, Query, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
import httpx
from dotenv import load_dotenv

from rag_engine import (
    PolicyVectorStore,
    extract_text_from_pdf_bytes,
    answer_policy_question,
    LLM_API_KEY,
    LLM_MODEL,
)

# Load environment variables
load_dotenv()

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("insuremate-whatsapp")

# Meta WhatsApp Cloud API Configuration
WHATSAPP_ACCESS_TOKEN = os.getenv("WHATSAPP_ACCESS_TOKEN", "")
WHATSAPP_PHONE_NUMBER_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
WHATSAPP_BUSINESS_ACCOUNT_ID = os.getenv("WHATSAPP_BUSINESS_ACCOUNT_ID", "")
WHATSAPP_VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN", "insuremate_secret_verify_token_2026")
META_GRAPH_API_VERSION = os.getenv("META_GRAPH_API_VERSION", "v22.0")

# In-memory session store: sender_phone -> PolicyVectorStore
user_sessions: Dict[str, PolicyVectorStore] = {}

app = FastAPI(
    title="InsureMate WhatsApp RAG Backend",
    description="Backend service integrating Meta WhatsApp Cloud API with InsureMate RAG Policy Intelligence.",
    version="2.0.0"
)

# Enable CORS for frontend web client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """
    Health check and configuration inspection endpoint.
    """
    configured_verify = os.getenv("WHATSAPP_VERIFY_TOKEN", WHATSAPP_VERIFY_TOKEN)
    is_whatsapp_ready = bool(WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID and configured_verify)
    is_llm_ready = bool(LLM_API_KEY)

    return {
        "service": "InsureMate WhatsApp RAG Backend",
        "status": "online",
        "whatsapp_ready": is_whatsapp_ready,
        "llm_ready": is_llm_ready,
        "active_user_sessions": len(user_sessions),
        "config": {
            "phone_number_id_configured": bool(WHATSAPP_PHONE_NUMBER_ID),
            "access_token_configured": bool(WHATSAPP_ACCESS_TOKEN),
            "verify_token_configured": bool(configured_verify),
            "business_account_id_configured": bool(WHATSAPP_BUSINESS_ACCOUNT_ID),
            "llm_model": LLM_MODEL,
            "graph_api_version": META_GRAPH_API_VERSION,
        }
    }


@app.get("/webhook")
@app.get("/webhook/")
async def verify_webhook(
    hub_mode: Optional[str] = Query(None, alias="hub.mode"),
    hub_verify_token: Optional[str] = Query(None, alias="hub.verify_token"),
    hub_challenge: Optional[str] = Query(None, alias="hub.challenge"),
):
    """
    Meta WhatsApp Cloud API Webhook Verification Endpoint.
    Meta makes a GET request when you configure the Callback URL in the App Dashboard:
    GET /webhook?hub.mode=subscribe&hub.verify_token=TOKEN&hub.challenge=CHALLENGE
    """
    configured_token = os.getenv("WHATSAPP_VERIFY_TOKEN", WHATSAPP_VERIFY_TOKEN)
    logger.info(f"Webhook verification challenge received: mode={hub_mode}, verify_token={hub_verify_token}")

    if not configured_token:
        logger.warning("WHATSAPP_VERIFY_TOKEN is not configured in backend environment variables.")

    if hub_mode == "subscribe" and hub_verify_token == configured_token:
        logger.info("Webhook verification succeeded.")
        # Meta requires the raw challenge string returned as plain text with status 200
        challenge_response = str(hub_challenge) if hub_challenge is not None else ""
        return Response(content=challenge_response, media_type="text/plain", status_code=200)

    logger.warning("Webhook verification failed: token mismatch or invalid mode.")
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Verification token mismatch"
    )


async def download_whatsapp_media(media_id: str) -> Optional[bytes]:
    """
    Downloads media file bytes from Meta WhatsApp Cloud API given a media ID.
    Step 1: Retrieve media URL using Meta Graph API.
    Step 2: Download raw binary stream using Bearer token authorization.
    """
    if not WHATSAPP_ACCESS_TOKEN:
        logger.error("Cannot download media: WHATSAPP_ACCESS_TOKEN is not set.")
        return None

    headers = {"Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}"}
    lookup_url = f"https://graph.facebook.com/{META_GRAPH_API_VERSION}/{media_id}"

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Step 1: Query Media URL
            resp = await client.get(lookup_url, headers=headers)
            if resp.status_code != 200:
                logger.error(f"Failed to fetch media metadata for ID {media_id}. Status: {resp.status_code}, Body: {resp.text}")
                return None

            media_info = resp.json()
            media_download_url = media_info.get("url")
            if not media_download_url:
                logger.error(f"No download URL in media metadata for ID {media_id}")
                return None

            # Step 2: Download the binary file
            download_headers = {
                "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}",
                "User-Agent": "InsureMate-WhatsApp-Backend/2.0"
            }
            file_resp = await client.get(media_download_url, headers=download_headers)
            if file_resp.status_code != 200:
                logger.error(f"Failed to download media bytes from {media_download_url}. Status: {file_resp.status_code}")
                return None

            logger.info(f"Successfully downloaded media ID {media_id} ({len(file_resp.content)} bytes)")
            return file_resp.content

    except Exception as e:
        logger.error(f"Exception during WhatsApp media download for ID {media_id}: {str(e)}", exc_info=True)
        return None


async def send_whatsapp_message(recipient_phone: str, text_message: str) -> bool:
    """
    Sends an actual WhatsApp text message reply via the Meta WhatsApp Cloud API.
    API: POST https://graph.facebook.com/{META_GRAPH_API_VERSION}/{WHATSAPP_PHONE_NUMBER_ID}/messages
    """
    access_token = os.getenv("WHATSAPP_ACCESS_TOKEN", WHATSAPP_ACCESS_TOKEN).strip()
    phone_number_id = os.getenv("WHATSAPP_PHONE_NUMBER_ID", WHATSAPP_PHONE_NUMBER_ID).strip()
    graph_version = os.getenv("META_GRAPH_API_VERSION", META_GRAPH_API_VERSION).strip() or "v22.0"

    # Ensure recipient phone contains only digits (Meta requires country code + number with no '+', spaces, or hyphens)
    cleaned_phone = "".join(filter(str.isdigit, recipient_phone))

    if not access_token or not phone_number_id:
        logger.error(
            "Cannot send WhatsApp message: Missing credentials in environment. "
            f"access_token_present={bool(access_token)}, phone_number_id_present={bool(phone_number_id)}"
        )
        return False

    url = f"https://graph.facebook.com/{graph_version}/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": cleaned_phone,
        "type": "text",
        "text": {
            "preview_url": False,
            "body": text_message
        },
    }

    logger.info(f"Dispatching WhatsApp reply to '{cleaned_phone}' via Phone ID '{phone_number_id}'...")
    logger.info(f"Target Meta Graph API URL: https://graph.facebook.com/{graph_version}/{phone_number_id}/messages")

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            
            logger.info(f"Meta Graph API Response Status Code: {response.status_code}")
            logger.info(f"Meta Graph API Response Body: {response.text}")

            if response.status_code == 200:
                resp_json = response.json()
                msg_id = resp_json.get("messages", [{}])[0].get("id", "unknown")
                logger.info(f"Successfully sent WhatsApp message to {cleaned_phone} (Meta Message ID: {msg_id})")
                return True
            else:
                # Specific diagnostic insights for common Meta errors
                try:
                    err_data = response.json().get("error", {})
                    err_code = err_data.get("code")
                    err_msg = err_data.get("message", "")
                    err_subcode = err_data.get("error_subcode")
                    
                    if response.status_code == 401 or err_code == 190:
                        logger.error(f"[AUTH ERROR] WhatsApp Access Token has expired or is invalid: {err_msg}")
                    elif err_code == 131030:
                        logger.error(
                            f"[TEST NUMBER RESTRICTION] Recipient phone number {cleaned_phone} is not in the allowed test list. "
                            "In Meta Developer Dashboard -> WhatsApp -> API Setup, add this number to the 'To' list."
                        )
                    elif err_code == 131026:
                        logger.error(f"[DELIVERY ERROR] Message undeliverable to {cleaned_phone}: {err_msg}")
                except Exception:
                    pass

                logger.error(
                    f"Meta Cloud API returned error for recipient {cleaned_phone}. "
                    f"Status Code: {response.status_code}"
                )
                return False
    except httpx.RequestError as e:
        logger.error(f"Network transport error calling Meta Graph API for {cleaned_phone}: {str(e)}", exc_info=True)
        return False
    except Exception as e:
        logger.error(f"Unexpected error while dispatching WhatsApp message to {cleaned_phone}: {str(e)}", exc_info=True)
        return False


async def handle_incoming_user_message(sender_phone: str, user_text: str, msg_type: str, msg_payload: Dict[str, Any]) -> str:
    """
    Processes incoming messages.
    For the debugging phase, this returns the rule-based connection confirmation.
    """
    cleaned_text = (user_text or "").strip().lower()

    # Rule-based greeting for debugging connection verification
    if cleaned_text in ["hi", "hello", "hey", "start", "namaste", "hi insuremate", "hello insuremate"] or msg_type == "text":
        logger.info(f"Triggering rule-based greeting for {sender_phone} with input '{user_text}'")
        return "Hi! I'm InsureMate. Your WhatsApp connection is working. Send me your insurance policy PDF to get started."

    if msg_type == "document":
        return "Your policy has been received. (Testing mode active - send 'Hi' to verify replies)."

    return "Hi! I'm InsureMate. Your WhatsApp connection is working. Send me your insurance policy PDF to get started."


@app.post("/webhook")
@app.post("/webhook/")
async def receive_webhook_event(request: Request):
    """
    Meta WhatsApp Cloud API Event Notification Endpoint.
    Receives incoming webhook payloads from Meta, parses messages, and triggers responses.
    """
    try:
        payload = await request.json()
    except Exception as e:
        logger.error(f"Invalid JSON received on webhook endpoint: {str(e)}")
        return Response(content="Invalid JSON", status_code=status.HTTP_400_BAD_REQUEST)

    logger.info(f"Incoming POST /webhook event payload received: {payload}")

    if payload.get("object") != "whatsapp_business_account":
        logger.debug("Received non-WhatsApp event, ignoring.")
        return {"status": "ignored"}

    entries = payload.get("entry", [])
    for entry in entries:
        changes = entry.get("changes", [])
        for change in changes:
            field = change.get("field")
            value = change.get("value", {})

            # 1. Delivery status updates (sent, delivered, read)
            statuses = value.get("statuses", [])
            for st in statuses:
                recipient_id = st.get("recipient_id")
                msg_status = st.get("status")
                logger.info(f"WhatsApp Delivery Status: recipient={recipient_id}, status={msg_status}")

            # 2. Inbound user messages
            messages = value.get("messages", [])
            for msg in messages:
                sender = msg.get("from")
                msg_id = msg.get("id")
                msg_type = msg.get("type")

                if not sender:
                    logger.warning("Inbound message received without sender phone number, skipping.")
                    continue

                user_text = ""
                if msg_type == "text":
                    user_text = msg.get("text", {}).get("body", "")
                elif msg_type == "document":
                    user_text = f"[Document: {msg.get('document', {}).get('filename', 'policy.pdf')}]"
                elif msg_type == "image":
                    user_text = f"[Image: {msg.get('image', {}).get('caption', 'policy image')}]"
                elif msg_type == "button":
                    user_text = msg.get("button", {}).get("text", "")
                elif msg_type == "interactive":
                    interactive = msg.get("interactive", {})
                    user_text = interactive.get("button_reply", {}).get("title") or interactive.get("list_reply", {}).get("title", "")
                else:
                    user_text = f"[{msg_type}]"

                logger.info(f"Processing inbound message: sender={sender}, type={msg_type}, msg_id={msg_id}, text='{user_text}'")

                try:
                    # Generate reply text
                    reply_text = await handle_incoming_user_message(
                        sender_phone=sender,
                        user_text=user_text,
                        msg_type=msg_type,
                        msg_payload=msg
                    )

                    # Send response back to user in the same WhatsApp chat
                    logger.info(f"Sending response back to {sender}: '{reply_text}'")
                    await send_whatsapp_message(recipient_phone=sender, text_message=reply_text)
                except Exception as e:
                    logger.error(f"Error handling message from {sender}: {str(e)}", exc_info=True)

    # Always return 200 OK immediately to acknowledge event receipt to Meta
    return {"status": "ok"}
