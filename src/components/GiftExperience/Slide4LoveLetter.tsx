import React from 'react';
import { GiftData } from '../../types/gift';
import { ArrowRight, Feather, Heart } from 'lucide-react';

interface Slide4LoveLetterProps {
  giftData: GiftData;
  onNext: () => void;
}

export const Slide4LoveLetter: React.FC<Slide4LoveLetterProps> = ({ giftData, onNext }) => {
  const isHandwritten = giftData.letter.fontStyle === 'handwritten';
  const isTypewriter = giftData.letter.fontStyle === 'typewriter';

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 animate-fadeIn px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[#735b20] font-bold block mb-1">
          Slide 4 • Heartfelt Words
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4e051a]">
          A Handwritten Letter For You
        </h2>
      </div>

      {/* Deckled Cotton Paper */}
      <div className="relative w-full bg-[#fffcf8] shadow-2xl rounded-3xl p-6 sm:p-14 border border-[#eeddd4] deckle-border">
        {/* Archival Keepsake Tag at top-right */}
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#fdf1ec] px-4 py-1.5 rounded-full text-[#735b20] text-[11px] font-semibold uppercase tracking-widest shadow-xs border border-[#dac0c2]/50 flex items-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-[#6b1d2f]" />
          <span>Private & Archival</span>
        </div>

        {/* Salutation & Title */}
        <div className="mb-6 sm:mb-8 pt-2">
          <p className="text-xs uppercase tracking-widest text-[#735b20] font-semibold mb-1">
            {giftData.letter.salutation || `To ${giftData.recipientName},`}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl italic text-[#4e051a]">
            {giftData.letter.title || 'A Letter For You, My Love'}
          </h3>
        </div>

        {/* Ruled Letter Text */}
        <div
          className={`space-y-4 sm:space-y-6 text-[#201a18] whitespace-pre-line leading-relaxed ${
            isHandwritten
              ? 'font-handwriting text-xl sm:text-2xl leading-normal text-[#362f2c]'
              : isTypewriter
              ? 'font-mono text-sm leading-loose tracking-wide'
              : 'font-serif text-base sm:text-lg leading-loose'
          }`}
        >
          {giftData.letter.body}
        </div>

        {/* Signature & Wax Seal */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-[#eeddd4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-sm italic text-[#735b20] mb-0.5">
              {giftData.letter.signoff || 'Always and endlessly yours,'}
            </p>
            <p className="font-serif text-2xl sm:text-3xl italic text-[#4e051a] tracking-tight font-medium">
              {giftData.letter.signature || giftData.authorName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#6b1d2f] text-[#ffd9dd] flex items-center justify-center font-serif text-lg italic shadow-inner border border-[#ffd9dd]/30">
              {giftData.letter.sealInitial || 'T & U'}
            </div>
            <div className="text-left text-[10px] text-[#877274] uppercase tracking-wider font-semibold">
              <span>Sealed with Love</span>
              <br />
              <span>Archived Forever</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button to proceed to the secret suspense / surprise */}
      <div className="flex justify-center mt-10">
        <button
          onClick={onNext}
          className="px-8 py-4 rounded-full bg-[#6b1d2f] text-white text-sm sm:text-base font-medium flex items-center gap-2 shadow-lg hover:bg-[#4e051a] hover:scale-105 active:scale-98 transition-all cursor-pointer"
        >
          <span>Wait... there’s one more secret ✨</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
