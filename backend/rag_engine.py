import os
import re
import math
import logging
from typing import List, Dict, Any, Optional
import pymupdf  # PyMuPDF
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("insuremate-rag")

# LLM / OpenRouter Configuration
LLM_API_KEY = (
    os.getenv("OPENROUTER_API_KEY")
    or os.getenv("LLM_API_KEY")
    or os.getenv("OPENAI_API_KEY")
    or ""
)
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://openrouter.ai/api/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "openai/gpt-4o-mini")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")

# Initialize AsyncOpenAI client configured for OpenRouter / OpenAI
openai_client: Optional[AsyncOpenAI] = None
if LLM_API_KEY:
    custom_headers = {
        "HTTP-Referer": "https://insuremate.ai",
        "X-Title": "InsureMate WhatsApp Assistant",
    }
    openai_client = AsyncOpenAI(
        api_key=LLM_API_KEY,
        base_url=LLM_BASE_URL,
        default_headers=custom_headers,
    )


class DocumentChunk:
    def __init__(self, text: str, page_number: int, source_document: str, chunk_id: str, section: str = ""):
        self.text = text
        self.page_number = page_number
        self.source_document = source_document
        self.chunk_id = chunk_id
        self.section = section
        self.embedding: Optional[List[float]] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "chunk_id": self.chunk_id,
            "page_number": self.page_number,
            "source_document": self.source_document,
            "section": self.section,
            "text": self.text,
        }


class PolicyVectorStore:
    """
    In-memory vector store for a policy document.
    Supports cosine similarity with embeddings and robust lexical/TF-IDF hybrid ranking.
    """
    def __init__(self, document_name: str, total_pages: int):
        self.document_name = document_name
        self.total_pages = total_pages
        self.chunks: List[DocumentChunk] = []

    def add_chunks(self, chunks: List[DocumentChunk]):
        self.chunks.extend(chunks)

    async def compute_embeddings(self):
        """Generates embeddings if endpoint supports embeddings."""
        if not openai_client or not self.chunks:
            return

        try:
            texts = [c.text for c in self.chunks]
            for i in range(0, len(texts), 50):
                batch_texts = texts[i:i + 50]
                resp = await openai_client.embeddings.create(
                    input=batch_texts,
                    model=EMBEDDING_MODEL
                )
                for j, data_item in enumerate(resp.data):
                    self.chunks[i + j].embedding = data_item.embedding
            logger.info(f"Generated embeddings for {len(self.chunks)} chunks of {self.document_name}")
        except Exception as e:
            logger.info(f"Embeddings not used ({str(e)}). Using fast TF-IDF / lexical ranking.")

    def search(self, query: str, top_k: int = 4, query_embedding: Optional[List[float]] = None) -> List[DocumentChunk]:
        """
        Retrieves top relevant clauses using semantic cosine similarity (if embeddings present)
        combined with lexical term matching.
        """
        if not self.chunks:
            return []

        scores: List[tuple[float, DocumentChunk]] = []
        query_terms = set(re.findall(r"\w+", query.lower()))

        for chunk in self.chunks:
            score = 0.0

            # 1. Semantic Cosine Similarity (if embeddings available)
            if query_embedding and chunk.embedding:
                dot_product = sum(a * b for a, b in zip(query_embedding, chunk.embedding))
                norm_q = math.sqrt(sum(a * a for a in query_embedding))
                norm_c = math.sqrt(sum(b * b for b in chunk.embedding))
                if norm_q > 0 and norm_c > 0:
                    score += 0.8 * (dot_product / (norm_q * norm_c))

            # 2. Lexical keyword matching (BM25-style term frequency boost)
            chunk_words = re.findall(r"\w+", chunk.text.lower())
            if chunk_words:
                matches = sum(1 for w in query_terms if w in chunk_words)
                lexical_score = matches / (len(query_terms) + 1e-5)
                score += 0.5 * lexical_score

            scores.append((score, chunk))

        scores.sort(key=lambda x: x[0], reverse=True)
        return [item[1] for item in scores[:top_k] if item[0] > 0.05] or [item[1] for item in scores[:top_k]]


