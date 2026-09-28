/**
 * Audio Engine for Romantic Keepsake
 * Provides Web Audio API synthesis for soothing romantic piano melody,
 * wax seal cracking sound effects, and handles custom user audio files.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private musicInterval: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Play a soft, beautiful piano-like tone
  private playPianoTone(freq: number, startTime: number, duration: number, volume: number = 0.15) {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Warm low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, startTime);
      filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

      // Piano-like envelope: fast attack, warm natural decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio context might need user gesture
    }
  }

  // Play a romantic gentle arpeggio chord cycle (Claire de Lune / Satie style)
  public startAmbientMelody() {
    if (this.isPlaying) return;

    if (this.customAudio) {
      this.customAudio.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {
        this.playSyntheticMelody();
      });
      return;
    }

    this.playSyntheticMelody();
  }

  private playSyntheticMelody() {
    this.isPlaying = true;
    this.notify();
    const ctx = this.getAudioContext();

    // Notes: C4, E4, G4, B4, C5, D5, E5, G5
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G7
    ];

    let chordIdx = 0;

    const playStep = () => {
      if (!this.isPlaying) return;
      const now = ctx.currentTime;
      const chord = chords[chordIdx % chords.length];

      // Arpeggiate
      chord.forEach((note, i) => {
        this.playPianoTone(note, now + i * 0.45, 2.8, 0.12);
      });

      // Add a sparkling gentle high note
      const highNote = chord[chordIdx % chord.length] * 2;
      this.playPianoTone(highNote, now + 1.8, 2.2, 0.08);

      chordIdx++;
    };

    playStep();
    this.musicInterval = window.setInterval(playStep, 3800);
  }

  public stopAmbientMelody() {
    this.isPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.notify();
  }

  public toggleMusic() {
    if (this.isPlaying) {
      this.stopAmbientMelody();
    } else {
      this.startAmbientMelody();
    }
  }

  public setCustomAudio(url?: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
    }
  }

  // Tactile wax seal crack & paper unfold sound
  public playWaxSealCrack() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // 1. Snapping crack (filtered noise burst)
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(3, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.11);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);

      // 2. Warm resonant thud
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      oscGain.gain.setValueAtTime(0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore if autoplay policy blocked
    }
  }

  // Voice memo tap sound
  public playChime() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      this.playPianoTone(523.25, now, 1.5, 0.2); // C5
      this.playPianoTone(659.25, now + 0.1, 1.8, 0.2); // E5
    } catch {
      // Ignore
    }
  }

  // Crazy romantic love reaction sound (harmonious romantic harp chime)
  public playLoveHeartSound() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      // Sweet romantic arpeggio: C5 -> E5 -> G5 -> C6
      this.playPianoTone(523.25, now, 1.2, 0.18);
      this.playPianoTone(659.25, now + 0.08, 1.4, 0.2);
      this.playPianoTone(783.99, now + 0.16, 1.6, 0.22);
      this.playPianoTone(1046.50, now + 0.24, 2.0, 0.25);
    } catch {
      // Ignore
    }
  }
}

export const romanticAudio = new RomanticAudioManager();
