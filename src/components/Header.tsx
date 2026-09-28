import React from 'react';
import { Volume2, VolumeX, Share2, Sparkles, RotateCcw } from 'lucide-react';
import { GiftData } from '../types/gift';

interface HeaderProps {
  mode: 'studio' | 'recipient';
  setMode: (mode: 'studio' | 'recipient') => void;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenExport: () => void;
  onResetData: () => void;
  giftData: GiftData;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  currentSlide,
  setCurrentSlide,
  isAudioPlaying,
  onToggleAudio,
  onOpenExport,
  onResetData,
  giftData,
}) => {
  const slides = [
    { num: 1, label: '1. Envelope' },
    { num: 2, label: '2. Note & Song' },
    { num: 3, label: '3. Our Album' },
    { num: 4, label: '4. Love Letter' },
    { num: 5, label: '5. Surprise' },
    { num: 6, label: '6. Finale' },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-[#fff8f6]/95 backdrop-blur-xl border-b border-[#dac0c2]/30 shadow-[0_1px_8px_rgba(42,36,33,0.04)]">
      <div className="h-16 md:h-18 w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
        {/* Brand & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => setMode('recipient')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#6b1d2f] text-[#ffd9dd] flex items-center justify-center font-serif text-lg md:text-xl italic shadow-inner">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg tracking-tight text-[#4e051a] font-semibold leading-tight">
                Mon Trésor
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#735b20] font-medium">
                Atelier de l'Amour
              </span>
            </div>
          </button>

          <div className="h-6 w-[1px] bg-[#dac0c2]/50 hidden sm:block"></div>

          {/* Mode Switcher */}
          <nav className="flex items-center gap-1 p-1 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/30">
            <button
              onClick={() => setMode('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                mode === 'studio'
                  ? 'bg-[#6b1d2f] text-white shadow-sm font-semibold'
                  : 'text-[#544244] hover:text-[#201a18]'
              }`}
            >
              Creator Studio
            </button>
            <button
              onClick={() => setMode('recipient')}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                mode === 'recipient'
                  ? 'bg-[#6b1d2f] text-white shadow-sm font-semibold'
                  : 'text-[#544244] hover:text-[#201a18]'
              }`}
            >
              Gift Experience
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Button */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#6b1d2f] text-white border-[#6b1d2f] shadow-sm animate-pulse'
                : 'bg-white text-[#735b20] border-[#dac0c2]/50 hover:bg-[#fdf1ec]'
            }`}
            title={isAudioPlaying ? 'Mute audio' : 'Play romantic music'}
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">
              {isAudioPlaying ? 'Playing: Our Song' : 'Play Music'}
            </span>
          </button>

          {/* Reset button */}
          <button
            onClick={onResetData}
            className="p-2 rounded-full text-[#544244] hover:text-[#4e051a] hover:bg-[#fdf1ec] transition-colors cursor-pointer"
            title="Reset to default keepsake"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Save / Export Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 md:py-2 rounded-full bg-[#6b1d2f] text-white hover:bg-[#4e051a] transition-all shadow-sm text-xs md:text-sm font-semibold cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Save & Share</span>
          </button>
        </div>
      </div>

      {/* Recipient Mode Sub-Header: Slide Step Strip */}
      {mode === 'recipient' && (
        <div className="w-full px-4 sm:px-8 py-2 bg-[#fdf1ec]/90 border-t border-[#dac0c2]/30 flex items-center justify-between overflow-x-auto gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#6b1d2f] animate-ping"></span>
            <span className="font-serif italic text-xs md:text-sm text-[#4e051a]">
              {giftData.greetingTitle || 'Hello cutie ❤️'} • {giftData.occasionTitle || '1 Year Since We Met'}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 overflow-x-auto py-0.5">
            {slides.map((s) => (
              <button
                key={s.num}
                onClick={() => setCurrentSlide(s.num)}
                className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                  currentSlide === s.num
                    ? 'bg-[#6b1d2f] text-white font-medium shadow-xs'
                    : 'text-[#544244] hover:text-[#4e051a] hover:bg-white/60'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
