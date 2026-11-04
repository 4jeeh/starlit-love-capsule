// Curated Memory Polaroid Dataset with Privacy-First Resolution:
// 1. Uses VITE_PRIVATE_MEDIA_BASE_URL in production if configured
// 2. Uses local git-ignored `/memories/memory-XX.jpg` during local runs
// 3. Automatically falls back to bespoke Starlight SVG illustrations if cloned without private photos

const baseUrl = import.meta.env.VITE_PRIVATE_MEDIA_BASE_URL
  ? import.meta.env.VITE_PRIVATE_MEDIA_BASE_URL.replace(/\/$/, '')
  : '/memories';

export function createStarlightPlaceholderSvg(title, constellationName, accentHex = '#f6e2b8') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#11131d"/>
    <circle cx="400" cy="420" r="240" fill="#171a28"/>
    <g stroke="${accentHex}" stroke-width="1.5" stroke-opacity="0.45" fill="none">
      <path d="M260 340 L370 280 L490 360 L540 490 L390 540 L260 340 Z"/>
      <path d="M370 280 L390 540"/>
      <circle cx="400" cy="420" r="190" stroke-dasharray="4 8"/>
    </g>
    <g fill="${accentHex}">
      <circle cx="260" cy="340" r="6"/>
      <circle cx="370" cy="280" r="8"/>
      <circle cx="490" cy="360" r="7"/>
      <circle cx="540" cy="490" r="5"/>
      <circle cx="390" cy="540" r="8"/>
      <circle cx="310" cy="450" r="4" fill="#f8c8d8"/>
      <circle cx="450" cy="430" r="5" fill="#f8c8d8"/>
    </g>
    <text x="400" y="760" text-anchor="middle" fill="#faf8f5" font-family="Georgia, serif" font-size="34">${title}</text>
    <text x="400" y="810" text-anchor="middle" fill="#d5ccb8" font-family="sans-serif" font-size="20">${constellationName}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const MEMORIES_DATA = [
  {
    id: 'mem-01',
    title: 'My Favorite Smile',
    date: 'Sweet Moment',
    location: 'Right Next to You',
    handwrittenNote: 'Your smile is always the most calming view for me.',
    story:
      'There are so many nice things in this world, but seeing you smile up close like this is always the simplest and best part of my day.',
    rotation: -2.4,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-01.jpg`,
    fallback: createStarlightPlaceholderSvg('My Favorite Smile', 'Lyra · Warm Star', '#f6e2b8'),
  },
  {
    id: 'mem-02',
    title: 'Warmest Laughs',
    date: 'Sunny Afternoon',
    location: 'Our Favorite Spot',
    handwrittenNote: 'With you, even simple things feel special.',
    story:
      'We never need a fancy place to be happy. Just sitting next to you, listening to your funny stories, and watching your eyes light up when you laugh is more than enough.',
    rotation: 1.8,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-02.jpg`,
    fallback: createStarlightPlaceholderSvg('Warmest Laughs', 'Cygnus · Golden Hour', '#f8c8d8'),
  },
  {
    id: 'mem-03',
    title: 'Walking Side by Side',
    date: 'Our Weekend',
    location: 'Little Trip',
    handwrittenNote: 'Wherever we go, I am happy as long as it is with you.',
    story:
      'Every little trip with you gives me a new favorite memory. Thank you for always holding my hand and making every step feel light.',
    rotation: -1.5,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-03.jpg`,
    fallback: createStarlightPlaceholderSvg('Walking Side by Side', 'Cassiopeia · Our Steps', '#f6e2b8'),
  },
  {
    id: 'mem-04',
    title: 'Safe With You',
    date: 'Quiet Night',
    location: 'Memory Lane',
    handwrittenNote: 'The coziest home I have ever known.',
    story:
      'Whenever the world feels loud and tiring, looking at you always calms everything down. You really feel like home to me.',
    rotation: 2.2,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-04.jpg`,
    fallback: createStarlightPlaceholderSvg('Safe With You', 'Andromeda · Home', '#f8c8d8'),
  },
  {
    id: 'mem-05',
    title: 'Little Piece of Happy',
    date: 'Good Day',
    location: 'Table for Two',
    handwrittenNote: 'Good food + you = the best combo.',
    story:
      'From picking what to eat to trying each other’s food, it is little moments like this that I miss the most whenever we are apart.',
    rotation: -2.0,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-05.jpg`,
    fallback: createStarlightPlaceholderSvg('Little Piece of Happy', 'Vela · Sweet Day', '#f6e2b8'),
  },
  {
    id: 'mem-06',
    title: 'Sparkle in Your Eyes',
    date: 'Starry Night',
    location: 'By Your Side',
    handwrittenNote: 'Prettier than a thousand stars in the night sky.',
    story:
      'If anyone asks what I am most grateful for in my life, my answer will always be having you right here with me.',
    rotation: 1.6,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-06.jpg`,
    fallback: createStarlightPlaceholderSvg('Sparkle in Your Eyes', 'Orion · Night Light', '#f8c8d8'),
  },
  {
    id: 'mem-07',
    title: 'Warmest Hugs',
    date: 'Cozy Day',
    location: 'Close to Heart',
    handwrittenNote: 'Thank you for always being patient and understanding with me.',
    story:
      'Not just on the easy days, you also stay and hold me through the hard ones. Your kindness is the best gift I could ever ask for.',
    rotation: -1.8,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-07.jpg`,
    fallback: createStarlightPlaceholderSvg('Warmest Hugs', 'Carina · Cozy Together', '#f6e2b8'),
  },
  {
    id: 'mem-08',
    title: 'Hello Twenty',
    date: 'November 4',
    location: 'Your New Chapter',
    handwrittenNote: 'Happy birthday, love. Your happiness is always my wish.',
    story:
      'As you step into your twenties, I hope all the good dreams you keep in your heart come true one by one. I will always be right here cheering for you.',
    rotation: 2.1,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-08.jpg`,
    fallback: createStarlightPlaceholderSvg('Hello Twenty', 'Aquila · November 4', '#f8c8d8'),
  },
];

export const CROSSFADE_PORTRAITS = [
  {
    id: 'portrait-09',
    src: `${baseUrl}/memory-09.jpg`,
    fallback: createStarlightPlaceholderSvg('Just Us Two', 'Chapter One', '#f6e2b8'),
    caption: 'Every second with you is my favorite page.',
  },
  {
    id: 'portrait-10',
    src: `${baseUrl}/memory-10.jpg`,
    fallback: createStarlightPlaceholderSvg('Always Together', 'Chapter Two', '#f8c8d8'),
    caption: 'Growing together and taking care of each other through it all.',
  },
  {
    id: 'portrait-11',
    src: `${baseUrl}/memory-11.jpg`,
    fallback: createStarlightPlaceholderSvg('November Fourth', 'Chapter Three', '#f6e2b8'),
    caption: 'Celebrating your birthday and our first year of love.',
  },
  {
    id: 'portrait-12',
    src: `${baseUrl}/memory-12.jpg`,
    fallback: createStarlightPlaceholderSvg('For Always', 'Chapter Four', '#f8c8d8'),
    caption: 'Today, tomorrow, and so many starry nights ahead.',
  },
];
