import React from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { MessageSquare, ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer({ whatsappUrl }) {
  return (
    <footer className="bg-[#0B1220] text-[#F5F7FA]">

      {/* FINAL CTA SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/15 text-[11px] font-mono-x font-semibold text-[#356AE6] uppercase tracking-[0.18em]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Instant Policy Verification
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-[#F5F7FA] leading-tight">
                Don’t just ask:
                <br />
                <span className="text-[#AAB4C3] font-normal italic">
                  “Am I insured?”
                </span>
              </h2>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-[#356AE6] leading-tight italic">
                Ask: “What will my insurance
                <br />
                actually pay?”
              </h2>
            </div>

            <p className="text-base text-[#AAB4C3] leading-relaxed max-w-lg">
              Start with your policy. Ask your question. Get the evidence.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#356AE6] text-white font-semibold text-sm hover:bg-[#2a58c2] transition-colors active:scale-[0.99] tracking-wide"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/experience"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-[#F5F7FA] font-semibold text-sm transition-colors"
              >
                <span>Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-[11px] text-[#AAB4C3] font-mono-x tracking-[0.12em] uppercase">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#356AE6]" /> Direct on WhatsApp
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#356AE6]" /> Privacy Controlled
              </span>
            </div>
          </div>

          {/* Right — QR card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[300px] bg-[#FCFBF7] text-[#172033] rounded-2xl p-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)] border border-[#D9D6CE] text-center space-y-3.5">
              <div className="space-y-0.5">
                <span className="font-mono-x text-[10px] uppercase tracking-[0.22em] text-[#356AE6] font-semibold block">
                  Fast Onboarding
                </span>
                <h3 className="font-display text-base font-semibold">
                  Start in WhatsApp
                </h3>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#D9D6CE] mx-auto inline-block">
                <QRCodeSVG
                  value={whatsappUrl}
                  size={150}
                  bgColor={"#FFFFFF"}
                  fgColor={"#0B1220"}
                  level={"M"}
                />
              </div>

              <div className="font-mono-x text-[11px] font-semibold tracking-[0.16em] text-[#356AE6] uppercase">
                Scan → WhatsApp → Ask → Understand
              </div>

              <p className="text-[10px] text-[#667085] leading-tight pt-2 border-t border-[#D9D6CE]">
                Scan once to begin your InsureMate conversation. No app download.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER NAV + DISCLAIMER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <img
              src={logoImg}
              alt="InsureMate"
              className="h-10 w-auto object-contain bg-white/10 p-1.5 rounded-lg"
            />
            <p className="text-xs text-[#AAB4C3] font-mono-x tracking-wide">
              Insurance Coverage &amp; Treatment Cost Intelligence
            </p>
            <p className="text-xs text-[#AAB4C3] leading-relaxed max-w-sm">
              Helping policyholders understand clauses, waiting periods, room sub-limits and estimated out-of-pocket expenses directly in WhatsApp.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-mono-x text-[10px] uppercase tracking-[0.22em] text-[#356AE6] font-semibold block">
              Pages &amp; Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-[#AAB4C3]">
              <li>
                <Link to="/" className="hover:text-[#356AE6] transition-colors">Product Overview (Page 1)</Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#356AE6] transition-colors">How It Works &amp; Live Demo (Page 2)</Link>
              </li>
              <li>
                <Link to="/#problem" className="hover:text-[#356AE6] transition-colors">The Information Gap</Link>
              </li>
              <li>
                <Link to="/#comparison" className="hover:text-[#356AE6] transition-colors">Where InsureMate Fits</Link>
              </li>
              <li>
                <Link to="/#impact" className="hover:text-[#356AE6] transition-colors">Healthcare &amp; Patient Impact</Link>
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="md:col-span-4 space-y-2">
            <span className="font-mono-x text-[10px] uppercase tracking-[0.22em] text-[#356AE6] font-semibold block">
              Privacy &amp; Control
            </span>
            <p className="text-xs text-[#AAB4C3] leading-relaxed">
              Users remain in complete control of their policy information and data retention preferences. Ephemeral retrieval preserves document confidentiality.
            </p>
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono-x text-[#356AE6] hover:underline"
              >
                <span>Direct WhatsApp Click-to-Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-[#AAB4C3] leading-relaxed space-y-2">
          <p>
            <strong className="text-[#F5F7FA]">Disclaimer:</strong> InsureMate provides informational estimates and policy explanations. It does not replace the insurer, policy document, hospital billing team or professional financial/insurance advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono-x text-[#667085]">
            <span>© {new Date().getFullYear()} InsureMate. Evidence-Grounded Healthcare Fintech.</span>
            <span>Deterministic RAG + Cost Intelligence</span>
          </div>
        </div>

      </div>

    </footer>
  );
}