import React from 'react';
import { Compass, Flame, Droplets, SunMedium, Heart, CheckCircle2 } from 'lucide-react';

export const ClayoraProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Earth Sourcing & Wedging',
      desc: 'We use local Devon terracotta and iron-bearing stoneware. Each lump of clay is spiral-wedged by hand on plaster tables to remove micro-bubbles and ensure tensile clay memory.',
      detail: 'Raw unrefined clay blend',
      icon: Droplets,
    },
    {
      num: '02',
      title: 'Wheel Throwing & Centering',
      desc: 'Shaped on manual foot-powered wheels. The rhythm of the potter’s hands dictates the gentle curve of every belly and the flared lip of each bowl.',
      detail: 'Individually turned forms',
      icon: Compass,
    },
    {
      num: '03',
      title: 'Two-Week Cellar Drying',
      desc: 'Greenware is cured slowly under linen cloths in our stone basement. This deliberate drying prevents stress cracks and honors the natural drying pace of heavy clay.',
      detail: 'Zero thermal shock',
      icon: SunMedium,
    },
    {
      num: '04',
      title: '1240°C Kiln Transformation',
      desc: 'Bisque fired, then hand-dipped into botanical ash and feldspar mineral glazes before enduring a 32-hour gas and wood reduction firing.',
      detail: 'Durable vitreous ceramic',
      icon: Flame,
    },
  ];

  return (
    <section id="process-section" className="py-16 sm:py-24 border-b border-stone-200/80 bg-[#F4EFEA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C25E2E] uppercase tracking-wider mb-2">
            <span>The Human Touch</span>
            <span aria-hidden="true">·</span>
            <span>Unrushed Artisanal Craft</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight [text-wrap:balance]">
            Why Clayora looks and feels made by human hands
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            In a world of mass-manufactured plastic and machine-stamped homeware, we spend up to four weeks on every single ceramic piece. Here is our studio lifecycle:
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-[#C25E2E]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-[#C25E2E] tabular-nums">
                      {step.num}
                    </span>
                    <div className="p-2 rounded-lg bg-stone-100 text-stone-700">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500 flex items-center justify-between">
                  <span>{step.detail}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Maker's Note Box */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-stone-200">
            <img
              src="/src/assets/images/clayora_hero_studio_1793121121329.jpg"
              alt="Potter Sarah"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <div className="text-xs font-semibold text-[#C25E2E] uppercase tracking-wider">
              Note from the Maker
            </div>
            <p className="text-sm sm:text-base text-stone-800 font-serif italic leading-relaxed">
              "When you pick up a Clayora mug or vase, you can feel the balance of the clay wall and the quiet memory of the wheel. We make things meant to be held every day, becoming warmer with age."
            </p>
            <div className="text-xs text-stone-500 font-medium pt-1">
              Sarah Jenkins — Lead Ceramicist & Founder, Clayora Studio
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
