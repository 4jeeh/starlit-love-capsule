# The Starlit Love Capsule

An interactive 20th birthday (**November 4**) and **1st Anniversary** digital time capsule built with React, Vite, Tailwind CSS v4, Framer Motion, and the Web Audio API.

Designed with a **Midnight Starlight & Champagne Romance** aesthetic, combining 2D character illustrations, tactile analog mechanics, and a strict privacy-first architecture so personal photos never leak to public repositories.

---

## Interactive Chapters

1. **Act 1 · Our Little Love Capsule (`HeroSealedLetter`)**
   - Interactive starlight & constellation canvas (`requestAnimationFrame` at 60 FPS with pointer parallax).
   - Heart-sealed origami envelope that unfolds when tapped.
   - 2D character duo micro-animation: the boy character hops and leans closer with a floating heart while the girl character springs in with a joyful double-hop and sparkle bridge.
2. **Act 2 · Our Memory Mixtape (`RetroCassettePlayer`)**
   - Retro analog cassette deck with mechanical spinning tape reels synchronized with playback progress.
   - Zero-dependency Web Audio API music-box synthesizer (`soundEngine.js`) with tactile tape-click sounds, envelope chimes, and celebratory chords.
   - Synchronized lyric whisper box and support for loading custom MP3 files locally.
3. **Act 3 · Our Polaroid Memories (`ConstellationGallery`)**
   - Asymmetrical polaroid photo grid with 3D pointer-tilt interaction and handwritten notes.
   - Accessible native `<dialog closedby="any">` lightbox showing dates, locations, and full memory stories.
   - Automatic SVG starlight constellation fallback when private local photos are absent.
4. **Act 4 · Celebrating Your Twentieth (`BirthdayCandleSection`)**
   - Interactive birthday cake celebrating November 4th & turning 20 (`Cheers to Twenty`).
   - Blow out the candle using either your device microphone (`navigator.mediaDevices.getUserMedia` + Web Audio API frequency analysis) or the one-tap button.
   - Triggers gentle smoke wisps, champagne-and-rose confetti stardust, and reveals a birthday letter.
5. **Act 5 · Our Very First Year (`AnniversarySection`)**
   - Permanently locked live counter from **November 4, 2024** (`Days`, `Hours`, `Minutes`, `Seconds` in `tabular-nums`) celebrating 1 Year Together.
   - Slow crossfade portrait frame and a dedicated 1st Anniversary letter.
   - Floating 2D companion in the corner (`AmbientCompanion`) with quick music controls.

---

## Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) + [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio & Sensors:** Native Web Audio API & MediaStream Microphone API
- **Typography:** `Cormorant Garamond` (Display), `Plus Jakarta Sans` (Body & UI), `Caveat` (Handwritten Notes)

---

## Privacy-First Photo Architecture

Personal photographs are **strictly excluded** from Git via [`.gitignore`](./.gitignore):

- `public/memories/` (ignored)
- `src/assets/memories/` (ignored)
- `.env` / `.env.local` (ignored)

### How Photos Are Loaded

1. **Local Development:** Place 12 photos named `memory-01.jpg` through `memory-12.jpg` inside `public/memories/`.
2. **Private Cloud Hosting (Optional for Production):** Set `VITE_PRIVATE_MEDIA_BASE_URL` in your `.env.local` or deployment environment variables (see [`.env.example`](./.env.example)) pointing to your private storage bucket.
3. **Automatic Fallback:** If neither local files nor a private URL are present (e.g., when cloned directly from GitHub), each polaroid gracefully renders a custom Starlight Constellation SVG illustration.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/4jeeh/starlit-love-capsule.git
cd starlit-love-capsule
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add local photos (optional)

Copy your private photos (`memory-01.jpg` to `memory-12.jpg`) into `public/memories/`. They are automatically protected by `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 5. Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```text
starlit-love-capsule/
├── public/
│   ├── favicon.svg                  # Custom Midnight & Champagne heart-star favicon
│   └── memories/                    # Git-ignored local private photos (memory-01..12.jpg)
├── src/
│   ├── assets/
│   │   └── characters/              # 2D boy & girl character illustrations (2d1.png, 2d2.png)
│   ├── components/
│   │   ├── AmbientCompanion.jsx     # Floating 2D corner companion & music toggle
│   │   ├── AnniversarySection.jsx   # Locked Nov 4, 2024 counter, crossfade frame & letter
│   │   ├── BirthdayCandleSection.jsx# 20th birthday cake, mic blow sensor & birthday letter
│   │   ├── ConstellationGallery.jsx # 3D tilt polaroid grid & native <dialog> lightbox
│   │   ├── HeroSealedLetter.jsx     # Hero section, character hop animation & origami letter
│   │   ├── RetroCassettePlayer.jsx  # Analog cassette deck & synchronized lyrics
│   │   └── StarlightCanvas.jsx      # 60 FPS interactive night sky & constellation canvas
│   ├── data/
│   │   └── memoriesData.js          # Polaroid stories, notes & SVG constellation fallbacks
│   ├── utils/
│   │   └── soundEngine.js           # Web Audio API music-box synth & custom MP3 player
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── DESIGN.md
├── LICENSE
├── PRODUCT.md
├── package.json
├── vercel.json
└── vite.config.js
```

---

## License

Released under the [MIT License](./LICENSE).
