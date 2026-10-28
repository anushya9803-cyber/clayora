import React from 'react';
import { Star, Sparkles, ShieldCheck } from 'lucide-react';

export const ClayoraReviews: React.FC = () => {
  const reviews = [
    {
      author: 'Elena Rostova',
      location: 'London, UK',
      vessel: 'Elysian Fluted Terracotta Vase',
      quote: 'You can immediately tell this was thrown on an actual wheel. The subtle ribbing under my fingers and the terracotta warmth on my dining table is breathtaking. Nothing like high-street ceramic copies.',
      date: 'Purchased Batch 17'
    },
    {
      author: 'Marcus Vance',
      location: 'Edinburgh, Scotland',
      vessel: 'Stoneware Dining Plate & Bowl Set',
      quote: 'The unglazed clay rim against the speckled oatmeal glaze is so satisfying. We use them for every meal and they have a comforting, tactile weight in the hands.',
      date: 'Purchased Batch 08'
    },
    {
      author: 'Priya Sundaram',
      location: 'Oxford, UK',
      vessel: 'Crater Grog Sculptural Planter',
      quote: 'The coarse grogged texture feels like ancient weathered sandstone. My trailing string of pearls plant looks sculptural inside it. Arrived securely packed in molded pulp without a scratch.',
      date: 'Purchased Series 03'
    }
  ];

  return (
    <section id="reviews-section" className="py-16 sm:py-24 border-b border-stone-200/80 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#C25E2E] uppercase tracking-wider mb-2">
            <span>Collector Voices</span>
            <span aria-hidden="true">·</span>
            <span>Handmade In Every Home</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
            Cherished by collectors who value the human touch
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Read authentic words from homes living with Clayora pottery.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 star rating */}
                <div className="flex items-center gap-1 text-[#C25E2E]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#C25E2E]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic font-serif">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-stone-900">{rev.author}</div>
                  <div className="text-[11px] text-stone-500">{rev.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-[#C25E2E]">{rev.vessel}</div>
                  <div className="text-[10px] text-stone-400">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Provenance Metric Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-center p-3">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 font-mono tabular-nums">
              4 Weeks
            </div>
            <div className="text-xs text-stone-500 mt-1">Average Craft Cycle</div>
          </div>

          <div className="text-center p-3">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 font-mono tabular-nums">
              1240°C
            </div>
            <div className="text-xs text-stone-500 mt-1">High-Fire Kiln</div>
          </div>

          <div className="text-center p-3">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-stone-500 mt-1">Plastic-Free Packaging</div>
          </div>

          <div className="text-center p-3">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 font-mono tabular-nums">
              Devon
            </div>
            <div className="text-xs text-stone-500 mt-1">Local Red Earth</div>
          </div>
        </div>
      </div>
    </section>
  );
};
