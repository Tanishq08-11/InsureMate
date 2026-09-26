import React from 'react';
import { Check, Minus, CheckCircle2, Layers, Sparkles } from 'lucide-react';

export default function Comparison() {
  const comparisonData = [
    {
      capability: 'Policy document analysis',
      existing: 'Limited',
      claim: 'Available',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Coverage explanation',
      existing: 'Varies',
      claim: 'Limited',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Exclusion identification',
      existing: 'Limited',
      claim: 'Varies',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Waiting-period identification',
      existing: 'Not central',
      claim: 'Limited',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Page / section evidence',
      existing: 'Not central',
      claim: 'Not central',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Treatment scenario understanding',
      existing: 'Not central',
      claim: 'Limited',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Treatment-cost context',
      existing: 'Not central',
      claim: 'Varies',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Potential out-of-pocket estimation',
      existing: 'Not central',
      claim: 'Not central',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Conversational interaction',
      existing: 'Limited',
      claim: 'Limited',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'WhatsApp-first access',
      existing: 'Not central',
      claim: 'Not central',
      insuremate: 'Core capability',
      highlight: true
    },
    {
      capability: 'Missing-information detection',
      existing: 'Not central',
      claim: 'Not central',
      insuremate: 'Core capability',
      highlight: true
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-mono font-bold text-[#0B1F3A] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#00A896]" />
            CAPABILITY MATRIX
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight">
            Not another insurance portal. <br />
            <span className="text-[#00A896]">An intelligence layer.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            An intelligence layer between the policy and the patient. We do not replace insurers or brokers; we translate complex contract clauses into actionable healthcare decisions.
          </p>
        </div>

        {/* Responsive Table */}
        <div className="mt-14 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold w-2/5">
                    Capability
                  </th>
                  <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold w-1/5">
                    Existing Policy Tools
                  </th>
                  <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold w-1/5">
                    Insurance / Claim Platforms
                  </th>
                  <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#00A896] font-bold bg-[#00A896]/10 w-1/5 border-l border-[#00A896]/20">
                    InsureMate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={row.capability}
                    className={`hover:bg-slate-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFF]'
                    }`}
                  >
                    <td className="py-3.5 px-6 font-medium text-[#172033]">
                      {row.capability}
                    </td>
                    <td className="py-3.5 px-6 text-xs font-mono text-[#64748B]">
                      {row.existing}
                    </td>
                    <td className="py-3.5 px-6 text-xs font-mono text-[#64748B]">
                      {row.claim}
                    </td>
                    <td className="py-3.5 px-6 text-xs font-mono font-bold text-[#00A896] bg-[#00A896]/5 border-l border-[#00A896]/20 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00A896] shrink-0" />
                      <span>{row.insuremate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs font-mono text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Comparison focused on patient-side transparency and retrieval grounding.</span>
            <span className="text-[#00A896] font-bold">✓ 100% Policy-grounded answers</span>
          </div>
        </div>

      </div>
    </section>
  );
}
