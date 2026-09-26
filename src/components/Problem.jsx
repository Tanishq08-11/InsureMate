import React, { useState } from 'react';
import { AlertTriangle, FileSpreadsheet, Layers, ShieldAlert, ArrowDown, ChevronRight, Info } from 'lucide-react';

export default function Problem() {
  const [activeTerm, setActiveTerm] = useState('WAITING PERIODS');

  const policyTerms = [
    {
      term: 'EXCLUSIONS',
      desc: 'Specific medical procedures, non-payable consumables, or conditions explicitly not covered under standard terms.',
      tag: 'Section 4.1 Exclusions'
    },
    {
      term: 'WAITING PERIODS',
      desc: 'Mandatory 24 to 48-month continuous coverage requirements for pre-existing diseases or specific joint surgeries.',
      tag: 'Section 3.2 Waiting Clauses'
    },
    {
      term: 'DEDUCTIBLES',
      desc: 'The predefined fixed amount the policyholder must pay upfront before policy reimbursement begins.',
      tag: 'Section 2.4 Deductibles'
    },
    {
      term: 'CO-PAYMENTS',
      desc: 'A cost-sharing percentage (often 10%–20% in senior or tier-2 plans) borne by the patient on every admissible claim.',
      tag: 'Section 5.1 Cost Share'
    },
    {
      term: 'SUB-LIMITS',
      desc: 'Capped compensation ceilings on room rents (e.g. 1% of Sum Insured) or specific treatments like cataract or stenting.',
      tag: 'Section 2.1 Room Limits'
    }
  ];

  return (
    <section id="problem" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-xs font-mono font-bold text-[#B45309] uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
            THE PROBLEM
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight leading-[1.15]">
            “You have insurance. <br />
            <span className="text-[#64748B] font-normal">But do you know what it actually pays?”</span>
          </h2>

          <p className="text-base sm:text-lg text-[#172033]/80 leading-relaxed pt-2">
            The information exists. It is just buried inside pages of exclusions, waiting periods, deductibles, co-payments, sub-limits and conditions.
          </p>
        </div>

        {/* Highlighted Terms Interactive Showcase */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {policyTerms.map((item) => {
            const isSelected = activeTerm === item.term;
            return (
              <button
                key={item.term}
                onClick={() => setActiveTerm(item.term)}
                className={`p-4 rounded-xl text-left transition-all duration-150 border ${
                  isSelected
                    ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-md -translate-y-0.5'
                    : 'bg-white text-[#0B1F3A] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F1F5F9]'
                }`}
              >
                <span className={`text-[10px] font-mono block ${isSelected ? 'text-[#5EEAD4]' : 'text-[#64748B]'}`}>
                  CLAUSE TYPE
                </span>
                <span className="font-display font-bold text-sm tracking-wide block mt-1">
                  {item.term}
                </span>
                <span className={`text-xs mt-2 block leading-snug ${isSelected ? 'text-white/80' : 'text-[#64748B]'}`}>
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Researched Statistics Grid */}
        <div className="mt-16 pt-12 border-t border-[#E2E8F0]">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold">
              SURVEY EVIDENCE & CONSUMER FINDINGS
            </span>
            <span className="text-[11px] font-mono text-[#64748B] bg-white px-2.5 py-1 rounded border border-[#E2E8F0]">
              Independent Survey Data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stat 1 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#0B1F3A] tracking-tight">
                80<span className="text-[#00A896]">%</span>
              </div>
              <p className="text-sm text-[#172033] leading-relaxed">
                “of respondents in a 2025 CoverSure survey were unsure about what their insurance policy covered.”
              </p>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] font-mono text-[#64748B]">
                Source: CoverSure Health Survey (2025)
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#0B1F3A] tracking-tight">
                65<span className="text-[#00A896]">%</span>
              </div>
              <p className="text-sm text-[#172033] leading-relaxed">
                “reported little to no knowledge of policy details such as benefits, exclusions or claim procedures.”
              </p>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] font-mono text-[#64748B]">
                Source: Policyholder Awareness Study
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#B45309] tracking-tight">
                50%+
              </div>
              <p className="text-sm text-[#172033] leading-relaxed">
                “of surveyed health-policy holders who filed claims reported rejection or partial approval in a LocalCircles survey.”
              </p>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] font-mono text-[#64748B]">
                Source: LocalCircles Health Claim Survey
              </div>
            </div>

          </div>

          {/* Sources and survey attribution note */}
          <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B] font-mono bg-[#0B1F3A]/5 p-3 rounded-lg border border-[#0B1F3A]/10">
            <Info className="w-4 h-4 text-[#00A896] shrink-0" />
            <span>
              <strong>Note on survey findings:</strong> These percentages reflect surveyed sample respondents and illustrate information transparency gaps. They are not presented as universal population statistics.
            </span>
          </div>
        </div>

        {/* Section 3: The InsureMate Idea (Clean visual pipeline) */}
        <div className="mt-20 pt-16 border-t border-[#E2E8F0]">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              “Insurance shouldn’t need a decoder.”
            </h3>
            <p className="text-base text-[#64748B] leading-relaxed">
              Instead of asking patients to interpret dozens of pages, InsureMate lets them ask one simple question in a familiar conversation.
            </p>
          </div>

          {/* Elegant pipeline visualization */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative items-center">
              
              {/* Step 1 */}
              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-[#64748B] block">INPUT</span>
                <span className="font-display font-bold text-sm text-[#0B1F3A] mt-1 block">POLICY</span>
                <span className="text-[11px] text-[#64748B] mt-0.5 block">PDF or Image</span>
              </div>

              <div className="hidden sm:flex justify-center text-[#00A896]">
                <ChevronRight className="w-5 h-5" />
              </div>

              {/* Step 2 */}
              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-[#00A896] block">AI RETRIEVAL</span>
                <span className="font-display font-bold text-sm text-[#0B1F3A] mt-1 block">UNDERSTAND</span>
                <span className="text-[11px] text-[#64748B] mt-0.5 block">Clauses & Evidence</span>
              </div>

              <div className="hidden sm:flex justify-center text-[#00A896]">
                <ChevronRight className="w-5 h-5" />
              </div>

              {/* Step 3 */}
              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-[#38BDF8] block">CLINICAL CONTEXT</span>
                <span className="font-display font-bold text-sm text-[#0B1F3A] mt-1 block">TREATMENT</span>
                <span className="text-[11px] text-[#64748B] mt-0.5 block">Procedure & Limits</span>
              </div>

            </div>

            {/* Bottom Row Outcome Flow */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-[#00A896]/10 border border-[#00A896]/20 text-center">
                <span className="text-[10px] font-mono font-bold text-[#00A896] block uppercase">OUTPUT 1</span>
                <span className="font-display font-bold text-sm text-[#0B1F3A] mt-1 block">COVERAGE STATUS</span>
                <span className="text-xs text-[#172033] mt-0.5 block">With Page & Section Evidence</span>
              </div>

              <div className="p-4 rounded-xl bg-[#5EEAD4]/20 border border-[#00A896]/30 text-center">
                <span className="text-[10px] font-mono font-bold text-[#00A896] block uppercase">OUTPUT 2</span>
                <span className="font-display font-bold text-sm text-[#0B1F3A] mt-1 block">POTENTIAL OUT-OF-POCKET</span>
                <span className="text-xs text-[#172033] mt-0.5 block">Estimated Patient Financial Share</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
