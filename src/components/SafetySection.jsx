import React from 'react';
import { AlertCircle, HelpCircle, ArrowRight, ArrowDown, ShieldCheck, CheckCircle2, UserCheck, Eye } from 'lucide-react';

export default function SafetySection() {
  const missingParameters = [
    { name: 'Hospital Network Tier', why: 'Affects co-pay (e.g. 0% vs 20% in non-preferred)' },
    { name: 'Treatment Location / Metro Zone', why: 'Zone-based deductibles apply for Tier-2 policies used in Zone 1' },
    { name: 'Applicable Room Category', why: 'Room-rent capping triggers proportionate claim reductions' },
  ];

  return (
    <section id="safety" className="py-20 lg:py-28 bg-[#FFFBEB] border-b border-[#FDE68A]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-xs font-mono font-bold text-[#92400E] uppercase">
            <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
            RESPONSIBLE AI & SAFETY
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight">
            Not enough information? <br />
            <span className="text-[#D97706]">We say so.</span>
          </h2>

          <p className="font-display text-xl sm:text-2xl font-semibold text-[#78350F]">
            “Confidence over assumptions.”
          </p>

          <p className="text-base sm:text-lg text-[#92400E]/90 leading-relaxed">
            Insurance calculations can depend on details that are not always available. InsureMate will not invent a number simply because a user expects one.
          </p>
        </div>

        {/* Responsible Intelligence Flow */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3-step Safety Flow */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Step 1: Missing Info Detected */}
            <div className="p-5 rounded-2xl bg-white border border-[#FDE68A] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D97706] font-bold">
                  STEP 01 · DETECT GAP
                </span>
                <span className="text-[11px] font-mono text-[#92400E] bg-[#FFFBEB] px-2 py-0.5 rounded">
                  Zero Hallucination
                </span>
              </div>
              <h4 className="font-display font-bold text-base text-[#0B1F3A]">
                Identify Missing Critical Parameters
              </h4>
              <ul className="space-y-1.5 text-xs text-[#78350F]">
                {missingParameters.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                    <span><strong>{p.name}:</strong> {p.why}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Down Connector */}
            <div className="flex justify-center text-[#D97706]">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 2: Ask the User */}
            <div className="p-5 rounded-2xl bg-white border border-[#FDE68A] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00A896] font-bold">
                  STEP 02 · CLARIFY
                </span>
                <UserCheck className="w-4 h-4 text-[#00A896]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#0B1F3A]">
                Prompt User For Exact Clarification
              </h4>
              <p className="text-xs text-[#78350F] leading-relaxed">
                InsureMate politely requests the missing details directly in WhatsApp before committing to an estimate.
              </p>
            </div>

            {/* Down Connector */}
            <div className="flex justify-center text-[#00A896]">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 3: Then Estimate */}
            <div className="p-5 rounded-2xl bg-[#0B1F3A] text-white shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#5EEAD4] font-bold">
                  STEP 03 · GROUNDED CALCULATION
                </span>
                <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              </div>
              <h4 className="font-display font-bold text-base text-white">
                Deliver High-Confidence Estimate
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculations are completed with verified clause limits, co-pay rules, and benchmark cost ranges.
              </p>
            </div>

          </div>

          {/* Right: Realistic WhatsApp Dialogue Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-[#F59E0B]/40 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-bold">
                  LIVE SAFETY DEMONSTRATION
                </span>
              </div>
              <span className="text-xs font-mono text-[#64748B]">WhatsApp Context</span>
            </div>

            {/* Chat Bubble: Realistic Missing Info */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3.5 py-2.5 max-w-[85%] text-xs shadow-2xs">
                  How much will I pay for angioplasty?
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-[#FFFBEB] text-[#172033] rounded-lg rounded-tl-none p-4 max-w-[95%] border border-[#FDE68A] space-y-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#B45309]">
                    <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                    <span>UNCONFIRMED PARAMETERS</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed font-medium">
                    “I can’t reliably estimate your out-of-pocket cost yet. I still need your <span className="underline decoration-[#F59E0B] font-bold">hospital type</span> and <span className="underline decoration-[#F59E0B] font-bold">treatment location</span>.”
                  </p>

                  <div className="p-3 bg-white rounded-lg border border-[#FDE68A] text-xs text-[#92400E] space-y-1 font-mono">
                    <p>• Your policy (Sec 4.3) applies 20% co-pay for non-metro hospitals.</p>
                    <p>• Stent caps vary by hospital accreditation category.</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#92400E]">
                    <span>STATUS: PENDING USER INPUT</span>
                    <span>NO GUESSWORK APPLIED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>We believe patient trust requires explicit recognition of uncertainty.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
