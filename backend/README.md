# InsureMate WhatsApp RAG Bot (FastAPI + Meta Cloud API + PyMuPDF + LLM)

This backend connects directly to the **Meta WhatsApp Cloud API** to receive policy documents (PDFs) and user questions in real-time, executing an end-to-end RAG pipeline with grounded citations.

---

## 🏗️ End-to-End Architecture

```
User (WhatsApp)
       │
       ▼
Meta WhatsApp Cloud API
       │
       ▼  (HTTPS POST /webhook)
FastAPI Backend (main.py)
       │
       ├── Document Upload (PDF)
       │     ├── 1. Download binary stream via Meta Media API (GET /v22.0/{media_id})
       │     ├── 2. Extract text & page metadata via PyMuPDF (fitz)
       │     ├── 3. Clause Chunking + Section Headers
       │     ├── 4. Generate Embeddings & Index into in-memory PolicyVectorStore
       │     └── 5. Reply to WhatsApp: "Your policy has been received. I've processed the document (X pages)..."
       │
       └── Policy Question (e.g. "Is cataract surgery covered?")
             ├── 1. Embed query & Retrieve top relevant clauses via Cosine + Lexical hybrid search
             ├── 2. Prompt LLM with strict grounding & anti-hallucination rules
             ├── 3. Synthesize grounded answer with citations ("Source: Page 18 · Section 3.4")
             └── 4. Send WhatsApp Reply via Meta Cloud API (POST /v22.0/{phone_number_id}/messages)
       │
       ▼
User (WhatsApp receives exact grounded answer)
```

---

## 🚀 Environment Configuration

Create a `.env` file in `c:\insuremate\backend\.env` (or root `.env`):

```ini
# Meta WhatsApp Cloud API
WHATSAPP_ACCESS_TOKEN=your_meta_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_waba_id_here
WHATSAPP_VERIFY_TOKEN=insuremate_secret_verify_token_2026
META_GRAPH_API_VERSION=v22.0

# LLM & RAG Configuration
LLM_API_KEY=your_openai_or_groq_or_gemini_api_key
LLM_MODEL=gpt-4o-mini
LLM_BASE_URL=https://api.openai.com/v1
EMBEDDING_MODEL=text-embedding-3-small
```

---

## 🧪 Running & Testing

### 1. Run Unit & RAG Tests
```bash
python test_rag.py
python test_webhook.py
```

### 2. Start the Server
```bash
python -m uvicorn main:app --reload --port 8000
```

### 3. Expose via ngrok & Configure Webhook
```bash
ngrok http 8000
```
In Meta Developer Dashboard &rarr; WhatsApp &rarr; Configuration &rarr; Webhook:
- **Callback URL**: `https://<your-ngrok-domain>/webhook`
- **Verify token**: `insuremate_secret_verify_token_2026`
- **Webhook Fields**: Subscribe to `messages`
