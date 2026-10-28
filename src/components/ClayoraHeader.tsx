import React from 'react';
import { ShoppingBag, Menu, User, Shield, LogOut, Share2 } from 'lucide-react';

interface ClayoraHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  currentUser: { role: 'guest' | 'customer' | 'admin'; name?: string } | null;
  onOpenAuth: (role?: 'admin' | 'customer') => void;
  onLogout: () => void;
  onOpenAdminPanel: () => void;
  onOpenShareModal: () => void;
}

export const ClayoraHeader: React.FC<ClayoraHeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenMenu,
  activeSection,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenAdminPanel,
  onOpenShareModal,
}) => {
  const navLinks = [
    { id: 'shop', label: 'Artisanal Collection' },
    { id: 'process', label: 'Studio & Craft' },
    { id: 'reviews', label: 'Collector Stories' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-20">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('shop')}
            className="text-2xl sm:text-3xl font-serif tracking-tight text-stone-900 hover:text-[#C25E2E] transition-colors whitespace-nowrap text-left"
          >
            Clayora
          </button>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`transition-colors whitespace-nowrap shrink-0 relative py-1.5 ${
                activeSection === link.id
                  ? 'text-stone-950 font-semibold'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25E2E] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: User Logins, Share & Bag */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Share / Open on Phone Button */}
          <button
            onClick={onOpenShareModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
            title="Get Link to Open on Any Device"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C25E2E]" />
            <span>Open on Phone / Link</span>
          </button>

          {/* User Auth Buttons or Active Session Badge */}
          {currentUser && currentUser.role === 'admin' ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAdminPanel}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#C25E2E] text-white text-xs font-semibold hover:bg-[#A94F25] transition-all shadow-2xs"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Studio</span>
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                title="Sign out from Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : currentUser && currentUser.role === 'customer' ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium">
                <User className="w-3.5 h-3.5 text-[#C25E2E]" />
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('customer')}
                className="px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden sm:inline">Customer Login</span>
                <span className="sm:hidden">Login</span>
              </button>

              <button
                onClick={() => onOpenAuth('admin')}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#C25E2E] hover:text-white hover:bg-[#C25E2E] border border-[#C25E2E]/40 transition-all flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Login</span>
                <span className="sm:hidden">Admin</span>
              </button>
            </div>
          )}

          {/* Bag button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium transition-all shadow-sm active:scale-95"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#E68A5C]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums bg-stone-800 text-[#E68A5C] px-1.5 py-0.5 rounded text-[11px] font-semibold">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger trigger */}
          <button
            onClick={onOpenMenu}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Toggle mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
