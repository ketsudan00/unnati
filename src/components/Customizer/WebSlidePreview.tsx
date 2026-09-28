import React, { useState } from 'react';
import { GiftData } from '../../types/gift';
import { THEMES } from '../../data/defaultGift';
import { Heart, Disc3, Sparkles, ArrowRight } from 'lucide-react';

interface WebSlidePreviewProps {
  giftData: GiftData;
  onOpenFullExperience: () => void;
}

export const WebSlidePreview: React.FC<WebSlidePreviewProps> = ({
  giftData,
  onOpenFullExperience,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const theme = THEMES[giftData.theme] || THEMES.vintage;

  const slides = [
    { num: 1, label: 'Slide 1: Envelope' },
    { num: 2, label: 'Slide 2: Note & Song' },
    { num: 3, label: 'Slide 3: Album' },
    { num: 4, label: 'Slide 4: Letter' },
    { num: 5, label: 'Slide 5: Surprise' },
    { num: 6, label: 'Slide 6: Finale' },
  ];

  const partner1 = giftData.topName1 || giftData.authorName || 'T';
  const partner2 = giftData.topName2 || giftData.recipientName || 'U';
  const forRecipient = giftData.forRecipientName || giftData.recipientName || 'U';
  const fromAuthor = giftData.fromAuthorName || giftData.authorName || 'T';

  return (
    <div className="w-full flex flex-col bg-white rounded-3xl p-5 shadow-lg border border-[#dac0c2]/40">
      {/* Header bar of preview */}
      <div className="flex items-center justify-between pb-3 border-b border-[#dac0c2]/30 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-semibold text-[#4e051a] ml-1">Live Web Preview</span>
        </div>

        <button
          onClick={onOpenFullExperience}
          className="text-xs font-semibold text-[#6b1d2f] hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>Open Fullscreen</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Slide Navigation Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-3">
        {slides.map((s) => (
          <button
            key={s.num}
            onClick={() => setActiveSlide(s.num)}
            className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-all cursor-pointer ${
              activeSlide === s.num
                ? 'bg-[#6b1d2f] text-white font-semibold shadow-xs'
                : 'bg-[#fdf1ec] text-[#544244] hover:text-[#201a18]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Web Canvas Viewport (clean desktop view, no phone frame!) */}
      <div
        className="w-full min-h-[460px] rounded-2xl p-6 flex flex-col justify-between border border-[#dac0c2]/40 overflow-y-auto"
        style={{ backgroundColor: theme.colors.bg }}
      >
        {activeSlide === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Couple monogram badge */}
            <span className="text-[10px] uppercase font-bold text-[#735b20] tracking-wider mb-1">
              {partner1} & {partner2} • {giftData.milestone}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#4e051a] mb-1">
              {giftData.greetingTitle}
            </h3>
            <p className="font-serif text-sm italic text-[#735b20] mb-4">
              Happy {giftData.occasionTitle}
            </p>

            <div className="w-full max-w-xs bg-[#fdf1ec] p-5 rounded-2xl shadow-md border border-[#dac0c2]/50">
              <span className="text-[9px] uppercase tracking-widest text-[#735b20] block mb-1">
                For {forRecipient} • From {fromAuthor}
              </span>
              <h4 className="font-serif text-lg italic text-[#4e051a] mb-2">
                Private & Confidential
              </h4>
              <p className="text-[11px] text-[#544244] line-clamp-2 mb-3">
                "{giftData.openingMessage}"
              </p>
              <div className="w-14 h-14 rounded-full mx-auto bg-[#6b1d2f] text-white flex items-center justify-center font-serif text-xs italic shadow-md">
                {giftData.letter.sealInitial || `${partner1} & ${partner2}`}
              </div>
              <span className="text-[9px] text-[#735b20] block mt-2 font-medium">
                Click to open envelope
              </span>
            </div>
          </div>
        )}

        {activeSlide === 2 && (
          <div className="flex-1 flex flex-col justify-center text-left">
            <span className="text-[10px] uppercase font-bold text-[#735b20] block mb-1">
              Dedication & Song
            </span>
            <h3 className="font-serif text-xl font-bold text-[#4e051a] mb-2">
              Happy {giftData.occasionTitle}, {giftData.recipientName} ❤️
            </h3>
            <div className="bg-[#fdf1ec] p-4 rounded-xl shadow-inner mb-3">
              <p className="font-serif text-xs italic text-[#4e051a] mb-1">
                {giftData.dedicationQuote}
              </p>
              <p className="text-[11px] text-[#544244] line-clamp-3">
                {giftData.dedicationBody}
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#dac0c2]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Disc3 className="w-6 h-6 text-[#735b20]" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#735b20] block">Our Song</span>
                  <span className="font-serif text-xs font-bold text-[#4e051a]">
                    {giftData.music.songTitle}
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-[#fdf1ec] text-[#4e051a] rounded font-semibold">
                Audio Ready
              </span>
            </div>
          </div>
        )}

        {activeSlide === 3 && (
          <div className="flex-1 flex flex-col justify-center text-left">
            <span className="text-[10px] uppercase font-bold text-[#735b20] block mb-1">
              Slide 3 • Our Album
            </span>
            <h3 className="font-serif text-lg font-bold text-[#4e051a] mb-3">
              Our Memory Scrapbook
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {giftData.memories.slice(0, 2).map((m, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl shadow-xs border border-[#dac0c2]/30">
                  <div className="w-full h-20 rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img src={m.photoUrl} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[9px] font-bold text-[#735b20] uppercase block">{m.date}</span>
                  <h4 className="font-serif text-xs font-bold text-[#4e051a] truncate">{m.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSlide === 4 && (
          <div className="flex-1 flex flex-col justify-center text-left">
            <div className="bg-[#fffcf8] p-4 rounded-xl shadow-sm border border-[#eeddd4] flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase text-[#735b20] font-bold block mb-1">
                  {giftData.letter.salutation}
                </span>
                <h4 className="font-serif text-base font-bold text-[#4e051a] mb-2">
                  {giftData.letter.title}
                </h4>
                <p className="text-[11px] text-[#201a18] line-clamp-4 leading-relaxed font-serif">
                  {giftData.letter.body}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#eeddd4] flex items-center justify-between">
                <span className="font-serif text-xs italic text-[#4e051a]">
                  {giftData.letter.signature}
                </span>
                <span className="text-[10px] text-[#735b20] font-mono">
                  Initial: {giftData.letter.sealInitial}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeSlide === 5 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-3">
            <div className="bg-[#251e20] text-white p-5 rounded-2xl shadow-xl w-full">
              <span className="text-[9px] uppercase font-bold text-[#ffdf9c] block mb-1">
                Slide 5 • Secret Surprise
              </span>
              <h4 className="font-serif text-base font-bold text-white mb-2">
                {giftData.surprise.teaserHeadline}
              </h4>
              <div className="bg-white/10 p-3 rounded-xl text-left mb-2 border border-[#ffdf9c]/30">
                <span className="text-[9px] text-[#ffdf9c] block font-bold">✨ Secret Surprise:</span>
                <p className="text-[11px] text-white font-medium line-clamp-1">
                  {giftData.surprise.secretTitle}
                </p>
                <p className="text-[10px] text-[#ffd9dd] italic line-clamp-1 mt-0.5">
                  {giftData.surprise.secretSubtitle}
                </p>
              </div>
              <p className="text-[10px] text-gray-300 italic">
                "{giftData.surprise.secretMessage.slice(0, 70)}..."
              </p>
            </div>
          </div>
        )}

        {activeSlide === 6 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
            <div className="bg-white p-5 rounded-2xl shadow-md border border-[#dac0c2]/40 w-full text-center">
              <span className="text-[9px] uppercase tracking-wider text-[#735b20] font-bold block mb-1">
                Grand Finale • Dedicated to {giftData.recipientName || 'U'}
              </span>
              <h4 className="font-serif text-xl font-bold text-[#4e051a] mb-2">
                {giftData.finalClosingMessage || 'Made with love ❤️'}
              </h4>
              <p className="text-xs text-[#735b20] italic mb-3">
                “With all my love from {giftData.authorName || 'T'}”
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf1ec] text-[#4e051a] text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-[#6b1d2f] text-[#6b1d2f]" />
                <span>{giftData.celebrationDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-[#dac0c2]/30 flex items-center justify-between text-[10px] text-[#544244]">
          <span>Theme: {theme.name}</span>
          <span className="font-semibold text-[#6b1d2f]">Slide {activeSlide} of 6</span>
        </div>
      </div>
    </div>
  );
};
