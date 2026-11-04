import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Music, ArrowDown } from 'lucide-react';
import charBoyPng from '../assets/characters/2d1.png';
import charGirlPng from '../assets/characters/2d2.png';

const revealTransition = (delay = 0) => ({
  duration: 0.65,
  delay,
  ease: [0.16, 1, 0.3, 1],
});

export function HeroSealedLetter({ isLetterOpen, onOpenLetter, onToggleLetter }) {
  const [characterHopKey, setCharacterHopKey] = useState(0);

  const handleOpenAndAnimate = () => {
    setCharacterHopKey((prev) => prev + 1);
    onOpenLetter();
  };

  const handleToggleAndAnimate = () => {
    setCharacterHopKey((prev) => prev + 1);
    onToggleLetter();
  };

  return (
    <section
      id="surat"
      aria-labelledby="hero-heading"
      className="relative z-10 min-h-dvh flex flex-col justify-between max-w-[1280px] mx-auto px-5 md:px-10 pt-6 pb-16 md:py-10"
    >
      {/* Plain Navigation Bar */}
      <header className="flex items-center justify-between py-3">
        <a
          href="#surat"
          className="font-display text-[24px] font-semibold tracking-tight text-[#faf8f5] no-underline"
        >
          Starlit Capsule
        </a>

        <nav aria-label="Page sections" className="hidden md:flex items-center gap-8 text-[14px] text-[#d5ccb8]">
          <a href="#melodi" className="hover:text-[#faf8f5] transition-colors">
            Mixtape
          </a>
          <a href="#kenangan" className="hover:text-[#faf8f5] transition-colors">
            Polaroids
          </a>
          <a href="#ulang-tahun" className="hover:text-[#faf8f5] transition-colors">
            Birthday Cake
          </a>
          <a href="#selamanya" className="hover:text-[#faf8f5] transition-colors">
            1st Anniversary
          </a>
        </nav>

        <a
          href="#ulang-tahun"
          className="inline-flex items-center gap-2 bg-[#171a28] hover:bg-[#22263a] text-[#f6e2b8] px-4 py-2.5 text-[14px] font-medium transition-colors"
        >
          <span>Cheers to Twenty</span>
        </a>
      </header>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto pt-6 md:pt-10">
        {/* Left Column: Editorial Headline + Supporting Copy + Primary Action */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition(0.05)}
            className="font-display font-semibold text-[#faf8f5] m-0"
            style={{ fontSize: 'clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)' }}
          >
            Our Little Love Capsule
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition(0.13)}
            className="mt-8 text-[17px] leading-[1.6] text-[#faf8f5] max-w-[54ch]"
          >
            A quiet place under the stars to celebrate your 20th birthday on November 4th and our
            very first year together.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition(0.21)}
            className="mt-4 text-[17px] leading-[1.6] text-[#d5ccb8] max-w-[52ch]"
          >
            {isLetterOpen
              ? 'The envelope is open now. Our melody is playing softly while you scroll through our memories.'
              : 'I brought a little letter sealed with a heart just for you. Tap the envelope or button below to open it.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition(0.29)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {!isLetterOpen ? (
              <button
                type="button"
                onClick={handleOpenAndAnimate}
                className="inline-flex items-center gap-3 bg-[#f6e2b8] hover:bg-[#faeccf] text-[#090a10] font-semibold text-[17px] px-7 py-4 cursor-pointer transition-transform active:scale-98"
              >
                <Heart className="w-5 h-5 fill-[#090a10]" />
                <span>Open Love Letter</span>
              </button>
            ) : (
              <a
                href="#melodi"
                className="inline-flex items-center gap-3 bg-[#f6e2b8] hover:bg-[#faeccf] text-[#090a10] font-semibold text-[17px] px-7 py-4 no-underline transition-transform active:scale-98"
              >
                <Music className="w-5 h-5" />
                <span>Play Our Mixtape</span>
              </a>
            )}

            <a
              href="#kenangan"
              className="inline-flex items-center gap-2 bg-[#11131d] hover:bg-[#171a28] text-[#faf8f5] text-[17px] font-medium px-6 py-4 no-underline transition-colors"
            >
              <span>See Our Polaroids</span>
              <ArrowDown className="w-4 h-4 text-[#f6e2b8]" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: 2D Characters + Interactive 3D Origami Envelope Stage */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition(0.18)}
          className="lg:col-span-6 flex flex-col items-center justify-center"
        >
          <div
            data-ui="hero-stage"
            className="relative w-full max-w-[560px] bg-[#11131d] p-6 md:p-8 flex flex-col items-center"
          >
            {/* Character Duo Stage */}
            <div
              onClick={() => {
                if (isLetterOpen) setCharacterHopKey((prev) => prev + 1);
              }}
              className="relative w-full min-h-[290px] md:min-h-[330px] flex items-end justify-center gap-2 md:gap-4 cursor-pointer"
            >
              {/* Boy Character (2d1.png) — Reacts with excited hop & lean toward girl when letter opens */}
              <motion.div
                key={`boy-${isLetterOpen ? characterHopKey : 'idle'}`}
                animate={
                  isLetterOpen
                    ? {
                        x: [0, 14, 6],
                        y: [0, -18, 0, -9, 0],
                        rotate: [0, -3.5, 3.5, 1.5],
                        scale: [1, 1.06, 0.99, 1.02, 1],
                      }
                    : { x: 0, y: 0, rotate: 0, scale: 1 }
                }
                transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center"
              >
                {isLetterOpen && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.7 }}
                    animate={{ opacity: [0, 1, 0.85], y: [-2, -16, -12], scale: [0.7, 1.15, 1] }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="absolute -top-3 right-3 text-[#f8c8d8] pointer-events-none"
                    aria-hidden="true"
                  >
                    <Heart className="w-5 h-5 fill-[#f8c8d8]" />
                  </motion.span>
                )}
                <img
                  src={charBoyPng}
                  alt="Boy character holding a love letter"
                  fetchpriority="high"
                  width="440"
                  height="736"
                  className="w-[155px] sm:w-[185px] md:w-[205px] h-auto object-contain select-none character-idle"
                />
              </motion.div>

              {/* Floating Heart Sparkle Bridge between Boy & Girl when Letter is Open */}
              <AnimatePresence>
                {isLetterOpen && (
                  <motion.div
                    key={`duo-hearts-${characterHopKey}`}
                    initial={{ opacity: 0, scale: 0.7, y: 12 }}
                    animate={{ opacity: 1, scale: [0.85, 1.18, 1], y: [10, -14, -6] }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="self-center flex flex-col items-center gap-1.5 pointer-events-none"
                    aria-hidden="true"
                  >
                    <Sparkles className="w-4 h-4 text-[#f6e2b8]" />
                    <Heart className="w-6 h-6 text-[#f8c8d8] fill-[#f8c8d8]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Girl Character (2d2.png) — Springs in with happy double-hop & joyful sway when envelope opens */}
              <AnimatePresence mode="wait">
                {isLetterOpen ? (
                  <motion.div
                    key={`girl-revealed-${characterHopKey}`}
                    initial={{ opacity: 0, x: 18, y: 24, scale: 0.9, rotate: 6 }}
                    animate={{
                      opacity: 1,
                      x: [18, -8, -4],
                      y: [24, -20, 0, -10, 0],
                      rotate: [6, -5, 3.5, -1.5],
                      scale: [0.9, 1.07, 0.98, 1.03, 1],
                    }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col items-center"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 8, scale: 0.7 }}
                      animate={{
                        opacity: [0, 1, 0.9],
                        y: [0, -18, -12],
                        scale: [0.7, 1.2, 1],
                      }}
                      transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
                      className="absolute -top-3 left-3 text-[#f6e2b8] pointer-events-none"
                      aria-hidden="true"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.span>
                    <img
                      src={charGirlPng}
                      alt="Girl character smiling happily"
                      width="437"
                      height="738"
                      className="w-[155px] sm:w-[185px] md:w-[205px] h-auto object-contain select-none character-happy"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="envelope-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-4 text-center max-w-[190px] self-center bg-[#171a28]"
                  >
                    <Sparkles className="w-6 h-6 text-[#f6e2b8] mb-2" />
                    <p className="font-script text-[24px] text-[#f8c8d8] m-0">
                      &ldquo;I have a little note for you, open it...&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3D Origami Interactive Envelope Widget */}
            <div className="w-full mt-4">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isLetterOpen}
                aria-label={isLetterOpen ? 'Close the love letter envelope' : 'Open the love letter envelope'}
                onClick={handleToggleAndAnimate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggleAndAnimate();
                  }
                }}
                className="relative w-full bg-[#171a28] hover:bg-[#1d2133] p-5 md:p-6 cursor-pointer transition-colors select-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-[#f8c8d8] text-[#090a10]">
                      <Heart className="w-5 h-5 fill-[#090a10]" />
                    </span>
                    <div>
                      <p className="font-display text-[24px] font-semibold text-[#faf8f5] m-0">
                        {isLetterOpen ? 'A Little Note for You' : 'Heart-Sealed Envelope'}
                      </p>
                      <p className="text-[14px] text-[#d5ccb8] m-0">
                        {isLetterOpen
                          ? 'Tap here to fold the letter back'
                          : 'Tap here to unfold the note'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[14px] font-medium text-[#f6e2b8] px-3 py-1.5 bg-[#11131d]">
                    {isLetterOpen ? 'Opened' : 'Open'}
                  </span>
                </div>

                {/* Unfolded Origami Letter Inside */}
                <AnimatePresence initial={false}>
                  {isLetterOpen && (
                    <motion.div
                      key="origami-letter-paper"
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-5 bg-[#ece6dc] text-[#1b1917] p-5 md:p-6"
                    >
                      <p className="font-script text-[24px] text-[#5c3138] m-0">
                        Hey my favorite girl,
                      </p>
                      <p className="mt-2 text-[17px] leading-[1.6] text-[#2b2623] m-0">
                        Welcome to our little time capsule. Inside this page, I saved our favorite
                        melodies, polaroid photos of us, a birthday cake for you to blow out, and a
                        letter for our first anniversary.
                      </p>
                      <p className="mt-3 font-script text-[24px] text-[#5c3138] text-right m-0">
                        With all my love, always
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
