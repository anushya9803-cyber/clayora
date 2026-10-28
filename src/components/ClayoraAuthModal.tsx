import React, { useState } from 'react';
import { X, Shield, User, Lock, KeyRound, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';

interface ClayoraAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'admin' | 'customer';
  onLoginSuccess: (user: { role: 'admin' | 'customer'; name: string; email?: string }) => void;
}

export const ClayoraAuthModal: React.FC<ClayoraAuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'customer',
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'admin' | 'customer'>(initialRole);

  // Admin form state
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Customer form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  if (!isOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (adminPassword === 'anu@9803') {
      onLoginSuccess({
        role: 'admin',
        name: 'Studio Administrator',
      });
      setAdminPassword('');
      onClose();
    } else {
      setAdminError('Incorrect admin password. Required password is anu@9803');
    }
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim()) {
      onLoginSuccess({
        role: 'customer',
        name: customerName.trim(),
        email: customerEmail.trim() || 'customer@clayora.local',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border border-stone-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-medium text-stone-900">
              Clayora User Access
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Admin Login vs Customer Login */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setAdminError('');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'customer'
                ? 'bg-white text-stone-900 shadow-2xs border border-stone-300'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4 text-[#C25E2E]" />
            <span>Customer Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setAdminError('');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-white text-[#C25E2E] shadow-2xs border border-stone-300'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shield className="w-4 h-4 text-[#C25E2E]" />
            <span>Admin Login</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {activeTab === 'admin' ? (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C25E2E] uppercase tracking-wider mb-1">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Studio Administration</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  Admin Verification
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Enter the secure master studio password to access inventory control, kiln batches, and customer order management.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    required
                    type="password"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAdminError('');
                    }}
                    placeholder="Enter admin password (anu@9803)"
                    className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C25E2E] transition-all"
                  />
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Default studio password: <code className="font-mono text-[#C25E2E] font-semibold bg-stone-100 px-1 py-0.5 rounded">anu@9803</code>
                </div>
              </div>

              {adminError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{adminError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#C25E2E] hover:bg-[#A94F25] text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Shield className="w-4 h-4" />
                <span>Unlock Studio Admin Panel</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">
                  <User className="w-3.5 h-3.5 text-[#C25E2E]" />
                  <span>Collector & Shopper Portal</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  Customer Sign In
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Log in to track your studio orders, save ceramic vessels, and enjoy seamless one-tap checkout.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Anushya"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C25E2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address or Mobile Number
                </label>
                <input
                  type="text"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. collector@example.com or +91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C25E2E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Continue as Customer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
