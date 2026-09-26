import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldAlert, Cpu, ChevronDown, ChevronUp, FileCheck } from 'lucide-react';

export default function Research() {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  const researchCards = [
    {
      category: 'CONSUMER RESEARCH',
      title: 'CoverSure Survey, 2025',
      summary: 'Insurance-policy awareness findings showing significant consumer gaps in understanding basic exclusion clauses and waiting requirements.',
      keyFact: '80% of policyholders expressed ambiguity regarding specific in-hospital claim admissibility.'
    },
    {
      category: 'CLAIM EXPERIENCE',
      title: 'LocalCircles Health Insurance Survey',
      summary: 'Reported experiences around health-insurance claim rejection and partial approval across urban and semi-urban policyholders.',
      keyFact: '50%+ surveyed experienced partial claim settlements primarily driven by room-rent caps and consumables.'
    },
    {
      category: 'REGULATORY CONTEXT',
      title: 'IRDAI Guidelines on Policyholder Protection',
      summary: 'Regulatory frameworks governing standard health exclusions, 100% cashless hospital network mandates, and CIS (Customer Information Sheet) norms.',
      keyFact: 'IRDAI mandates standardized definitions for pre-existing diseases and 30-day waiting period disclosures.'
    },
    {
      category: 'TECHNICAL FOUNDATION',
      title: 'Document AI + Retrieval-Augmented Generation',
      summary: 'Deterministic text extraction preserving document structure, followed by semantic chunking and strict page-grounded retrieval before response synthesis.',
      keyFact: 'Strict zero-temperature prompt constraints prevent generative fabrication of non-existent policy benefits.'
    }
  ];

  const detailedSources = [
    {
      title: 'CoverSure Health Insurance Literacy Report (2025)',
      desc: 'Consumer study on health insurance policy wording comprehension, deductibles awareness, and cashless desk interactions in Indian metros.',
      type: 'Industry Survey'
    },
    {
      title: 'LocalCircles Citizen Survey on Health Insurance Claims Processing',
      desc: 'Community feedback data analyzing grievance patterns, TPA query delays, and out-of-pocket non-payable deductions.',
      type: 'Public Survey'
    },
    {
      title: 'Insurance Regulatory and Development Authority of India (IRDAI) Master Circular',
      desc: 'Master circular on health insurance business: Customer Information Sheet (CIS), standardized waiting period norms, and moratorium clauses.',
      type: 'Regulatory Framework'
    },
    {
      title: 'RAG Architecture for Complex Legal & Policy Contracts',
      desc: 'Page-level citation metadata indexing via vector similarity search and deterministic validation against source policy PDFs.',
      type: 'Engineering Specification'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-mono font-bold text-[#0B1F3A] uppercase">
            <BookOpen className="w-3.5 h-3.5 text-[#00A896]" />
            FACTUAL FOUNDATIONS
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight">
            Built on evidence. <br />
            <span className="text-[#00A896]">Grounded in research.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Every feature in InsureMate is designed around verified policyholder research and regulatory guidelines.
          </p>
        </div>

        {/* 4 Research Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchCards.map((card) => (
            <div
              key={card.category}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-xs transition-all duration-150 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                  {card.category}
                </span>
                <FileCheck className="w-4 h-4 text-[#64748B]" />
              </div>

              <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                {card.title}
              </h3>

              <p className="text-sm text-[#64748B] leading-relaxed">
                {card.summary}
              </p>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs font-mono text-[#0B1F3A]">
                <strong className="text-[#00A896]">Key Finding:</strong> {card.keyFact}
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Sources Drawer */}
        <div className="mt-10">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="w-full py-4 px-6 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors flex items-center justify-between text-sm font-semibold text-[#0B1F3A]"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#00A896]" />
              <span>{sourcesOpen ? 'Hide detailed research references' : 'View cited source details & regulatory frameworks'}</span>
            </span>
            {sourcesOpen ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
          </button>

          {sourcesOpen && (
            <div className="mt-4 p-6 bg-white rounded-2xl border border-[#E2E8F0] space-y-4 animate-in fade-in">
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-bold pb-2 border-b border-[#E2E8F0]">
                AUTHENTIC CITATIONS & STUDY REFERENCES
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detailedSources.map((src, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                    <span className="text-[10px] font-mono text-[#00A896] font-bold block">
                      {src.type}
                    </span>
                    <h4 className="text-xs font-bold text-[#0B1F3A]">{src.title}</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">{src.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
