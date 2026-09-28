/**
 * Types for Mon Trésor Romantic Keepsake
 */

export type ThemeId = 'vintage' | 'romance' | 'midnight' | 'atelier' | 'minimal';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  colors: {
    bg: string;
    cardBg: string;
    primaryText: string;
    accentText: string;
    mutedText: string;
    sealBg: string;
    sealText: string;
    tapeColor: string;
    accentBorder: string;
  };
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  photoUrl: string;
  tokenNumber?: string;
  iconName?: string;
}

export interface PolaroidItem {
  id: string;
  url: string;
  caption: string;
  tilt: number; // degrees -6 to +6
  audioMemoTitle?: string;
  audioMemoDesc?: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  story: string;
  tag: string;
  photoUrl?: string;
}

export interface GiftData {
  // 1. People & Greeting (T & U)
  greetingTitle: string; // e.g. "Hello cutie ❤️"
  topName1?: string; // Top Header Name 1 (e.g. "T")
  topName2?: string; // Top Header Name 2 (e.g. "U")
  forRecipientName?: string; // Dedicated "For:" recipient name (e.g. "U")
  fromAuthorName?: string; // Dedicated "From:" sender name (e.g. "T")
  authorName: string; // e.g. "T"
  recipientName: string; // e.g. "U"
  recipientNickname: string; // e.g. "Cutie ❤️"

  // 2. Occasion
  occasionTitle: string; // e.g. "1 Year Since We Met" or "Happy Anniversary" or "Happy Birthday"
  celebrationDate: string;
  milestone: string;
  occasionTagline: string;

  // 3. Opening & Dedication
  openingMessage: string;
  dedicationKicker: string;
  dedicationQuote: string;
  dedicationBody: string;

  // 4. Memories (Album) - strictly no location
  memories: MemoryItem[];

  // 5. Polaroids (Album) - strictly no location
  photos: PolaroidItem[];

  // 6. Timeline (Our Story)
  timeline: TimelineMilestone[];

  // 7. Love Letter
  letter: {
    salutation: string;
    title: string;
    body: string;
    signoff: string;
    signature: string;
    fontStyle: 'handwritten' | 'typewriter' | 'classic';
    sealInitial: string;
  };

  // 8. Pure Secret Surprise (no flight tickets, no retail booking)
  surprise: {
    teaserHeadline: string;
    teaserSubhead: string;
    revealType: 'scratch' | 'tap';
    secretTitle: string;
    secretSubtitle: string;
    secretMessage: string;
  };

  // 9. Final page
  finalClosingMessage: string;

  // 10. Theme & Music
  theme: ThemeId;
  music: {
    enabled: boolean;
    autoplay: boolean;
    songTitle: string;
    customAudioDataUrl?: string;
  };
}