def extract_text_from_pdf_bytes(pdf_bytes: bytes, filename: str = "policy.pdf") -> tuple[List[DocumentChunk], int]:
    """
    Extracts text from PDF bytes using PyMuPDF while preserving page numbers and sections.
    """
    doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
    total_pages = len(doc)
    chunks: List[DocumentChunk] = []
    chunk_index = 0

    for page_idx in range(total_pages):
        page = doc[page_idx]
        page_num = page_idx + 1
        page_text = page.get_text("text")

        if not page_text or not page_text.strip():
            continue

        paragraphs = [p.strip() for p in page_text.split("\n\n") if p.strip()]
        
        current_chunk = ""
        current_section = ""

        for para in paragraphs:
            if len(para) < 80 and any(w in para.lower() for w in ["section", "clause", "exclusion", "coverage", "benefit", "waiting", "limit", "room rent"]):
                current_section = para

            if len(current_chunk) + len(para) > 700:
                chunk_index += 1
                chunks.append(
                    DocumentChunk(
                        text=current_chunk.strip(),
                        page_number=page_num,
                        source_document=filename,
                        chunk_id=f"p{page_num}_c{chunk_index}",
                        section=current_section
                    )
                )
                current_chunk = para + "\n"
            else:
                current_chunk += para + "\n"

        if current_chunk.strip():
            chunk_index += 1
            chunks.append(
                DocumentChunk(
                    text=current_chunk.strip(),
                    page_number=page_num,
                    source_document=filename,
                    chunk_id=f"p{page_num}_c{chunk_index}",
                    section=current_section
                )
            )

    doc.close()
    return chunks, total_pages


async def answer_policy_question(query: str, vector_store: PolicyVectorStore) -> str:
    """
    RAG Pipeline: Retrieve top relevant clauses -> Prompt LLM with strict grounding -> Return answer with citations.
    """
    query_embedding = None
    if openai_client:
        try:
            resp = await openai_client.embeddings.create(
                input=[query],
                model=EMBEDDING_MODEL
            )
            query_embedding = resp.data[0].embedding
        except Exception:
            pass  # Fallback to lexical retrieval

    top_chunks = vector_store.search(query, top_k=4, query_embedding=query_embedding)

    if not top_chunks:
        return "I couldn't find enough information in your policy to answer this reliably."

    context_blocks = []
    for c in top_chunks:
        sec_info = f" · {c.section}" if c.section else ""
        context_blocks.append(f"--- [Source: Page {c.page_number}{sec_info}] ---\n{c.text}")

    context_str = "\n\n".join(context_blocks)

    if not openai_client:
        top_c = top_chunks[0]
        sec_info = f" · {top_c.section}" if top_c.section else ""
        return (
            f"Based on your policy:\n\n"
            f"\"{top_c.text[:300]}...\"\n\n"
            f"Source: Page {top_c.page_number}{sec_info}"
        )

    system_prompt = (
        "You are InsureMate AI, an expert insurance policy advisor on WhatsApp.\n"
        "Your task is to answer the user's question clearly and concisely based ONLY on the provided policy excerpts.\n\n"
        "CRITICAL RULES:\n"
        "1. Answer ONLY using the facts present in the provided context below.\n"
        "2. NEVER invent a clause, page number, exclusion, waiting period, or coverage.\n"
        "3. NEVER give a guaranteed claim decision or promise payout amounts.\n"
        "4. Always cite the exact source page number (e.g. 'Source: Page 18 · Section 3.4') at the end.\n"
        "5. If the provided policy excerpts do NOT contain enough information to answer reliably, respond EXACTLY:\n"
        "\"I couldn't find enough information in your policy to answer this reliably.\"\n"
        "6. Format for WhatsApp with clean line breaks and bold headings (*Heading*)."
    )

    user_prompt = (
        f"POLICY CONTEXT:\n{context_str}\n\n"
        f"USER QUESTION: {query}\n\n"
        f"Provide a grounded, clear answer with the specific source page:"
    )

    try:
        response = await openai_client.chat.completions.create(
            model=LLM_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.0,
            max_tokens=400,
        )
        answer = response.choices[0].message.content or ""
        return answer.strip()
    except Exception as e:
        logger.error(f"Error generating LLM response via OpenRouter: {str(e)}", exc_info=True)
        top_c = top_chunks[0]
        sec_info = f" · {top_c.section}" if top_c.section else ""
        return (
            f"Your policy indicates relevant terms:\n\n"
            f"{top_c.text[:250]}...\n\n"
            f"Source: Page {top_c.page_number}{sec_info}"
        )
