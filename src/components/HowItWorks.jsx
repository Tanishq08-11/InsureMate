import React, { useState } from 'react';
import { UploadCloud, FileSearch, HelpCircle, CheckCircle2, FileText, ChevronRight, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const sampleQuestions = [
    {
      q: '“Is knee replacement covered?”',
      status: 'POTENTIALLY COVERED',
      statusColor: 'text-[#00A896] bg-[#00A896]/10 border-[#00A896]/20',
      evidence: 'Page 24 · Section 4.2',
      snippet: '“Specified Joint Replacement Surgeries are covered subject to a 24-month waiting period from continuous coverage inception date, up to the maximum Sum Insured.”',
      details: 'Admissible after waiting period completion. Standard room-rent limits apply.'
    },
    {
      q: '“Is there a waiting period for hypertension?”',
      status: 'WAITING PERIOD APPLIES',
      statusColor: 'text-[#B45309] bg-[#F59E0B]/10 border-[#F59E0B]/20',
      evidence: 'Page 18 · Section 3.1 (b)',
      snippet: '“Pre-existing hypertension and related complications carry a 36-month waiting period unless the PED Buyback rider was opted at inception.”',
      details: 'Active policy age is 14 months. 22 months remaining for full PED waiver.'
    },
    {
      q: '“What are the room-rent limits?”',
      status: '1% OF SUM INSURED (₹5,000/day)',
      statusColor: 'text-[#0B1F3A] bg-[#0B1F3A]/10 border-[#0B1F3A]/20',
      evidence: 'Page 12 · Section 2.1',
      snippet: '“Normal Room Rent is capped at 1% of Sum Insured per day. Proportionate deductions will apply on associated medical expenses if higher room category is selected.”',
      details: 'Selecting a suite will trigger proportionate billing deductions across doctor fees.'
    },
    {
      q: '“Why might my claim be partially covered?”',
      status: 'PROPORTIONATE DEDUCTION & NON-PAYABLES',
      statusColor: 'text-[#B45309] bg-[#F59E0B]/10 border-[#F59E0B]/20',
      evidence: 'Page 31 · Annexure A',
      snippet: '“Consumable items (gloves, sanitizers, surgical masks, admin fees) listed in Annexure I are non-payable out of pocket expenses.”',
      details: 'Consumables usually account for 8%–14% of gross inpatient hospitalization invoice.'
    }
  ];

  const steps = [
    {
      num: '01',
      tag: 'SEND',
      title: 'Upload Document',
      desc: 'Send your health insurance policy document as a PDF or camera photo directly in your WhatsApp chat.',
      icon: UploadCloud
    },
    {
      num: '02',
      tag: 'UNDERSTAND',
      title: 'Context Parsing',
      desc: 'InsureMate extracts policy text while preserving exact page, section, clause metadata, and table hierarchies.',
      icon: FileSearch
    },
    {
      num: '03',
      tag: 'ASK',
      title: 'Natural Inquiries',
      desc: 'Ask direct questions in plain English or conversational queries without knowing technical insurance jargon.',
      icon: HelpCircle
    },
    {
      num: '04',
      tag: 'GET EVIDENCE',
      title: 'Verified Answer',
      desc: 'Receive clear, grounded answers backed by specific page and clause citations you can cross-check instantly.',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00A896]/10 border border-[#00A896]/20 text-xs font-mono font-bold text-[#00A896] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            WORKFLOW
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight">
            From a policy document <br />
            <span className="text-[#00A896]">to a clear answer.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            No endless scrolling through 45-page policy wordings. InsureMate connects your questions directly to cited policy clauses.
          </p>
        </div>

        {/* 4 Elegant Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded">
                      {step.num} — {step.tag}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center text-[#0B1F3A]">
                      <IconComponent className="w-4 h-4 text-[#00A896]" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#0B1F3A] tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] text-[11px] font-mono text-[#64748B]">
                  Structured Pipeline
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Query & Evidence Demonstrator */}
        <div className="mt-16 bg-white rounded-2xl border border-[#E2E8F0] p-6 lg:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#00A896] font-bold">
                EVIDENCE RETRIEVAL DEMO
              </span>
              <h3 className="font-display text-xl font-bold text-[#0B1F3A] mt-1">
                See how InsureMate responds to natural queries
              </h3>
            </div>
            <span className="text-xs font-mono text-[#64748B] bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
              DEMO / ILLUSTRATIVE DATA
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Question Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-xs font-mono text-[#64748B] block mb-2">
                SELECT A COMMON PATIENT QUESTION:
              </span>
              {sampleQuestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuestion(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    activeQuestion === idx
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                      : 'bg-[#F8FAFC] text-[#172033] border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate pr-2">{item.q}</span>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${activeQuestion === idx ? 'text-[#5EEAD4]' : 'text-[#64748B]'}`} />
                </button>
              ))}
            </div>

            {/* Right: Evidence Card */}
            <div className="lg:col-span-7 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${sampleQuestions[activeQuestion].statusColor}`}>
                  {sampleQuestions[activeQuestion].status}
                </span>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#E2E8F0] text-xs font-mono text-[#0B1F3A] shadow-2xs">
                  <FileText className="w-3.5 h-3.5 text-[#00A896]" />
                  <span>{sampleQuestions[activeQuestion].evidence}</span>
                </div>
              </div>

              {/* Policy Clause Citation Box */}
              <div className="bg-white rounded-lg p-4 border border-[#E2E8F0] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block font-semibold">
                  RETRIEVED POLICY CLAUSE TEXT
                </span>
                <p className="text-xs sm:text-sm text-[#172033] italic leading-relaxed border-l-2 border-[#00A896] pl-3">
                  {sampleQuestions[activeQuestion].snippet}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A896] font-bold block">
                  INSUREMATE SYNTHESIS
                </span>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {sampleQuestions[activeQuestion].details}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>Confidence: High (Direct Policy Match)</span>
                <span>Grounding: 100% Policy-based</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
