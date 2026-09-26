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
    if not WHATSAPP_ACCESS_TOKEN or not WHATSAPP_PHONE_NUMBER_ID:
        logger.error(
            "Cannot send WhatsApp message: Missing credentials in environment. "
            "Please configure WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID."
        )
        return False

    url = f"https://graph.facebook.com/{META_GRAPH_API_VERSION}/{WHATSAPP_PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient_phone,
        "type": "text",
        "text": {
            "preview_url": False,
            "body": text_message
        },
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            
            if response.status_code == 200:
                resp_json = response.json()
                msg_id = resp_json.get("messages", [{}])[0].get("id", "unknown")
                logger.info(f"Successfully sent WhatsApp reply to {recipient_phone} (Message ID: {msg_id})")
                return True
            else:
                logger.error(
                    f"Meta Cloud API error when replying to {recipient_phone}. "
                    f"Status Code: {response.status_code} | Body: {response.text}"
                )
                return False
    except httpx.RequestError as e:
        logger.error(f"Network error while calling Meta Graph API for {recipient_phone}: {str(e)}", exc_info=True)
        return False
    except Exception as e:
        logger.error(f"Unexpected error while sending WhatsApp message to {recipient_phone}: {str(e)}", exc_info=True)
        return False


async def handle_incoming_user_message(sender_phone: str, user_text: str, msg_type: str, msg_payload: Dict[str, Any]) -> str:
    """
    Processes incoming messages according to InsureMate workflow:
    1. Document/PDF Upload -> Parse with PyMuPDF -> Build In-memory PolicyVectorStore -> Confirm.
    2. Policy Question -> Query user's PolicyVectorStore -> LLM Grounded Answer + Source Page.
    3. Greeting / General -> Welcoming prompt.
    """
    cleaned_text = (user_text or "").strip().lower()

    # PHASE 1 & 2: Policy Upload
    if msg_type == "document":
        doc_info = msg_payload.get("document", {})
        media_id = doc_info.get("id")
        filename = doc_info.get("filename", "policy.pdf")

        if not media_id:
            return "Unable to receive your document. Please try uploading the PDF again."

        logger.info(f"Downloading policy PDF '{filename}' (ID: {media_id}) for {sender_phone}...")
        pdf_bytes = await download_whatsapp_media(media_id)

        if not pdf_bytes:
            return "Could not download the document from WhatsApp. Please check the file and try again."

        try:
            chunks, total_pages = extract_text_from_pdf_bytes(pdf_bytes, filename=filename)
            if not chunks:
                return (
                    "Your PDF was received, but no readable text could be extracted. "
                    "If this is a scanned photocopy or image, please provide a clear digital PDF."
                )

            # Create in-memory vector store for this user
            vstore = PolicyVectorStore(document_name=filename, total_pages=total_pages)
            vstore.add_chunks(chunks)
            await vstore.compute_embeddings()

            # Store in session
            user_sessions[sender_phone] = vstore
            logger.info(f"Session established for {sender_phone}: {filename} with {len(chunks)} chunks across {total_pages} pages.")

            # Confirmation message as requested in specifications
            return f"Your policy has been received. I've processed the document ({total_pages} pages). You can now ask me questions about your coverage."

        except Exception as e:
            logger.error(f"Error extracting PDF for {sender_phone}: {str(e)}", exc_info=True)
            return "There was an issue processing your policy document. Please make sure it is a valid PDF file."

    # PHASE 3: Question Answering (or Greetings)
    if cleaned_text in ["hi", "hello", "hey", "start", "namaste", "hi insuremate", "hello insuremate"]:
        if sender_phone in user_sessions:
            doc_name = user_sessions[sender_phone].document_name
            return f"Hi! I'm InsureMate. I have your policy (*{doc_name}*) ready. Ask me any question about your coverage, waiting periods, room rent, or claim rules."
        return "Hi! I'm InsureMate. Send me your insurance policy PDF/image and ask me what you want to know."

    if cleaned_text in ["help", "info", "what can you do"]:
        return (
            "🛡️ *InsureMate Insurance Assistant*\n\n"
            "1. 📄 *Send Policy*: Upload your health or life insurance policy PDF.\n"
            "2. ❓ *Ask Questions*: Ask about coverage (e.g. *'Is cataract surgery covered?'*), waiting periods, exclusions, or room rent limits.\n"
            "3. 🔍 *Source Verification*: Every answer cites the exact page number from your policy.\n\n"
            "Send your policy PDF to get started!"
        )

    # Check if user has an active policy session
    if sender_phone in user_sessions:
        vstore = user_sessions[sender_phone]
        logger.info(f"Answering policy question for {sender_phone} using session {vstore.document_name}: '{user_text}'")
        answer = await answer_policy_question(user_text, vstore)
        return answer

    # User asked a question without uploading a policy yet
    return (
        "Hi! I'm InsureMate. Please upload your insurance policy PDF first so I can give you an accurate, policy-specific answer."
    )


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

    if payload.get("object") != "whatsapp_business_account":
        logger.debug("Received non-WhatsApp event, ignoring.")
        return {"status": "ignored"}

    entries = payload.get("entry", [])
    for entry in entries:
        changes = entry.get("changes", [])
        for change in changes:
            value = change.get("value", {})

            # 1. Delivery status updates (sent, delivered, read)
            statuses = value.get("statuses", [])
            for st in statuses:
                recipient_id = st.get("recipient_id")
                msg_status = st.get("status")
                logger.info(f"WhatsApp Message Delivery Status: {recipient_id} -> {msg_status}")

            # 2. Inbound user messages
            messages = value.get("messages", [])
            for msg in messages:
                sender = msg.get("from")
                msg_id = msg.get("id")
                msg_type = msg.get("type")

                if not sender:
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

                logger.info(f"Inbound WhatsApp message from {sender} [type={msg_type}, id={msg_id}]: '{user_text}'")

                # Handle the message & execute RAG pipeline
                reply_text = await handle_incoming_user_message(
                    sender_phone=sender,
                    user_text=user_text,
                    msg_type=msg_type,
                    msg_payload=msg
                )

                # Send response back to user in the same WhatsApp chat
                await send_whatsapp_message(recipient_phone=sender, text_message=reply_text)

    # Always return 200 OK to acknowledge event receipt to Meta
    return {"status": "ok"}
