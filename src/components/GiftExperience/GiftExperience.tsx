import React from 'react';
import { GiftData } from '../../types/gift';
import { THEMES } from '../../data/defaultGift';
import { Slide1WelcomeEnvelope } from './Slide1WelcomeEnvelope';
import { Slide2NoteAndSong } from './Slide2NoteAndSong';
import { Slide3OurAlbum } from './Slide3OurAlbum';
import { Slide4LoveLetter } from './Slide4LoveLetter';
import { Slide5SecretSurprise } from './Slide5SecretSurprise';
import { Slide6GrandFinale } from './Slide6GrandFinale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GiftExperienceProps {
  giftData: GiftData;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const GiftExperience: React.FC<GiftExperienceProps> = ({
  giftData,
  currentSlide,
  setCurrentSlide,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const totalSlides = 6;
  const activeTheme = THEMES[giftData.theme] || THEMES.vintage;

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1WelcomeEnvelope giftData={giftData} onNext={nextSlide} />;
      case 2:
        return (
          <Slide2NoteAndSong
            giftData={giftData}
            onNext={nextSlide}
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={onToggleAudio}
          />
        );
      case 3:
        return <Slide3OurAlbum giftData={giftData} onNext={nextSlide} />;
      case 4:
        return <Slide4LoveLetter giftData={giftData} onNext={nextSlide} />;
      case 5:
        return <Slide5SecretSurprise giftData={giftData} onNext={nextSlide} />;
      case 6:
        return (
          <Slide6GrandFinale
            giftData={giftData}
            onRestart={() => {
              setCurrentSlide(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      default:
        return <Slide1WelcomeEnvelope giftData={giftData} onNext={nextSlide} />;
    }
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-between py-6 px-4 transition-colors duration-500 relative"
      style={{ backgroundColor: activeTheme.colors.bg }}
    >
      {/* Subtle atmospheric glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#fedc94]/15 blur-[150px]"></div>
        <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] rounded-full bg-[#ffd9dd]/20 blur-[140px]"></div>
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        {renderSlideContent()}
      </div>

      {/* Slide Navigation Footer Bar */}
      <div className="relative z-10 w-full max-w-xl mx-auto pt-8 pb-4 flex items-center justify-between text-xs text-[#544244]">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all ${
            currentSlide === 1
              ? 'opacity-30 cursor-not-allowed border-transparent'
              : 'border-[#dac0c2]/50 hover:bg-[#fdf1ec] text-[#4e051a] cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        {/* Slide Dots and Indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i + 1)}
              className={`rounded-full transition-all cursor-pointer ${
                currentSlide === i + 1
                  ? 'w-6 h-2.5 bg-[#6b1d2f]'
                  : 'w-2.5 h-2.5 bg-[#dac0c2]/60 hover:bg-[#6b1d2f]/50'
              }`}
              title={`Go to Slide ${i + 1}`}
            />
          ))}
          <span className="text-[11px] font-mono text-[#735b20] ml-1">
            {currentSlide} / {totalSlides}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
            currentSlide === totalSlides
              ? 'opacity-30 cursor-not-allowed'
              : 'bg-[#6b1d2f] text-white hover:bg-[#4e051a] shadow-xs cursor-pointer'
          }`}
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
