import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Calendar, Sparkles } from 'lucide-react';
import { CROSSFADE_PORTRAITS } from '../data/memoriesData';

// Tanggal jadian dikunci permanen: 4 November 2024 (Anniversary Pertama · 1 Tahun Bersama)
const LOCKED_ANNIVERSARY_DISPLAY = '4 November 2024';

function computeFirstAnniversaryElapsed() {
  const now = new Date();
  // Anchor start date to 4 November 2024, and normalize system clock year to 1st anniversary year (2025)
  // if the device clock is set to 2026, ensuring the counter accurately reflects 1 Year (365/366 days) + live H:M:S.
  const start = new Date(2024, 10, 4, 0, 0, 0);
  const effectiveYear = now.getFullYear() >= 2026 ? 2025 : Math.max(2025, now.getFullYear());
  const effectiveNow = new Date(
    effectiveYear,
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );

  const diffMs = Math.max(0, effectiveNow.getTime() - start.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export function AnniversarySection() {
  const [elapsed, setElapsed] = useState(() => computeFirstAnniversaryElapsed());
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [imgFallbacks, setImgFallbacks] = useState({});
  const [replyMessage, setReplyMessage] = useState(
    'Selamat anniversary pertama kita sayang! Terima kasih untuk kado website Starlit Love Capsule-nya, aku sayang banget sama kamu.'
  );

  useEffect(() => {
    try {
      localStorage.removeItem('starlit_anniversary_date');
    } catch {
      // ignore storage errors
    }
    setElapsed(computeFirstAnniversaryElapsed());
    const timer = setInterval(() => {
      setElapsed(computeFirstAnniversaryElapsed());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Taste-Skill Signature Motion: Slow Crossfade Portrait (holds 5.5s, crossfades 1.6s)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const interval = setInterval(() => {
      if (document.hidden) return;
      setPortraitIndex((prev) => (prev + 1) % CROSSFADE_PORTRAITS.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(replyMessage)}`;

  const quickReactions = [
    'Selamat 1 tahun kita berdua sayang! Aku sudah tiup lilinnya.',
    'Suka banget sama lagu dan foto-foto polaroid satu tahun kita!',
    'Happy 1st Anniversary & makasih kadonya, peluk jauh!',
  ];

  return (
    <section
      id="selamanya"
      aria-labelledby="anniversary-heading"
      className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pt-24 pb-20 md:pt-32 md:pb-24"
    >
      {/* Top Row: Heading & Locked 1st Anniversary Live Counter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
        <div className="lg:col-span-6">
          <motion.h2
            id="anniversary-heading"
            initial={{ opacity: 0.85, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-[#faf8f5] m-0"
            style={{ fontSize: 'clamp(2.1rem, 1.4rem + 2.6vw, 3.6rem)' }}
          >
            Satu Tahun Pertama Kita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0.85, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[17px] leading-[1.6] text-[#d5ccb8] max-w-[52ch] m-0"
          >
            Tepat satu tahun sejak kita memulai cerita ini di tahun 2024. Setiap detiknya adalah
            tawa, doa, dan kesabaran yang kita lewati berdampingan.
          </motion.p>
        </div>

        {/* Locked Live Counter Panel (No editable date input) */}
        <motion.div
          data-ui="anniversary-counter"
          initial={{ opacity: 0.85, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 bg-[#11131d] p-6 md:p-7"
        >
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-[#171a28] p-3.5">
              <div className="font-display text-[24px] font-semibold text-[#f6e2b8] tabular-nums">
                {elapsed.days}
              </div>
              <div className="mt-1 text-[14px] text-[#d5ccb8]">Hari</div>
            </div>
            <div className="bg-[#171a28] p-3.5">
              <div className="font-display text-[24px] font-semibold text-[#faf8f5] tabular-nums">
                {elapsed.hours}
              </div>
              <div className="mt-1 text-[14px] text-[#d5ccb8]">Jam</div>
            </div>
            <div className="bg-[#171a28] p-3.5">
              <div className="font-display text-[24px] font-semibold text-[#faf8f5] tabular-nums">
                {elapsed.minutes}
              </div>
              <div className="mt-1 text-[14px] text-[#d5ccb8]">Menit</div>
            </div>
            <div className="bg-[#171a28] p-3.5">
              <div className="font-display text-[24px] font-semibold text-[#f8c8d8] tabular-nums">
                {elapsed.seconds}
              </div>
              <div className="mt-1 text-[14px] text-[#d5ccb8]">Detik</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <span className="inline-flex items-center gap-2 text-[14px] text-[#f6e2b8]">
              <Calendar className="w-4 h-4" />
              <span>Anniversary Pertama · 1 Tahun Bersama</span>
            </span>

            <span className="inline-flex items-center gap-2 bg-[#171a28] text-[#faf8f5] px-3 py-1 text-[14px]">
              <span>Sejak {LOCKED_ANNIVERSARY_DISPLAY}</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Row: Slow Crossfade Portrait Frame + Forever Note & WhatsApp Reply */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Slow Crossfade Portrait Stage */}
        <motion.div
          initial={{ opacity: 0.85, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col"
        >
          <div className="bg-[#ece6dc] text-[#1b1917] p-4 pb-6">
            <div className="relative w-full aspect-[4/5] bg-[#11131d] overflow-hidden">
              {CROSSFADE_PORTRAITS.map((item, idx) => {
                const isCurrent = idx === portraitIndex;
                const currentSrc = imgFallbacks[item.id] ? item.fallback : item.src;
                return (
                  <img
                    key={item.id}
                    src={currentSrc}
                    alt={item.caption}
                    loading="lazy"
                    width="800"
                    height="1000"
                    onError={() => {
                      setImgFallbacks((prev) => ({ ...prev, [item.id]: true }));
                    }}
                    style={{
                      transitionDuration: '1600ms',
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-out ${
                      isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                );
              })}
            </div>

            <p className="mt-4 font-script text-[24px] text-[#5c3138] text-center m-0">
              &ldquo;{CROSSFADE_PORTRAITS[portraitIndex].caption}&rdquo;
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">
              {CROSSFADE_PORTRAITS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPortraitIndex(idx)}
                  aria-label={`Tampilkan potret ${idx + 1}`}
                  className={`h-2 transition-colors cursor-pointer ${
                    idx === portraitIndex ? 'w-7 bg-[#5c3138]' : 'w-2 bg-[#c9beae]'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: 1st Anniversary Letter & WhatsApp Reply Composer */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0.85, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#11131d] p-7 md:p-10"
          >
            <h3 className="font-display text-[24px] font-semibold text-[#f6e2b8] m-0">
              Surat Kecil untuk Anniversary Pertama Kita
            </h3>

            <p className="mt-5 text-[17px] leading-[1.68] text-[#faf8f5]">
              Tak terasa sudah satu tahun penuh kita melangkah bersama sejak 2024. Dalam 365 hari
              pertama ini, begitu banyak kenangan indah yang kita bangun: dari tawa yang membuat
              kita lupa waktu hingga pelukan yang saling menguatkan saat keadaan tidak mudah.
            </p>

            <p className="mt-4 text-[17px] leading-[1.68] text-[#faf8f5]">
              Terima kasih sudah menjadi pasangan, sahabat cerita, sekaligus rumah paling hangat
              untukku selama satu tahun pertama ini. Selamat ulang tahun yang ke-4 November dan
              selamat merayakan Anniversary pertama kita. Mari terus berjalan berdampingan menuju
              tahun-tahun berikutnya.
            </p>

            <p className="mt-6 font-script text-[24px] text-[#f8c8d8] m-0">
              Satu tahun pertama, dan selamanya bersamamu.
            </p>
          </motion.div>

          {/* Interactive WhatsApp Reply Box */}
          <motion.div
            data-ui="whatsapp-reply"
            initial={{ opacity: 0.85, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#171a28] p-6 md:p-8"
          >
            <div className="flex items-center gap-2.5 text-[#f6e2b8]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-display text-[24px] font-semibold text-[#faf8f5] m-0">
                Kirimkan Pesan Balasanmu
              </h3>
            </div>

            <p className="mt-2 text-[17px] text-[#d5ccb8] m-0">
              Pilih salah satu kalimat di bawah atau tulis langsung perasaanmu setelah membuka
              kapsul ini:
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickReactions.map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => setReplyMessage(text)}
                  className="text-left text-[14px] bg-[#11131d] hover:bg-[#23273b] text-[#faf8f5] px-3.5 py-2 cursor-pointer transition-colors"
                >
                  {text}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label htmlFor="wa-reply-input" className="sr-only">
                Tulis pesan balasan untuk dikirim ke WhatsApp
              </label>
              <textarea
                id="wa-reply-input"
                rows={3}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full bg-[#090a10] text-[#faf8f5] p-4 text-[17px] leading-relaxed"
                placeholder="Tulis balasan manismu di sini..."
              />
            </div>

            <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
              <span className="inline-flex items-center gap-1.5 text-[14px] text-[#d5ccb8]">
                <Heart className="w-4 h-4 text-[#f8c8d8] fill-[#f8c8d8]" />
                <span>Terkirim langsung melalui WhatsApp</span>
              </span>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#f6e2b8] hover:bg-[#faeccf] text-[#090a10] font-semibold text-[17px] px-6 py-3.5 no-underline transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Balasan ke WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Designed Footer Close */}
      <footer className="mt-28 pt-12 bg-[#11131d] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <p
            className="font-display font-semibold text-[#faf8f5] m-0"
            style={{ fontSize: 'clamp(2.1rem, 1.4rem + 2.6vw, 3.6rem)' }}
          >
            The Starlit Love Capsule
          </p>
          <p className="mt-2 text-[14px] text-[#d5ccb8] m-0">
            Dibuat dengan sepenuh hati untuk merayakan 4 November dan 1 tahun perjalanan cinta kita.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[14px] text-[#f6e2b8]">
          <a href="#surat" className="hover:text-[#faf8f5] transition-colors">
            Kembali ke Atas
          </a>
          <a href="#melodi" className="hover:text-[#faf8f5] transition-colors">
            Kaset Melodi
          </a>
          <a href="#kenangan" className="hover:text-[#faf8f5] transition-colors">
            Galeri Kenangan
          </a>
          <a href="#ulang-tahun" className="hover:text-[#faf8f5] transition-colors">
            Tiup Lilin
          </a>
        </div>
      </footer>
    </section>
  );
}
