import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MessageSquare, RefreshCw, Database, Lock, ArrowRight, Smartphone, Shield, CheckCircle } from 'lucide-react';

export default function WhatsAppSection({ whatsappUrl }) {
  const steps = [
    {
      num: '01',
      title: 'START ONCE',
      desc: 'Scan the QR code and start your conversation immediately. No app download or account password required.',
      icon: Smartphone,
    },
    {
      num: '02',
      title: 'RETURN ANYTIME',
      desc: 'Open WhatsApp whenever you need to ask another policy question or check pre-hospitalization requirements.',
      icon: RefreshCw,
    },
    {
      num: '03',
      title: 'CONTINUE THE CONTEXT',
      desc: 'Your policy and conversation context can be retained securely according to the system’s privacy and retention settings.',
      icon: Database,
    }
  ];

  const timelineSteps = [
    { label: 'WEBSITE', desc: 'Discovery' },
    { label: 'QR', desc: '1-Click Entry' },
    { label: 'WHATSAPP', desc: 'Everyday Interface' },
    { label: 'POLICY', desc: 'PDF / Image Upload' },
    { label: 'QUESTIONS', desc: 'Natural English' },
    { label: 'ANSWERS', desc: 'Evidence-Backed' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#25D366]/10 border border-[#25D366]/20 text-xs font-mono font-bold text-[#15803D] uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            WHATSAPP-FIRST ARCHITECTURE
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight">
            Scan once. <br />
            <span className="text-[#00A896]">Chat anytime.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            The website is only the entry point. Once you start your InsureMate conversation, WhatsApp becomes your ongoing interface.
          </p>
        </div>

        {/* Visual Timeline */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold mb-6 flex items-center gap-2">
            <span>USER JOURNEY ARCHITECTURE</span>
            <span className="h-px flex-1 bg-[#E2E8F0]"></span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {timelineSteps.map((step, idx) => (
              <div key={step.label} className="relative p-3 bg-white rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#00A896] font-bold">0{idx + 1}</span>
                  {idx < timelineSteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#CBD5E1] hidden lg:block -mr-1" />
                  )}
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#0B1F3A] block">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono block mt-0.5">
                    {step.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three Feature Blocks + QR CTA Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 3 Pillars */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.num}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all duration-150 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-2 py-0.5 rounded">
                        {item.num}
                      </span>
                      <IconComp className="w-5 h-5 text-[#0B1F3A]" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0B1F3A] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-[#F1F5F9] flex items-center gap-1.5 text-[11px] text-[#00A896] font-mono font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Friction-free access
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct WhatsApp Action Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0B1F3A] text-white flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#5EEAD4]">
                  INSTANT ONBOARDING
                </span>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-white">
                Begin in 10 seconds on WhatsApp
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with the InsureMate assistant. Ask questions naturally or attach policy documents.
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-xl flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg shrink-0">
                <QRCodeSVG value={whatsappUrl} size={64} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#5EEAD4] font-bold block">
                  FASTEST ACCESS
                </span>
                <p className="text-xs text-white font-medium">
                  Scan to chat or click below:
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5EEAD4] underline font-mono flex items-center gap-1 hover:text-white"
                >
                  Open WhatsApp Web →
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#5EEAD4] shrink-0" />
              <span>Users remain in control of their information and retention preferences.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
