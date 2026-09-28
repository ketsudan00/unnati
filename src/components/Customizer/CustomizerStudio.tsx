import React, { useState } from 'react';
import { GiftData, MemoryItem, PolaroidItem, ThemeId } from '../../types/gift';
import { THEMES } from '../../data/defaultGift';
import { WebSlidePreview } from './WebSlidePreview';
import {
  Users,
  Calendar,
  Image as ImageIcon,
  PenTool,
  Gift,
  Palette,
  Music,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Sparkles,
  Heart,
  ChevronDown,
  ChevronUp,
  Check,
  RotateCcw,
} from 'lucide-react';

interface CustomizerStudioProps {
  giftData: GiftData;
  setGiftData: React.Dispatch<React.SetStateAction<GiftData>>;
  onOpenPreview: () => void;
  onOpenExport: () => void;
  onResetData: () => void;
}

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({
  giftData,
  setGiftData,
  onOpenPreview,
  onOpenExport,
  onResetData,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    greeting: true,
    occasion: true,
    song: true,
    memories: true,
    photos: true,
    letter: true,
    surprise: true,
    theme: true,
  });

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const updateField = <K extends keyof GiftData>(key: K, value: GiftData[K]) => {
    setGiftData((prev) => ({ ...prev, [key]: value }));
  };

  const updateNested = <K extends keyof GiftData, N extends keyof GiftData[K]>(
    parent: K,
    child: N,
    val: unknown
  ) => {
    setGiftData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as object),
        [child]: val,
      },
    }));
  };

  // Photo upload for scrapbook memory
  const handleMemoryPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, memoryId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setGiftData((prev) => ({
            ...prev,
            memories: prev.memories.map((m) =>
              m.id === memoryId ? { ...m, photoUrl: result } : m
            ),
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Photo upload for album polaroids
  const handleGalleryPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file, idx) => {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          const result = uploadEvent.target?.result as string;
          if (result) {
            setGiftData((prev) => {
              const newPhoto: PolaroidItem = {
                id: `user-polaroid-${Date.now()}-${idx}`,
                url: result,
                caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
                tilt: ((idx % 3) - 1) * 2,
              };
              return {
                ...prev,
                photos: [newPhoto, ...prev.photos],
              };
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Audio file upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setGiftData((prev) => ({
            ...prev,
            music: {
              ...prev.music,
              customAudioDataUrl: result,
              songTitle: file.name.replace(/\.[^/.]+$/, ''),
            },
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addMemory = () => {
    const newMem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: 'Our Special Moment',
      date: 'A Beautiful Day',
      description: 'Describe this cherished memory that made you both smile...',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDgUic8xpGYGQ0j_xKadx44patdGXNTcLU2TDt74fCc_9aFGNX8Rr-cmO_R70c5ERS7pqDI8tRTYhIRBOZO9LVWBX9NtCuIx5Fl74y4V_K9ASmBFx4s1DYL-BWOIu--ywZCGxQElTUBiDXNrWX0cQN6hVHp7Px-zD7kMc3edYbHFKMxZSTMFXjt6GTufPW07iV-4M90a53HHl2Y9EC7beBUK-5pURjY2gKSs4jPC04f9Z_4fsYDkWEKgg',
      tokenNumber: `#0${giftData.memories.length + 1}`,
    };
    setGiftData((prev) => ({
      ...prev,
      memories: [...prev.memories, newMem],
    }));
  };

  const removeMemory = (id: string) => {
    setGiftData((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id),
    }));
  };

  const moveMemory = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= giftData.memories.length) return;
    const newMems = [...giftData.memories];
    const [moved] = newMems.splice(index, 1);
    newMems.splice(targetIdx, 0, moved);
    setGiftData((prev) => ({ ...prev, memories: newMems }));
  };

  const removePhoto = (id: string) => {
    setGiftData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id),
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fadeIn">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#dac0c2]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#fdf1ec] border border-[#dac0c2]/50 text-[11px] font-bold text-[#735b20] uppercase tracking-wider">
              Mode 1 • Atelier Customizer
            </span>
            <span className="text-xs text-[#544244]">• Web Responsive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#4e051a] font-medium tracking-tight">
            Customize Your Gift 💌
          </h1>
          <p className="text-xs sm:text-sm text-[#544244] mt-1 max-w-xl">
            Personalize your romantic keepsake slides. Every edit immediately updates the live web preview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetData}
            className="px-4 py-2.5 rounded-full bg-white text-[#544244] hover:text-[#4e051a] hover:bg-[#fdf1ec] text-xs font-semibold border border-[#dac0c2]/50 shadow-xs flex items-center gap-1.5 cursor-pointer"
            title="Reset to default story"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>

          <button
            onClick={onOpenExport}
            className="px-5 py-2.5 rounded-full bg-[#fdf1ec] text-[#4e051a] hover:bg-[#f8ebe6] text-xs font-semibold border border-[#dac0c2]/50 shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 rotate-180" />
            <span>Save & Share</span>
          </button>

          <button
            onClick={onOpenPreview}
            className="px-6 py-2.5 rounded-full bg-[#6b1d2f] text-white hover:bg-[#4e051a] text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Open Gift Experience ❤️</span>
          </button>
        </div>
      </div>

      {/* Editor & Web Slide Preview (Clean desktop split layout, no mobile canvas/phone mirror) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* SECTION 1: GREETING & PROTAGONISTS */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('greeting')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    1. 💑 Greeting & Names (Slide 1)
                  </h3>
                  <span className="text-xs text-[#544244]">
                    "Hello cutie" greeting, boyfriend's name (U), your name (T), seal initial & teaser
                  </span>
                </div>
              </div>
              {openSections.greeting ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.greeting && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Opening Greeting Headline (Slide 1 Top)
                  </label>
                  <input
                    type="text"
                    value={giftData.greetingTitle}
                    onChange={(e) => updateField('greetingTitle', e.target.value)}
                    placeholder="e.g. Hello cutie ❤️"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] font-serif font-bold text-base outline-none focus:border-[#6b1d2f]"
                  />
                </div>

                {/* NAME BAR 1: Top Header Couple Names (& Bar) with separate inputs for each partner */}
                <div className="p-4 rounded-2xl bg-[#fff8f6] border border-[#dac0c2]/50 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4e051a]">
                        💑 Top Header Couple Names (& Bar)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#735b20] bg-[#fdf1ec] px-2 py-0.5 rounded-full border border-[#dac0c2]/30">
                      Displays: {(giftData.topName1 || giftData.authorName || 'T')} & {(giftData.topName2 || giftData.recipientName || 'U')}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#544244] mb-3">
                    Controls the top couple header badge & airmail postal stamp across the keepsake.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center">
                    <div className="sm:col-span-5">
                      <label className="text-[11px] font-semibold text-[#735b20] block mb-1">
                        Top Name 1 (Partner 1)
                      </label>
                      <input
                        type="text"
                        value={giftData.topName1 ?? giftData.authorName ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGiftData((prev) => ({
                            ...prev,
                            topName1: val,
                            authorName: prev.fromAuthorName ? prev.authorName : val,
                          }));
                        }}
                        placeholder="e.g. T"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dac0c2]/60 text-[#4e051a] font-serif font-bold text-base outline-none focus:border-[#6b1d2f]"
                      />
                    </div>

                    <div className="sm:col-span-1 flex items-center justify-center pt-4 sm:pt-4">
                      <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-[#ffd9dd] font-serif font-bold text-sm flex items-center justify-center shadow-xs">
                        &
                      </div>
                    </div>

                    <div className="sm:col-span-5">
                      <label className="text-[11px] font-semibold text-[#735b20] block mb-1">
                        Top Name 2 (Partner 2)
                      </label>
                      <input
                        type="text"
                        value={giftData.topName2 ?? giftData.recipientName ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGiftData((prev) => ({
                            ...prev,
                            topName2: val,
                            recipientName: prev.forRecipientName ? prev.recipientName : val,
                          }));
                        }}
                        placeholder="e.g. U"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dac0c2]/60 text-[#4e051a] font-serif font-bold text-base outline-none focus:border-[#6b1d2f]"
                      />
                    </div>
                  </div>
                </div>

                {/* NAME BAR 2: For & From Dedication Bar with separate inputs */}
                <div className="p-4 rounded-2xl bg-[#fff8f6] border border-[#dac0c2]/50 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4e051a]">
                        💌 Dedication Names (For & From Bar)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#735b20] bg-[#fdf1ec] px-2 py-0.5 rounded-full border border-[#dac0c2]/30">
                      For {(giftData.forRecipientName || giftData.recipientName || 'U')} • From {(giftData.fromAuthorName || giftData.authorName || 'T')}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#544244] mb-3">
                    Controls the envelope address: “For [Recipient] • With Love From [Sender]”.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-[#735b20] block mb-1">
                        “For” (Recipient / Boyfriend's Name)
                      </label>
                      <input
                        type="text"
                        value={giftData.forRecipientName ?? giftData.recipientName ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGiftData((prev) => ({
                            ...prev,
                            forRecipientName: val,
                            recipientName: val,
                          }));
                        }}
                        placeholder="e.g. U"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dac0c2]/60 text-[#4e051a] font-serif font-bold text-base outline-none focus:border-[#6b1d2f]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#735b20] block mb-1">
                        “From” (Sender / Your Name)
                      </label>
                      <input
                        type="text"
                        value={giftData.fromAuthorName ?? giftData.authorName ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGiftData((prev) => ({
                            ...prev,
                            fromAuthorName: val,
                            authorName: val,
                          }));
                        }}
                        placeholder="e.g. T"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dac0c2]/60 text-[#4e051a] font-serif font-bold text-base outline-none focus:border-[#6b1d2f]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Couple Monogram Seal
                    </label>
                    <input
                      type="text"
                      value={giftData.letter.sealInitial}
                      onChange={(e) => updateNested('letter', 'sealInitial', e.target.value)}
                      placeholder="e.g. T & U"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] font-serif font-bold text-sm outline-none focus:border-[#6b1d2f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Pet Name / Nickname
                    </label>
                    <input
                      type="text"
                      value={giftData.recipientNickname}
                      onChange={(e) => updateField('recipientNickname', e.target.value)}
                      placeholder="e.g. Cutie ❤️"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] text-sm outline-none focus:border-[#6b1d2f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Envelope Teaser Message (Before opening)
                  </label>
                  <textarea
                    rows={2}
                    value={giftData.openingMessage}
                    onChange={(e) => updateField('openingMessage', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] font-serif italic text-sm outline-none focus:border-[#6b1d2f] resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: OCCASION & MILESTONE */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('occasion')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    2. 🎂 Occasion & Milestone Title
                  </h3>
                  <span className="text-xs text-[#544244]">
                    "1 Year Since We Met", "Happy Anniversary", "Happy Birthday", etc.
                  </span>
                </div>
              </div>
              {openSections.occasion ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.occasion && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Occasion Title
                    </label>
                    <input
                      type="text"
                      value={giftData.occasionTitle}
                      onChange={(e) => updateField('occasionTitle', e.target.value)}
                      placeholder="e.g. 1 Year Since We Met"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] font-serif font-bold text-sm outline-none focus:border-[#6b1d2f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Milestone Badge Text
                    </label>
                    <input
                      type="text"
                      value={giftData.milestone}
                      onChange={(e) => updateField('milestone', e.target.value)}
                      placeholder="e.g. 365 Days of Pure Magic"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] text-sm outline-none focus:border-[#6b1d2f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Celebration Date
                    </label>
                    <input
                      type="text"
                      value={giftData.celebrationDate}
                      onChange={(e) => updateField('celebrationDate', e.target.value)}
                      placeholder="e.g. October 14, 2025"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] text-sm outline-none focus:border-[#6b1d2f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Occasion Dedication Tagline
                    </label>
                    <input
                      type="text"
                      value={giftData.occasionTagline}
                      onChange={(e) => updateField('occasionTagline', e.target.value)}
                      placeholder="e.g. For every quiet morning, starry drive, and infinite tomorrows with you."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] text-sm outline-none focus:border-[#6b1d2f]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: NOTE & SONG */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('song')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    3. 🎵 Love Note & "Our Song" (Slide 2)
                  </h3>
                  <span className="text-xs text-[#544244]">
                    The dedication note and selected romantic song/audio
                  </span>
                </div>
              </div>
              {openSections.song ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.song && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Highlight Dedication Quote
                  </label>
                  <input
                    type="text"
                    value={giftData.dedicationQuote}
                    onChange={(e) => updateField('dedicationQuote', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#4e051a] font-serif italic text-sm outline-none focus:border-[#6b1d2f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Dedication Note Body
                  </label>
                  <textarea
                    rows={4}
                    value={giftData.dedicationBody}
                    onChange={(e) => updateField('dedicationBody', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-[#544244] text-sm outline-none focus:border-[#6b1d2f] leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Song Title
                    </label>
                    <input
                      type="text"
                      value={giftData.music.songTitle}
                      onChange={(e) =>
                        setGiftData((prev) => ({
                          ...prev,
                          music: { ...prev.music, songTitle: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-bold text-[#4e051a]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Upload Custom Audio File (Optional)
                    </label>
                    <label className="w-full px-3.5 py-2 bg-[#fdf1ec] hover:bg-[#f8ebe6] rounded-xl border border-[#dac0c2]/40 flex items-center justify-center gap-1.5 text-xs text-[#4e051a] font-semibold cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-[#735b20]" />
                      <span>
                        {giftData.music.customAudioDataUrl ? 'Change Audio File' : 'Upload MP3 / Audio'}
                      </span>
                      <input type="file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: OUR ALBUM MEMORIES (strictly no location) */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('memories')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    4. 📸 Our Album Memories (Slide 3)
                  </h3>
                  <span className="text-xs text-[#544244]">
                    {giftData.memories.length} scrapbook memories • Add, reorder & upload photos
                  </span>
                </div>
              </div>
              {openSections.memories ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.memories && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#544244]">Reorder cards up or down to set your story order</span>
                  <button
                    onClick={addMemory}
                    className="px-3.5 py-1.5 rounded-full bg-[#6b1d2f] text-white text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-[#4e051a] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Memory</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {giftData.memories.map((mem, index) => (
                    <div
                      key={mem.id || index}
                      className="p-4 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/50 flex flex-col gap-3 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#735b20] uppercase tracking-wider">
                          Memory #{index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveMemory(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded hover:bg-white text-[#544244] disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveMemory(index, 'down')}
                            disabled={index === giftData.memories.length - 1}
                            className="p-1 rounded hover:bg-white text-[#544244] disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeMemory(mem.id)}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600 cursor-pointer"
                            title="Delete Memory"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-4 flex flex-col items-center gap-2">
                          <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-white border border-[#dac0c2]/40 shadow-xs">
                            <img src={mem.photoUrl} alt={mem.title} className="w-full h-full object-cover" />
                          </div>
                          <label className="w-full py-1.5 px-2 bg-white text-[#4e051a] hover:bg-[#f8ebe6] rounded-lg text-xs font-semibold text-center border border-[#dac0c2]/50 cursor-pointer flex items-center justify-center gap-1 shadow-xs">
                            <Upload className="w-3 h-3 text-[#735b20]" />
                            <span>Upload Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleMemoryPhotoUpload(e, mem.id)}
                            />
                          </label>
                        </div>

                        <div className="sm:col-span-8 flex flex-col gap-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-[#735b20]">Memory Title</label>
                              <input
                                type="text"
                                value={mem.title}
                                onChange={(e) =>
                                  setGiftData((prev) => ({
                                    ...prev,
                                    memories: prev.memories.map((m) =>
                                      m.id === mem.id ? { ...m, title: e.target.value } : m
                                    ),
                                  }))
                                }
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#dac0c2]/40 text-xs font-serif font-bold text-[#4e051a]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-[#735b20]">Date / Timeframe</label>
                              <input
                                type="text"
                                value={mem.date}
                                onChange={(e) =>
                                  setGiftData((prev) => ({
                                    ...prev,
                                    memories: prev.memories.map((m) =>
                                      m.id === mem.id ? { ...m, date: e.target.value } : m
                                    ),
                                  }))
                                }
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#dac0c2]/40 text-xs text-[#544244]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#735b20]">Story Description</label>
                            <textarea
                              rows={2}
                              value={mem.description}
                              onChange={(e) =>
                                setGiftData((prev) => ({
                                  ...prev,
                                  memories: prev.memories.map((m) =>
                                    m.id === mem.id ? { ...m, description: e.target.value } : m
                                  ),
                                }))
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#dac0c2]/40 text-xs text-[#544244] resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 5: POLAROID GALLERY */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('photos')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  5
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    5. 🖼️ Polaroid Snapshots
                  </h3>
                  <span className="text-xs text-[#544244]">
                    Add candid shots with captions for our album
                  </span>
                </div>
              </div>
              {openSections.photos ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.photos && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-4">
                <label className="border-2 border-dashed border-[#dac0c2] bg-[#fdf1ec]/70 hover:bg-[#fdf1ec] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-[#6b1d2f] mb-2" />
                  <span className="font-serif font-bold text-[#4e051a] text-sm">
                    Upload Photos from Your Device
                  </span>
                  <span className="text-xs text-[#544244] mt-1">
                    Adds polaroid frame & captions to the album
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryPhotoUpload}
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {giftData.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="p-3 bg-[#fdf1ec] rounded-xl border border-[#dac0c2]/40 flex flex-col gap-2 relative"
                    >
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-rose-100 text-rose-600 shadow-xs cursor-pointer z-10"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-white shadow-xs">
                        <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) =>
                            setGiftData((prev) => ({
                              ...prev,
                              photos: prev.photos.map((p) =>
                                p.id === photo.id ? { ...p, caption: e.target.value } : p
                              ),
                            }))
                          }
                          className="w-full px-2 py-1 bg-white rounded border border-[#dac0c2]/40 text-xs font-serif italic text-[#4e051a]"
                          placeholder="Caption..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 6: LOVE LETTER */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('letter')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  6
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    6. ✍️ Love Letter (Slide 4)
                  </h3>
                  <span className="text-xs text-[#544244]">
                    Handwritten or typewriter style on deckled cotton paper
                  </span>
                </div>
              </div>
              {openSections.letter ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.letter && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-4">
                <div className="flex items-center justify-between p-2 bg-[#fdf1ec] rounded-xl">
                  <span className="text-xs font-semibold text-[#544244]">Typeface Impression:</span>
                  <div className="flex items-center gap-1">
                    {(['handwritten', 'typewriter', 'classic'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateNested('letter', 'fontStyle', st)}
                        className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                          giftData.letter.fontStyle === st
                            ? 'bg-[#6b1d2f] text-white font-bold shadow-xs'
                            : 'text-[#544244] hover:bg-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Salutation
                    </label>
                    <input
                      type="text"
                      value={giftData.letter.salutation}
                      onChange={(e) => updateNested('letter', 'salutation', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-bold text-[#4e051a]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Letter Title
                    </label>
                    <input
                      type="text"
                      value={giftData.letter.title}
                      onChange={(e) => updateNested('letter', 'title', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-serif italic text-[#4e051a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Letter Body
                  </label>
                  <textarea
                    rows={7}
                    value={giftData.letter.body}
                    onChange={(e) => updateNested('letter', 'body', e.target.value)}
                    className="w-full p-4 rounded-xl bg-[#fffcf8] border border-[#eeddd4] text-[#201a18] text-sm leading-relaxed outline-none focus:border-[#6b1d2f] font-serif shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Signoff
                    </label>
                    <input
                      type="text"
                      value={giftData.letter.signoff}
                      onChange={(e) => updateNested('letter', 'signoff', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs text-[#544244]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Signature
                    </label>
                    <input
                      type="text"
                      value={giftData.letter.signature}
                      onChange={(e) => updateNested('letter', 'signature', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-serif font-bold text-[#4e051a]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Wax Stamp Monogram
                    </label>
                    <input
                      type="text"
                      value={giftData.letter.sealInitial}
                      onChange={(e) => updateNested('letter', 'sealInitial', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-serif font-bold text-[#4e051a] text-center"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 7: SECRET SURPRISE (pure secret surprise, no tickets or retail) */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('surprise')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  7
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    7. 🎁 Secret Surprise (Slide 5 & 6)
                  </h3>
                  <span className="text-xs text-[#544244]">
                    The gold scratch-off reveal & personal secret surprise message
                  </span>
                </div>
              </div>
              {openSections.surprise ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.surprise && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Teaser Headline ("Wait... there’s one more thing")
                  </label>
                  <input
                    type="text"
                    value={giftData.surprise.teaserHeadline}
                    onChange={(e) => updateNested('surprise', 'teaserHeadline', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-sm font-serif font-bold text-[#4e051a]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Teaser Subhead
                  </label>
                  <input
                    type="text"
                    value={giftData.surprise.teaserSubhead}
                    onChange={(e) => updateNested('surprise', 'teaserSubhead', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs text-[#544244]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Secret Surprise Title
                    </label>
                    <input
                      type="text"
                      value={giftData.surprise.secretTitle}
                      onChange={(e) => updateNested('surprise', 'secretTitle', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-bold text-[#4e051a]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                      Secret Surprise Subtitle
                    </label>
                    <input
                      type="text"
                      value={giftData.surprise.secretSubtitle}
                      onChange={(e) => updateNested('surprise', 'secretSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-serif italic text-[#735b20]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Secret Surprise Personal Message
                  </label>
                  <textarea
                    rows={4}
                    value={giftData.surprise.secretMessage}
                    onChange={(e) => updateNested('surprise', 'secretMessage', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs text-[#544244] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#544244] uppercase tracking-wider block mb-1">
                    Final Closing Sentiment (Slide 6)
                  </label>
                  <input
                    type="text"
                    value={giftData.finalClosingMessage}
                    onChange={(e) => updateField('finalClosingMessage', e.target.value)}
                    placeholder="e.g. Made with love ❤️"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fdf1ec] border border-[#dac0c2]/40 text-xs font-bold text-[#4e051a]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECTION 8: THEMES */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dac0c2]/40 overflow-hidden">
            <button
              onClick={() => toggleSection('theme')}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-[#fdf1ec]/40 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-bold text-xs">
                  8
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4e051a]">
                    8. 🎨 Romantic Aesthetic Themes
                  </h3>
                  <span className="text-xs text-[#544244]">
                    Choose from 5 curated artisan color palettes
                  </span>
                </div>
              </div>
              {openSections.theme ? <ChevronUp className="w-4 h-4 text-[#735b20]" /> : <ChevronDown className="w-4 h-4 text-[#735b20]" />}
            </button>

            {openSections.theme && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#dac0c2]/20 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(THEMES) as ThemeId[]).map((thmId) => {
                    const thm = THEMES[thmId];
                    const isSelected = giftData.theme === thmId;

                    return (
                      <div
                        key={thmId}
                        onClick={() => updateField('theme', thmId)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#6b1d2f] bg-[#fdf1ec] shadow-sm'
                            : 'border-[#dac0c2]/40 bg-white hover:bg-[#fdf1ec]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif text-sm font-bold text-[#4e051a]">
                            {thm.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#6b1d2f]" />}
                        </div>
                        <p className="text-[11px] text-[#544244] line-clamp-1 mb-2">
                          {thm.subtitle}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: thm.colors.bg }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: thm.colors.sealBg }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: thm.colors.accentText }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Web Slide Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <WebSlidePreview
            giftData={giftData}
            onOpenFullExperience={onOpenPreview}
          />
        </div>
      </div>
    </div>
  );
};
