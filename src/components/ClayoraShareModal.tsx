import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Globe, ExternalLink, Download, FileArchive } from 'lucide-react';

interface ClayoraShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const ClayoraShareModal: React.FC<ClayoraShareModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    appUrl
  )}&bgcolor=FAF8F5&color=1C1917&margin=6`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border border-stone-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#C25E2E]" />
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Open App or Download Files
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Direct ZIP Download Box */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
              <FileArchive className="w-4 h-4 text-[#C25E2E]" />
              <span>Full Project Setup (.ZIP)</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Includes all React + TypeScript source files, images, Tailwind CSS, components, and GitHub Pages deployment workflow.
            </p>
            <a
              href="./clayora-web-app.zip"
              download="clayora-web-app.zip"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-2xs transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-[#E68A5C]" />
              <span>Download clayora-web-app.zip (~4.9 MB)</span>
            </a>
          </div>

          {/* Link box with Copy Button */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Live Web App URL (Open on Any Device)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono text-stone-800 select-all focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 shrink-0 ${
                  copied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#C25E2E] hover:bg-[#A94F25] text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* QR Code for instant phone camera scanning */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-4">
            <div className="w-20 h-20 bg-white p-1 rounded-lg border border-stone-300 shrink-0 shadow-2xs flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt="QR Code to open web app on mobile"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#C25E2E]" />
                <span>Instant Mobile Scan</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Scan with your phone camera to view in mobile browser.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#C25E2E] font-medium hover:underline"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
