import React from 'react';
import { ArrowRight, Flame, Hammer, Check } from 'lucide-react';

interface ClayoraHeroProps {
  onExploreClick: () => void;
  onProcessClick: () => void;
}

export const ClayoraHero: React.FC<ClayoraHeroProps> = ({
  onExploreClick,
  onProcessClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 lg:pt-16 lg:pb-20 border-b border-stone-200/80 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Authentic Human-Craft Storytelling */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata separator */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#C25E2E] tracking-wide uppercase">
              <span>Clayora Studio</span>
              <span aria-hidden="true">·</span>
              <span>Handcrafted In Small Batches</span>
              <span aria-hidden="true">·</span>
              <span>Devon, England</span>
            </div>

            {/* Display Headline in Serif with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-normal tracking-tight text-stone-900 leading-[1.15] [text-wrap:balance]">
              Hand-thrown ceramics and raw terracotta, shaped by patient human hands
            </h1>

            {/* Prose */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-light">
              Every vessel begins as a mound of unrefined local clay on our foot-powered kick wheel. 
              We never use automated slip-casting or synthetic molds. Each piece embraces the subtle finger marks, 
              mineral flecks, and gentle wobbles that give true handmade craft its quiet soul.
            </p>

            {/* Human craftsmanship provenance markers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-600">
              <div className="p-3 bg-stone-100/80 rounded-lg border border-stone-200/60 flex items-start gap-2.5">
                <Hammer className="w-4 h-4 text-[#C25E2E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Wheel Thrown</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Shaped individually on the wheel</div>
                </div>
              </div>

              <div className="p-3 bg-stone-100/80 rounded-lg border border-stone-200/60 flex items-start gap-2.5">
                <Flame className="w-4 h-4 text-[#C25E2E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">1240°C High Kiln</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Wood & gas reduction fired</div>
                </div>
              </div>

              <div className="p-3 bg-stone-100/80 rounded-lg border border-stone-200/60 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C25E2E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Food & Plant Safe</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Natural mineral & ash glazes</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <span>Browse Available Studio Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onProcessClick}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 rounded-lg border border-stone-300 transition-all whitespace-nowrap"
              >
                Our 5-Stage Making Process
              </button>
            </div>
          </div>

          {/* Right Column: Hero Studio Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl group bg-stone-100">
              <img
                src="/src/assets/images/clayora_hero_studio_1793121121329.jpg"
                alt="Artisan ceramicist shaping a wet clay vase on the wheel in the sunlit Clayora studio"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              {/* Styled Fallback */}
              <div
                style={{ display: 'none' }}
                className="w-full h-80 sm:h-96 lg:h-[460px] bg-stone-200 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-stone-300 flex items-center justify-center text-stone-700 mb-3 font-serif text-xl">
                  C
                </div>
                <div className="font-serif text-stone-900 text-lg">Clayora Ceramic Workshop</div>
                <div className="text-xs text-stone-600 mt-1">Devon, England</div>
              </div>

              {/* Subtle natural caption overlay */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 bg-stone-900/85 backdrop-blur-md rounded-xl text-xs text-stone-200 border border-stone-700/60 flex items-center justify-between">
                <div>
                  <div className="font-serif text-white text-sm">Devon Studio Floor</div>
                  <div className="text-[11px] text-stone-400">Master potter Sarah throwing Batch 18</div>
                </div>
                <span className="font-mono text-[11px] tabular-nums text-[#E68A5C] bg-[#C25E2E]/20 px-2.5 py-1 rounded border border-[#C25E2E]/30">
                  Live Firing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
