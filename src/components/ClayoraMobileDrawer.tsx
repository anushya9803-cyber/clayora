import React from 'react';
import { X, User, Shield, ShoppingBag, Check } from 'lucide-react';

interface ClayoraMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenCart: () => void;
  cartCount: number;
  currentUser: { role: 'guest' | 'customer' | 'admin'; name?: string } | null;
  onOpenAuth: (role: 'admin' | 'customer') => void;
  onLogout: () => void;
  onOpenAdminPanel: () => void;
}

export const ClayoraMobileDrawer: React.FC<ClayoraMobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  onOpenCart,
  cartCount,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenAdminPanel,
}) => {
  if (!isOpen) return null;

  const links = [
    { id: 'shop', label: 'Artisanal Collection' },
    { id: 'process', label: 'Studio & Craft Lifecycle' },
    { id: 'reviews', label: 'Collector Reviews' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-4/5 max-w-xs bg-[#FAF8F5] border-r border-stone-200 h-full p-6 flex flex-col justify-between text-stone-900 shadow-2xl overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <span className="font-serif text-2xl font-medium text-stone-900">
                Clayora
              </span>
              <p className="text-[11px] text-[#C25E2E] uppercase tracking-wider font-medium">
                Handmade Ceramics
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Account Profile State */}
          <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs space-y-2">
            {currentUser && currentUser.role === 'admin' ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#C25E2E] font-semibold">
                  <Shield className="w-4 h-4" />
                  <span>Admin Session Active</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdminPanel();
                  }}
                  className="w-full py-2 bg-[#C25E2E] text-white rounded-lg text-xs font-semibold"
                >
                  Open Studio Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-1.5 text-stone-500 hover:text-stone-800 text-[11px]"
                >
                  Sign Out
                </button>
              </div>
            ) : currentUser && currentUser.role === 'customer' ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-stone-800 font-semibold">
                  <User className="w-4 h-4 text-[#C25E2E]" />
                  <span>Welcome, {currentUser.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] text-stone-500 font-medium">Account Portals:</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAuth('customer');
                    }}
                    className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-center text-xs"
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAuth('admin');
                    }}
                    className="p-2 rounded-lg bg-[#C25E2E]/10 hover:bg-[#C25E2E]/20 text-[#C25E2E] font-semibold text-center text-xs border border-[#C25E2E]/30"
                  >
                    Admin
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  onClose();
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <Check className="w-4 h-4 text-[#E68A5C]" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-200 space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 text-white rounded-xl text-xs font-medium hover:bg-stone-800 transition-colors shadow-2xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#E68A5C]" />
            <span>Open Shopping Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
