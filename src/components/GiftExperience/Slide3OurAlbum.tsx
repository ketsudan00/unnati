import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GiftData, MemoryItem } from '../../types/gift';
import { romanticAudio } from '../../utils/audio';
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  X,
  ZoomIn,
  Sparkles,
  Flame,
  Layers,
  Film,
  Music2,
  Calendar,
} from 'lucide-react';

interface Slide3OurAlbumProps {
  giftData: GiftData;
  onNext: () => void;
}

interface FloatingHeartToast {
  id: number;
  text: string;
  xOffset: number;
}

export const Slide3OurAlbum: React.FC<Slide3OurAlbumProps> = ({ giftData, onNext }) => {
  const [activeTab, setActiveTab] = useState<'scrapbook' | 'polaroids'>('scrapbook');
  // 'spotlight' mode displays one memory at a time with crazy love animations, avoiding boring flat doc layout
  const [displayMode, setDisplayMode] = useState<'spotlight' | 'gallery'>('spotlight');
  const [activeMemIdx, setActiveMemIdx] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Per-memory love counts and active floating reactions
  const [loveCounts, setLoveCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    giftData.memories.forEach((m, idx) => {
      initial[m.id || `mem-${idx}`] = 24 + (idx * 17) % 50;
    });
    return initial;
  });

  const [loveToasts, setLoveToasts] = useState<Record<string, FloatingHeartToast[]>>({});

  const partner1 = giftData.topName1 || giftData.authorName || 'T';
  const partner2 = giftData.topName2 || giftData.recipientName || 'U';

  const totalMemories = giftData.memories.length;
  const currentMem: MemoryItem | undefined =
    giftData.memories[activeMemIdx] || giftData.memories[0];

  const loveReactions = [
    '💕 +1 Eternal Love!',
    '💖 Soulmates Forever!',
    '✨ My Favorite Memory!',
    '🌹 Heart Skipped a Beat!',
    '🥰 Infinite Love for You!',
    '💌 Forever Etched in My Heart!',
    '🔥 You Make My World Bright!',
  ];

  // Crazy love animation reaction trigger
  const handleTriggerLoveReaction = (
    e: React.MouseEvent<HTMLButtonElement>,
    memId: string
  ) => {
    // 1. Play sweet romantic harp chime
    romanticAudio.playLoveHeartSound();

    // 2. Increment love count
    setLoveCounts((prev) => ({
      ...prev,
      [memId]: (prev[memId] || 0) + 1,
    }));

    // 3. Crazy confetti explosion of love hearts & romantic colors
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x, y },
        colors: ['#e11d48', '#ff4081', '#f43f5e', '#ffd700', '#fda4af', '#ffffff'],
        shapes: ['circle'],
        ticks: 160,
        gravity: 0.85,
        scalar: 1.1,
      });
    } catch {
      // Ignore if canvas blocked
    }

    // 4. Spawn floating love toast banner above the button
    const toastText = loveReactions[Math.floor(Math.random() * loveReactions.length)];
    const newToast: FloatingHeartToast = {
      id: Date.now() + Math.random(),
      text: toastText,
      xOffset: (Math.random() - 0.5) * 60,
    };

    setLoveToasts((prev) => ({
      ...prev,
      [memId]: [...(prev[memId] || []).slice(-3), newToast],
    }));

    // Remove toast after animation
    setTimeout(() => {
      setLoveToasts((prev) => ({
        ...prev,
        [memId]: (prev[memId] || []).filter((t) => t.id !== newToast.id),
      }));
    }, 1800);
  };

  const handleNextMemory = () => {
    setActiveMemIdx((prev) => (prev + 1) % totalMemories);
  };

  const handlePrevMemory = () => {
    setActiveMemIdx((prev) => (prev - 1 + totalMemories) % totalMemories);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 animate-fadeIn px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf1ec] border border-[#dac0c2]/50 text-[#735b20] text-xs font-semibold mb-2">
          <Sparkles className="w-3 h-3 text-[#6b1d2f]" />
          <span className="uppercase tracking-widest font-mono text-[11px]">
            Slide 3 • Our Romantic Scrapbook
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#4e051a] tracking-tight mb-2">
          Our Cherished Moments
        </h2>
        <p className="text-xs sm:text-sm text-[#544244] max-w-lg mx-auto">
          Every snapshot, quiet midnight laugh, and milestone we have lived together since that first day.
        </p>

        {/* Top Switcher: Scrapbook vs Polaroids */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <div className="inline-flex items-center gap-1 p-1 bg-[#fdf1ec] rounded-full border border-[#dac0c2]/40">
            <button
              onClick={() => setActiveTab('scrapbook')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'scrapbook'
                  ? 'bg-[#6b1d2f] text-white shadow-xs'
                  : 'text-[#544244] hover:text-[#4e051a]'
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Memories ({totalMemories})</span>
            </button>
            <button
              onClick={() => setActiveTab('polaroids')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'polaroids'
                  ? 'bg-[#6b1d2f] text-white shadow-xs'
                  : 'text-[#544244] hover:text-[#4e051a]'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Polaroids ({giftData.photos.length})</span>
            </button>
          </div>

          {/* Mode Switcher for Scrapbook: Spotlight (One by One) vs Love Grid */}
          {activeTab === 'scrapbook' && totalMemories > 1 && (
            <div className="inline-flex items-center gap-1 p-1 bg-white rounded-full border border-[#dac0c2]/50 shadow-2xs">
              <button
                onClick={() => setDisplayMode('spotlight')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  displayMode === 'spotlight'
                    ? 'bg-[#4e051a] text-white'
                    : 'text-[#544244] hover:text-[#4e051a]'
                }`}
                title="Cinematic love showcase of each memory"
              >
                <Sparkles className="w-3 h-3 text-rose-300" />
                <span>Love Spotlight</span>
              </button>
              <button
                onClick={() => setDisplayMode('gallery')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  displayMode === 'gallery'
                    ? 'bg-[#4e051a] text-white'
                    : 'text-[#544244] hover:text-[#4e051a]'
                }`}
                title="Browse all floating memory cards"
              >
                <Layers className="w-3 h-3" />
                <span>Love Grid</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: CRAZY ANIMATED LOVE SPOTLIGHT (ONE BY ONE)       */}
      {/* ======================================================== */}
      {activeTab === 'scrapbook' && displayMode === 'spotlight' && currentMem && (
        <div className="w-full max-w-3xl flex flex-col items-center my-4 relative">
          {/* Chapter navigation pills */}
          <div className="w-full flex items-center justify-center gap-1.5 overflow-x-auto py-2 mb-3 px-2 no-scrollbar">
            {giftData.memories.map((m, idx) => (
              <button
                key={m.id || idx}
                onClick={() => setActiveMemIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  idx === activeMemIdx
                    ? 'bg-[#6b1d2f] text-white shadow-md scale-105'
                    : 'bg-[#fdf1ec] text-[#544244] hover:bg-white hover:text-[#4e051a] border border-[#dac0c2]/30'
                }`}
              >
                <span className="text-[10px] font-mono">#{idx + 1}</span>
                <span className="truncate max-w-[110px]">{m.title}</span>
                {idx === activeMemIdx && <Heart className="w-2.5 h-2.5 fill-white" />}
              </button>
            ))}
          </div>

          {/* THE HERO MEMORY STAGE CARD WITH CRAZY ANIMATIONS */}
          <div className="relative w-full bg-white rounded-3xl p-6 sm:p-9 border border-[#dac0c2]/60 animate-love-glow transition-all duration-500 overflow-hidden">
            {/* Continuous Floating Romantic Love Particles around the card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <span className="absolute left-6 bottom-8 text-rose-400/50 text-xl animate-love-float" style={{ animationDelay: '0s' }}>
                ❤️
              </span>
              <span className="absolute right-8 bottom-12 text-pink-400/40 text-lg animate-love-float" style={{ animationDelay: '1.2s' }}>
                💖
              </span>
              <span className="absolute left-1/4 bottom-4 text-amber-400/40 text-base animate-love-float" style={{ animationDelay: '2s' }}>
                ✨
              </span>
              <span className="absolute right-1/4 bottom-6 text-rose-300/45 text-xl animate-love-float" style={{ animationDelay: '1.8s' }}>
                💕
              </span>
            </div>

            {/* Vintage Washi Tape Decor */}
            <div className="absolute -top-3 left-12 w-32 h-6 washi-tape -rotate-2 rounded-xs pointer-events-none z-20"></div>
            <div className="absolute -top-3 right-12 w-28 h-6 washi-tape-rose rotate-2 rounded-xs pointer-events-none z-20"></div>

            {/* Top Bar: Chapter Counter & Date */}
            <div className="flex items-center justify-between mb-4 border-b border-[#dac0c2]/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] text-xs font-mono font-bold">
                  Chapter {activeMemIdx + 1} of {totalMemories}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#735b20] font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentMem.date}</span>
                </div>
              </div>

              {/* Pulsing Beating Heart Love Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-love-beat" />
                <span>Memory Sealed in Love</span>
              </div>
            </div>

            {/* Photo Container with Shimmer & Zoom */}
            <div
              onClick={() => setSelectedPhoto(currentMem.photoUrl)}
              className="relative aspect-16/10 sm:aspect-16/9 w-full rounded-2xl overflow-hidden mb-5 bg-[#fdf1ec] shadow-inner group cursor-pointer border border-[#dac0c2]/40"
            >
              <img
                src={currentMem.photoUrl}
                alt={currentMem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Shimmer light sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-foil-shine"></div>

              {/* Enlarge Hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white/95 text-[#4e051a] text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition-opacity flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-[#6b1d2f]" />
                  <span>Click to Enlarge Photo</span>
                </span>
              </div>

              {/* Floating Heart Sticker badge on photo */}
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                <span>{partner1} & {partner2}</span>
              </div>
            </div>

            {/* Title & Romantic Story Body */}
            <div className="text-center sm:text-left mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#4e051a] font-bold tracking-tight mb-2.5">
                {currentMem.title}
              </h3>
              <div className="bg-[#fdf1ec] p-4 sm:p-5 rounded-2xl border border-[#dac0c2]/35 shadow-inner">
                <p className="font-serif text-sm sm:text-base italic text-[#441417] leading-relaxed">
                  “{currentMem.description}”
                </p>
              </div>
            </div>

            {/* Interactive Crazy Love Reaction Bar */}
            <div className="pt-4 border-t border-[#dac0c2]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-xs text-[#735b20]">
                  Cherished forever by {partner1} & {partner2} ❤️
                </span>
              </div>

              {/* The CRAZY LOVE BUTTON */}
              <div className="relative flex items-center">
                {/* Floating Love Toast Popups */}
                {(loveToasts[currentMem.id] || []).map((toast) => (
                  <div
                    key={toast.id}
                    style={{ transform: `translate(${toast.xOffset}px, -45px)` }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-30 whitespace-nowrap bg-[#6b1d2f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xl animate-bounce"
                  >
                    {toast.text}
                  </div>
                ))}

                <button
                  onClick={(e) => handleTriggerLoveReaction(e, currentMem.id)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-[#6b1d2f] to-[#4e051a] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                  <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform animate-love-beat" />
                  <span>Shower with Love</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                    {loveCounts[currentMem.id] || 24} ❤️
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Controls: Previous / Next Memory */}
          <div className="w-full flex items-center justify-between mt-5 px-2">
            <button
              onClick={handlePrevMemory}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#fdf1ec] text-[#4e051a] text-xs font-semibold border border-[#dac0c2]/50 shadow-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Memory</span>
            </button>

            {/* Glowing Heart Progress Indicators */}
            <div className="flex items-center gap-1.5">
              {giftData.memories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMemIdx(i)}
                  className={`transition-all cursor-pointer ${
                    i === activeMemIdx
                      ? 'w-6 h-2 rounded-full bg-[#6b1d2f]'
                      : 'w-2 h-2 rounded-full bg-[#dac0c2] hover:bg-[#877274]'
                  }`}
                  title={`Go to memory ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextMemory}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#fdf1ec] text-[#4e051a] text-xs font-semibold border border-[#dac0c2]/50 shadow-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
            >
              <span>Next Memory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: ANIMATED LOVE GRID (CARDS WITH CRAZY ANIMATIONS) */}
      {/* ======================================================== */}
      {activeTab === 'scrapbook' && displayMode === 'gallery' && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-6">
          {giftData.memories.map((mem, index) => {
            const rotation = index % 2 === 0 ? '-rotate-1' : 'rotate-1';
            return (
              <div
                key={mem.id || index}
                className={`bg-white rounded-3xl shadow-xl p-5 sm:p-6 border border-[#dac0c2]/50 relative transform ${rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between animate-love-glow`}
              >
                {/* Washi tape */}
                <div className="absolute -top-3 left-10 w-24 h-5 washi-tape -rotate-2 rounded-xs pointer-events-none z-10"></div>

                <div>
                  <div
                    onClick={() => setSelectedPhoto(mem.photoUrl)}
                    className="aspect-4/3 w-full rounded-2xl overflow-hidden mb-4 shadow-inner bg-[#fdf1ec] border border-black/5 relative group cursor-pointer"
                  >
                    <img
                      src={mem.photoUrl}
                      alt={mem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none animate-foil-shine"></div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-[#4e051a] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md transition-opacity flex items-center gap-1">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-white text-[10px] font-semibold flex items-center gap-1">
                      <Heart className="w-2.5 h-2.5 fill-rose-400 text-rose-400" />
                      <span>Chapter #{index + 1}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#735b20] font-semibold mb-1">
                    <span>{mem.date}</span>
                    <span className="text-[11px] font-mono text-[#877274] bg-[#fdf1ec] px-2 py-0.5 rounded-full">
                      {partner1} & {partner2}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#4e051a] font-bold mb-2 leading-snug">
                    {mem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#544244] leading-relaxed italic bg-[#fdf1ec]/60 p-3 rounded-xl border border-[#dac0c2]/30">
                    “{mem.description}”
                  </p>
                </div>

                {/* Love Reaction Bar */}
                <div className="mt-4 pt-3 border-t border-[#dac0c2]/30 flex items-center justify-between relative">
                  {/* Floating Love Toast */}
                  {(loveToasts[mem.id] || []).map((toast) => (
                    <div
                      key={toast.id}
                      className="absolute -top-3 right-0 pointer-events-none z-30 whitespace-nowrap bg-[#6b1d2f] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md animate-bounce"
                    >
                      {toast.text}
                    </div>
                  ))}

                  <span className="text-[11px] text-[#735b20] font-serif italic">
                    Tap to shower love:
                  </span>

                  <button
                    onClick={(e) => handleTriggerLoveReaction(e, mem.id)}
                    className="px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-[#6b1d2f] border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#6b1d2f] text-[#6b1d2f] animate-love-beat" />
                    <span>{loveCounts[mem.id] || 24}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* POLAROID SNAPSHOTS WITH CRAZY LOVE ANIMATIONS           */}
      {/* ======================================================== */}
      {activeTab === 'polaroids' && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-6">
          {giftData.photos.map((photo, index) => {
            const rot = photo.tilt !== undefined ? photo.tilt : index % 2 === 0 ? -2 : 2;
            return (
              <div
                key={photo.id || index}
                onClick={() => setSelectedPhoto(photo.url)}
                style={{ transform: `rotate(${rot}deg)` }}
                className="bg-white p-3.5 pb-7 rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 hover:rotate-0 transition-all duration-300 relative border border-[#dac0c2]/30 cursor-pointer animate-love-glow"
              >
                <div className="absolute -top-3 right-6 w-20 h-5 washi-tape rotate-1 rounded-xs pointer-events-none z-10"></div>

                <div className="aspect-square w-full rounded-xs overflow-hidden mb-3 bg-[#fdf1ec] shadow-inner relative group">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none animate-foil-shine"></div>
                </div>

                <p className="font-serif text-sm italic text-[#201a18] line-clamp-2 mb-1 text-center font-medium">
                  “{photo.caption}”
                </p>
                {photo.audioMemoTitle && (
                  <span className="text-[10px] text-[#735b20] uppercase tracking-wider block text-center mt-1 font-semibold">
                    ♪ {photo.audioMemoTitle}
                  </span>
                )}

                <div className="mt-2 pt-2 border-t border-[#dac0c2]/20 flex items-center justify-between text-[10px] text-[#877274]">
                  <span>{partner1} & {partner2}</span>
                  <div className="flex items-center gap-1 text-[#6b1d2f]">
                    <Heart className="w-3 h-3 fill-current animate-love-beat" />
                    <span>Keep Forever</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Advance to next slide button */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <p className="text-xs text-[#735b20] italic">
          Finished reliving our memories? There is a heartfelt letter waiting on the next page...
        </p>
        <button
          onClick={onNext}
          className="px-8 py-4 rounded-full bg-[#6b1d2f] text-white font-medium text-sm sm:text-base flex items-center gap-2 shadow-lg hover:bg-[#4e051a] hover:scale-102 active:scale-98 transition-all cursor-pointer"
        >
          <span>Read My Love Letter to You 💌</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-5 shadow-2xl relative border border-white/20 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-black/5 relative">
              <img src={selectedPhoto} alt="Memory enlarged" className="w-full h-full object-cover" />
            </div>
            <div className="mt-3 text-center">
              <span className="font-serif italic text-xs text-[#735b20]">
                {partner1} & {partner2} • Keepsake Photo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
