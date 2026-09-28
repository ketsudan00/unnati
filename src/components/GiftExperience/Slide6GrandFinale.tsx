import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GiftData } from '../../types/gift';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

interface Slide6GrandFinaleProps {
  giftData: GiftData;
  onRestart: () => void;
}

export const Slide6GrandFinale: React.FC<Slide6GrandFinaleProps> = ({
  giftData,
  onRestart,
}) => {
  const partner1 = giftData.topName1 || giftData.authorName || 'T';
  const partner2 = giftData.topName2 || giftData.recipientName || 'U';
  const forRecipient = giftData.forRecipientName || giftData.recipientName || 'U';
  const fromAuthor = giftData.fromAuthorName || giftData.authorName || 'T';

  useEffect(() => {
    try {
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#6b1d2f', '#ffb2bc', '#fedc94', '#d4af37'],
      });
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 text-center animate-fadeIn px-4">
      <div className="relative w-full bg-white rounded-3xl shadow-2xl border border-[#dac0c2]/50 overflow-hidden p-8 sm:p-14 deckle-border text-center">
        {/* Top Gold & Wine Ribbon */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#6b1d2f] via-[#fedc94] to-[#6b1d2f]"></div>

        <div className="flex items-center justify-center gap-2 text-[#735b20] mb-4 mt-2">
          <Sparkles className="w-4 h-4 text-[#735b20]" />
          <span className="text-xs uppercase tracking-widest font-bold">
            Grand Finale • Slide 6
          </span>
          <Sparkles className="w-4 h-4 text-[#735b20]" />
        </div>

        {/* Monogram Seal */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#4e051a] via-[#6b1d2f] to-[#441417] text-[#ffd9dd] flex flex-col items-center justify-center shadow-lg border border-[#ffd9dd]/30 mb-6">
          <span className="font-serif text-2xl italic tracking-tighter">
            {partner1} & {partner2}
          </span>
          <span className="text-[7px] tracking-widest uppercase opacity-70">FOREVER</span>
        </div>

        {/* Custom Final Message */}
        <h2 className="font-serif text-3xl sm:text-5xl text-[#4e051a] font-medium tracking-tight mb-4 leading-tight">
          {giftData.finalClosingMessage || 'Made with love ❤️'}
        </h2>

        <p className="font-serif text-lg sm:text-2xl italic text-[#735b20] max-w-xl mx-auto mb-6">
          “To {forRecipient}, with all my love from {fromAuthor}.”
        </p>

        {/* Emotional keepsake note */}
        <div className="bg-[#fdf1ec] rounded-2xl p-6 sm:p-8 shadow-inner max-w-lg mx-auto mb-8 border border-[#dac0c2]/40 text-xs sm:text-sm text-[#544244] leading-relaxed italic">
          “For every laugh, every coffee, every quiet touch, and all the unhurried tomorrows waiting for us. Happy {giftData.occasionTitle || '1 Year Since We Met'}.”
        </div>

        {/* Closing Sentiment & Date */}
        <div className="flex flex-col items-center justify-center gap-2 pt-6 border-t border-[#dac0c2]/30">
          <div className="flex items-center gap-2 text-[#4e051a] font-serif text-xl sm:text-2xl italic font-medium">
            <span>Made with love</span>
            <Heart className="w-5 h-5 fill-[#6b1d2f] text-[#6b1d2f]" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#735b20] font-semibold">
            {giftData.celebrationDate || 'October 14, 2025'} • Forever & Always
          </p>

          <button
            onClick={onRestart}
            className="mt-6 px-7 py-3 rounded-full bg-[#fdf1ec] text-[#4e051a] hover:bg-[#f8ebe6] transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-[#dac0c2]/40 shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Relive from Slide 1 (Envelope)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
