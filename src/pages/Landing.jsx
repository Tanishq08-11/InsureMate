import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  MessageSquare,
  ArrowRight,
  FileText,
  AlertCircle,
  CheckCircle2,
  Lock,
  Info,
  Sparkles,
  Shield,
  Zap,
  Send,
  Bot,
  User,
} from 'lucide-react';

const IMAGES = {
  heroDocuments:
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
  deskOverhead:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  pocketChat:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
};

export default function Landing({ whatsappUrl }) {
  const [activeClause] = useState('WAITING PERIODS');

  const policyClauses = [
    { name: 'EXCLUSIONS', desc: 'Specific non-covered treatments, cosmetic procedures, or unlisted consumables.' },
    { name: 'WAITING PERIODS', desc: 'Mandatory 24–48 month waiting periods for pre-existing diseases or specific eye/joint conditions.' },
    { name: 'DEDUCTIBLES', desc: 'Threshold amount paid out-of-pocket before insurance claim settlement triggers.' },
    { name: 'CO-PAYMENTS', desc: 'Mandatory 10%–20% cost-sharing percentage borne by the policyholder on every claim.' },
    { name: 'SUB-LIMITS', desc: 'Capped compensation amounts on specific treatments (e.g. ₹40,000 max for cataract).' },
    { name: 'ROOM-RENT LIMITS', desc: 'Caps on daily room rent (e.g. 1% of Sum Insured) that trigger proportionate billing deductions.' },
  ];

  const comparisonData = [
    { capability: 'Policy information access', traditional: 'Available (45-page PDF)', portals: 'Available (Portal login)', genericAi: 'Limited (Generic knowledge)', insuremate: 'Core (WhatsApp instant)' },
    { capability: 'Coverage explanation', traditional: 'Limited (Legal wording)', portals: 'Limited (Summary bullets)', genericAi: 'Varies (Unverified summaries)', insuremate: 'Core (Plain English translation)' },
    { capability: 'Exclusion identification', traditional: 'Available (Buried clauses)', portals: 'Varies', genericAi: 'Varies', insuremate: 'Core (Explicit highlight)' },
    { capability: 'Waiting-period understanding', traditional: 'Available (Complex annexures)', portals: 'Limited', genericAi: 'Not central', insuremate: 'Core (Timeframe calculation)' },
    { capability: 'Exact page/section evidence', traditional: 'Not central', portals: 'Not central', genericAi: 'Not central (Hallucination risk)', insuremate: 'Core (Page 18 · Section 3.4)' },
    { capability: 'Treatment-specific interpretation', traditional: 'Not central', portals: 'Limited', genericAi: 'Varies', insuremate: 'Core (Clinical mapping)' },
    { capability: 'Treatment-cost context', traditional: 'Not central', portals: 'Varies (Hospital specific)', genericAi: 'Not central', insuremate: 'Core (Benchmark datasets)' },
    { capability: 'Potential out-of-pocket estimation', traditional: 'Not central', portals: 'Not central', genericAi: 'Not central', insuremate: 'Core (Co-pay + sub-limits)' },
    { capability: 'Conversational interaction', traditional: 'Not central', portals: 'Limited', genericAi: 'Core', insuremate: 'Core (Grounded in your policy)' },
    { capability: 'WhatsApp-first access', traditional: 'Not central', portals: 'Not central', genericAi: 'Not central', insuremate: 'Core (No app download)' },
    { capability: 'Missing-information detection', traditional: 'Not central', portals: 'Not central', genericAi: 'Not central', insuremate: 'Core (Clarifies before guessing)' },
  ];

  return (
    <div className="space-y-0 font-ui bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Instrument Serif', ui-serif, Georgia, serif; letter-spacing: -0.01em; }
        .font-ui { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-x { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        /* Smooth, modern scroll behaviour */
        html { scroll-behavior: smooth; }

        /* Premium card hover lift */
        .card-lift {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.35s ease;
        }
        .card-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px -18px rgba(4, 56, 88, 0.22);
          border-color: rgba(4, 56, 88, 0.18);
        }

        /* Subtle chat bubble entrance */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-bubble { animation: fadeUp 0.5s ease-out both; }
        .chat-bubble-1 { animation-delay: 0.1s; }
        .chat-bubble-2 { animation-delay: 0.25s; }
        .chat-bubble-3 { animation-delay: 0.4s; }
        .chat-bubble-4 { animation-delay: 0.55s; }

        /* Premium gradient border for hero chatbot */
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(125, 211, 192, 0.4), rgba(4, 56, 88, 0.08));
          padding: 1px;
          border-radius: 24px;
        }
        .gradient-border-inner {
          background: #ffffff;
          border-radius: 23px;
        }

        /* Premium button shimmer */
        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s ease;
        }
        .btn-primary:hover::after { left: 100%; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 12px 24px -12px rgba(4, 56, 88, 0.4); }

        /* Section divider */
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #E4E7EC 20%, #E4E7EC 80%, transparent);
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. HERO — CHATBOT AS THE MAIN FOCUS                         */}
      {/* ============================================================ */}
      <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 bg-white overflow-hidden border-b border-[#E4E7EC]">
        {/* Subtle dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#043858 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Soft gradient orb for depth */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#7DD3C0]/[0.06] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#043858]/[0.04] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">

            {/* Left: Copy */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2.5 text-[11px] font-mono-x font-medium tracking-[0.18em] text-[#043858] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7DD3C0]" />
                AI Insurance Chatbot
              </div>

              <h1 className="font-display text-[2.8rem] sm:text-6xl lg:text-[4rem] leading-[1.05] tracking-[-0.02em] text-[#043858]">
                Your insurance policy,
                <br />
                <span className="text-[#5fbeaa]">finally explained.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#526170] leading-relaxed max-w-xl">
                InsureMate is an AI chatbot that reads your policy and answers treatment-cost questions with exact page-level evidence. No more guessing. No more 45-page PDFs.
              </p>

              {/* Primary CTAs — both navigate to chatbot page */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  to="/chatbot"
                  className="btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#043858] text-white font-semibold text-[15px] tracking-wide hover:bg-[#032c46] active:scale-[0.99]"
                >
                  <Bot className="w-4 h-4" />
                  <span>START CHATTING</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/experience"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#E4E7EC] bg-white text-[#043858] font-semibold text-[15px] tracking-wide hover:bg-[#F7F8FA] hover:border-[#043858]/25 transition-all duration-300"
                >
                  <span>SEE HOW IT WORKS</span>
                  <ArrowRight className="w-4 h-4 text-[#526170]" />
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-[11px] font-mono-x tracking-[0.12em] uppercase text-[#526170]">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7DD3C0]" /> Page 18 · Clause Evidence
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7DD3C0]" /> WhatsApp Native
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#7DD3C0]" /> Zero Guesswork
                </span>
              </div>

              {/* Supporting image strip */}
              <div className="relative pt-4 pb-6">
                <figure className="relative overflow-hidden rounded-lg border border-[#E4E7EC]">
                  <img
                    src={IMAGES.heroDocuments}
                    alt="Insurance policy documents and medical paperwork on a desk"
                    loading="lazy"
                    className="w-full h-[200px] sm:h-[240px] object-cover grayscale-[10%] contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#043858]/50 via-[#043858]/5 to-transparent" />
                  <figcaption className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-4">
                    <span className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-white/95">The document, not the story</span>
                    <span className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-white/75">Fig. 01</span>
                  </figcaption>
                </figure>

                <figure className="absolute -bottom-4 right-4 sm:right-8 w-[42%] max-w-[200px] overflow-hidden rounded-lg border border-[#E4E7EC] shadow-[0_20px_40px_-20px_rgba(4,56,88,0.3)]">
                  <img
                    src={IMAGES.deskOverhead}
                    alt="Overhead view of medical bills, calculator and insurance paperwork"
                    loading="lazy"
                    className="w-full h-[110px] sm:h-[130px] object-cover grayscale-[10%]"
                  />
                </figure>
              </div>
            </div>

            {/* Right: Chatbot Demo — THE MAIN FOCUS */}
            <div className="lg:col-span-6 flex flex-col items-center gap-6 lg:pt-0">

              {/* Chatbot window — premium styling */}
              <div className="w-full max-w-[440px] gradient-border shadow-[0_30px_60px_-25px_rgba(4,56,88,0.35)]">
                <div className="gradient-border-inner overflow-hidden">
                  {/* Chat header */}
                  <div className="bg-[#043858] text-white px-5 py-4 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#7DD3C0]/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-[#7DD3C0]" />
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#043858]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold truncate leading-tight">InsureMate AI</p>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#7DD3C0] text-[#043858] flex items-center justify-center text-[8px] font-bold">✓</span>
                      </div>
                      <p className="text-[10px] text-white/70 leading-none">Policy Intelligence Assistant</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono-x bg-white/10 px-2.5 py-1 rounded-full text-white/90">
                      <Sparkles className="w-2.5 h-2.5 text-[#7DD3C0]" />
                      AI
                    </div>
                  </div>

                  {/* Chat body */}
                  <div className="bg-[#F7F8FA] p-5 space-y-4 min-h-[420px]">
                    {/* System pill */}
                    <div className="text-center">
                      <span className="bg-white text-[#526170] text-[10px] font-mono-x px-3 py-1 rounded-full border border-[#E4E7EC] shadow-sm">
                        Policy loaded: Star Comprehensive Health
                      </span>
                    </div>

                    {/* User question 1 */}
                    <div className="chat-bubble chat-bubble-1 flex justify-end gap-2.5">
                      <div className="bg-[#043858] text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[85%] space-y-1 shadow-sm">
                        <p className="text-[13px] leading-relaxed">Does my policy cover cataract surgery?</p>
                        <p className="text-[9px] text-white/60 text-right font-mono-x">11:15 AM · ✓✓</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#E4E7EC] flex items-center justify-center shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-[#526170]" />
                      </div>
                    </div>

                    {/* AI answer 1 */}
                    <div className="chat-bubble chat-bubble-2 flex justify-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#043858] flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-[#7DD3C0]" />
                      </div>
                      <div className="bg-white text-[#172033] rounded-2xl rounded-tl-md px-4 py-3.5 max-w-[88%] space-y-2.5 shadow-sm border border-[#E4E7EC]">
                        <p className="text-[13px] leading-relaxed">
                          <strong className="text-[#043858] font-semibold">Potentially covered</strong>, subject to the applicable waiting period and policy limits.
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#043858]/5 border border-[#043858]/10 text-[10px] font-mono-x text-[#043858]">
                          <FileText className="w-3 h-3" />
                          <span>Page 18 · Section 3.4</span>
                        </div>
                        <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                          <span className="text-[9px] font-mono-x uppercase tracking-wider text-[#7DD3C0] font-bold">EVIDENCE-BACKED</span>
                          <span className="text-[9px] text-[#526170] font-mono-x">11:15 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* User question 2 */}
                    <div className="chat-bubble chat-bubble-3 flex justify-end gap-2.5">
                      <div className="bg-[#043858] text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[85%] space-y-1 shadow-sm">
                        <p className="text-[13px] leading-relaxed">What might I have to pay?</p>
                        <p className="text-[9px] text-white/60 text-right font-mono-x">11:16 AM · ✓✓</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#E4E7EC] flex items-center justify-center shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-[#526170]" />
                      </div>
                    </div>

                    {/* AI answer 2 — clarification */}
                    <div className="chat-bubble chat-bubble-4 flex justify-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#043858] flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-[#7DD3C0]" />
                      </div>
                      <div className="bg-white text-[#172033] rounded-2xl rounded-tl-md px-4 py-3.5 max-w-[88%] space-y-2.5 shadow-sm border border-[#E4E7EC] border-l-2 border-l-[#7DD3C0]">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono-x font-semibold text-[#043858]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#7DD3C0]" />
                          <span>NEED LOCATION &amp; HOSPITAL</span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-[#172033]">
                          I need your treatment location and hospital type before estimating reliably.
                        </p>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                          <span className="text-[9px] font-mono-x text-[#526170]">NO GUESSWORK</span>
                          <span className="text-[9px] text-[#526170] font-mono-x">11:16 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat input */}
                  <div className="bg-white px-4 py-3.5 border-t border-[#E4E7EC] flex items-center gap-3">
                    <div className="flex-1 bg-[#F7F8FA] rounded-full px-4 py-2.5 text-[12px] text-[#526170] border border-[#E4E7EC]">
                      Type a policy question...
                    </div>
                    <button className="w-9 h-9 rounded-full bg-[#043858] flex items-center justify-center text-white hover:bg-[#032c46] transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature badges under chatbot */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-[440px]">
                <div className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-[#E4E7EC] text-center">
                  <Shield className="w-4 h-4 text-[#7DD3C0]" />
                  <span className="text-[10px] font-mono-x tracking-wider uppercase text-[#526170]">Evidence</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-[#E4E7EC] text-center">
                  <Zap className="w-4 h-4 text-[#7DD3C0]" />
                  <span className="text-[10px] font-mono-x tracking-wider uppercase text-[#526170]">Instant</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-[#E4E7EC] text-center">
                  <MessageSquare className="w-4 h-4 text-[#7DD3C0]" />
                  <span className="text-[10px] font-mono-x tracking-wider uppercase text-[#526170]">WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHATSAPP INTEGRATION — SECOND SECTION                     */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#F7F8FA] border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono-x font-medium tracking-[0.18em] text-[#043858] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7DD3C0]" />
                WhatsApp Integration
              </div>
              <h2 className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.2rem] leading-[1.08] tracking-[-0.02em] text-[#043858]">
                Your insurance assistant.
                <br />
                <span className="text-[#7DD3C0]">Already in your pocket.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#526170] leading-relaxed max-w-2xl">
                Start once through our website. After that, you don't need to return here every time. Your AI assistant lives right inside WhatsApp.
              </p>
            </div>

            <figure className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-[#E4E7EC] shadow-sm card-lift">
                <img
                  src={IMAGES.pocketChat}
                  alt="Person using a smartphone to review insurance information"
                  loading="lazy"
                  className="w-full h-[200px] sm:h-[240px] object-cover grayscale-[15%] contrast-[1.03]"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#526170]">
                <span>WhatsApp-native workflow</span>
                <span>Fig. 02</span>
              </figcaption>
            </figure>
          </div>

          {/* Steps + QR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-5 border-t border-[#E4E7EC]">
                {[
                  { num: '01', title: 'WEBSITE', desc: 'Scan QR Code' },
                  { num: '02', title: 'WHATSAPP', desc: 'Opens Chat' },
                  { num: '03', title: 'SEND POLICY', desc: 'PDF or Photo' },
                  { num: '04', title: 'ASK ANYTIME', desc: 'Natural English' },
                  { num: '05', title: 'EVIDENCE', desc: 'Page-cited Answer' },
                ].map((step) => (
                  <div key={step.title} className="py-6 pr-6 border-b sm:border-b-0 sm:border-r border-[#E4E7EC] last:border-r-0 space-y-2">
                    <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold block">
                      {step.num}
                    </span>
                    <span className="font-display text-lg text-[#043858] block tracking-[-0.01em]">
                      {step.title}
                    </span>
                    <span className="text-[12px] text-[#526170] block leading-relaxed">
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feature notes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="pl-4 border-l-2 border-[#7DD3C0] space-y-2">
                  <span className="font-display text-lg text-[#043858] block tracking-[-0.01em]">
                    Continue previous conversation
                  </span>
                  <p className="text-[13px] text-[#526170] leading-relaxed">
                    Resume right where you left off. Your policy context is retained according to your privacy settings.
                  </p>
                </div>

                <div className="pl-4 border-l-2 border-[#7DD3C0] space-y-2">
                  <span className="font-display text-lg text-[#043858] block tracking-[-0.01em]">
                    Ask new questions
                  </span>
                  <p className="text-[13px] text-[#526170] leading-relaxed">
                    Check room rents, diagnostics, pre-hospitalization allowances, or specific surgery eligibility anytime.
                  </p>
                </div>

                <div className="pl-4 border-l-2 border-[#7DD3C0] space-y-2">
                  <span className="font-display text-lg text-[#043858] block tracking-[-0.01em]">
                    Revisit previous answers
                  </span>
                  <p className="text-[13px] text-[#526170] leading-relaxed">
                    Refer back to verified clause numbers during discussions with hospital insurance TPA desks.
                  </p>
                </div>
              </div>
            </div>

            {/* QR Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 border border-[#E4E7EC] shadow-sm card-lift flex flex-col items-center text-center space-y-5">
                <div className="w-full pb-4 border-b border-[#E4E7EC]">
                  <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold">
                    Start on WhatsApp
                  </span>
                  <h3 className="font-display text-xl text-[#043858] mt-1.5">
                    Scan Once to Begin
                  </h3>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E4E7EC]">
                  <QRCodeSVG
                    value={whatsappUrl}
                    size={140}
                    bgColor={"#FFFFFF"}
                    fgColor={"#043858"}
                    level={"M"}
                  />
                </div>

                <p className="text-xs text-[#043858] font-medium leading-snug">
                  No app download. No complicated setup.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 px-4 rounded-lg bg-[#043858] hover:bg-[#032c46] text-white text-[11px] font-mono-x font-semibold tracking-[0.16em] uppercase transition-all"
                >
                  Scan to Chat
                </a>

                <p className="text-[10px] text-[#526170] leading-relaxed pt-3 border-t border-[#E4E7EC]">
                  After your first conversation, you can return directly to WhatsApp. You do not need to revisit this website for every question.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CORE STATEMENT — WHITE                                    */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-b border-[#E4E7EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold">
              The Core Reality
            </span>
            <span className="h-px flex-1 bg-[#E4E7EC]" />
          </div>

          <blockquote className="font-display text-[2.6rem] sm:text-5xl lg:text-[4rem] leading-[1.08] tracking-[-0.02em] text-[#043858]">
            “The policy doesn’t fail.
            <br />
            <span className="text-[#7DD3C0]">
              The information platform does.”
            </span>
          </blockquote>

          <div className="mt-10 max-w-2xl space-y-4 text-[#526170] text-base leading-relaxed">
            <p>
              Insurance information is often available — but buried inside pages of conditions, exclusions, waiting periods and limits.
            </p>
            <p className="text-[#043858] font-medium">
              The problem is not the existence of information. The problem is making it understandable when people actually need it.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PROBLEM + RESEARCH — LIGHT GREY                           */}
      {/* ============================================================ */}
      <section id="problem" className="py-20 lg:py-28 bg-[#F7F8FA] border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono-x font-medium tracking-[0.18em] text-[#043858] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7DD3C0]" />
              The Information Gap
            </div>
            <h2 className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-[-0.02em] text-[#043858]">
              A transparency deficit <br />
              <span className="text-[#7DD3C0]">in health insurance.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#526170] leading-relaxed">
              Documented survey evidence shows widespread ambiguity among insured policyholders at the time of claim filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card-lift p-6 sm:p-8 bg-white border border-[#E4E7EC] border-l-2 border-l-[#7DD3C0] space-y-3 rounded-xl">
              <div className="font-display text-6xl sm:text-7xl text-[#043858] tracking-[-0.03em] leading-none">
                80<span className="text-[#7DD3C0]">%</span>
              </div>
              <p className="text-sm text-[#043858] leading-relaxed pt-2">
                of respondents in the cited consumer survey were unsure about what their insurance policy covered.
              </p>
              <div className="pt-3 border-t border-[#E4E7EC] font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#526170]">
                Source: CoverSure Health Survey (2025)
              </div>
            </div>

            <div className="card-lift p-6 sm:p-8 bg-white border border-[#E4E7EC] space-y-3 rounded-xl">
              <div className="font-display text-6xl sm:text-7xl text-[#043858] tracking-[-0.03em] leading-none">
                65<span className="text-[#7DD3C0]">%</span>
              </div>
              <p className="text-sm text-[#043858] leading-relaxed pt-2">
                reported little to no knowledge of policy details such as benefits, exclusions or claim procedures.
              </p>
              <div className="pt-3 border-t border-[#E4E7EC] font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#526170]">
                Source: Policyholder Awareness Study
              </div>
            </div>

            <div className="card-lift p-6 sm:p-8 bg-white border border-[#E4E7EC] space-y-3 rounded-xl">
              <div className="font-display text-6xl sm:text-7xl text-[#043858] tracking-[-0.03em] leading-none">
                50<span className="text-[#7DD3C0]">%+</span>
              </div>
              <p className="text-sm text-[#043858] leading-relaxed pt-2">
                of surveyed health-policy holders who filed claims reported rejection or partial approval in the cited survey.
              </p>
              <div className="pt-3 border-t border-[#E4E7EC] font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#526170]">
                Source: LocalCircles Claim Survey
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white border border-[#E4E7EC] font-mono-x text-[12px] text-[#526170] rounded-lg">
            <Info className="w-4 h-4 text-[#7DD3C0] shrink-0" />
            <span>Survey metrics reflect sampled policyholder respondents highlighting structural information gaps.</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CLAUSES — WHITE                                           */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl space-y-4 mb-12">
            <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold">
              Document Complexity
            </span>
            <h2 className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-[-0.02em] text-[#043858]">
              What makes insurance <br />
              <span className="text-[#7DD3C0]">hard to understand.</span>
            </h2>
            <p className="text-base text-[#526170] leading-relaxed">
              A standard health policy contains dozens of interlocking clauses that determine the final settlement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E4E7EC] border border-[#E4E7EC] rounded-xl overflow-hidden">
              {policyClauses.map((c) => (
                <div key={c.name} className="p-5 bg-white space-y-2 hover:bg-[#F7F8FA] transition-colors duration-300">
                  <span className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                    {c.name}
                  </span>
                  <p className="text-[12px] text-[#526170] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 p-8 bg-[#043858] text-white border border-[#043858] space-y-5 rounded-xl shadow-[0_20px_40px_-20px_rgba(4,56,88,0.3)]">
              <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold">
                InsureMate Intelligence
              </span>
              <h3 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.01em] text-white">
                “Find the clause that actually matters.”
              </h3>
              <p className="text-[13px] text-white/75 leading-relaxed">
                Rather than forcing patients to navigate dense 45-page PDFs, InsureMate isolates the exact clause, waiting requirement, and applicable sub-limit for your specific medical question.
              </p>
              <div className="pt-3 border-t border-white/15 flex items-center justify-between font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#7DD3C0]">
                <span>Grounded Retrieval</span>
                <span>Page-level Citations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. COMPARISON — LIGHT GREY                                   */}
      {/* ============================================================ */}
      <section id="comparison" className="py-20 lg:py-28 bg-[#F7F8FA] border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="max-w-3xl space-y-4">
            <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold">
              Industry Positioning
            </span>
            <h2 className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-[-0.02em] text-[#043858]">
              Where InsureMate fits
            </h2>
            <p className="text-base sm:text-lg text-[#526170] leading-relaxed">
              Existing solutions solve parts of the insurance journey. InsureMate connects the information.
            </p>
          </div>

          <div className="border border-[#E4E7EC] overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse min-w-[760px] text-[12px]">
              <thead>
                <tr className="bg-[#F7F8FA] border-b border-[#E4E7EC]">
                  <th className="py-4 px-4 font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#526170] font-semibold w-[24%]">Capability</th>
                  <th className="py-4 px-4 font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#526170] font-semibold">Traditional Policy Documents</th>
                  <th className="py-4 px-4 font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#526170] font-semibold">Insurance / Claim Portals</th>
                  <th className="py-4 px-4 font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#526170] font-semibold">Generic AI Assistants</th>
                  <th className="py-4 px-4 font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#043858] font-semibold border-l border-[#E4E7EC] bg-[#043858]/[0.06]">InsureMate</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={row.capability} className={`border-b border-[#E4E7EC] last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F8FA]'}`}>
                    <td className="py-3.5 px-4 font-display text-[15px] text-[#043858] tracking-[-0.01em]">{row.capability}</td>
                    <td className="py-3.5 px-4 font-mono-x text-[11px] text-[#526170]">{row.traditional}</td>
                    <td className="py-3.5 px-4 font-mono-x text-[11px] text-[#526170]">{row.portals}</td>
                    <td className="py-3.5 px-4 font-mono-x text-[11px] text-[#526170]">{row.genericAi}</td>
                    <td className="py-3.5 px-4 font-mono-x text-[11px] font-semibold text-[#043858] border-l border-[#E4E7EC] bg-[#043858]/[0.04]">✓ {row.insuremate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center font-display text-lg sm:text-xl text-[#043858] pt-2">
            “From policy information to treatment-aware financial clarity.”
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. IMPACT — WHITE                                            */}
      {/* ============================================================ */}
      <section id="impact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="max-w-3xl space-y-4">
            <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold">
              Outcomes
            </span>
            <h2 className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-[-0.02em] text-[#043858]">
              What changes when insurance information becomes understandable?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E4E7EC] border border-[#E4E7EC] rounded-xl overflow-hidden">
            {[
              { num: '01', title: 'PATIENTS', desc: 'Understand coverage before treatment begins. Eliminate uncertainty regarding waiting clauses and room-rent eligibility.' },
              { num: '02', title: 'FAMILIES', desc: 'Understand potential financial responsibility and co-payment obligations in advance before the final discharge bill arrives.' },
              { num: '03', title: 'HOSPITALS', desc: 'Reduce repetitive policy interpretation and streamline patient communications at the insurance desk.' },
              { num: '04', title: 'INSURANCE ECOSYSTEM', desc: 'Make complex policy information easier to access, fostering long-term policyholder trust and transparency.' },
            ].map((card) => (
              <div key={card.num} className="p-7 bg-white space-y-4 hover:bg-[#F7F8FA] transition-colors duration-300">
                <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#7DD3C0] font-semibold block">{card.num}</span>
                <h3 className="font-display text-xl text-[#043858] tracking-[-0.01em]">{card.title}</h3>
                <p className="text-[13px] text-[#526170] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}