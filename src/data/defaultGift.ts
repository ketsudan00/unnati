import { GiftData, ThemeConfig, ThemeId } from '../types/gift';

export const THEMES: Record<ThemeId, ThemeConfig> = {
  vintage: {
    id: 'vintage',
    name: 'Vintage Letter',
    subtitle: 'Cream parchment, burgundy seal & typewriter tone',
    colors: {
      bg: '#fff8f6',
      cardBg: '#ffffff',
      primaryText: '#4e051a',
      accentText: '#735b20',
      mutedText: '#544244',
      sealBg: '#6b1d2f',
      sealText: '#ffd9dd',
      tapeColor: 'rgba(254, 220, 148, 0.65)',
      accentBorder: '#dac0c2',
    },
  },
  romance: {
    id: 'romance',
    name: 'Soft Romance',
    subtitle: 'Warm ivory, blush rose & high-contrast serif',
    colors: {
      bg: '#fff5f7',
      cardBg: '#ffffff',
      primaryText: '#5b1024',
      accentText: '#a44258',
      mutedText: '#6a4a52',
      sealBg: '#8c223c',
      sealText: '#ffe3e8',
      tapeColor: 'rgba(255, 178, 188, 0.6)',
      accentBorder: '#f0c7cf',
    },
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Love',
    subtitle: 'Noir velvet paper, candlelight gold & intimate dusk',
    colors: {
      bg: '#1a1516',
      cardBg: '#251e20',
      primaryText: '#fceced',
      accentText: '#e5bf70',
      mutedText: '#baa3a7',
      sealBg: '#47141f',
      sealText: '#ffdf9c',
      tapeColor: 'rgba(115, 91, 32, 0.45)',
      accentBorder: '#4a383b',
    },
  },
  atelier: {
    id: 'atelier',
    name: 'Scrapbook Atelier',
    subtitle: 'Textured kraft pulp, washi tape joints & cursive stamps',
    colors: {
      bg: '#fcf8f2',
      cardBg: '#faf4ea',
      primaryText: '#3d2516',
      accentText: '#875323',
      mutedText: '#615043',
      sealBg: '#59291b',
      sealText: '#f8d9b8',
      tapeColor: 'rgba(214, 180, 137, 0.65)',
      accentBorder: '#d8c5b0',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Pure Minimal',
    subtitle: 'Museum matte stock, stark contrast & modern spacing',
    colors: {
      bg: '#f9f9f9',
      cardBg: '#ffffff',
      primaryText: '#1a1a1a',
      accentText: '#555555',
      mutedText: '#777777',
      sealBg: '#222222',
      sealText: '#ffffff',
      tapeColor: 'rgba(200, 200, 200, 0.5)',
      accentBorder: '#e0e0e0',
    },
  },
};

export const DEFAULT_GIFT_DATA: GiftData = {
  greetingTitle: 'Hello cutie ❤️',
  topName1: 'T',
  topName2: 'U',
  forRecipientName: 'U',
  fromAuthorName: 'T',
  authorName: 'T',
  recipientName: 'U',
  recipientNickname: 'Cutie ❤️',
  occasionTitle: '1 Year Since We Met',
  celebrationDate: 'October 14, 2025',
  milestone: '365 Days of Pure Magic',
  occasionTagline: 'For every quiet morning, starry drive, and infinite tomorrows with you.',
  openingMessage:
    "Someone spent midnight hours building a quiet little universe solely for your heart. There's an envelope waiting below just for you...",
  dedicationKicker: 'Celebrating Us • Our 1 Year Anniversary',
  dedicationQuote: '“To my favorite human, my co-pilot, and the keeper of all my wildest laughs...”',
  dedicationBody:
    'I built this quiet corner of the digital universe just for you. No alarms, no rushed afternoons. Only our favorite moments, our song, and everything we have lived together since that first day we met.',
  memories: [
    {
      id: 'mem-1',
      title: 'First Coffee Together',
      date: '12 April',
      description:
        'You were so nervous you knocked over your espresso into the saucer, apologized three times, and made me laugh so hard my cheeks ached.',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDgUic8xpGYGQ0j_xKadx44patdGXNTcLU2TDt74fCc_9aFGNX8Rr-cmO_R70c5ERS7pqDI8tRTYhIRBOZO9LVWBX9NtCuIx5Fl74y4V_K9ASmBFx4s1DYL-BWOIu--ywZCGxQElTUBiDXNrWX0cQN6hVHp7Px-zD7kMc3edYbHFKMxZSTMFXjt6GTufPW07iV-4M90a53HHl2Y9EC7beBUK-5pURjY2gKSs4jPC04f9Z_4fsYDkWEKgg',
      tokenNumber: '#01',
      iconName: 'local_cafe',
    },
    {
      id: 'mem-2',
      title: 'Our Rainy Sunday Detour',
      date: '28 June',
      description:
        'GPS died, phones had zero bars, and we found that tiny hidden gravel shore where we ate peach pastries under your drenched leather jacket.',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAJkq8k1nnHP9Sowpo4PBF8B32pKPf3EKOBCKtyFW62poReN5JqGCwVsDdAmGA9hkBGg7AcLFdHPfy805QaRIOBpKJfjLg8Sm7EYKNZwAfVAu1_NZPXkCItBvre0oVh6WTOP3xtc3dF4Xc-3_qk4gHc-_cQ8hK-xCVUPCXZmLfdxsqHxJsCZwu0rSmeSSoLwIjHpo3eChKNtEI4vng9VNDkN3EcIafF3SOZHXp0yja9FbCmOun5U7T47A',
      tokenNumber: '#02',
      iconName: 'water_drop',
    },
    {
      id: 'mem-3',
      title: 'Concert Under the Stars',
      date: '18 August',
      description:
        'You spun me around during the acoustic encore. I swear the whole night slowed into a quiet golden haze while we sang every lyric.',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCaZ4GYi-BopAIsqY7nE0rJ6PH802-DwheVcrIIomb9XywxXiJTTgv6GNbnKyUkClq2L0y-yLnJHiNu429jTrPJns94YTdFJGZBt1JXoK81Dj349oPz661jgLLfSb9dZiAtRI0R6RaqaarHi9CXrZtP87_X5TmR0PZ3UzuXZMcyTDgv6HbMU1pIVnVMS0ayskU_Jyo0REN-u_TyWvqikSF_PxxN05Dk0IBrzaqn4Iicwxn9m3brB61NzQ',
      tokenNumber: '#03',
      iconName: 'music_note',
    },
    {
      id: 'mem-4',
      title: 'Midnight Gelato Laughs',
      date: '22 May',
      description:
        'Sitting on the warm fountain ledge sharing double pistachio gelato, kicking our feet and laughing until our stomachs hurt.',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB8MW5Svm7DJP6CYkIhmkiniVNnMGrmhyLSSpKhXTJPSHSSDtqHiaZujrJA_IeiBmAeCTrKtzyxTSF7EIrKRnONO3Xk_U7zeyIB7LsHtf8UfQmy_5lp61WWpBznIR1-cvTo7XwaHqn3btfu1cfZCrOqdj7nlTjyHmng9QJC7ewx123usXBWsykx0ctvgGR-eOxgULPFK-wEoO0ULYSHh8gLoz7mMeKC5l0pf3ipGlQSHvs69zUmXr4Q_Q',
      tokenNumber: '#04',
      iconName: 'icecream',
    },
  ],
  photos: [
    {
      id: 'photo-1',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgakPcbqEay8cKQaciVguu9e1pAr5HQC4Ja2Ltms271f88mt3BtAaxzlrZ_ByWQuXDTqM82otF1IuK1ii80XIdoNDX5Xor1giEI9gQcrTAAZWbY_7hhmfKjBW65iTtjXX2AR0i5UnujpoHUTYgsDxUeN43yxUPxFigo3Y8jxn1sFswBoeHLkVretUAjgnzYVikr8J6C0p8dvdx5gYfLItqjdt5ds8hu7h9FZRgPtQdPBbzasFUenGs4A',
      caption: 'Laughing at the silliest puns together',
      tilt: -2.5,
      audioMemoTitle: 'Midnight Rooftop Talks',
      audioMemoDesc: 'Wind, laughter, and warm tea',
    },
    {
      id: 'photo-2',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtrgHWGdPyX9acDKQu7jDjVV_o_m9Ukri_IFCBBpNK7Gtds_wkMEONhdAQV53BCK0j4l-5VoAzU9pBMeIuUnKjUSD1t-g9K6desWxVoNkaDdgZ5X-E0PwJNXJSzemQwVgxU8cw-b4KlfvSNLhXXsp2Gr4M_IumOGd5jmJNUZPHD5E6pUUN6rcBQWOrJD3KHG0oPJ14a635nROX9k-zzLKLHLxQnDXNrWcyJHE6kKmjZt_1iJA_80XiAw',
      caption: 'Always holding hands when cold',
      tilt: 1.8,
      audioMemoTitle: 'Rain on the Car Roof',
      audioMemoDesc: 'Listening to the storm together',
    },
    {
      id: 'photo-3',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_VeIai2_kQQchfr88vVu-6St-LvCUTXKjQ5ShfOFVgbNw5_uJZKx-HodTe6cIEwwdvC5Zey5TEplb4t81qERlAuHoGSJuH-LlbRAoU6m6aH44KWRERAmRgTqwt7flPFCnVVaMk6Nu-zJ5RQz3cd0tsM44QU6rU_9iNGCIXBsIVWdZjM2DTavQm_hxyMJu7B2iGLXPbkj9RjL2h_NwR9FOOCFEQBaCjLEtWhPvOsmzznwrnjHjVECsDw',
      caption: 'The look you give me',
      tilt: -1.2,
      audioMemoTitle: 'Quiet Whispers',
      audioMemoDesc: 'Recorded while you were resting on the train',
    },
    {
      id: 'photo-4',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeXOmVhn3UEC2u-NBUaMPZZfzHvNQBg-tzbir1qInOI-tDq-qmTZWe-2a195WSs1x4Y0uYkexb6KXYZuL6LdSLgcoZ8FBHbpdKJ_DRatyRfc6KPFPAuPXUdSPeAqyWGxZSggSaRnw1g8IC_t0ZKZFKhasl3IzAH7HHkM8LjX-6FSMyq6Zud_dBBMibjYF-lSDrZmO5GHB2ic3N2GaMlIzhTS81jHhRbgRdG4-KMJ-xxxS8N5f_KLS9EA',
      caption: 'Under the warm paper lanterns',
      tilt: 2.2,
      audioMemoTitle: 'Ambient Evening Music',
      audioMemoDesc: 'Sounds of the street musician nearby',
    },
  ],
  timeline: [
    {
      id: 'tl-1',
      date: 'The Day We Met',
      title: 'The Day Our Paths Crossed',
      story:
        'That random coffee shop corner. You smiled shyly, our eyes met, and in that single moment my entire world shifted.',
      tag: 'Where forever began',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDgUic8xpGYGQ0j_xKadx44patdGXNTcLU2TDt74fCc_9aFGNX8Rr-cmO_R70c5ERS7pqDI8tRTYhIRBOZO9LVWBX9NtCuIx5Fl74y4V_K9ASmBFx4s1DYL-BWOIu--ywZCGxQElTUBiDXNrWX0cQN6hVHp7Px-zD7kMc3edYbHFKMxZSTMFXjt6GTufPW07iV-4M90a53HHl2Y9EC7beBUK-5pURjY2gKSs4jPC04f9Z_4fsYDkWEKgg',
    },
    {
      id: 'tl-2',
      date: 'Our First Roadtrip',
      title: 'The Roadtrip That Changed Everything',
      story:
        'Singing our favorite songs off-key as the sun set into violet water. That was the moment I knew I was completely in love with you.',
      tag: '1 playlist, infinite memories',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAJkq8k1nnHP9Sowpo4PBF8B32pKPf3EKOBCKtyFW62poReN5JqGCwVsDdAmGA9hkBGg7AcLFdHPfy805QaRIOBpKJfjLg8Sm7EYKNZwAfVAu1_NZPXkCItBvre0oVh6WTOP3xtc3dF4Xc-3_qk4gHc-_cQ8hK-xCVUPCXZmLfdxsqHxJsCZwu0rSmeSSoLwIjHpo3eChKNtEI4vng9VNDkN3EcIafF3SOZHXp0yja9FbCmOun5U7T47A',
    },
    {
      id: 'tl-3',
      date: 'Late Night Talks',
      title: 'Finding Home In You',
      story:
        'Eating takeout on the floor, laughing until midnight, realizing that anywhere with you is my true sanctuary.',
      tag: 'Our favorite place',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCtrgHWGdPyX9acDKQu7jDjVV_o_m9Ukri_IFCBBpNK7Gtds_wkMEONhdAQV53BCK0j4l-5VoAzU9pBMeIuUnKjUSD1t-g9K6desWxVoNkaDdgZ5X-E0PwJNXJSzemQwVgxU8cw-b4KlfvSNLhXXsp2Gr4M_IumOGd5jmJNUZPHD5E6pUUN6rcBQWOrJD3KHG0oPJ14a635nROX9k-zzLKLHLxQnDXNrWcyJHE6kKmjZt_1iJA_80XiAw',
    },
    {
      id: 'tl-4',
      date: 'Today • 1 Year Together',
      title: 'The Greatest Human I Know',
      story:
        'Every single chapter ahead is already my favorite because it has you in it. Thank you for filling my world with so much warmth.',
      tag: 'Forever T & U',
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAgakPcbqEay8cKQaciVguu9e1pAr5HQC4Ja2Ltms271f88mt3BtAaxzlrZ_ByWQuXDTqM82otF1IuK1ii80XIdoNDX5Xor1giEI9gQcrTAAZWbY_7hhmfKjBW65iTtjXX2AR0i5UnujpoHUTYgsDxUeN43yxUPxFigo3Y8jxn1sFswBoeHLkVretUAjgnzYVikr8J6C0p8dvdx5gYfLItqjdt5ds8hu7h9FZRgPtQdPBbzasFUenGs4A',
    },
  ],
  letter: {
    salutation: 'To my dearest U,',
    title: 'A Letter For You, My Love',
    body: `If you ever wonder what it feels like to be loved completely, I hope today gives you even the faintest reflection of how you make me feel every single morning.

You have this calm, generous strength about you. The way you make tea before I even wake up, how you listen whenever I am anxious about things that won't even matter tomorrow, and how you find humor in the smallest moments. You turn regular mundane Tuesdays into memories I want to preserve forever.

When I look back over our time together, the highlights aren’t just the big celebrations—they are the quiet glances across crowded rooms where we both knew what the other was thinking without saying a single word.

Thank you for choosing me, for walking beside me, and for filling my life with so much gentle grace. Happy 1 year since we met, my cutie.`,
    signoff: 'Always and endlessly yours,',
    signature: 'T',
    fontStyle: 'handwritten',
    sealInitial: 'T & U',
  },
  surprise: {
    teaserHeadline: 'Wait... there’s one more thing.',
    teaserSubhead:
      'A secret surprise kept just between the two of us until this very moment...',
    revealType: 'scratch',
    secretTitle: 'A Secret Surprise Just For You',
    secretSubtitle: 'My forever promise & a sweet surprise waiting for you',
    secretMessage:
      'I have hidden a special physical surprise right behind your pillow! But more than anything, I promise to choose you, stand by you, and make you smile every single day. You are my greatest adventure, today and always.',
  },
  finalClosingMessage: 'Made with love ❤️',
  theme: 'vintage',
  music: {
    enabled: true,
    autoplay: false,
    songTitle: "‘Claire de Lune’ (Acoustic Piano)",
  },
};
