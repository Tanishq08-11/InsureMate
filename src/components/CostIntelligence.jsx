import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingDown, Info, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CostIntelligence() {
  const [selectedScenario, setSelectedScenario] = useState('knee');

  const scenarios = {
    knee: {
      treatment: 'Bilateral / Unilateral Total Knee Replacement',
      provider: 'Tier-1 Network Hospital, Metro',
      roomType: 'Single Private Room',
      estimatedCost: '₹3,20,000',
      estimatedCostRange: '₹2.8L – ₹3.5L',
      coverage: '₹2,25,000',
      outOfPocket: '₹95,000',
      outOfPocketRange: '₹55K – ₹1.25L',
      breakdown: [
        { label: 'Base Sum Insured Limit', value: '₹5,00,000', note: 'Sufficient sum insured' },
        { label: 'Implant & Surgery Cap (Sub-limit)', value: '- ₹45,000', note: 'Standard policy package ceiling' },
        { label: '10% Mandatory Co-payment', value: '- ₹25,000', note: 'Tier-1 hospital co-pay clause (Sec 5.2)' },
        { label: 'Non-payable Consumables (Annexure 1)', value: '- ₹25,000', note: 'PPE, surgical packs, hygiene kits' },
      ],
      whyFormula: '10% co-payment + Policy sub-limit + Non-payable consumables'
    },
    cataract: {
      treatment: 'Cataract Surgery (Laser Phaco with Foldable Lens)',
      provider: 'Specialty Eye Hospital, Tier-2 City',
      roomType: 'Day Care Surgery Unit',
      estimatedCost: '₹65,000',
      estimatedCostRange: '₹50K – ₹75K',
      coverage: '₹40,000',
      outOfPocket: '₹25,000',
      outOfPocketRange: '₹15K – ₹35K',
      breakdown: [
        { label: 'Base Sum Insured Limit', value: '₹3,00,000', note: 'Sufficient sum insured' },
        { label: 'Cataract Specific Sub-limit', value: '- ₹20,000', note: 'Capped at ₹40,000 per eye (Sec 2.3)' },
        { label: 'Premium Multifocal Lens Extra Cost', value: '- ₹5,000', note: 'Patient requested upgraded IOL' },
      ],
      whyFormula: 'Specific per-eye sub-limit (₹40,000 cap) + Premium lens variance'
    },
    maternity: {
      treatment: 'Normal / Cesarean Delivery Hospitalization',
      provider: 'Multi-Specialty Private Maternity Hospital',
      roomType: 'Deluxe Room',
      estimatedCost: '₹1,10,000',
      estimatedCostRange: '₹90K – ₹1.3L',
      coverage: '₹50,000',
      outOfPocket: '₹60,000',
      outOfPocketRange: '₹40K – ₹80K',
      breakdown: [
        { label: 'Maternity Rider Cap', value: '₹50,000', note: 'Max maternity cover limit (Sec 6.1)' },
        { label: 'Neonatal & Deluxe Room Differential', value: '- ₹60,000', note: 'Exceeds standard maternity ceiling' },
      ],
      whyFormula: 'Maternity rider policy cap (₹50,000 limit) + Room category variance'
    }
  };

  const active = scenarios[selectedScenario];

  return (
    <section id="intelligence" className="py-20 lg:py-28 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-xs font-mono font-bold text-[#0284C7] uppercase">
            <Calculator className="w-3.5 h-3.5 text-[#0284C7]" />
            FINANCIAL INTELLIGENCE
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight">
            Coverage is only half the question. <br />
            <span className="text-[#00A896]">The other half is: What might I pay?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            When a treatment scenario and structured treatment-cost data are available, InsureMate can estimate treatment expense, potential coverage and approximate out-of-pocket cost.
          </p>
        </div>

        {/* Treatment Scenario Picker */}
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedScenario('knee')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
              selectedScenario === 'knee'
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                : 'bg-[#F8FAFC] text-[#172033] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            Scenario 1: Knee Replacement
          </button>
          <button
            onClick={() => setSelectedScenario('cataract')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
              selectedScenario === 'cataract'
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                : 'bg-[#F8FAFC] text-[#172033] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            Scenario 2: Cataract Surgery
          </button>
          <button
            onClick={() => setSelectedScenario('maternity')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
              selectedScenario === 'maternity'
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                : 'bg-[#F8FAFC] text-[#172033] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            Scenario 3: Maternity Care
          </button>
        </div>

        {/* Financial Breakdown Card */}
        <div className="mt-8 rounded-2xl bg-[#0B1F3A] text-white p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          
          {/* Subtle tech accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A896]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Context Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#5EEAD4]">
                  TREATMENT SCENARIO
                </span>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                  ILLUSTRATIVE DEMO
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mt-1 text-white">
                {active.treatment}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                {active.provider} · {active.roomType}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">ESTIMATED RANGE</span>
              <span className="text-sm font-mono font-bold text-[#38BDF8]">{active.estimatedCostRange}</span>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1: Estimated Treatment */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                ESTIMATED TREATMENT
              </span>
              <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {active.estimatedCost}
              </div>
              <span className="text-xs text-slate-400 block font-mono">
                Benchmark hospital average
              </span>
            </div>

            {/* 2: Potential Coverage */}
            <div className="p-5 rounded-xl bg-[#00A896]/15 border border-[#00A896]/30 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5EEAD4] block font-bold">
                POTENTIAL COVERAGE
              </span>
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#5EEAD4] tracking-tight">
                {active.coverage}
              </div>
              <span className="text-xs text-slate-300 block font-mono">
                Admissible insurer settlement
              </span>
            </div>

            {/* 3: Potential Out-of-Pocket */}
            <div className="p-5 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F59E0B] block font-bold">
                POTENTIAL OUT-OF-POCKET
              </span>
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#F59E0B] tracking-tight">
                {active.outOfPocket}
              </div>
              <span className="text-xs text-slate-300 block font-mono">
                Estimated patient responsibility
              </span>
            </div>

          </div>

          {/* Detailed Deductions & WHY Breakdown */}
          <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5EEAD4]">
                  WHY?
                </span>
                <span className="text-xs text-slate-300">
                  {active.whyFormula}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {active.breakdown.map((b, i) => (
                <div key={i} className="bg-white/5 p-3.5 rounded-lg border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">{b.label}</span>
                    <span className={`text-xs font-mono font-bold ${b.value.startsWith('-') ? 'text-[#F59E0B]' : 'text-[#5EEAD4]'}`}>
                      {b.value}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block">
                    {b.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
            <p>
              <strong>Important:</strong> Estimates are indicative and depend on the policy, treatment, provider, location and information supplied. Real hospital billing may include additional diagnostic variances.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
