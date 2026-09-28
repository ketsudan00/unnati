import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GiftData } from '../../types/gift';
import { romanticAudio } from '../../utils/audio';
import { Heart, Send, Sparkles } from 'lucide-react';

interface Slide1WelcomeEnvelopeProps {
  giftData: GiftData;
  onNext: () => void;
}

export const Slide1WelcomeEnvelope: React.FC<Slide1WelcomeEnvelopeProps> = ({
  giftData,
  onNext,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  // Separate name bars: Top header couple names (& part) and dedicated For/From dedication
  const partner1 = giftData.topName1 || giftData.authorName || 'T';
  const partner2 = giftData.topName2 || giftData.recipientName || 'U';
  const forRecipient = giftData.forRecipientName || giftData.recipientName || 'U';
  const fromAuthor = giftData.fromAuthorName || giftData.authorName || 'T';

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio & tactile feedback
    romanticAudio.playWaxSealCrack();

    // Celebratory romantic confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#6b1d2f', '#ffb2bc', '#fedc94', '#fff8f6'],
      });
    } catch {
      // Ignore
    }

    setTimeout(() => {
      onNext();
    }, 650);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 text-center animate-fadeIn px-4">
      {/* 1. Welcoming Hero Title: "Hello cutie ❤️", Happy 1 Year Since We Met, T & U */}
      <div className="mb-8 sm:mb-10 flex flex-col items-center">
        {/* Top Header Couple Names (& part) Monogram Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#fdf1ec] border border-[#dac0c2]/60 text-[#4e051a] text-xs font-semibold mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#735b20]" />
          <span className="font-serif font-bold text-sm tracking-widest uppercase">
            {partner1} & {partner2}
          </span>
          <span className="text-[#dac0c2]">•</span>
          <span className="text-[#735b20]">{giftData.milestone || '365 Days Together'}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#4e051a] font-medium tracking-tight mb-3">
          {giftData.greetingTitle || 'Hello cutie ❤️'}
        </h1>

        <p className="font-serif text-xl sm:text-2xl italic text-[#735b20] max-w-xl">
          Happy {giftData.occasionTitle || '1 Year Since We Met'}
        </p>

        <p className="text-xs sm:text-sm text-[#544244] max-w-md mt-2 leading-relaxed">
          {giftData.occasionTagline || 'For every quiet morning, starry drive, and infinite tomorrows with you.'}
        </p>
      </div>

      {/* 2. The Interactive Envelope Below */}
      <div className="relative w-full max-w-md group">
        {/* Postal Airmail Stamp with Top Names */}
        <div className="absolute -top-5 right-4 z-20 flex flex-col items-center transform rotate-6 pointer-events-none">
          <div className="bg-[#f8ebe6] px-3.5 py-1.5 rounded shadow-sm text-[#4e051a] flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold border border-[#dac0c2]/50">
            <span>{partner1} & {partner2} • KEEPSAKE</span>
            <Send className="w-2.5 h-2.5" />
          </div>
          <div className="w-16 h-7 -mt-1 opacity-45 flex items-center justify-center text-[#735b20]">
            <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 60 24">
              <path d="M2 12 Q 15 2, 30 12 T 58 12" />
              <path d="M2 16 Q 15 6, 30 16 T 58 16" />
            </svg>
          </div>
        </div>

        {/* Envelope Body */}
        <div
          onClick={handleOpenEnvelope}
          className={`relative bg-[#fdf1ec] rounded-3xl shadow-2xl border border-[#dac0c2]/60 overflow-hidden pt-12 pb-14 px-6 sm:px-10 cursor-pointer transition-all duration-500 ${
            isOpening ? 'scale-105 opacity-80 rotate-1' : 'hover:scale-[1.02] hover:shadow-3xl'
          }`}
        >
          {/* Top flap illusion */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#ece0db] to-transparent opacity-60 pointer-events-none"></div>

          {/* For & From Dedication Bar */}
          <div className="w-full flex justify-center mb-6">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#735b20] font-semibold bg-white/70 px-4 py-1.5 rounded-full border border-[#dac0c2]/40 shadow-2xs">
              For {forRecipient} • With Love From {fromAuthor}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl italic text-[#4e051a] mb-3">
            Private & Confidential
          </h2>

          <p className="text-xs sm:text-sm text-[#544244] max-w-xs mx-auto mb-8 leading-relaxed">
            {giftData.openingMessage ||
              "Someone spent midnight hours building a quiet little universe solely for your heart. There's an envelope waiting below just for you..."}
          </p>

          {/* 3D Wax Seal Button */}
          <div className="relative flex flex-col items-center justify-center">
            <div
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#4e051a] via-[#6b1d2f] to-[#441417] shadow-2xl flex items-center justify-center transition-transform duration-300 ${
                isOpening ? 'scale-110' : 'group-hover:scale-105'
              }`}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#6b1d2f] to-[#4e051a] shadow-inner flex items-center justify-center p-2 border border-[#ffd9dd]/30">
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center text-[#ffd9dd]">
                  <span className="font-serif text-2xl sm:text-3xl italic tracking-tighter">
                    {giftData.letter.sealInitial || `${partner1} & ${partner2}`}
                  </span>
                  <span className="text-[8px] font-sans tracking-widest uppercase opacity-75 mt-[-2px]">
                    MMXXV
                  </span>
                </div>
              </div>
              <div className="absolute -inset-2 rounded-full bg-[#6b1d2f]/20 animate-ping pointer-events-none"></div>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs text-[#735b20] font-semibold group-hover:text-[#4e051a] transition-colors">
              <Heart className="w-3.5 h-3.5 fill-[#6b1d2f] text-[#6b1d2f]" />
              <span>Click the envelope or wax seal to open 💌</span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs text-[#877274] italic">
          Keepsake dedicated to {giftData.recipientNickname || forRecipient} by {fromAuthor} ❤️
        </p>
      </div>
    </div>
  );
};
