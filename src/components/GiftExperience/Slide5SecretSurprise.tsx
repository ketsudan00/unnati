import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GiftData } from '../../types/gift';
import { romanticAudio } from '../../utils/audio';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface Slide5SecretSurpriseProps {
  giftData: GiftData;
  onNext: () => void;
}

export const Slide5SecretSurprise: React.FC<Slide5SecretSurpriseProps> = ({
  giftData,
  onNext,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Luxurious gold metallic scratch layer
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#e3c37d');
    grad.addColorStop(0.3, '#fedc94');
    grad.addColorStop(0.6, '#d4af37');
    grad.addColorStop(1, '#ffdf9c');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(115, 91, 32, 0.45)';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Rub or scratch here to reveal ✨', canvas.width / 2, canvas.height / 2 + 5);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2, false);
    ctx.fill();

    const newPercent = Math.min(100, scratchPercent + 3);
    setScratchPercent(newPercent);

    if (newPercent > 25 && !isRevealed) {
      triggerReveal();
    }
  };

  const triggerReveal = () => {
    setIsRevealed(true);
    romanticAudio.playWaxSealCrack();

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffd9dd', '#fedc94', '#6b1d2f', '#ffffff'],
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 text-center animate-fadeIn px-4">
      <div className="relative w-full bg-[#251e20] text-[#fceced] rounded-3xl shadow-2xl p-8 sm:p-12 overflow-hidden border border-[#4a383b]">
        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#6b1d2f]/30 blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#735b20]/25 blur-[80px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[#ffdf9c] mb-5 shadow-inner">
            <Sparkles className="w-8 h-8 animate-spin text-[#ffdf9c]" style={{ animationDuration: '6s' }} />
          </div>

          <span className="text-xs uppercase tracking-[0.24em] text-[#ffdf9c] font-bold block mb-2">
            Slide 5 • Secret Surprise
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fceced] tracking-tight mb-3">
            {giftData.surprise.teaserHeadline || 'Wait... there’s one more thing.'}
          </h2>

          <p className="text-xs sm:text-sm text-[#baa3a7] max-w-md mx-auto mb-8 leading-relaxed">
            {giftData.surprise.teaserSubhead ||
              'A secret surprise kept just between the two of us until this very moment...'}
          </p>

          {/* Interactive Scratch-off */}
          {!isRevealed ? (
            <div className="w-full max-w-md mx-auto flex flex-col items-center">
              <div className="relative w-full max-w-[360px] aspect-[16/8] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#ffdf9c]/50 cursor-pointer">
                {/* Hidden message underneath */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4e051a] to-[#251e20] flex flex-col items-center justify-center p-4 text-white text-center">
                  <span className="text-[11px] uppercase tracking-widest text-[#ffdf9c] font-bold">
                    ❤️ Secret Unlocked
                  </span>
                  <span className="font-serif text-lg font-bold text-white mt-1">
                    {giftData.surprise.secretTitle}
                  </span>
                  <span className="text-xs text-[#ffd9dd] mt-1 italic">
                    {giftData.surprise.secretSubtitle}
                  </span>
                </div>

                {/* Gold scratch canvas */}
                <canvas
                  ref={canvasRef}
                  width={360}
                  height={180}
                  className="absolute inset-0 w-full h-full touch-none"
                  onMouseDown={() => (isDrawing.current = true)}
                  onMouseUp={() => (isDrawing.current = false)}
                  onMouseMove={(e) => {
                    if (isDrawing.current) handleScratch(e);
                  }}
                  onTouchMove={handleScratch}
                />
              </div>

              <button
                onClick={triggerReveal}
                className="mt-6 px-8 py-3.5 rounded-full bg-[#ffdf9c] text-[#201a18] font-serif text-base italic font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Click to Open Secret Surprise ✨</span>
              </button>
            </div>
          ) : (
            <div className="animate-scaleUp flex flex-col items-center">
              {/* Revealed Secret Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-[#ffdf9c]/40 mb-8 max-w-lg w-full text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdf9c]/20 text-[#ffdf9c] text-xs font-semibold mb-3">
                  <Heart className="w-3.5 h-3.5 fill-[#ffdf9c]" />
                  <span>A Pure Secret Surprise</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                  {giftData.surprise.secretTitle}
                </h3>

                <p className="text-sm font-serif italic text-[#ffdf9c] mb-4">
                  {giftData.surprise.secretSubtitle}
                </p>

                <div className="p-4 rounded-xl bg-black/20 border border-white/10 text-xs sm:text-sm text-[#ffd9dd] leading-relaxed italic whitespace-pre-line text-left">
                  “{giftData.surprise.secretMessage}”
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#baa3a7]">
                  <span>Dedicated with love</span>
                  <span className="font-serif italic font-bold text-white">
                    Forever {giftData.authorName || 'T'} & {giftData.recipientName || 'U'}
                  </span>
                </div>
              </div>

              <button
                onClick={onNext}
                className="px-8 py-3.5 rounded-full bg-[#ffdf9c] text-[#201a18] font-serif text-base italic font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read Grand Finale Message ❤️</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
