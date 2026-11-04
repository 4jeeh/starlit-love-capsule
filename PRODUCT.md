# PRODUCT.md — The Starlit Love Capsule

## Overview
- **Product Name:** The Starlit Love Capsule
- **Surface Mode:** Experience & Persuade (Interactive personal gift one-pager)
- **Occasion:** Ulang Tahun (4 November) & Hari Jadian (*Anniversary*)
- **Target Audience:** Pasangan terkasih (diakses melalui smartphone maupun laptop/desktop)

## Core Experience & Acts
1. **Babak 1 — The Sealed Letter (Hero Section):** Karakter 2D cowok (`2d1`) membawa amplop surat cinta bersegel hati di bawah langit malam berbintang interaktif. Saat amplop dibuka (3D origami unfold), karakter 2D cewek (`2d2`) menyambut dengan partikel kelopak sakura & hati, dan musik mulai mengalun lembut.
2. **Babak 2 — The Retro Cassette Player:** Pemutar kaset pita analog dengan roda pita (*reels*) yang berputar sinkron dengan musik, efek suara mekanis *tape click*, melodi hangat, dan baris pesan yang berjalan selaras dengan lagu.
3. **Babak 3 — The Constellation of Memories:** Galeri foto polaroid kenangan dengan efek *3D tilt* interaktif dan *lightbox* `<dialog closedby="any">` berisi tanggal, lokasi, dan catatan tulisan tangan. Foto asli tersimpan di direktori yang di-proteksi `.gitignore` (`public/memories/` & `src/assets/memories/`) dengan fallback otomatis ke ilustrasi placeholder untuk menjaga privasi 100% di GitHub.
4. **Babak 4 — The 4th of November Celebration:** Kue ulang tahun dengan lilin virtual menyala dinamis yang dapat ditiup menggunakan sensor mikrofon (`getUserMedia` + Web Audio API) atau sentuhan jari, memicu kepulan asap lembut, kembang api bintang (*confetti stardust*), dan surat ucapan ulang tahun.
5. **Babak 5 — The Anniversary Letter & Forever Note:** Penghitung waktu kebersamaan real-time (*hari, jam, menit, detik* dengan `tabular-nums`), surat cinta, dan tombol balasan langsung ke WhatsApp.
