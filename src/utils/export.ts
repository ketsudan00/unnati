/**
 * Export and sharing utilities for Mon Trésor
 */
import { GiftData } from '../types/gift';

export function compressGiftDataToHash(data: GiftData): string {
  try {
    const json = JSON.stringify(data);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
  } catch (err) {
    console.error('Failed to encode gift data', err);
    return '';
  }
}

export function decompressGiftDataFromHash(hashStr: string): GiftData | null {
  try {
    const json = decodeURIComponent(escape(atob(decodeURIComponent(hashStr))));
    return JSON.parse(json);
  } catch (err) {
    console.error('Failed to decode gift data', err);
    return null;
  }
}

/**
 * Generates a self-contained standalone HTML gift package that can be opened in any browser
 */
export function generateStandaloneGiftHtml(giftData: GiftData): string {
  const safeData = JSON.stringify(giftData).replace(/<\/script>/g, '<\\/script>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${giftData.greetingTitle || 'Hello cutie ❤️'} — A Keepsake for ${giftData.recipientName || 'U'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: ${giftData.theme === 'midnight' ? '#1a1516' : '#fff8f6'};
      color: ${giftData.theme === 'midnight' ? '#fceced' : '#201a18'};
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    .font-serif { font-family: 'Playfair Display', Georgia, serif; }
    .font-handwriting { font-family: 'Caveat', cursive; }
    .washi-tape {
      background: rgba(254, 220, 148, 0.65);
      backdrop-filter: blur(2px);
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .deckle-box {
      box-shadow: 0 4px 20px rgba(42,36,33,0.08);
      background-image: radial-gradient(rgba(115, 91, 32, 0.03) 1px, transparent 0);
      background-size: 20px 20px;
    }
  </style>
</head>
<body>
  <div id="standalone-app" class="min-h-screen flex flex-col justify-between">
    <!-- Header -->
    <header class="py-4 px-6 flex items-center justify-between border-b border-black/5 bg-white/60 backdrop-blur-md">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-[#6b1d2f] text-[#ffd9dd] flex items-center justify-center font-serif italic text-sm">M</div>
        <span class="font-serif italic font-semibold text-[#4e051a]">Mon Trésor</span>
      </div>
      <div class="text-xs uppercase tracking-widest text-[#735b20] font-semibold">
        Slide <span id="chapter-num">1</span> of 6
      </div>
    </header>

    <!-- Main Dynamic Slide Stage -->
    <main id="stage-root" class="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full text-center"></main>

    <!-- Navigation Footer -->
    <footer class="py-4 px-6 flex items-center justify-between border-t border-black/5 bg-white/40 backdrop-blur-md">
      <button id="btn-prev" onclick="prevChapter()" class="text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-black/10 hover:bg-black/5">Previous Slide</button>
      <div id="dots" class="flex gap-1.5"></div>
      <button id="btn-next" onclick="nextChapter()" class="text-xs uppercase tracking-wider px-5 py-2 rounded-full bg-[#6b1d2f] text-white shadow-sm hover:opacity-90">Next Slide →</button>
    </footer>
  </div>

  <script>
    const gift = ${safeData};
    let current = 1;
    const total = 6;

    // Web Audio Synthesizer for gentle song
    let audioCtx = null;
    let isPlaying = false;
    let musicTimer = null;

    function toggleMusic() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      isPlaying = !isPlaying;
      if (isPlaying) {
        startMelody();
      } else {
        if (musicTimer) clearInterval(musicTimer);
      }
      renderStage();
    }

    function playNote(freq, start, duration) {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.08, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + duration);
      } catch(e) {}
    }

    function startMelody() {
      if (!audioCtx) return;
      const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63];
      let step = 0;
      musicTimer = setInterval(() => {
        if (!isPlaying || !audioCtx) return;
        const now = audioCtx.currentTime;
        playNote(notes[step % notes.length], now, 0.9);
        step++;
      }, 700);
    }

    function renderStage() {
      const root = document.getElementById('stage-root');
      document.getElementById('chapter-num').innerText = current;

      // Update dots
      const dotsRoot = document.getElementById('dots');
      dotsRoot.innerHTML = '';
      for (let i = 1; i <= total; i++) {
        const d = document.createElement('button');
        d.className = 'w-2.5 h-2.5 rounded-full ' + (current === i ? 'bg-[#6b1d2f]' : 'bg-black/20');
        d.onclick = () => goTo(i);
        dotsRoot.appendChild(d);
      }

      if (current === 1) {
        root.innerHTML = \`
          <div class="w-full max-w-xl mx-auto flex flex-col items-center">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf1ec] border border-[#dac0c2]/60 text-xs font-semibold text-[#735b20] mb-4">
              <span class="font-bold text-sm tracking-widest">\${gift.authorName || 'T'} & \${gift.recipientName || 'U'}</span>
              <span>•</span>
              <span>\${gift.milestone || '365 Days'}</span>
            </div>
            <h1 class="font-serif text-4xl sm:text-6xl text-[#4e051a] font-medium mb-3">\${gift.greetingTitle || 'Hello cutie ❤️'}</h1>
            <p class="font-serif text-xl sm:text-2xl italic text-[#735b20] mb-8">Happy \${gift.occasionTitle || '1 Year Since We Met'}</p>
            
            <div onclick="crackSeal()" class="w-full bg-[#fdf1ec] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#dac0c2]/60 cursor-pointer hover:scale-102 transition-transform">
              <span class="text-xs uppercase tracking-widest text-[#735b20] font-semibold block mb-2">For \${gift.recipientName || 'U'} • From \${gift.authorName || 'T'}</span>
              <h2 class="font-serif text-3xl italic text-[#4e051a] mb-4">Private & Confidential</h2>
              <p class="text-xs sm:text-sm text-[#544244] max-w-xs mx-auto mb-8">"\${gift.openingMessage}"</p>
              <div class="w-20 h-20 rounded-full mx-auto bg-[#6b1d2f] text-[#ffd9dd] flex flex-col items-center justify-center shadow-xl">
                <span class="font-serif text-xl italic font-bold">\${gift.letter.sealInitial || 'T & U'}</span>
              </div>
              <span class="text-xs text-[#735b20] block mt-4 font-semibold">Click to open envelope 💌</span>
            </div>
          </div>
        \`;
      } else if (current === 2) {
        root.innerHTML = \`
          <div class="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl deckle-box text-left">
            <span class="text-xs uppercase tracking-widest text-[#735b20] font-bold block mb-1">Slide 2 • Dedication</span>
            <h2 class="font-serif text-3xl sm:text-4xl text-[#4e051a] mb-2">Happy \${gift.occasionTitle}, \${gift.recipientName} ❤️</h2>
            <p class="text-xs text-[#735b20] font-semibold mb-6">\${gift.milestone}</p>
            
            <div class="bg-[#fdf1ec] rounded-2xl p-6 mb-6 border border-[#eeddd4]">
              <p class="font-serif text-lg italic text-[#4e051a] mb-3">"\${gift.dedicationQuote}"</p>
              <p class="text-sm text-[#544244] leading-relaxed">\${gift.dedicationBody}</p>
            </div>

            <div class="p-4 bg-[#fffcf8] rounded-xl border border-[#eeddd4] flex items-center justify-between mb-8">
              <div>
                <span class="text-[10px] uppercase font-bold text-[#735b20] block">Our Song</span>
                <span class="font-serif text-base font-bold text-[#4e051a]">\${gift.music.songTitle}</span>
              </div>
              <button onclick="toggleMusic()" class="px-4 py-2 rounded-full text-xs font-semibold \${isPlaying ? 'bg-[#6b1d2f] text-white' : 'bg-[#fdf1ec] text-[#4e051a]'}">
                \${isPlaying ? 'Pause Song' : 'Play Our Song 🎵'}
              </button>
            </div>

            <button onclick="nextChapter()" class="w-full py-4 rounded-full bg-[#6b1d2f] text-white font-medium shadow hover:opacity-90 text-center">
              View Our Album 📸 →
            </button>
          </div>
        \`;
      } else if (current === 3) {
        let memHtml = gift.memories.map((m, idx) => \`
          <div class="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between text-left border border-black/5 relative transform \${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}">
            <div class="aspect-4/3 w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
              <img src="\${m.photoUrl}" class="w-full h-full object-cover">
            </div>
            <div class="text-xs uppercase tracking-wider text-[#735b20] font-semibold mb-1">\${m.date}</div>
            <h3 class="font-serif text-lg text-[#4e051a] font-medium mb-1">\${m.title}</h3>
            <p class="text-xs text-[#544244] leading-relaxed italic mb-3">"\${m.description}"</p>
            <div class="text-[10px] text-[#735b20] italic font-serif">\${gift.authorName || 'T'} & \${gift.recipientName || 'U'}</div>
          </div>
        \`).join('');

        root.innerHTML = \`
          <div class="w-full">
            <span class="text-xs uppercase tracking-widest text-[#735b20] font-bold block mb-1">Slide 3 • Our Memory Keepsake</span>
            <h2 class="font-serif text-3xl text-[#4e051a] mb-6">Our Photo Album</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">\${memHtml}</div>
            <button onclick="nextChapter()" class="px-8 py-3.5 rounded-full bg-[#6b1d2f] text-white font-medium shadow hover:opacity-90">
              Read My Love Letter to You 💌 →
            </button>
          </div>
        \`;
      } else if (current === 4) {
        root.innerHTML = \`
          <div class="w-full max-w-2xl bg-[#fffcf8] rounded-3xl p-8 sm:p-14 shadow-2xl deckle-box text-left border border-[#eeddd4]">
            <span class="text-xs uppercase tracking-widest text-[#735b20] font-bold block mb-1">\${gift.letter.salutation}</span>
            <h2 class="font-serif text-2xl sm:text-3xl text-[#4e051a] italic mb-6">\${gift.letter.title}</h2>
            <div class="text-sm sm:text-base leading-relaxed whitespace-pre-line text-[#362f2c] \${gift.letter.fontStyle === 'handwritten' ? 'font-handwriting text-2xl' : ''}">\${gift.letter.body}</div>
            <div class="mt-8 pt-6 border-t border-[#eeddd4] flex items-center justify-between">
              <div>
                <p class="font-serif text-sm italic text-[#735b20]">\${gift.letter.signoff}</p>
                <p class="font-serif text-xl italic font-bold text-[#4e051a]">\${gift.letter.signature}</p>
              </div>
              <div class="w-12 h-12 rounded-full bg-[#6b1d2f] text-white flex items-center justify-center font-serif text-xs italic shadow-md">
                \${gift.letter.sealInitial || 'T & U'}
              </div>
            </div>
            <button onclick="nextChapter()" class="w-full mt-8 py-3.5 rounded-full bg-[#6b1d2f] text-white font-medium shadow hover:opacity-90 text-center">
              Wait... there’s one more secret ✨ →
            </button>
          </div>
        \`;
      } else if (current === 5) {
        root.innerHTML = \`
          <div class="w-full max-w-xl bg-[#251e20] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div class="w-14 h-14 rounded-full bg-white/10 mx-auto flex items-center justify-center text-amber-300 text-3xl mb-4">✨</div>
            <span class="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-2">Slide 5 • Secret Surprise</span>
            <h2 class="font-serif text-2xl sm:text-4xl text-white mb-4">\${gift.surprise.teaserHeadline}</h2>
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">\${gift.surprise.teaserSubhead}</p>
            
            <div class="bg-white/10 p-5 rounded-2xl mb-8 border border-white/20 text-left">
              <span class="text-xs uppercase font-bold text-amber-300 block mb-1">✨ \${gift.surprise.secretTitle}</span>
              <p class="text-sm font-serif italic text-white mb-2">\${gift.surprise.secretSubtitle}</p>
              <p class="text-xs text-[#ffd9dd] leading-relaxed italic">"\${gift.surprise.secretMessage}"</p>
            </div>

            <button onclick="revealSecret()" class="px-8 py-4 rounded-full bg-amber-400 text-black font-semibold text-base shadow hover:scale-105 transition-transform">
              Grand Finale ❤️ →
            </button>
          </div>
        \`;
      } else if (current === 6) {
        try {
          if (window.confetti) {
            window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          }
        } catch(e) {}

        root.innerHTML = \`
          <div class="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl deckle-box text-center">
            <div class="w-16 h-16 mx-auto rounded-full bg-[#6b1d2f] text-[#ffd9dd] flex flex-col items-center justify-center mb-4">
              <span class="font-serif text-lg italic font-bold">\${gift.authorName || 'T'} & \${gift.recipientName || 'U'}</span>
            </div>
            <h2 class="font-serif text-3xl sm:text-4xl text-[#4e051a] mb-2">\${gift.finalClosingMessage || 'Made with love ❤️'}</h2>
            <p class="font-serif text-lg italic text-[#735b20] mb-6">“With all my love for \${gift.recipientName || 'U'}”</p>
            
            <div class="bg-[#fdf1ec] rounded-2xl p-6 text-center shadow-inner border border-[#eeddd4] mb-6 text-xs text-[#544244] leading-relaxed italic">
              “For every laugh, every coffee, and all the unhurried tomorrows waiting for us.”
            </div>

            <div class="text-xs uppercase tracking-widest text-[#735b20] font-semibold">\${gift.celebrationDate} • Forever & Always</div>
            <button onclick="goTo(1)" class="mt-6 text-xs text-[#735b20] underline">Relive from Slide 1 (Envelope)</button>
          </div>
        \`;
      }
    }

    function crackSeal() {
      try {
        if (window.confetti) {
          window.confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
        }
      } catch(e) {}
      setTimeout(() => nextChapter(), 300);
    }

    function revealSecret() {
      try {
        if (window.confetti) {
          window.confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        }
      } catch(e) {}
      setTimeout(() => nextChapter(), 300);
    }

    function nextChapter() {
      if (current < total) {
        current++;
        renderStage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function prevChapter() {
      if (current > 1) {
        current--;
        renderStage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function goTo(num) {
      current = num;
      renderStage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderStage();
  </script>
</body>
</html>`;
}

export function downloadFile(filename: string, content: string, mimeType: string = 'text/html') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
