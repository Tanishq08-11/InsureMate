import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, FileCheck } from 'lucide-react';

const RESEARCH_IMAGE =
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80';

export default function Research() {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  const researchCards = [
    {
      category: 'CONSUMER RESEARCH',
      title: 'CoverSure Survey, 2025',
      summary:
        'Insurance-policy awareness findings showing significant consumer gaps in understanding basic exclusion clauses and waiting requirements.',
      keyFact:
        '80% of policyholders expressed ambiguity regarding specific in-hospital claim admissibility.',
    },
    {
      category: 'CLAIM EXPERIENCE',
      title: 'LocalCircles Health Insurance Survey',
      summary:
        'Reported experiences around health-insurance claim rejection and partial approval across urban and semi-urban policyholders.',
      keyFact:
        '50%+ surveyed experienced partial claim settlements primarily driven by room-rent caps and consumables.',
    },
    {
      category: 'REGULATORY CONTEXT',
      title: 'IRDAI Guidelines on Policyholder Protection',
      summary:
        'Regulatory frameworks governing standard health exclusions, 100% cashless hospital network mandates, and CIS (Customer Information Sheet) norms.',
      keyFact:
        'IRDAI mandates standardized definitions for pre-existing diseases and 30-day waiting period disclosures.',
    },
    {
      category: 'TECHNICAL FOUNDATION',
      title: 'Document AI + Retrieval-Augmented Generation',
      summary:
        'Deterministic text extraction preserving document structure, followed by semantic chunking and strict page-grounded retrieval before response synthesis.',
      keyFact:
        'Strict zero-temperature prompt constraints prevent generative fabrication of non-existent policy benefits.',
    },
  ];

  const detailedSources = [
    {
      title: 'CoverSure Health Insurance Literacy Report (2025)',
      desc: 'Consumer study on health insurance policy wording comprehension, deductibles awareness, and cashless desk interactions in Indian metros.',
      type: 'Industry Survey',
    },
    {
      title:
        'LocalCircles Citizen Survey on Health Insurance Claims Processing',
      desc: 'Community feedback data analyzing grievance patterns, TPA query delays, and out-of-pocket non-payable deductions.',
      type: 'Public Survey',
    },
    {
      title:
        'Insurance Regulatory and Development Authority of India (IRDAI) Master Circular',
      desc: 'Master circular on health insurance business: Customer Information Sheet (CIS), standardized waiting period norms, and moratorium clauses.',
      type: 'Regulatory Framework',
    },
    {
      title: 'RAG Architecture for Complex Legal & Policy Contracts',
      desc: 'Page-level citation metadata indexing via vector similarity search and deterministic validation against source policy PDFs.',
      type: 'Engineering Specification',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2EC] border-b border-[#E7E2D8]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; font-optical-sizing: auto; }
        .font-ui { font-family: 'Inter Tight', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-x { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-ui">

        {/* ── Header: asymmetric — headline left, image right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono-x font-medium tracking-[0.18em] text-[#0B1F3A]/70 uppercase">
              <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
              Factual Foundations
            </div>

            <h2 className="font-display text-[2.2rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] font-semibold tracking-[-0.02em] text-[#0B1F3A]">
              Built on evidence.
              <br />
              <span className="italic font-normal text-[#B8860B]">
                Grounded in research.
              </span>
            </h2>

            <p className="text-lg text-[#4A5568] leading-relaxed max-w-2xl">
              Every feature in InsureMate is designed around verified
              policyholder research and regulatory guidelines.
            </p>
          </div>

          {/* Real editorial image, right side, no rounded card */}
          <figure className="lg:col-span-5 relative">
            <div className="overflow-hidden rounded-sm border border-[#E7E2D8]">
              <img
                src={RESEARCH_IMAGE}
                alt="Insurance policy documents and research notes on a desk"
                loading="lazy"
                className="w-full h-[220px] sm:h-[260px] object-cover grayscale-[15%] contrast-[1.03]"
              />
            </div>
            <figcaption className="mt-2 flex items-center justify-between font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#0B1F3A]/55">
              <span>Cited Sources · Verified</span>
              <span>Fig. R1</span>
            </figcaption>
          </figure>
        </div>

        {/* ── 4 Research cards — asymmetric: first one larger ── */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-5">
          {researchCards.map((card, i) => {
            const isFeature = i === 0;
            return (
              <div
                key={card.category}
                className={[
                  'p-6 sm:p-8 bg-white border border-[#E7E2D8] flex flex-col gap-4',
                  isFeature
                    ? 'md:col-span-12 lg:col-span-7 border-l-2 border-l-[#B8860B]'
                    : 'md:col-span-6 lg:col-span-5',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-x text-[10px] font-semibold tracking-[0.18em] uppercase text-[#8a6508]">
                    {card.category}
                  </span>
                  <FileCheck className="w-4 h-4 text-[#0B1F3A]/40" />
                </div>

                <h3
                  className={[
                    'font-display font-semibold text-[#0B1F3A] tracking-[-0.01em]',
                    isFeature ? 'text-2xl sm:text-3xl' : 'text-xl',
                  ].join(' ')}
                >
                  {card.title}
                </h3>

                <p className="text-sm text-[#4A5568] leading-relaxed">
                  {card.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-[#E7E2D8] font-mono-x text-[12px] text-[#0B1F3A] leading-relaxed">
                  <span className="text-[#B8860B] font-semibold">
                    Key Finding:
                  </span>{' '}
                  {card.keyFact}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Expandable Sources Drawer ── */}
        <div className="mt-10">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="w-full py-4 px-6 bg-white border border-[#E7E2D8] hover:bg-[#0B1F3A]/[0.03] transition-colors flex items-center justify-between text-sm font-semibold text-[#0B1F3A]"
          >
            <span className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#B8860B]" />
              <span>
                {sourcesOpen
                  ? 'Hide detailed research references'
                  : 'View cited source details & regulatory frameworks'}
              </span>
            </span>
            {sourcesOpen ? (
              <ChevronUp className="w-5 h-5 text-[#0B1F3A]/50" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#0B1F3A]/50" />
            )}
          </button>

          {sourcesOpen && (
            <div className="mt-4 p-6 sm:p-8 bg-white border border-[#E7E2D8]">
              <div className="font-mono-x text-[10px] uppercase tracking-[0.22em] text-[#0B1F3A]/55 font-semibold pb-3 border-b border-[#E7E2D8]">
                Authentic Citations &amp; Study References
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {detailedSources.map((src, i) => (
                  <div
                    key={i}
                    className="pl-4 border-l border-[#E7E2D8] space-y-1.5"
                  >
                    <span className="font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#B8860B] font-semibold block">
                      {src.type}
                    </span>
                    <h4 className="font-display text-[15px] font-semibold text-[#0B1F3A] leading-snug">
                      {src.title}
                    </h4>
                    <p className="text-[12px] text-[#4A5568] leading-relaxed">
                      {src.desc}
                    </p>
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