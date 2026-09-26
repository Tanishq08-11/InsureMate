import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  UploadCloud,
  FileSearch,
  HelpCircle,
  CheckCircle2,
  FileText,
  AlertCircle,
  Calculator,
  ShieldCheck,
  Cpu,
  Layers,
  Lock,
  ArrowRight,
  ArrowDown,
  BookOpen,
  Sparkles,
  Database,
  ExternalLink
} from 'lucide-react';

export default function Experience({ whatsappUrl }) {
  const [activeTab, setActiveTab] = useState('breakdown');

  return (
    <div className="space-y-0">
      
      {/* EXPERIENCE HERO HEADER */}
      <section className="pt-10 pb-12 lg:pt-16 lg:pb-16 bg-[#0B1F3A] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#5EEAD4]/10 border border-[#5EEAD4]/20 text-xs font-mono font-bold text-[#5EEAD4] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#5EEAD4]" />
              THE PRODUCT EXPERIENCE
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              From policy document <br />
              <span className="text-[#5EEAD4]">to financial clarity.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              See how InsureMate turns a complex policy into an evidence-backed conversation.
            </p>
          </div>
        </div>
      </section>

      {/* STEP 1 — SEND YOUR POLICY */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                STEP 01 — SEND
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                Send your policy as a PDF or image.
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Attach your health insurance schedule through WhatsApp. InsureMate ingests the document while preserving page, table, and section coordinates.
              </p>

              {/* Preservation Features */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#172033]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span><strong>Deterministic OCR:</strong> Extracts text without altering numbers or clause identifiers.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span><strong>Page & Section Preservation:</strong> Every paragraph retains its original page reference.</span>
                </div>
              </div>
            </div>

            {/* Visual Pipeline Box */}
            <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold">
                INGESTION WORKFLOW
              </span>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                  <FileText className="w-5 h-5 text-[#0B1F3A] mx-auto" />
                  <span className="font-display font-bold text-xs text-[#0B1F3A] block">POLICY PDF</span>
                  <span className="text-[10px] text-[#64748B] block font-mono">Upload via Chat</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                  <Cpu className="w-5 h-5 text-[#00A896] mx-auto" />
                  <span className="font-display font-bold text-xs text-[#0B1F3A] block">OCR PARSER</span>
                  <span className="text-[10px] text-[#64748B] block font-mono">Table Extraction</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                  <Layers className="w-5 h-5 text-[#38BDF8] mx-auto" />
                  <span className="font-display font-bold text-xs text-[#0B1F3A] block">PAGE CHUNKS</span>
                  <span className="text-[10px] text-[#64748B] block font-mono">Indexed Metadata</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STEP 2 — ASK NATURALLY (WHATSAPP SIMULATION) */}
      <section className="py-14 lg:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: WhatsApp Phone UI */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[340px] rounded-[32px] bg-[#0B1F3A] p-3 shadow-xl border-4 border-[#0B1F3A]">
                <div className="bg-[#EFEAE2] rounded-[24px] overflow-hidden flex flex-col h-[460px] border border-black/10">
                  
                  {/* WhatsApp Bar */}
                  <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-[#5EEAD4]">
                      IM
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">InsureMate Assistant</p>
                      <p className="text-[9px] text-white/80">Active Context: Policy #48291</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-3 space-y-2.5 overflow-y-auto text-xs">
                    
                    {/* Q1 */}
                    <div className="flex justify-end">
                      <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-2xs">
                        <p className="text-xs font-medium">Does my policy cover cataract surgery?</p>
                        <p className="text-[8px] text-[#64748B] text-right font-mono mt-0.5">11:20 AM · ✓✓</p>
                      </div>
                    </div>

                    {/* A1 */}
                    <div className="flex justify-start">
                      <div className="bg-white text-[#172033] rounded-lg rounded-tl-none p-2.5 max-w-[92%] shadow-2xs space-y-1.5 border border-black/5">
                        <p className="text-xs leading-relaxed">
                          <strong className="text-[#00A896]">Potentially covered</strong>, subject to the applicable waiting period and policy conditions.
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0B1F3A]/5 text-[9px] font-mono text-[#0B1F3A]">
                          <FileText className="w-3 h-3 text-[#00A896]" />
                          <span>Page 18 · Section 3.4</span>
                        </div>
                      </div>
                    </div>

                    {/* Q2 */}
                    <div className="flex justify-end">
                      <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-2xs">
                        <p className="text-xs font-medium">What is the waiting period?</p>
                        <p className="text-[8px] text-[#64748B] text-right font-mono mt-0.5">11:21 AM · ✓✓</p>
                      </div>
                    </div>

                    {/* A2 */}
                    <div className="flex justify-start">
                      <div className="bg-white text-[#172033] rounded-lg rounded-tl-none p-2.5 max-w-[92%] shadow-2xs space-y-1.5 border border-black/5">
                        <p className="text-xs leading-relaxed">
                          Your policy specifies a <strong>24-month waiting period</strong> for cataract procedures (Sec 3.4). Current policy age is 28 months — <em>waiting period completed.</em>
                        </p>
                        <span className="text-[8px] font-mono text-[#00A896] block font-bold">
                          [DEMO DATA · POLICY VERIFIED]
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Right: Explanation */}
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                STEP 02 — ASK NATURALLY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                Ask questions in plain English.
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                No need to memorize technical terms like "moratorium periods" or "admissibility schedules". Ask conversational queries and receive grounded answers.
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#64748B] font-mono">
                <span className="text-[#0B1F3A] font-bold block mb-1">EXAMPLE QUERIES:</span>
                • “Is robotic cataract surgery covered?” <br />
                • “What is the maximum claim limit for one eye?” <br />
                • “Are eye drops post-surgery reimbursed?”
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STEP 3 — TREATMENT + COST INTELLIGENCE */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-1 rounded uppercase tracking-wider">
              STEP 03 — COST INTELLIGENCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              Coverage is only half the question. <br />
              <span className="text-[#00A896]">“What might I actually have to pay?”</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              InsureMate combines policy clauses with treatment benchmark cost datasets to project out-of-pocket expenses.
            </p>
          </div>

          {/* Financial Breakdown Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1F3A] text-white shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#5EEAD4] font-bold block">
                  DEMO / ILLUSTRATIVE DATA
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  Procedure: Cataract Surgery (Laser Phacoemulsification)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1 rounded">
                Tier-1 Eye Specialty Hospital
              </span>
            </div>

            {/* 3 Metric Displays */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">ESTIMATED TREATMENT RANGE</span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">₹40,000 – ₹80,000</div>
                <span className="text-[11px] text-slate-400 block font-mono">Average: ₹55,000</span>
              </div>

              <div className="p-4 rounded-xl bg-[#00A896]/20 border border-[#00A896]/30 space-y-1">
                <span className="text-[10px] font-mono text-[#5EEAD4] block uppercase font-bold">POTENTIAL COVERAGE</span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#5EEAD4]">₹40,000</div>
                <span className="text-[11px] text-slate-300 block font-mono">Policy sub-limit cap</span>
              </div>

              <div className="p-4 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 space-y-1">
                <span className="text-[10px] font-mono text-[#F59E0B] block uppercase font-bold">POTENTIAL OUT-OF-POCKET</span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#F59E0B]">₹15,000 – ₹25,000</div>
                <span className="text-[11px] text-slate-300 block font-mono">Patient share</span>
              </div>
            </div>

            {/* Factor Breakdown */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-xs font-mono text-[#5EEAD4] uppercase font-bold block">
                FACTORS AFFECTING THE ESTIMATE:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-300">
                <div className="bg-white/5 p-2.5 rounded">1. Policy Sub-limit (₹40K)</div>
                <div className="bg-white/5 p-2.5 rounded">2. Intraocular Lens Grade</div>
                <div className="bg-white/5 p-2.5 rounded">3. 10% Mandatory Co-pay</div>
                <div className="bg-white/5 p-2.5 rounded">4. Non-payable Consumables</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STEP 4 — EVIDENCE */}
      <section className="py-14 lg:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded uppercase tracking-wider">
              STEP 04 — EVIDENCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              Every answer should have a reason.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Never take an AI summary on faith. InsureMate connects every synthesized statement directly to the exact policy clause.
            </p>
          </div>

          {/* Answer -> Evidence -> Clause Pipeline */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              
              <div className="p-4 rounded-xl bg-[#00A896]/10 border border-[#00A896]/20 space-y-1">
                <span className="text-[10px] font-mono text-[#00A896] font-bold uppercase block">1. SYNTHESIZED ANSWER</span>
                <span className="font-display font-bold text-sm text-[#0B1F3A] block">Potentially Covered</span>
                <span className="text-xs text-[#64748B] block">Subject to sub-limits</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1F3A] text-white space-y-1">
                <span className="text-[10px] font-mono text-[#5EEAD4] font-bold uppercase block">2. CITED LOCATION</span>
                <span className="font-display font-bold text-sm text-white block">Page 18 · Section 3.4</span>
                <span className="text-xs text-slate-300 block font-mono">Paragraph B, Line 12</span>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase block">3. VERIFICATION</span>
                <span className="font-display font-bold text-sm text-[#0B1F3A] block">Clause Validated</span>
                <span className="text-xs text-[#00A896] font-mono font-bold block">100% Policy Grounded</span>
              </div>

            </div>

            {/* Document Clause Excerpt */}
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
              <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase block">
                SOURCE DOCUMENT EXCERPT (PAGE 18 · SECTION 3.4)
              </span>
              <p className="text-xs sm:text-sm text-[#172033] font-mono leading-relaxed bg-white p-3 rounded border border-[#E2E8F0] border-l-4 border-l-[#00A896]">
                “3.4 Cataract & Ophthalmic Surgeries: The Company’s maximum liability for Cataract operation shall be restricted to actual expenses or ₹40,000 per eye, whichever is less, following completion of a 24-month waiting period from policy inception.”
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STEP 5 — WHEN INFORMATION IS MISSING (RESPONSIBLE AI) */}
      <section className="py-14 lg:py-20 bg-[#FFFBEB] border-b border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs font-bold text-[#B45309] bg-[#F59E0B]/20 px-2.5 py-1 rounded uppercase tracking-wider">
                STEP 05 — RESPONSIBLE AI
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
                When we don't know, <br />
                <span className="text-[#D97706]">we don't guess.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#92400E] leading-relaxed">
                If room category, hospital tier, or surgery variant details are unconfirmed, InsureMate explicitly pauses and prompts you for clarification.
              </p>
              
              <div className="p-4 bg-white rounded-xl border border-[#FDE68A] space-y-1.5 text-xs text-[#78350F]">
                <div className="font-mono font-bold text-[#B45309]">MISSING PARAMETERS PROMPT:</div>
                <p>“I need two more details before I can estimate your out-of-pocket cost reliably: your hospital type and treatment city.”</p>
              </div>
            </div>

            {/* Flow Visual */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#FDE68A] shadow-xs space-y-3">
              <div className="text-xs font-mono font-bold text-[#B45309] uppercase">UNCERTAINTY PIPELINE</div>
              <div className="space-y-2">
                <div className="p-2.5 bg-[#FFFBEB] rounded-lg text-xs font-mono text-[#92400E]">
                  1. Detect Missing Info (Hospital Tier / Room Category)
                </div>
                <div className="flex justify-center text-[#D97706]">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-2.5 bg-[#FFFBEB] rounded-lg text-xs font-mono text-[#92400E]">
                  2. Prompt User on WhatsApp for Missing Fields
                </div>
                <div className="flex justify-center text-[#00A896]">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-2.5 bg-[#0B1F3A] text-[#5EEAD4] rounded-lg text-xs font-mono font-bold">
                  3. Deliver Grounded, High-Confidence Estimate
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TECHNICAL APPROACH */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded uppercase tracking-wider">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
              Technical Approach
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              A deterministic RAG pipeline engineered for high-precision contract parsing and clinical cost modeling.
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-[11px] font-mono font-semibold">
              <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[#0B1F3A]">PDF INPUT</div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[#0B1F3A]">OCR EXTRACT</div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[#0B1F3A]">PAGE CHUNKS</div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[#00A896]">EMBEDDINGS</div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[#00A896]">VECTOR FAISS</div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[#38BDF8]">RAG ENGINE</div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[#38BDF8]">LLM SYNTHESIS</div>
              <div className="p-2 bg-[#00A896] text-white rounded">CITED ANSWER</div>
            </div>

            {/* Tech Stack Badges */}
            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2 text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#0B1F3A]">COMPONENTS:</span>
              <span className="px-2 py-0.5 bg-white rounded border border-[#E2E8F0]">React / Vite</span>
              <span className="px-2 py-0.5 bg-white rounded border border-[#E2E8F0]">FastAPI</span>
              <span className="px-2 py-0.5 bg-white rounded border border-[#E2E8F0]">PyMuPDF / OCR</span>
              <span className="px-2 py-0.5 bg-white rounded border border-[#E2E8F0]">Embeddings + FAISS / Chroma</span>
              <span className="px-2 py-0.5 bg-white rounded border border-[#E2E8F0]">LLM</span>
              <span className="px-2 py-0.5 bg-white rounded border border-[#E2E8F0]">PostgreSQL / Supabase</span>
              <span className="px-2 py-0.5 bg-white rounded border border-[#E2E8F0]">Python Cost Engine</span>
            </div>
          </div>

        </div>
      </section>

      {/* PRIVACY & RESPONSIBLE AI */}
      <section className="py-14 lg:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded uppercase tracking-wider">
              PRIVACY & GOVERNANCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
              “Insurance and treatment information can be sensitive.”
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-[#172033]">
              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                <span className="font-bold block text-[#0B1F3A]">• Evidence before answer</span>
                <p className="text-[#64748B]">Outputs are strictly constrained to cited policy schedules.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                <span className="font-bold block text-[#0B1F3A]">• Uncertainty before assumption</span>
                <p className="text-[#64748B]">Missing fields trigger clarification prompts instead of AI guesses.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                <span className="font-bold block text-[#0B1F3A]">• User-controlled information</span>
                <p className="text-[#64748B]">Documents are processed with user-governed retention controls.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                <span className="font-bold block text-[#0B1F3A]">• No fabricated certainty</span>
                <p className="text-[#64748B]">Estimated out-of-pocket costs are clearly framed as ranges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL PAGE 2 CTA */}
      <section className="py-16 lg:py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            “Your policy already contains the answer. <br />
            <span className="text-[#5EEAD4]">InsureMate helps you find it.”</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#00A896] text-white font-bold text-sm hover:bg-[#008f80] transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#00A896]" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
