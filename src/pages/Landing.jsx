import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertCircle,
  CheckCircle2,
  Lock,
  ChevronRight,
  HelpCircle,
  Layers,
  Sparkles,
  Info,
  User,
  Users,
  Building2,
  HeartHandshake
} from 'lucide-react';

export default function Landing({ whatsappUrl }) {
  const [activeClause, setActiveClause] = useState('WAITING PERIODS');

  const policyClauses = [
    { name: 'EXCLUSIONS', desc: 'Specific non-covered treatments, cosmetic procedures, or unlisted consumables.' },
    { name: 'WAITING PERIODS', desc: 'Mandatory 24–48 month waiting periods for pre-existing diseases or specific eye/joint conditions.' },
    { name: 'DEDUCTIBLES', desc: 'Threshold amount paid out-of-pocket before insurance claim settlement triggers.' },
    { name: 'CO-PAYMENTS', desc: 'Mandatory 10%–20% cost-sharing percentage borne by the policyholder on every claim.' },
    { name: 'SUB-LIMITS', desc: 'Capped compensation amounts on specific treatments (e.g. ₹40,000 max for cataract).' },
    { name: 'ROOM-RENT LIMITS', desc: 'Caps on daily room rent (e.g. 1% of Sum Insured) that trigger proportionate billing deductions.' },
  ];

  const comparisonData = [
    {
      capability: 'Policy information access',
      traditional: 'Available (45-page PDF)',
      portals: 'Available (Portal login)',
      genericAi: 'Limited (Generic knowledge)',
      insuremate: 'Core (WhatsApp instant)',
    },
    {
      capability: 'Coverage explanation',
      traditional: 'Limited (Legal wording)',
      portals: 'Limited (Summary bullets)',
      genericAi: 'Varies (Unverified summaries)',
      insuremate: 'Core (Plain English translation)',
    },
    {
      capability: 'Exclusion identification',
      traditional: 'Available (Buried clauses)',
      portals: 'Varies',
      genericAi: 'Varies',
      insuremate: 'Core (Explicit highlight)',
    },
    {
      capability: 'Waiting-period understanding',
      traditional: 'Available (Complex annexures)',
      portals: 'Limited',
      genericAi: 'Not central',
      insuremate: 'Core (Timeframe calculation)',
    },
    {
      capability: 'Exact page/section evidence',
      traditional: 'Not central',
      portals: 'Not central',
      genericAi: 'Not central (Hallucination risk)',
      insuremate: 'Core (Page 18 · Section 3.4)',
    },
    {
      capability: 'Treatment-specific interpretation',
      traditional: 'Not central',
      portals: 'Limited',
      genericAi: 'Varies',
      insuremate: 'Core (Clinical mapping)',
    },
    {
      capability: 'Treatment-cost context',
      traditional: 'Not central',
      portals: 'Varies (Hospital specific)',
      genericAi: 'Not central',
      insuremate: 'Core (Benchmark datasets)',
    },
    {
      capability: 'Potential out-of-pocket estimation',
      traditional: 'Not central',
      portals: 'Not central',
      genericAi: 'Not central',
      insuremate: 'Core (Co-pay + sub-limits)',
    },
    {
      capability: 'Conversational interaction',
      traditional: 'Not central',
      portals: 'Limited',
      genericAi: 'Core',
      insuremate: 'Core (Grounded in your policy)',
    },
    {
      capability: 'WhatsApp-first access',
      traditional: 'Not central',
      portals: 'Not central',
      genericAi: 'Not central',
      insuremate: 'Core (No app download)',
    },
    {
      capability: 'Missing-information detection',
      traditional: 'Not central',
      portals: 'Not central',
      genericAi: 'Not central',
      insuremate: 'Core (Clarifies before guessing)',
    },
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-[#E2E8F0] overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0B1F3A_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left: Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-mono font-bold text-[#0B1F3A] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#00A896]"></span>
                INSURANCE COVERAGE & COST INTELLIGENCE
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.08] font-extrabold text-[#0B1F3A] tracking-tight">
                  Insurance is complicated. <br />
                  <span className="text-[#00A896]">Understanding it shouldn't be.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
                  InsureMate turns complex insurance policies into clear, evidence-backed answers and treatment-cost intelligence.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#00A896] text-white font-bold text-sm hover:bg-[#008f80] transition-colors shadow-sm active:scale-[0.99] tracking-wide"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-[#00A896]" />
                  <span>CHAT ON WHATSAPP</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/experience"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0B1F3A] font-semibold text-sm hover:bg-[#F1F5F9] hover:border-[#CBD5E1] transition-colors"
                >
                  <span>SEE HOW IT WORKS</span>
                  <ArrowRight className="w-4 h-4 text-[#64748B]" />
                </Link>
              </div>

              {/* Trust Evidence Chips */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#64748B] font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" /> Page 18 · Clause Evidence
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" /> WhatsApp Native
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#00A896]" /> Zero Guesswork
                </span>
              </div>
            </div>

            {/* Right: Phone WhatsApp Mockup (Cataract Surgery Example) & QR Card */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-5">
              
              {/* WhatsApp Phone Mockup */}
              <div className="w-full max-w-[310px] rounded-[30px] bg-[#0B1F3A] p-2.5 shadow-2xl border-4 border-[#0B1F3A]">
                <div className="bg-[#EFEAE2] rounded-[22px] overflow-hidden flex flex-col h-[490px] border border-black/10">
                  
                  {/* WhatsApp Chat Header */}
                  <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-2 shrink-0">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-[#5EEAD4]">
                      IM
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold leading-tight flex items-center gap-1">
                        InsureMate <span className="text-[9px] text-[#25D366]">●</span>
                      </p>
                      <p className="text-[9px] text-white/80 leading-none">Policy & Cost Intelligence</p>
                    </div>
                    <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.5 rounded text-white">
                      OFFICIAL
                    </span>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-3 space-y-2.5 overflow-y-auto text-xs bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:12px_12px]">
                    
                    <div className="text-center">
                      <span className="bg-white/80 backdrop-blur-xs text-[#64748B] text-[9px] font-mono px-2 py-0.5 rounded shadow-2xs">
                        Policy: Star Comprehensive Health Schedule
                      </span>
                    </div>

                    {/* User Message 1 */}
                    <div className="flex justify-end">
                      <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-2xs border border-[#D0F0C0]">
                        <p className="text-[11px] font-medium leading-snug">Does my policy cover cataract surgery?</p>
                        <p className="text-[8px] text-[#64748B] text-right font-mono mt-0.5">11:15 AM · ✓✓</p>
                      </div>
                    </div>

                    {/* InsureMate Message 1 */}
                    <div className="flex justify-start">
                      <div className="bg-white text-[#172033] rounded-lg rounded-tl-none px-3 py-2.5 max-w-[92%] shadow-2xs space-y-2 border border-black/5">
                        <p className="text-[11px] leading-relaxed">
                          <strong className="text-[#00A896] font-semibold">Potentially covered</strong>, subject to the applicable waiting period and policy limits.
                        </p>
                        
                        {/* Evidence Citation */}
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[9px] font-mono text-[#0B1F3A]">
                          <FileText className="w-3 h-3 text-[#00A896]" />
                          <span>Page 18 · Section 3.4</span>
                        </div>

                        <div className="pt-1 flex items-center justify-between border-t border-slate-100 text-[8px] font-mono text-[#64748B]">
                          <span className="text-[#00A896] font-bold">EVIDENCE-BACKED</span>
                          <span>11:15 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* User Message 2 */}
                    <div className="flex justify-end">
                      <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-2xs border border-[#D0F0C0]">
                        <p className="text-[11px] font-medium leading-snug">What might I have to pay?</p>
                        <p className="text-[8px] text-[#64748B] text-right font-mono mt-0.5">11:16 AM · ✓✓</p>
                      </div>
                    </div>

                    {/* InsureMate Message 2 (Responsible Missing Info State) */}
                    <div className="flex justify-start">
                      <div className="bg-white text-[#172033] rounded-lg rounded-tl-none px-3 py-2 max-w-[92%] shadow-2xs space-y-1.5 border-l-2 border-l-[#F59E0B]">
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#B45309]">
                          <AlertCircle className="w-3 h-3 text-[#F59E0B]" />
                          <span>NEED LOCATION & HOSPITAL</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-[#172033]">
                          I need your treatment location and hospital type before estimating reliably.
                        </p>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-0.5 text-[8px] font-mono text-[#64748B]">
                          <span>NO GUESSWORK</span>
                          <span>11:16 AM</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Input Simulation */}
                  <div className="bg-[#F0F2F5] px-2.5 py-2 border-t border-slate-200 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-3 py-1 text-[10px] text-[#64748B] border border-slate-200 truncate">
                      Type a policy question...
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#00A896] flex items-center justify-center text-white shrink-0">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Dynamic QR Card */}
              <div className="w-full sm:w-[220px] bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs flex flex-col items-center text-center space-y-3">
                <div className="w-full pb-1.5 border-b border-[#E2E8F0]">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#00A896] font-bold">
                    START ON WHATSAPP
                  </span>
                  <h3 className="font-display text-sm font-bold text-[#0B1F3A]">
                    Scan Once to Begin
                  </h3>
                </div>

                <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <QRCodeSVG
                    value={whatsappUrl}
                    size={128}
                    bgColor={"#F8FAFC"}
                    fgColor={"#0B1F3A"}
                    level={"M"}
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#172033] font-medium leading-snug">
                    No app download. <br />No complicated setup.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#00A896] text-white text-[11px] font-bold tracking-wide transition-colors uppercase font-mono"
                >
                  SCAN TO CHAT
                </a>

                <p className="text-[9px] text-[#64748B] leading-tight pt-1 border-t border-[#F1F5F9]">
                  After your first conversation, you can return directly to WhatsApp. You do not need to revisit this website for every question.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE STATEMENT (EMOTIONAL ANCHOR) */}
      <section className="py-16 lg:py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/15 text-xs font-mono font-bold text-[#5EEAD4] uppercase tracking-wider">
            THE CORE REALITY
          </div>

          <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            “The policy doesn’t fail. <br />
            <span className="text-[#5EEAD4]">The information platform does.”</span>
          </blockquote>

          <div className="max-w-2xl mx-auto space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
            <p>
              Insurance information is often available — but buried inside pages of conditions, exclusions, waiting periods and limits.
            </p>
            <p className="text-[#5EEAD4] font-medium">
              The problem is not the existence of information. The problem is making it understandable when people actually need it.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM + RESEARCH (THE INFORMATION GAP) */}
      <section id="problem" className="py-16 lg:py-22 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00A896]/10 border border-[#00A896]/20 text-xs font-mono font-bold text-[#00A896] uppercase">
              THE INFORMATION GAP
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
              A transparency deficit in health insurance.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Documented survey evidence shows widespread ambiguity among insured policyholders at the time of claim filing.
            </p>
          </div>

          {/* 3 Large Stat Typography Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="font-display text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
                80<span className="text-[#00A896]">%</span>
              </div>
              <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
                of respondents in the cited consumer survey were unsure about what their insurance policy covered.
              </p>
              <div className="pt-2 border-t border-[#F1F5F9] text-[10px] font-mono text-[#64748B]">
                Source: CoverSure Health Survey (2025)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="font-display text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
                65<span className="text-[#00A896]">%</span>
              </div>
              <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
                reported little to no knowledge of policy details such as benefits, exclusions or claim procedures.
              </p>
              <div className="pt-2 border-t border-[#F1F5F9] text-[10px] font-mono text-[#64748B]">
                Source: Policyholder Awareness Study
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="font-display text-5xl font-extrabold text-[#B45309] tracking-tight">
                50%+
              </div>
              <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
                of surveyed health-policy holders who filed claims reported rejection or partial approval in the cited survey.
              </p>
              <div className="pt-2 border-t border-[#F1F5F9] text-[10px] font-mono text-[#64748B]">
                Source: LocalCircles Claim Survey
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E2E8F0] text-xs font-mono text-[#64748B]">
            <Info className="w-4 h-4 text-[#00A896] shrink-0" />
            <span>Survey metrics reflect sampled policyholder respondents highlighting structural information gaps.</span>
          </div>

        </div>
      </section>

      {/* 4. WHAT MAKES INSURANCE HARD TO UNDERSTAND (EDITORIAL COMPOSITION) */}
      <section className="py-16 lg:py-22 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold">
              DOCUMENT COMPLEXITY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
              What makes insurance hard to understand.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              A standard health policy contains dozens of interlocking clauses that determine the final settlement.
            </p>
          </div>

          {/* Visual Composition: Clauses surrounding and revealing InsureMate */}
          <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 6 Obscuring Clause Badges */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {policyClauses.map((c) => (
                <div
                  key={c.name}
                  className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#00A896] transition-colors shadow-2xs space-y-1"
                >
                  <span className="font-display font-bold text-xs text-[#0B1F3A] block">
                    {c.name}
                  </span>
                  <p className="text-[11px] text-[#64748B] leading-tight">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* InsureMate Reveal Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B1F3A] text-white space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5EEAD4] font-bold">
                INSUREMATE INTELLIGENCE
              </span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                “Find the clause that actually matters.”
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than forcing patients to navigate dense 45-page PDFs, InsureMate isolates the exact clause, waiting requirement, and applicable sub-limit for your specific medical question.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#5EEAD4]">
                <span>Grounded Retrieval</span>
                <span>Page-level Citations</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. WHATSAPP-FIRST EXPERIENCE */}
      <section className="py-16 lg:py-22 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#25D366]/10 border border-[#25D366]/20 text-xs font-mono font-bold text-[#15803D] uppercase">
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              ACCESSIBILITY
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
              Your insurance assistant. <br />
              <span className="text-[#00A896]">Already in your pocket.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Start once through our website. After that, you don't need to return here every time.
            </p>
          </div>

          {/* Simple Clean Flow Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { num: '01', title: 'WEBSITE', desc: 'Scan QR Code' },
              { num: '02', title: 'WHATSAPP', desc: 'Opens Chat' },
              { num: '03', title: 'SEND POLICY', desc: 'PDF or Photo' },
              { num: '04', title: 'ASK ANYTIME', desc: 'Natural English' },
              { num: '05', title: 'EVIDENCE', desc: 'Page-cited Answer' },
            ].map((step, idx) => (
              <div key={step.title} className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-mono text-[#00A896] font-bold block">{step.num}</span>
                <span className="font-display font-bold text-xs text-[#0B1F3A] block">{step.title}</span>
                <span className="text-[11px] text-[#64748B] block">{step.desc}</span>
              </div>
            ))}
          </div>

          {/* 3 WhatsApp Ongoing Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
              <span className="font-display font-bold text-sm text-[#0B1F3A] block">
                • Continue previous conversation
              </span>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Resume right where you left off. Your policy context is retained according to your privacy settings.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
              <span className="font-display font-bold text-sm text-[#0B1F3A] block">
                • Ask new questions
              </span>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Check room rents, diagnostics, pre-hospitalization allowances, or specific surgery eligibility anytime.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
              <span className="font-display font-bold text-sm text-[#0B1F3A] block">
                • Revisit previous answers
              </span>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Refer back to verified clause numbers during discussions with hospital insurance TPA desks.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. COMPARISON WITH EXISTING SOLUTION CATEGORIES */}
      <section id="comparison" className="py-16 lg:py-22 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00A896] font-bold">
              INDUSTRY POSITIONING
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
              Where InsureMate fits
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Existing solutions solve parts of the insurance journey. InsureMate connects the information.
            </p>
          </div>

          {/* Clean Responsive Matrix */}
          <div className="rounded-2xl border border-[#E2E8F0] overflow-x-auto shadow-2xs">
            <table className="w-full text-left border-collapse min-w-[700px] text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-[#64748B] font-semibold w-1/4">
                    Capability
                  </th>
                  <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-[#64748B] font-semibold w-1/5">
                    Traditional Policy Documents
                  </th>
                  <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-[#64748B] font-semibold w-1/5">
                    Insurance / Claim Portals
                  </th>
                  <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-[#64748B] font-semibold w-1/5">
                    Generic AI Assistants
                  </th>
                  <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-[#00A896] font-bold bg-[#00A896]/10 w-1/5 border-l border-[#00A896]/20">
                    InsureMate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {comparisonData.map((row, idx) => (
                  <tr key={row.capability} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                    <td className="py-3 px-4 font-semibold text-[#0B1F3A]">
                      {row.capability}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-[#64748B]">
                      {row.traditional}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-[#64748B]">
                      {row.portals}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-[#64748B]">
                      {row.genericAi}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono font-bold text-[#00A896] bg-[#00A896]/5 border-l border-[#00A896]/20">
                      ✓ {row.insuremate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center font-display font-semibold text-sm sm:text-base text-[#0B1F3A] pt-2">
            “From policy information to treatment-aware financial clarity.”
          </p>

        </div>
      </section>

      {/* 7. IMPACT */}
      <section id="impact" className="py-16 lg:py-22 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00A896] font-bold">
              OUTCOMES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
              What changes when insurance information becomes understandable?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-[#5EEAD4] flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1F3A]">PATIENTS</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Understand coverage before treatment begins. Eliminate uncertainty regarding waiting clauses and room-rent eligibility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-[#5EEAD4] flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1F3A]">FAMILIES</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Understand potential financial responsibility and co-payment obligations in advance before the final discharge bill arrives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-[#5EEAD4] flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1F3A]">HOSPITALS</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Reduce repetitive policy interpretation and streamline patient communications at the insurance desk.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-[#5EEAD4] flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1F3A]">INSURANCE ECOSYSTEM</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Make complex policy information easier to access, fostering long-term policyholder trust and transparency.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
