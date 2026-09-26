import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, Lock, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

export default function Hero({ whatsappUrl }) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-[#E2E8F0]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0B1F3A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-mono font-semibold tracking-wider text-[#0B1F3A] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]"></span>
              INSURANCE, EXPLAINED.
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-[#0B1F3A] tracking-tight">
                Know what your insurance <br className="hidden sm:inline" />
                <span className="text-[#00A896]">actually pays.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-xl font-normal">
                InsureMate turns complex insurance policies into clear, evidence-backed answers — and helps estimate potential treatment costs and out-of-pocket expenses.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#00A896] text-white font-semibold text-base hover:bg-[#008f80] transition-colors shadow-sm active:scale-[0.99]"
              >
                <MessageSquare className="w-5 h-5 fill-white text-[#00A896]" />
                <span>CHAT ON WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#E2E8F0] text-[#172033] font-semibold text-base hover:bg-[#F1F5F9] hover:border-[#CBD5E1] transition-colors"
              >
                <span>SEE HOW IT WORKS</span>
              </a>
            </div>

            {/* Emotional Anchor Statement Card */}
            <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center text-[#0B1F3A] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#00A896]" />
                </div>
                <div>
                  <p className="font-display font-semibold text-base text-[#0B1F3A] tracking-tight">
                    “The policy doesn’t fail. The information platform does.”
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    No hidden portals or app installs. Access structured clause verification directly in WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-2 text-xs text-[#64748B] font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A896]" /> Evidence-grounded
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A896]" /> Page-level citations
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#00A896]" /> Privacy controlled
              </span>
            </div>
          </div>

          {/* Right Column: Realistic WhatsApp Phone Mockup & Dynamic QR Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* Realistic WhatsApp Phone Frame */}
            <div className="w-full max-w-[320px] rounded-[32px] bg-[#0B1F3A] p-3 shadow-2xl border-4 border-[#0B1F3A]">
              {/* Phone Screen */}
              <div className="bg-[#EFEAE2] rounded-[24px] overflow-hidden flex flex-col h-[520px] border border-black/10">
                
                {/* WhatsApp Chat Header */}
                <div className="bg-[#075E54] text-white px-3.5 py-3 flex items-center gap-2.5 shrink-0 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-[#5EEAD4]">
                    IM
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold truncate leading-tight">InsureMate</p>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                    </div>
                    <p className="text-[10px] text-white/80 leading-none">Policy & Cost Intelligence</p>
                  </div>
                  <div className="text-[10px] font-mono bg-white/15 px-2 py-0.5 rounded text-white/90">
                    ACTIVE
                  </div>
                </div>

                {/* WhatsApp Chat Body */}
                <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:12px_12px]">
                  
                  {/* Timestamp header */}
                  <div className="text-center">
                    <span className="bg-white/80 backdrop-blur-xs text-[#64748B] text-[10px] font-mono px-2 py-0.5 rounded shadow-2xs">
                      Today · Policy: Care Supreme Plan
                    </span>
                  </div>

                  {/* User Query 1 */}
                  <div className="flex justify-end">
                    <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-2xs space-y-1 border border-[#D0F0C0]">
                      <p className="text-xs font-medium">Is knee replacement covered?</p>
                      <p className="text-[9px] text-[#64748B] text-right font-mono">10:42 AM · ✓✓</p>
                    </div>
                  </div>

                  {/* InsureMate Response 1 */}
                  <div className="flex justify-start">
                    <div className="bg-white text-[#172033] rounded-lg rounded-tl-none px-3 py-2.5 max-w-[90%] shadow-2xs space-y-2 border border-black/5">
                      <p className="text-xs leading-relaxed">
                        <strong className="text-[#00A896] font-semibold">Potentially covered</strong>, subject to the applicable waiting period and policy limits.
                      </p>
                      
                      {/* Evidence Chip */}
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[10px] font-mono text-[#0B1F3A]">
                        <FileText className="w-3 h-3 text-[#00A896]" />
                        <span>Page 24 · Section 4.2</span>
                      </div>

                      <div className="pt-0.5 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#00A896] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]"></span>
                          EVIDENCE-BACKED
                        </span>
                        <span className="text-[9px] text-[#64748B] font-mono">10:42 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* User Query 2 */}
                  <div className="flex justify-end">
                    <div className="bg-[#E7FFDB] text-[#172033] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-2xs space-y-1 border border-[#D0F0C0]">
                      <p className="text-xs font-medium">How much might I have to pay?</p>
                      <p className="text-[9px] text-[#64748B] text-right font-mono">10:43 AM · ✓✓</p>
                    </div>
                  </div>

                  {/* InsureMate Response 2 (Responsible Missing Info State) */}
                  <div className="flex justify-start">
                    <div className="bg-white text-[#172033] rounded-lg rounded-tl-none px-3 py-2.5 max-w-[90%] shadow-2xs space-y-2 border-l-2 border-l-[#F59E0B] border-black/5">
                      <div className="flex items-center gap-1 text-[10px] font-mono font-semibold text-[#B45309]">
                        <AlertCircle className="w-3 h-3 text-[#F59E0B]" />
                        <span>NEED LOCATION & ROOM</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#172033]">
                        I need the treatment location and hospital type before I can estimate reliably.
                      </p>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-1">
                        <span className="text-[9px] font-mono text-[#64748B]">NOT A GUESS</span>
                        <span className="text-[9px] text-[#64748B] font-mono">10:43 AM</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* WhatsApp Chat Input Bar (Disabled preview) */}
                <div className="bg-[#F0F2F5] px-3 py-2 border-t border-slate-200 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-[#64748B] border border-slate-200">
                    Ask about waiting period, room rent...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#00A896] flex items-center justify-center text-white">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Dynamic QR Code Card */}
            <div className="w-full sm:w-[240px] bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="w-full pb-2 border-b border-[#E2E8F0]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A896] font-bold">
                  DIRECT ACCESS
                </span>
                <h3 className="font-display text-base font-bold text-[#0B1F3A] mt-0.5">
                  START ON WHATSAPP
                </h3>
              </div>

              {/* Dynamic QR Code */}
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] shadow-inner group hover:border-[#00A896] transition-colors">
                <QRCodeSVG
                  value={whatsappUrl}
                  size={148}
                  bgColor={"#F8FAFC"}
                  fgColor={"#0B1F3A"}
                  level={"M"}
                  includeMargin={false}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-[#172033] font-medium leading-snug">
                  Scan once to begin your InsureMate conversation.
                </p>
                <p className="text-[11px] text-[#64748B]">
                  No app download. <br />No complicated setup.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-[#0B1F3A] hover:bg-[#00A896] text-white text-xs font-semibold tracking-wide transition-colors uppercase font-mono"
              >
                SCAN TO CHAT
              </a>

              <p className="text-[10px] text-[#64748B] leading-tight pt-1 border-t border-[#F1F5F9]">
                After your first conversation, you can return directly to WhatsApp. You do not need to revisit this website for every question.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
