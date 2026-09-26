import asyncio
import io
import pymupdf
from rag_engine import (
    DocumentChunk,
    PolicyVectorStore,
    extract_text_from_pdf_bytes,
    answer_policy_question
)
from main import app, handle_incoming_user_message, user_sessions
from fastapi.testclient import TestClient

client = TestClient(app)

def create_sample_policy_pdf() -> bytes:
    """Generates a multi-page sample health insurance policy PDF in memory for testing."""
    doc = pymupdf.open()

    # Page 1: General policy information
    page1 = doc.new_page()
    page1.insert_text((50, 72), "STAR HEALTH PREMIER INSURANCE POLICY\nPolicy No: SH-2026-98765\n\nSection 1: Eligibility\nAll persons between 18 and 65 years are eligible for coverage.")

    # Page 2: Specific coverage & surgeries
    page2 = doc.new_page()
    page2.insert_text((50, 72), "Section 3.4: Specific Illness Waiting Periods & Surgeries\n\nCataract surgery is covered up to INR 40,000 per eye after a waiting period of 24 months of continuous coverage.\n\nJoint replacement surgery is covered after 36 months.")

    # Page 3: General Exclusions
    page3 = doc.new_page()
    page3.insert_text((50, 72), "Section 4: General Exclusions\n\nCosmetic and aesthetic treatments are strictly excluded.\nAdventure sports injuries are not covered unless specifically endorsed.")

    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes


def test_pdf_extraction():
    pdf_bytes = create_sample_policy_pdf()
    chunks, total_pages = extract_text_from_pdf_bytes(pdf_bytes, filename="star_health.pdf")
    
    assert total_pages == 3
    assert len(chunks) >= 3
    
    # Check that page 2 contains cataract surgery clause
    p2_chunks = [c for c in chunks if c.page_number == 2]
    assert any("cataract" in c.text.lower() for c in p2_chunks)
    print("PDF Extraction and Page metadata test PASSED.")


def test_vector_search():
    pdf_bytes = create_sample_policy_pdf()
    chunks, total_pages = extract_text_from_pdf_bytes(pdf_bytes, "star_health.pdf")
    
    vstore = PolicyVectorStore("star_health.pdf", total_pages)
    vstore.add_chunks(chunks)
    
    results = vstore.search("Is cataract surgery covered?")
    assert len(results) > 0
    assert results[0].page_number == 2
    assert "cataract" in results[0].text.lower()
    print("Vector similarity search test PASSED.")


async def test_rag_pipeline_async():
    pdf_bytes = create_sample_policy_pdf()
    chunks, total_pages = extract_text_from_pdf_bytes(pdf_bytes, "star_health.pdf")
    vstore = PolicyVectorStore("star_health.pdf", total_pages)
    vstore.add_chunks(chunks)

    # Test question with answer
    answer = await answer_policy_question("Is cataract surgery covered?", vstore)
    assert "Page 2" in answer or "cataract" in answer.lower()
    print("RAG Question Answering test PASSED.")


async def test_session_handling_async():
    sender = "919999988888"
    
    # 1. User says Hi without policy
    resp1 = await handle_incoming_user_message(sender, "Hi", "text", {})
    assert "Send me your insurance policy" in resp1

    # 2. User uploads policy PDF (Simulate with established session)
    pdf_bytes = create_sample_policy_pdf()
    chunks, total_pages = extract_text_from_pdf_bytes(pdf_bytes, "star_health.pdf")
    vstore = PolicyVectorStore("star_health.pdf", total_pages)
    vstore.add_chunks(chunks)
    user_sessions[sender] = vstore

    # 3. User asks policy question in the same session
    resp2 = await handle_incoming_user_message(sender, "What is the waiting period for cataract surgery?", "text", {})
    assert "Page 2" in resp2 or "cataract" in resp2.lower()

    # 4. User asks general greeting with active session
    resp3 = await handle_incoming_user_message(sender, "Hello", "text", {})
    assert "star_health.pdf" in resp3

    print("End-to-End Session & RAG test PASSED.")


def test_health_check_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "InsureMate WhatsApp RAG Backend"
    assert data["status"] == "online"
    print("Health check endpoint test PASSED.")


if __name__ == "__main__":
    test_pdf_extraction()
    test_vector_search()
    asyncio.run(test_rag_pipeline_async())
    asyncio.run(test_session_handling_async())
    test_health_check_endpoint()
    print("\nALL RAG & WHATSAPP UNIT TESTS PASSED SUCCESSFULLY!")
