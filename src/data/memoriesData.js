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
    title: 'Senyum Favoritku',
    date: 'Momen Manis',
    location: 'Selalu di Dekatmu',
    handwrittenNote: 'Senyummu selalu jadi pemandangan paling menenangkan untukku.',
    story:
      'Ada begitu banyak hal indah di dunia ini, tapi melihat kamu tersenyum dari dekat seperti ini selalu menjadi kebahagiaan paling sederhana sekaligus paling berharga di hidupku.',
    rotation: -2.4,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-01.jpg`,
    fallback: createStarlightPlaceholderSvg('Senyum Favoritku', 'Lyra · Bintang Hangat', '#f6e2b8'),
  },
  {
    id: 'mem-02',
    title: 'Tawa Paling Hangat',
    date: 'Sore yang Cerah',
    location: 'Sudut Kota Favorit',
    handwrittenNote: 'Bersamamu, hal sederhana selalu terasa istimewa.',
    story:
      'Tidak perlu tempat mewah untuk merasa bahagia. Cukup duduk di sebelahmu, mendengar cerita-cerita lucumu, dan melihat matamu berbinar saat tertawa lepas.',
    rotation: 1.8,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-02.jpg`,
    fallback: createStarlightPlaceholderSvg('Tawa Paling Hangat', 'Cygnus · Senja Berdua', '#f8c8d8'),
  },
  {
    id: 'mem-03',
    title: 'Langkah Berdampingan',
    date: 'Akhir Pekan Kita',
    location: 'Perjalanan Kecil',
    handwrittenNote: 'Ke mana pun tujuannya, asal sama kamu aku ikut.',
    story:
      'Setiap perjalanan bersamamu selalu meninggalkan rindu baru. Terima kasih sudah selalu menggenggam tanganku erat dan membuat setiap langkah terasa ringan.',
    rotation: -1.5,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-03.jpg`,
    fallback: createStarlightPlaceholderSvg('Langkah Berdampingan', 'Cassiopeia · Jejak Kita', '#f6e2b8'),
  },
  {
    id: 'mem-04',
    title: 'Tatapan Teduhmu',
    date: 'Malam yang Tenang',
    location: 'Ruang Kenangan',
    handwrittenNote: 'Tempat pulang paling nyaman yang pernah kumiliki.',
    story:
      'Saat dunia terasa bising dan melelahkan, menatap wajahmu selalu berhasil menenangkan segalanya. Kamu adalah definisi rumah yang sesungguhnya bagiku.',
    rotation: 2.2,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-04.jpg`,
    fallback: createStarlightPlaceholderSvg('Tatapan Teduhmu', 'Andromeda · Rumah Hati', '#f8c8d8'),
  },
  {
    id: 'mem-05',
    title: 'Sepotong Bahagia',
    date: 'Hari Istimewa',
    location: 'Meja Makan Berdua',
    handwrittenNote: 'Makanan enak + kamu = kombinasi sempurna.',
    story:
      'Dari memilih menu sampai saling mencicipi makanan, momen-momen kecil seperti inilah yang selalu paling kurindukan saat kita sedang tidak bersama.',
    rotation: -2.0,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-05.jpg`,
    fallback: createStarlightPlaceholderSvg('Sepotong Bahagia', 'Vela · Cerita Manis', '#f6e2b8'),
  },
  {
    id: 'mem-06',
    title: 'Cahaya di Matamu',
    date: 'Malam Berbintang',
    location: 'Di Sisi Kamu',
    handwrittenNote: 'Lebih indah dari seribu bintang di langit malam.',
    story:
      'Kalau seseorang bertanya apa hal paling bersyukur yang pernah terjadi di hidupku, jawabannya selalu mengarah pada hari ketika kita dipersatukan.',
    rotation: 1.6,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-06.jpg`,
    fallback: createStarlightPlaceholderSvg('Cahaya di Matamu', 'Orion · Cahaya Malam', '#f8c8d8'),
  },
  {
    id: 'mem-07',
    title: 'Pelukan Penenang',
    date: 'Musim Hujan',
    location: 'Dekat di Hati',
    handwrittenNote: 'Terima kasih sudah selalu sabar dan mengerti aku.',
    story:
      'Bukan hanya di hari yang mudah, kamu tetap memilih bertahan dan memelukku di hari-hari yang sulit. Ketulusanmu adalah kado terbesar untukku.',
    rotation: -1.8,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-07.jpg`,
    fallback: createStarlightPlaceholderSvg('Pelukan Penenang', 'Carina · Teduh Bersama', '#f6e2b8'),
  },
  {
    id: 'mem-08',
    title: 'Menuju Empat November',
    date: '4 November',
    location: 'Babak Baru Usiamu',
    handwrittenNote: 'Selamat ulang tahun, cinta. Bahagiamu adalah doaku.',
    story:
      'Di hari kelahiranmu ini, aku berdoa semoga semua impian baik yang kamu simpan di dalam hati satu per satu menemukan jalannya. Aku akan selalu ada di barisan paling depan mendukungmu.',
    rotation: 2.1,
    aspect: 'aspect-[4/5]',
    src: `${baseUrl}/memory-08.jpg`,
    fallback: createStarlightPlaceholderSvg('Menuju Empat November', 'Aquila · Empat November', '#f8c8d8'),
  },
];

export const CROSSFADE_PORTRAITS = [
  {
    id: 'portrait-09',
    src: `${baseUrl}/memory-09.jpg`,
    fallback: createStarlightPlaceholderSvg('Kita Berdua', 'Babak Satu', '#f6e2b8'),
    caption: 'Setiap detik bersamamu adalah halaman favoritku.',
  },
  {
    id: 'portrait-10',
    src: `${baseUrl}/memory-10.jpg`,
    fallback: createStarlightPlaceholderSvg('Selalu Bersama', 'Babak Dua', '#f8c8d8'),
    caption: 'Tumbuh bersama, saling menjaga dalam suka dan duka.',
  },
  {
    id: 'portrait-11',
    src: `${baseUrl}/memory-11.jpg`,
    fallback: createStarlightPlaceholderSvg('Empat November', 'Babak Tiga', '#f6e2b8'),
    caption: 'Merayakan hari lahirmu dan perjalanan cinta kita.',
  },
  {
    id: 'portrait-12',
    src: `${baseUrl}/memory-12.jpg`,
    fallback: createStarlightPlaceholderSvg('Selamanya', 'Babak Empat', '#f8c8d8'),
    caption: 'Hari ini, esok, dan ribuan malam berbintang selanjutnya.',
  },
];
