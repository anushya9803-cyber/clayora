import React, { useState } from 'react';

export const ClayoraFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 py-16 px-4 sm:px-6 lg:px-8 pb-28 md:pb-16 text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Studio Mission */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-medium text-white tracking-tight">
              Clayora Hand Made Products
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Artisanal hand-thrown ceramics and raw terracotta objects. Born from wild local earth, shaped on kick wheels, and fired in small studio batches in Devon, England.
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              Devon Studio Workshop · Hand-Crafted Since 2019
            </div>
          </div>

          {/* Quick Studio Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-serif text-sm font-semibold text-white">Artisanal Collections</div>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#shop-catalog" className="hover:text-white transition-colors">Hand-Thrown Vases</a></li>
              <li><a href="#shop-catalog" className="hover:text-white transition-colors">Speckled Tableware Sets</a></li>
              <li><a href="#shop-catalog" className="hover:text-white transition-colors">Raw Grog Planters</a></li>
              <li><a href="#shop-catalog" className="hover:text-white transition-colors">Incense & Key Trays</a></li>
              <li><a href="#process-section" className="hover:text-white transition-colors">Studio Firing Schedule</a></li>
            </ul>
          </div>

          {/* Studio Batch Dispatch Alerts */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-serif text-sm font-semibold text-white">
              Join Batch Kiln Openings
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Our small batches sell out within hours of leaving the reduction kiln. Sign up to receive 24-hour advance access before public releases.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@domain.com"
                className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#C25E2E]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#C25E2E] hover:bg-[#A94F25] text-white rounded-lg text-xs font-medium transition-colors shrink-0"
              >
                {subscribed ? 'Subscribed' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Clayora Studio. Crafted with patience and authentic human hands.
          </div>
          <div className="flex items-center gap-4">
            <span>Devon, United Kingdom</span>
            <span aria-hidden="true">·</span>
            <span>All Devices Supported (Mobile & Desktop)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
