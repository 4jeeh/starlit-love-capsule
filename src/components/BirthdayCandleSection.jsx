import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Wind, RotateCcw, Sparkles, Heart } from 'lucide-react';
import charBoyPng from '../assets/characters/2d1.png';
import charGirlPng from '../assets/characters/2d2.png';

export function BirthdayCandleSection({ candleBlown, onBlowCandle, onRelightCandle }) {
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState('');
  const [breathLevel, setBreathLevel] = useState(0);

  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const rafRef = useRef(null);

  const stopMicrophone = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setMicActive(false);
    setBreathLevel(0);
  };

  useEffect(() => {
    return () => stopMicrophone();
  }, []);

  const triggerExtinguish = () => {
    if (candleBlown) return;
    stopMicrophone();
    onBlowCandle();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#f6e2b8', '#f8c8d8', '#faf8f5'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#f6e2b8', '#f8c8d8', '#faf8f5'],
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#f6e2b8', '#f8c8d8', '#faf8f5'],
        });
      }, 240);
    }
  };

  const toggleMicrophoneSensor = async () => {
    if (micActive) {
      stopMicrophone();
      return;
    }
    setMicError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicError('Browser ini tidak mendukung akses mikrofon. Gunakan tombol Tiup Lilin di samping.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setMicActive(true);

      let sustainedFrames = 0;

      const detectBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        const binCount = 24;
        for (let i = 0; i < binCount; i++) {
          sum += dataArray[i];
        }
        const avg = sum / binCount;
        const normalized = Math.min(100, Math.round((avg / 125) * 100));
        setBreathLevel(normalized);

        if (normalized >= 62) {
          sustainedFrames += 1;
        } else {
          sustainedFrames = Math.max(0, sustainedFrames - 1);
        }

        if (sustainedFrames >= 7) {
          triggerExtinguish();
          return;
        }

        rafRef.current = requestAnimationFrame(detectBlow);
      };

      rafRef.current = requestAnimationFrame(detectBlow);
    } catch {
      setMicError('Izin mikrofon belum aktif. Kamu tetap bisa meniup lilin dengan menekan tombol Tiup Lilin.');
      setMicActive(false);
    }
  };

  return (
    <section
      id="ulang-tahun"
      aria-labelledby="birthday-heading"
      className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* First in DOM so mobile/tablet opens with the section heading! */}
        <div className="lg:col-span-6 lg:order-2 flex flex-col items-start">
          <motion.h2
            id="birthday-heading"
            initial={{ opacity: 0.85, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-[#faf8f5] m-0"
            style={{ fontSize: 'clamp(2.1rem, 1.4rem + 2.6vw, 3.6rem)' }}
          >
            Perayaan Empat November
          </motion.h2>

          <motion.p
            initial={{ opacity: 0.85, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[17px] leading-[1.6] text-[#faf8f5] max-w-[54ch]"
          >
            Hari ini adalah tentang kamu. Tentang bagaimana kehadiranmu pada tanggal 4 November
            membawa begitu banyak warna, ketenangan, dan kebahagiaan ke dalam hidupku.
          </motion.p>

          <AnimatePresence mode="wait">
            {!candleBlown ? (
              <motion.div
                key="before-blow-prompt"
                initial={{ opacity: 0.85, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 w-full bg-[#11131d] p-6 md:p-8"
              >
                <div className="flex items-center gap-3 text-[#f6e2b8]">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-display text-[24px] font-semibold text-[#faf8f5] m-0">
                    Sebutkan Satu Harapanmu
                  </h3>
                </div>
                <p className="mt-3 text-[17px] leading-[1.6] text-[#d5ccb8] m-0">
                  Pejamkan mata sejenak, simpan doa terbaikmu untuk usia yang baru ini, lalu tiup
                  lilin di samping untuk membuka surat ulang tahun dariku.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="after-blow-letter"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 w-full bg-[#ece6dc] text-[#1b1917] p-6 md:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-script text-[24px] text-[#5c3138] m-0">
                      Selamat Ulang Tahun, Sayangku!
                    </h3>
                    <p className="text-[14px] font-medium text-[#5c534c] mt-1 m-0">
                      4 November · Doa Terbaik Untukmu
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={charBoyPng}
                      alt="Karakter cowok"
                      loading="lazy"
                      width="48"
                      height="80"
                      className="w-10 h-auto object-contain"
                    />
                    <Heart className="w-4 h-4 text-[#5c3138] fill-[#5c3138]" />
                    <img
                      src={charGirlPng}
                      alt="Karakter cewek"
                      loading="lazy"
                      width="48"
                      height="80"
                      className="w-10 h-auto object-contain"
                    />
                  </div>
                </div>

                <p className="mt-5 text-[17px] leading-[1.65] text-[#2b2623]">
                  Terima kasih sudah lahir ke dunia dan tumbuh menjadi perempuan sehebat dan
                  selembut kamu hari ini. Di usia barumu ini, aku berdoa semoga langkahmu selalu
                  dimudahkan, hatimu selalu dilapangkan, dan setiap mimpi yang kamu perjuangkan
                  berbuah manis.
                </p>

                <p className="mt-3 text-[17px] leading-[1.65] text-[#2b2623]">
                  Jangan pernah merasa sendirian menghadapi apa pun ya. Selama aku ada, kamu akan
                  selalu punya seseorang yang bangga padamu dan mencintaimu sepenuh hati.
                </p>

                <p className="mt-5 font-script text-[24px] text-[#5c3138] text-right m-0">
                  Peluk hangat di hari lahirmu
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left Column on Desktop: Birthday Cake & Interactive Candle Stage */}
        <motion.div
          initial={{ opacity: 0.85, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 lg:order-1 flex flex-col items-center"
        >
          <div
            data-ui="birthday-cake-stage"
            className="w-full max-w-[540px] bg-[#11131d] p-6 md:p-9 flex flex-col items-center text-center"
          >
            <div className="w-full flex items-center justify-between text-[14px] text-[#d5ccb8] mb-3">
              <span>4 November · Wish Upon a Star</span>
              <span className="text-[#f6e2b8]">
                {candleBlown ? 'Lilin Telah Ditiup' : 'Api Lilin Menyala'}
              </span>
            </div>

            {/* Interactive SVG Cake + Dynamic Flame / Smoke */}
            <div
              role="button"
              tabIndex={0}
              aria-label={
                candleBlown
                  ? 'Lilin sudah padam, ketuk untuk menyalakan kembali'
                  : 'Ketuk kue atau lilin untuk meniup lilin ulang tahun'
              }
              onClick={() => {
                if (!candleBlown) triggerExtinguish();
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !candleBlown) {
                  e.preventDefault();
                  triggerExtinguish();
                }
              }}
              className="relative w-full max-w-[320px] py-4 flex flex-col items-center cursor-pointer select-none"
            >
              <svg
                viewBox="0 0 320 310"
                className="w-full h-auto overflow-visible"
                aria-hidden="true"
              >
                {!candleBlown && (
                  <circle
                    cx="160"
                    cy="68"
                    r={44 + breathLevel * 0.22}
                    fill="#f6e2b8"
                    fillOpacity="0.14"
                  />
                )}

                {candleBlown && (
                  <g className="smoke-wisp" stroke="#d5ccb8" strokeWidth="2.5" fill="none">
                    <path d="M160 78 C 150 58, 172 42, 158 22" strokeLinecap="round" />
                    <path d="M166 74 C 176 54, 156 36, 170 16" strokeLinecap="round" />
                  </g>
                )}

                {!candleBlown && (
                  <g
                    className="flame-active"
                    style={{
                      transform: `rotate(${breathLevel * 0.28}deg) scale(${
                        1 - breathLevel * 0.003
                      })`,
                      transformOrigin: '160px 84px',
                    }}
                  >
                    <path
                      d="M160 36 C 145 56, 144 76, 160 84 C 176 76, 175 56, 160 36 Z"
                      fill="#f6e2b8"
                    />
                    <path
                      d="M160 48 C 151 62, 151 75, 160 82 C 169 75, 169 62, 160 48 Z"
                      fill="#f8c8d8"
                    />
                    <ellipse cx="160" cy="72" rx="4.5" ry="7" fill="#faf8f5" />
                  </g>
                )}

                <line x1="160" y1="84" x2="160" y2="94" stroke="#d5ccb8" strokeWidth="2.5" />
                <rect x="148" y="94" width="24" height="58" rx="3" fill="#faf8f5" />
                <path d="M148 110 L172 118" stroke="#f8c8d8" strokeWidth="3.5" />
                <path d="M148 128 L172 136" stroke="#f6e2b8" strokeWidth="3.5" />

                <rect x="92" y="152" width="136" height="56" rx="6" fill="#ece6dc" />
                <path
                  d="M92 162 Q 109 178 126 162 Q 143 178 160 162 Q 177 178 194 162 Q 211 178 228 162"
                  fill="none"
                  stroke="#f8c8d8"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <text
                  x="160"
                  y="194"
                  textAnchor="middle"
                  fill="#5c3138"
                  fontFamily="Georgia, serif"
                  fontSize="16"
                  fontWeight="bold"
                >
                  04 · XI
                </text>

                <rect x="56" y="208" width="208" height="68" rx="8" fill="#f8c8d8" />
                <path
                  d="M56 222 Q 82 240 108 222 Q 134 240 160 222 Q 186 240 212 222 Q 238 240 264 222"
                  fill="none"
                  stroke="#faf8f5"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                <rect x="34" y="276" width="252" height="10" rx="5" fill="#f6e2b8" />
                <path d="M130 286 L190 286 L204 304 L116 304 Z" fill="#d5ccb8" />
              </svg>
            </div>

            {micActive && !candleBlown && (
              <div className="w-full max-w-[360px] bg-[#171a28] p-3.5 mb-4">
                <div className="flex items-center justify-between text-[14px] text-[#faf8f5] mb-1.5">
                  <span>Sensor Tiupan Mikrofon Aktif</span>
                  <span className="tabular-nums text-[#f6e2b8]">{breathLevel}%</span>
                </div>
                <div className="w-full h-2 bg-[#090a10] overflow-hidden">
                  <div
                    className="h-full bg-[#f6e2b8] transition-transform duration-75 origin-left"
                    style={{ transform: `scaleX(${Math.max(0.04, breathLevel / 100)})` }}
                  />
                </div>
                <p className="mt-1.5 text-[14px] text-[#d5ccb8] m-0">
                  Tiup perlahan ke arah mikrofon HP atau laptopmu...
                </p>
              </div>
            )}

            {micError && (
              <p className="text-[14px] text-[#f8c8d8] bg-[#171a28] p-3 mb-4 max-w-[400px]">
                {micError}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              {!candleBlown ? (
                <>
                  <button
                    type="button"
                    onClick={triggerExtinguish}
                    className="inline-flex items-center gap-2.5 bg-[#f6e2b8] hover:bg-[#faeccf] text-[#090a10] font-semibold text-[17px] px-6 py-3.5 cursor-pointer transition-transform active:scale-95"
                  >
                    <Wind className="w-5 h-5" />
                    <span>Tiup Lilin Sekarang</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleMicrophoneSensor}
                    className="inline-flex items-center gap-2 bg-[#171a28] hover:bg-[#22273b] text-[#faf8f5] text-[14px] font-medium px-5 py-3.5 cursor-pointer transition-colors"
                  >
                    {micActive ? (
                      <>
                        <MicOff className="w-4 h-4 text-[#f8c8d8]" />
                        <span>Matikan Sensor Mic</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 text-[#f6e2b8]" />
                        <span>Tiup Pakai Mikrofon</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onRelightCandle}
                  className="inline-flex items-center gap-2 bg-[#171a28] hover:bg-[#22273b] text-[#f6e2b8] text-[14px] font-medium px-5 py-3.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Nyalakan Lilin Lagi</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
