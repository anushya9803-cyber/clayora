import React from 'react';
import { Shield, User, KeyRound, ArrowRight, Sparkles, LogOut, Download, Share2 } from 'lucide-react';

interface ClayoraFirstPageAuthBarProps {
  currentUser: { role: 'guest' | 'customer' | 'admin'; name?: string } | null;
  onOpenAuth: (role: 'admin' | 'customer') => void;
  onLogout: () => void;
  onOpenAdminPanel: () => void;
  onOpenShareModal: () => void;
}

export const ClayoraFirstPageAuthBar: React.FC<ClayoraFirstPageAuthBarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenAdminPanel,
  onOpenShareModal,
}) => {
  return (
    <section className="py-8 bg-[#F4EFEA] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C25E2E] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dual Portal Access</span>
                <span aria-hidden="true">·</span>
                <span>First Page Logins</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 tracking-tight">
                Select Your Clayora Account Portal
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Access the storefront as a customer to order pottery, or log in as studio administrator to manage kiln inventory and customer orders.
              </p>
            </div>

            {/* Current session or Action cards */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {currentUser && currentUser.role === 'admin' ? (
                <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-xl border border-stone-200 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-lg bg-[#C25E2E] text-white flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Studio Administrator (Active)</div>
                    <div className="text-[11px] text-stone-500 font-mono">Password: anu@9803 verified</div>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={onOpenAdminPanel}
                      className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
                    >
                      Open Dashboard
                    </button>
                    <button
                      onClick={onLogout}
                      className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200"
                      title="Log Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : currentUser && currentUser.role === 'customer' ? (
                <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-xl border border-stone-200 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Welcome, {currentUser.name}</div>
                    <div className="text-[11px] text-stone-500">Customer account active</div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="ml-auto px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors"
                  >
                    Switch Account
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto">
                  {/* Customer Login Card */}
                  <button
                    onClick={() => onOpenAuth('customer')}
                    className="p-4 rounded-xl border border-stone-200 hover:border-stone-400 bg-stone-50/60 hover:bg-white text-left transition-all group flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <User className="w-5 h-5 text-[#E68A5C]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                        <span>Customer Login</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C25E2E]" />
                      </div>
                      <div className="text-[11px] text-stone-500">Order & track ceramics</div>
                    </div>
                  </button>

                  {/* Admin Login Card */}
                  <button
                    onClick={() => onOpenAuth('admin')}
                    className="p-4 rounded-xl border border-[#C25E2E]/30 hover:border-[#C25E2E] bg-[#FAF8F5] hover:bg-white text-left transition-all group flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C25E2E] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#C25E2E] flex items-center gap-1">
                        <span>Admin Login</span>
                        <KeyRound className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Password: <span className="font-mono text-stone-700 font-semibold">anu@9803</span>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Direct Actions: Open Link / QR and Download ZIP */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="./clayora-web-app.zip"
                  download="clayora-web-app.zip"
                  className="flex-1 sm:flex-initial p-3.5 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-800 text-white transition-all flex items-center justify-center gap-2 text-xs font-medium shadow-2xs"
                  title="Download complete project source files as a ZIP archive"
                >
                  <Download className="w-4 h-4 text-[#E68A5C]" />
                  <span>Download ZIP Setup</span>
                </a>

                <button
                  onClick={onOpenShareModal}
                  className="p-3.5 rounded-xl border border-stone-300 hover:border-[#C25E2E] bg-white hover:bg-stone-50 transition-all flex items-center justify-center gap-2 text-xs font-medium text-stone-700"
                  title="Open on Any Device / Get Link"
                >
                  <Share2 className="w-4 h-4 text-[#C25E2E]" />
                  <span className="hidden sm:inline">Get Link / QR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
