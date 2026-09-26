import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Editorial image sources — swap `src` only, structure stays the same
 * ------------------------------------------------------------------ */
const IMAGES = {
  heroDocuments:
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
  deskOverhead:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
  medicalBills:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
};

export default function Hero({ whatsappUrl }) {
  return (
    <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-[#0B1F3A] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; font-optical-sizing: auto; }
        .font-ui { font-family: 'Inter Tight', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-x { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      {/* Neutral grain — no green, no gradient blob */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative font-ui">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">

          {/* ───────────── LEFT ───────────── */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-9">

            <div className="inline-flex items-center gap-2.5 text-[11px] font-mono-x font-medium tracking-[0.18em] text-white/70 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              Insurance, Explained.
            </div>

            <div className="space-y-6">
              <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-[4.2rem] leading-[1.02] font-semibold tracking-[-0.02em] text-white">
                Know what your
                <br className="hidden sm:inline" />
                insurance{' '}
                <span className="italic font-normal text-[#E8C468]">
                  actually pays.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl">
                InsureMate turns complex insurance policies into clear,
                evidence-backed answers — and helps estimate potential treatment
                costs and out-of-pocket expenses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md bg-[#B8860B] text-white font-semibold text-[15px] tracking-wide hover:bg-[#a2760a] transition-colors active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-white/25 text-white font-semibold text-[15px] tracking-wide hover:bg-white/5 hover:border-white/40 transition-colors"
              >
                <span>SEE HOW IT WORKS</span>
              </a>
            </div>

            {/* ───── Overlapping editorial image composition ───── */}
            <div className="relative pt-4 pb-6">
              {/* Big image */}
              <figure className="relative overflow-hidden rounded-sm border border-white/10">
                <img
                  src={IMAGES.heroDocuments}
                  alt="Insurance and medical paperwork laid out on a desk with a pen"
                  loading="lazy"
                  className="w-full h-[240px] sm:h-[280px] object-cover grayscale-[10%] contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/70 via-[#0B1F3A]/10 to-transparent" />
                <figcaption className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-4">
                  <span className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-white/85">
                    The document, not the story
                  </span>
                  <span className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-white/55">
                    Fig. 01
                  </span>
                </figcaption>
              </figure>

              {/* Smaller overlapping image — intentionally offset, not in a card */}
              <figure className="absolute -bottom-4 right-4 sm:right-8 w-[42%] max-w-[220px] overflow-hidden rounded-sm border border-white/15 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
                <img
                  src={IMAGES.deskOverhead}
                  alt="Overhead view of medical bills and a calculator on a desk"
                  loading="lazy"
                  className="w-full h-[120px] sm:h-[140px] object-cover grayscale-[10%]"
                />
              </figure>
            </div>

            {/* Statement line — preserved exactly */}
            <div className="relative pl-5 border-l-2 border-[#B8860B] pt-2">
              <p className="font-display text-xl sm:text-[1.4rem] leading-snug text-white font-medium italic">
                “The policy doesn’t fail. The information platform does.”
              </p>
              <p className="font-mono-x text-[11px] tracking-[0.14em] uppercase text-white/55 mt-3">
                No hidden portals · No app installs · Clause verification in WhatsApp
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-[11px] font-mono-x tracking-[0.12em] uppercase text-white/60">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E8C468]" /> Evidence-grounded
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E8C468]" /> Page-level citations
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#E8C468]" /> Privacy controlled
              </span>
            </div>
          </div>

          {/* ───────────── RIGHT: Phone + QR ───────────── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col sm:flex-row items-start justify-center gap-6 lg:pt-4">

            {/* Phone — WhatsApp chrome lives ONLY inside this frame */}
            <div className="w-full max-w-[320px] rounded-[36px] bg-[#111827] p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] border border-white/10">
              <div className="bg-[#EFEAE2] rounded-[28px] overflow-hidden flex flex-col h-[540px]">
                <div className="bg-[#075E54] text-white px-3.5 py-3 flex items-center gap-2.5 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-[#5EEAD4]">
                    IM
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold truncate leading-tight">
                        InsureMate
                      </p>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    </div>
                    <p className="text-[10px] text-white/80 leading-none">
                      Policy &amp; Cost Intelligence
                    </p>
                  </div>
                  <div className="text-[9px] font-mono-x bg-white/15 px-2 py-0.5 rounded text-white/90">
                    ACTIVE
                  </div>
                </div>

                <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs bg-[#EFEAE2]">
                  <div className="text-center">
                    <span className="bg-white/85 text-[#64748B] text-[10px] font-mono-x px-2 py-0.5 rounded">
                      Today · Policy: Care Supreme Plan
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] space-y-1 border border-[#D0F0C0]">
                      <p className="text-xs font-medium">Is knee replacement covered?</p>
                      <p className="text-[9px] text-[#64748B] text-right font-mono-x">
                        10:42 AM · ✓✓
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white text-[#172033] rounded-lg rounded-tl-none px-3 py-2.5 max-w-[90%] space-y-2">
                      <p className="text-xs leading-relaxed">
                        <strong className="text-[#B8860B] font-semibold">
                          Potentially covered
                        </strong>
                        , subject to the applicable waiting period and policy
                        limits.
                      </p>
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[10px] font-mono-x text-[#0B1F3A]">
                        <FileText className="w-3 h-3" />
                        <span>Page 24 · Section 4.2</span>
                      </div>
                      <div className="pt-0.5 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[9px] font-mono-x uppercase tracking-wider text-[#B8860B] font-bold">
                          EVIDENCE-BACKED
                        </span>
                        <span className="text-[9px] text-[#64748B] font-mono-x">
                          10:42 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] space-y-1 border border-[#D0F0C0]">
                      <p className="text-xs font-medium">How much might I have to pay?</p>
                      <p className="text-[9px] text-[#64748B] text-right font-mono-x">
                        10:43 AM · ✓✓
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white text-[#172033] rounded-lg rounded-tl-none px-3 py-2.5 max-w-[90%] space-y-2 border-l-2 border-l-[#B8860B]">
                      <div className="flex items-center gap-1 text-[10px] font-mono-x font-semibold text-[#8a6508]">
                        <AlertCircle className="w-3 h-3" />
                        <span>NEED LOCATION &amp; ROOM</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#172033]">
                        I need the treatment location and hospital type before I
                        can estimate reliably.
                      </p>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-1">
                        <span className="text-[9px] font-mono-x text-[#64748B]">
                          NOT A GUESS
                        </span>
                        <span className="text-[9px] text-[#64748B] font-mono-x">
                          10:43 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F0F2F5] px-3 py-2 border-t border-slate-200 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-[#64748B] border border-slate-200">
                    Ask about waiting period, room rent...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center text-white">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* QR card — neutral paper tones, NO WhatsApp colors */}
            <div className="w-full sm:w-[250px] bg-[#F5F2EC] text-[#0B1F3A] rounded-xl p-5 border border-[#E7E2D8] flex flex-col items-center text-center space-y-4">
              <div className="w-full pb-3 border-b border-[#E7E2D8]">
                <span className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-[#8a6508] font-semibold">
                  Direct Access
                </span>
                <h3 className="font-display text-lg font-semibold text-[#0B1F3A] mt-1">
                  Start on WhatsApp
                </h3>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#E7E2D8]">
                <QRCodeSVG
                  value={whatsappUrl}
                  size={148}
                  bgColor="#FFFFFF"
                  fgColor="#0B1F3A"
                  level="M"
                  includeMargin={false}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-[#0B1F3A] font-medium leading-snug">
                  Scan once to begin your InsureMate conversation.
                </p>
                <p className="text-[11px] text-[#4A5568]">
                  No app download. No complicated setup.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-md bg-[#B8860B] hover:bg-[#a2760a] text-white text-[11px] font-mono-x font-semibold tracking-[0.16em] uppercase transition-colors"
              >
                Scan to Chat
              </a>

              <p className="text-[10px] text-[#4A5568] leading-relaxed pt-2 border-t border-[#E7E2D8]">
                After your first conversation, you can return directly to
                WhatsApp. You do not need to revisit this website for every
                question.
              </p>
            </div>
          </div>
        </div>

        {/* ───── Fig. 03 — full-width editorial band, real photo ───── */}
        <figure className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-t border-white/10 pt-10">
          <div className="md:col-span-3">
            <p className="font-mono-x text-[10px] tracking-[0.22em] uppercase text-white/50">
              Fig. 03
            </p>
            <p className="font-display text-lg text-white mt-1 leading-snug">
              Real paperwork. Real decisions.
            </p>
          </div>
          <div className="md:col-span-9 overflow-hidden rounded-sm border border-white/10">
            <img
              src={IMAGES.medicalBills}
              alt="Medical bills, prescriptions and insurance documents being reviewed"
              loading="lazy"
              className="w-full h-[180px] sm:h-[220px] object-cover grayscale-[15%]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}