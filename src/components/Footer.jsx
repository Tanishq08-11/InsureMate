import React from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { MessageSquare, ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer({ whatsappUrl }) {
  return (
    <footer className="bg-[#0B1F3A] text-white">
      
      {/* FINAL CALL TO ACTION SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left: Punchy Emotional Heading & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/15 text-xs font-mono font-semibold text-[#5EEAD4] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5EEAD4]" />
              INSTANT POLICY VERIFICATION
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Don’t just ask: <br />
                <span className="text-slate-400 font-normal">“Am I insured?”</span>
              </h2>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5EEAD4] leading-tight">
                Ask: “What will my insurance <br />
                actually pay?”
              </h2>
            </div>

            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              Start with your policy. Ask your question. Get the evidence.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-colors"
              >
                <span>Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5EEAD4]" /> Direct on WhatsApp
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#5EEAD4]" /> Privacy Controlled
              </span>
            </div>
          </div>

          {/* Right: QR Code Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[300px] bg-white text-[#0B1F3A] rounded-2xl p-6 shadow-2xl border border-white/10 text-center space-y-3.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A896] font-bold block">
                  FAST ONBOARDING
                </span>
                <h3 className="font-display text-base font-bold">
                  Start in WhatsApp
                </h3>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] mx-auto inline-block">
                <QRCodeSVG
                  value={whatsappUrl}
                  size={150}
                  bgColor={"#F8FAFC"}
                  fgColor={"#0B1F3A"}
                  level={"M"}
                />
              </div>

              <div className="text-[11px] font-mono font-bold tracking-wider text-[#00A896] uppercase">
                SCAN → WHATSAPP → ASK → UNDERSTAND
              </div>

              <p className="text-[10px] text-[#64748B] leading-tight pt-2 border-t border-[#F1F5F9]">
                Scan once to begin your InsureMate conversation. No app download.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER NAVIGATION & DISCLAIMER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <img
              src={logoImg}
              alt="InsureMate"
              className="h-10 w-auto object-contain bg-white/10 p-1.5 rounded-lg"
            />
            <p className="text-xs text-slate-400 font-mono">
              Insurance Coverage & Treatment Cost Intelligence
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Helping policyholders understand clauses, waiting periods, room sub-limits and estimated out-of-pocket expenses directly in WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5EEAD4] font-bold block">
              PAGES & NAVIGATION
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-[#5EEAD4] transition-colors">Product Overview (Page 1)</Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#5EEAD4] transition-colors">How It Works & Live Demo (Page 2)</Link>
              </li>
              <li>
                <Link to="/#problem" className="hover:text-[#5EEAD4] transition-colors">The Information Gap</Link>
              </li>
              <li>
                <Link to="/#comparison" className="hover:text-[#5EEAD4] transition-colors">Where InsureMate Fits</Link>
              </li>
              <li>
                <Link to="/#impact" className="hover:text-[#5EEAD4] transition-colors">Healthcare & Patient Impact</Link>
              </li>
            </ul>
          </div>

          {/* Privacy Note */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5EEAD4] font-bold block">
              PRIVACY & CONTROL
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Users remain in complete control of their policy information and data retention preferences. Ephemeral retrieval preserves document confidentiality.
            </p>
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5EEAD4] hover:underline"
              >
                <span>Direct WhatsApp Click-to-Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Mandatory Regulatory Disclaimer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong>Disclaimer:</strong> InsureMate provides informational estimates and policy explanations. It does not replace the insurer, policy document, hospital billing team or professional financial/insurance advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
            <span>© {new Date().getFullYear()} InsureMate. Evidence-Grounded Healthcare Fintech.</span>
            <span>Deterministic RAG + Cost Intelligence</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
