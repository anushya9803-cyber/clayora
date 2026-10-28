import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, Shield, User } from 'lucide-react';
import { DeviceMode } from '../types';

interface DeviceSimulatorBarProps {
  deviceMode: DeviceMode;
  onDeviceModeChange: (mode: DeviceMode) => void;
  currentUser: { role: 'guest' | 'customer' | 'admin'; name?: string } | null;
  onOpenAuth: (role: 'admin' | 'customer') => void;
}

export const DeviceSimulatorBar: React.FC<DeviceSimulatorBarProps> = ({
  deviceMode,
  onDeviceModeChange,
  currentUser,
  onOpenAuth,
}) => {
  return (
    <aside aria-label="Device simulation toolbar" className="sticky top-0 z-50 w-full bg-[#1C1917]/95 backdrop-blur-md border-b border-stone-800 text-stone-200 px-3 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Device Switcher Controls */}
        <div className="flex items-center gap-1 bg-stone-900 border border-stone-800 p-1 rounded-lg">
          <span className="px-2 text-stone-400 font-medium hidden sm:inline">Preview:</span>
          <button
            onClick={() => onDeviceModeChange('responsive')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              deviceMode === 'responsive'
                ? 'bg-[#C25E2E] text-white shadow-2xs'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
            title="Auto Responsive (Fluid 100% Width)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Fluid 100%</span>
          </button>

          <button
            onClick={() => onDeviceModeChange('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#C25E2E] text-white shadow-2xs'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
            title="Desktop 1440px baseline"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => onDeviceModeChange('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              deviceMode === 'tablet'
                ? 'bg-[#C25E2E] text-white shadow-2xs'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
            title="Tablet 768px view"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => onDeviceModeChange('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              deviceMode === 'mobile'
                ? 'bg-[#C25E2E] text-white shadow-2xs'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
            title="Mobile 390px iPhone frame with touch bottom nav"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Human-Made & Active Topic Badge */}
        <div className="hidden lg:flex items-center gap-2 text-stone-300 font-mono text-[11px] tabular-nums">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-white">Clayora Hand Made Products</span>
          <span className="text-stone-500">·</span>
          <span className="text-stone-400">Mobile & Desktop Responsive</span>
        </div>

        {/* Quick Logins in Simulator Bar */}
        <div className="flex items-center gap-2">
          {currentUser && currentUser.role === 'admin' ? (
            <span className="px-2.5 py-1 rounded-md bg-[#C25E2E]/20 text-[#E68A5C] border border-[#C25E2E]/40 font-mono text-[11px] font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Logged In (anu@9803)</span>
            </span>
          ) : currentUser && currentUser.role === 'customer' ? (
            <span className="px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 border border-stone-700 text-[11px] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#E68A5C]" />
              <span>{currentUser.name} (Customer)</span>
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('customer')}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-[11px] transition-colors"
              >
                Customer Login
              </button>
              <button
                onClick={() => onOpenAuth('admin')}
                className="px-2.5 py-1 rounded bg-[#C25E2E]/20 hover:bg-[#C25E2E] text-[#E68A5C] hover:text-white border border-[#C25E2E]/40 text-[11px] font-semibold transition-colors flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
