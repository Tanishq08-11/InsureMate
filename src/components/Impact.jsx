import React from 'react';
import { User, Users, Building2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Impact() {
  const impacts = [
    {
      role: 'PATIENTS',
      title: 'Understand coverage before treatment.',
      desc: 'Verify waiting periods, sub-limits, and admissible clauses prior to planned hospitalizations without reading 50-page legal contracts.',
      icon: User,
      benefit: 'Clarity before admission'
    },
    {
      role: 'FAMILIES',
      title: 'Know potential financial share before the bill arrives.',
      desc: 'Prepare for non-payable consumables, room-rent differentials, and co-payments in advance to avoid last-minute discharge surprises.',
      icon: Users,
      benefit: 'Predictable budgeting'
    },
    {
      role: 'HOSPITALS',
      title: 'Reduce repetitive policy interpretation.',
      desc: 'Help TPA and insurance coordination desks by giving patients clear, pre-adjudicated context on what their specific plan permits.',
      icon: Building2,
      benefit: 'Frictionless billing desk'
    },
    {
      role: 'INSURANCE ECOSYSTEM',
      title: 'Make complex policy information easier to access.',
      desc: 'Bridge the trust deficit between policyholders and insurers through transparent clause citation and responsible communication.',
      icon: ShieldCheck,
      benefit: 'Transparent policyholder trust'
    }
  ];

  return (
    <section id="impact" className="py-20 lg:py-28 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00A896]/10 border border-[#00A896]/20 text-xs font-mono font-bold text-[#00A896] uppercase">
            <HeartHandshake className="w-3.5 h-3.5" />
            MEASURED IMPACT
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight">
            Make insurance information <br />
            <span className="text-[#00A896]">usable in real life.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Practical clarity for everyday healthcare decisions — without hyperbolic claims.
          </p>
        </div>

        {/* 4 Editorial Blocks */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {impacts.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.role}
                className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all duration-150 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00A896] bg-white px-2.5 py-1 rounded border border-[#E2E8F0]">
                      {item.role}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#0B1F3A] flex items-center justify-center text-[#5EEAD4]">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1F3A] tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#0B1F3A] font-semibold">{item.benefit}</span>
                  <span className="text-[#00A896]">Grounded in policy data</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
