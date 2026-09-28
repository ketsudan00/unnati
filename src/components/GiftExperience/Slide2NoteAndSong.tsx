import React from 'react';
import { GiftData } from '../../types/gift';
import { Play, Pause, Music, Heart, ArrowRight, Disc3 } from 'lucide-react';

interface Slide2NoteAndSongProps {
  giftData: GiftData;
  onNext: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Slide2NoteAndSong: React.FC<Slide2NoteAndSongProps> = ({
  giftData,
  onNext,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 text-center animate-fadeIn px-4">
      <div className="relative w-full bg-white rounded-3xl shadow-xl border border-[#dac0c2]/40 p-6 sm:p-12 deckle-border text-left">
        {/* Washi Tape Header Decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-6 washi-tape -rotate-1 rounded-xs pointer-events-none"></div>

        {/* Occasion Heading */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-[#735b20] font-bold block mb-1">
            {giftData.dedicationKicker || `Happy ${giftData.occasionTitle}`}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#4e051a] font-medium tracking-tight mb-2">
            Happy {giftData.occasionTitle}, {giftData.recipientName} ❤️
          </h2>
          <p className="text-xs text-[#735b20] font-semibold">{giftData.milestone}</p>
        </div>

        {/* The Personal Love Note */}
        <div className="bg-[#fdf1ec] rounded-2xl p-6 sm:p-8 shadow-inner border border-[#dac0c2]/30 relative overflow-hidden mb-8">
          <p className="font-serif text-lg sm:text-xl italic text-[#4e051a] leading-relaxed mb-4">
            {giftData.dedicationQuote ||
              '“To my favorite human, my co-pilot, and the keeper of all my wildest laughs...”'}
          </p>

          <div className="text-sm sm:text-base text-[#544244] leading-relaxed whitespace-pre-line space-y-3">
            {giftData.dedicationBody ||
              'I built this quiet corner of the digital universe just for you. No alarms, no rushed afternoons. Only our favorite moments, our song, and everything we have lived together since that first day we met.'}
          </div>

          <div className="mt-6 pt-4 border-t border-[#dac0c2]/40 flex items-center justify-between text-xs">
            <span className="text-[#735b20] italic">
              {giftData.occasionTagline || 'For every quiet morning, starry drive, and infinite tomorrows.'}
            </span>
            <span className="font-serif italic font-bold text-[#4e051a]">
              {giftData.authorName} & {giftData.recipientName}
            </span>
          </div>
        </div>

        {/* Romantic "Our Song" Player Card */}
        <div className="bg-[#fffcf8] rounded-2xl p-5 sm:p-6 border border-[#dac0c2]/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Vinyl record spinning animation */}
            <div
              className={`w-14 h-14 rounded-full bg-[#201a18] text-white flex items-center justify-center shadow-md relative shrink-0 ${
                isAudioPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <Disc3 className="w-8 h-8 text-[#fedc94]" />
              <div className="w-4 h-4 rounded-full bg-[#6b1d2f] absolute"></div>
            </div>

            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-[#735b20] tracking-wider block">
                Our Song • Soundtrack
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#4e051a]">
                {giftData.music.songTitle || "‘Claire de Lune’ (Acoustic Piano)"}
              </h4>
              <p className="text-xs text-[#544244]">
                {isAudioPlaying ? 'Playing gentle romantic melody...' : 'Press play to listen while you experience this'}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleAudio}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#6b1d2f] text-white hover:bg-[#4e051a]'
                : 'bg-[#fdf1ec] text-[#4e051a] hover:bg-[#f8ebe6] border border-[#dac0c2]/40'
            }`}
          >
            {isAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isAudioPlaying ? 'Pause Music' : 'Play Our Song'}</span>
          </button>
        </div>

        {/* Advance to Album button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6b1d2f] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:bg-[#4e051a] hover:scale-102 transition-all cursor-pointer"
          >
            <span>View Our Album 📸</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
