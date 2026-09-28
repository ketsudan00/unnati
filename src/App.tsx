/**
 * Mon Trésor - Personalized Romantic Keepsake & Interactive Story Slides
 */
import React, { useState, useEffect } from 'react';
import { GiftData } from './types/gift';
import { DEFAULT_GIFT_DATA } from './data/defaultGift';
import { Header } from './components/Header';
import { CustomizerStudio } from './components/Customizer/CustomizerStudio';
import { GiftExperience } from './components/GiftExperience/GiftExperience';
import { ExportModal } from './components/ExportModal';
import { romanticAudio } from './utils/audio';
import { decompressGiftDataFromHash } from './utils/export';

const LOCAL_STORAGE_KEY = 'mon_tresor_gift_data_v3';

export default function App() {
  const [giftData, setGiftData] = useState<GiftData>(() => {
    // 1. Check URL hash for shared gift
    if (window.location.hash.startsWith('#gift=')) {
      const hashStr = window.location.hash.replace('#gift=', '');
      const sharedData = decompressGiftDataFromHash(hashStr);
      if (sharedData) return sharedData;
    }

    // 2. Check localStorage
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.letter && (parsed.letter.sealInitial === 'J & E' || !parsed.letter.sealInitial)) {
          parsed.letter.sealInitial = 'T & U';
        }
        return parsed;
      }
    } catch {
      // Ignore
    }

    // 3. Fallback to default
    return DEFAULT_GIFT_DATA;
  });

  // Default to recipient slide view if shared or URL specifies view=gift
  const [mode, setMode] = useState<'studio' | 'recipient'>(() => {
    if (
      window.location.hash.startsWith('#gift=') ||
      window.location.search.includes('view=gift')
    ) {
      return 'recipient';
    }
    return 'studio';
  });

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Subscribe to audio changes
  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Update audio custom file if changed
  useEffect(() => {
    if (giftData.music.customAudioDataUrl) {
      romanticAudio.setCustomAudio(giftData.music.customAudioDataUrl);
    }
  }, [giftData.music.customAudioDataUrl]);

  // Autosave to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(giftData));
    } catch {
      // Ignore quota
    }
  }, [giftData]);

  const handleToggleAudio = () => {
    romanticAudio.toggleMusic();
  };

  const handleResetData = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setGiftData(DEFAULT_GIFT_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f6] text-[#201a18] select-none font-sans">
      {/* Universal Atelier Header */}
      <Header
        mode={mode}
        setMode={setMode}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenExport={() => setIsExportModalOpen(true)}
        onResetData={handleResetData}
        giftData={giftData}
      />

      {/* Main Content Body */}
      <main className="flex-1 w-full">
        {mode === 'studio' ? (
          <CustomizerStudio
            giftData={giftData}
            setGiftData={setGiftData}
            onOpenPreview={() => {
              setMode('recipient');
              setCurrentSlide(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenExport={() => setIsExportModalOpen(true)}
            onResetData={handleResetData}
          />
        ) : (
          <GiftExperience
            giftData={giftData}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={handleToggleAudio}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#fdf1ec] border-t border-[#dac0c2]/30 py-6 px-6 text-center text-xs text-[#544244]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-bold text-[#4e051a]">Mon Trésor</span>
            <span>— An intimate keepsake atelier for timeless romantic declarations.</span>
          </div>
          <div className="flex items-center gap-4 text-[#735b20] font-medium">
            <span>Handcrafted with archival care</span>
            <span>•</span>
            <span>For {giftData.recipientName} with all my love ❤️</span>
          </div>
        </div>
      </footer>

      {/* Export / Share Modal */}
      {isExportModalOpen && (
        <ExportModal
          giftData={giftData}
          onClose={() => setIsExportModalOpen(false)}
          onImportData={(data) => setGiftData(data)}
        />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#dac0c2]/40 text-center animate-scaleUp">
            <h3 className="font-serif text-xl font-bold text-[#4e051a] mb-2">
              Reset All Customizations?
            </h3>
            <p className="text-xs text-[#544244] mb-6 leading-relaxed">
              This will restore all default photos, memories, and letter text. Are you sure you want to start fresh?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2 rounded-full bg-[#fdf1ec] text-[#544244] text-xs font-semibold hover:bg-[#f8ebe6] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="px-5 py-2 rounded-full bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm cursor-pointer"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
