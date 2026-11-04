# PRODUCT.md — The Starlit Love Capsule

## Overview
- **Product Name:** The Starlit Love Capsule
- **Surface Mode:** Experience & Persuade (Interactive personal gift one-pager)
- **Occasion:** 20th Birthday (November 4 · *Cheers to Twenty*) & 1st Anniversary (Since November 4, 2024)
- **Language:** Warm, casual, and simple English

## Core Experience & Acts
1. **Act 1 — Our Little Love Capsule (`HeroSealedLetter`):** 2D boy character (`2d1.png`) holds a heart-sealed love letter under an interactive starlit sky. Opening the envelope triggers a character micro-animation (the boy hops closer with a floating heart and the girl character `2d2.png` springs in with a joyful double-hop and sparkle bridge) while soft music-box melodies begin playing.
2. **Act 2 — Our Memory Mixtape (`RetroCassettePlayer`):** Analog cassette tape player with spinning mechanical reels synchronized to playback, tactile tape-click sounds, warm Web Audio API melodies, synchronized lyric notes, and custom MP3 upload support.
3. **Act 3 — Our Polaroid Memories (`ConstellationGallery`):** Interactive 3D-tilt polaroid gallery and native `<dialog closedby="any">` lightbox with dates, locations, handwritten notes, and memory stories. Real photos live in `.gitignore`-protected directories (`public/memories/` & `src/assets/memories/`) with automatic SVG starlight constellation fallbacks.
4. **Act 4 — Celebrating Your Twentieth (`BirthdayCandleSection`):** Interactive birthday cake with a dynamic flickering flame that can be blown out via the device microphone (`getUserMedia` + Web Audio API) or a button tap, triggering smoke wisps, confetti stardust, and a 20th birthday letter.
5. **Act 5 — Our Very First Year (`AnniversarySection`):** Permanently locked real-time counter from **November 4, 2024** (`Days`, `Hours`, `Minutes`, `Seconds` in `tabular-nums`), slow crossfade portrait showcase, and a heartfelt 1st Anniversary letter.
