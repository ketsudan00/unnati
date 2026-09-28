import React, { useState } from 'react';
import { GiftData } from '../types/gift';
import {
  generateStandaloneGiftHtml,
  downloadFile,
  compressGiftDataToHash,
} from '../utils/export';
import { X, Download, Share2, Copy, Check, FileCode, FileJson, Sparkles } from 'lucide-react';

interface ExportModalProps {
  giftData: GiftData;
  onClose: () => void;
  onImportData: (data: GiftData) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  giftData,
  onClose,
  onImportData,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [importError, setImportError] = useState('');

  // Generate shareable link
  const getShareableUrl = () => {
    const origin = window.location.origin + window.location.pathname;
    const hash = compressGiftDataToHash(giftData);
    return `${origin}#gift=${hash}`;
  };

  const handleCopyLink = () => {
    const url = getShareableUrl();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleDownloadStandaloneHtml = () => {
    const html = generateStandaloneGiftHtml(giftData);
    const filename = `Mon-Tresor-Gift-for-${giftData.recipientName.replace(/\s+/g, '-')}.html`;
    downloadFile(filename, html, 'text/html');
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(giftData, null, 2);
    const filename = `mon-tresor-capsule-${giftData.recipientName.toLowerCase()}.json`;
    downloadFile(filename, jsonStr, 'application/json');
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          if (parsed.recipientName && parsed.memories) {
            onImportData(parsed);
            onClose();
          } else {
            setImportError('Invalid keepsake configuration file.');
          }
        } catch {
          setImportError('Failed to parse JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#dac0c2]/40 relative animate-scaleUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent header glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ffd9dd]/40 rounded-full blur-xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#544244] hover:bg-[#fdf1ec] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-[#735b20] font-bold block mb-1">
            Deliver Your Gift
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#4e051a] font-medium">
            Save & Share {giftData.recipientName}'s Keepsake
          </h2>
          <p className="text-xs sm:text-sm text-[#544244] mt-1">
            Send the finished romantic present to your boyfriend. He will only see the beautiful gift experience without the editor!
          </p>
        </div>

        {/* Options Stack */}
        <div className="space-y-4">
          {/* Option 1: Standalone HTML Download */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fdf1ec] border border-[#dac0c2]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileCode className="w-4 h-4 text-[#6b1d2f]" />
                <h4 className="font-serif text-base font-bold text-[#4e051a]">
                  Download Standalone HTML Gift
                </h4>
              </div>
              <p className="text-xs text-[#544244] max-w-sm">
                A single self-contained web file with your photos, letter, and music. Send via AirDrop, WhatsApp, or email. Works offline!
              </p>
            </div>
            <button
              onClick={handleDownloadStandaloneHtml}
              className="px-4 py-2.5 rounded-full bg-[#6b1d2f] text-white hover:bg-[#4e051a] text-xs font-semibold shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .HTML</span>
            </button>
          </div>

          {/* Option 2: Shareable Link */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dac0c2]/50 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#735b20]" />
                <h4 className="font-serif text-base font-bold text-[#4e051a]">
                  Copy Private Gift Link
                </h4>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#735b20] bg-[#fdf1ec] px-2 py-0.5 rounded-full">
                Instant Web Link
              </span>
            </div>
            <p className="text-xs text-[#544244]">
              Contains all your personalized customizations encoded into the link. Opens directly in Recipient View.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={getShareableUrl().slice(0, 48) + '...'}
                className="w-full px-3 py-2 rounded-xl bg-[#fdf1ec] text-xs text-[#544244] font-mono border border-[#dac0c2]/40 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-[#6b1d2f] text-white hover:bg-[#4e051a] text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Option 3: JSON Backup & Restore */}
          <div className="p-4 rounded-2xl bg-[#fffcf8] border border-[#eeddd4] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4 text-[#735b20]" />
              <span className="text-[#544244]">Export/Import raw project backup:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadJson}
                className="text-xs text-[#735b20] underline hover:text-[#4e051a] cursor-pointer"
              >
                Export JSON
              </button>
              <span className="text-gray-300">•</span>
              <label className="text-xs text-[#6b1d2f] underline hover:text-[#4e051a] cursor-pointer">
                <span>Import JSON</span>
                <input type="file" accept=".json" className="hidden" onChange={handleJsonUpload} />
              </label>
            </div>
          </div>
          {importError && <p className="text-xs text-rose-600">{importError}</p>}
        </div>

        <div className="mt-6 pt-4 border-t border-[#dac0c2]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#fdf1ec] text-[#4e051a] font-semibold text-xs hover:bg-[#f8ebe6] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
