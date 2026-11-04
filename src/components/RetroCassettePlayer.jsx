import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Upload, Disc } from 'lucide-react';

function formatDuration(sec) {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${mins}:${rem < 10 ? '0' + rem : rem}`;
}

const revealProps = (delay = 0) => ({
  initial: { opacity: 0.85, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
});

export function RetroCassettePlayer({
  audioState,
  onTogglePlay,
  onToggleMute,
  onSelectTrack,
  onSeek,
  onUploadAudio,
}) {
  const fileInputRef = useRef(null);
  const { isPlaying, isMuted, currentTrackIndex, track, tracks, elapsedSeconds, currentLyric } =
    audioState;

  const progressRatio = track.duration > 0 ? Math.min(1, elapsedSeconds / track.duration) : 0;

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    onSelectTrack(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    onSelectTrack(nextIdx);
  };

  return (
    <section
      id="melodi"
      aria-labelledby="cassette-heading"
      className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Narrative, Lyric Synchronizer & Track List */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <motion.h2
            id="cassette-heading"
            {...revealProps(0)}
            className="font-display font-semibold text-[#faf8f5] m-0"
            style={{ fontSize: 'clamp(2.1rem, 1.4rem + 2.6vw, 3.6rem)' }}
          >
            Our Memory Mixtape
          </motion.h2>

          <motion.p
            {...revealProps(0.08)}
            className="mt-6 text-[17px] leading-[1.6] text-[#faf8f5] max-w-[50ch]"
          >
            Every spin of this little tape holds a soft melody I picked out to keep you company
            while you read through our favorite moments.
          </motion.p>

          {/* Synchronized Whisper / Lyric Box */}
          <motion.div {...revealProps(0.15)} className="mt-6 w-full bg-[#11131d] p-5">
            <p className="font-display italic text-[24px] text-[#f6e2b8] leading-snug m-0">
              &ldquo;{currentLyric}&rdquo;
            </p>
            <p className="mt-2 text-[14px] text-[#d5ccb8] m-0">
              Little notes moving along with the melody
            </p>
          </motion.div>

          {/* Track Selector List */}
          <motion.div {...revealProps(0.22)} className="mt-6 w-full flex flex-col gap-2">
            {tracks.map((item, idx) => {
              const active = idx === currentTrackIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTrack(idx)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-left cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#1f2336] text-[#f6e2b8]'
                      : 'bg-[#11131d] hover:bg-[#171a28] text-[#faf8f5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Disc className={`w-4 h-4 ${active && isPlaying ? 'reel-spinning' : ''}`} />
                    <div>
                      <p className="text-[17px] font-medium m-0">{item.title}</p>
                      <p className="text-[14px] text-[#d5ccb8] m-0">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[14px] text-[#d5ccb8] tabular-nums">
                    {formatDuration(item.duration)}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: Analog Retro Cassette Deck UI */}
        <motion.div
          {...revealProps(0.14)}
          className="lg:col-span-7 flex flex-col items-center"
        >
          <div
            data-ui="cassette-deck"
            className="w-full max-w-[600px] bg-[#11131d] p-6 md:p-8"
          >
            {/* Outer Cassette Shell */}
            <div className="bg-[#171a28] p-5 md:p-7">
              {/* Warm Stone Paper Cassette Label */}
              <div className="bg-[#ece6dc] text-[#1b1917] p-5 md:p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-script text-[24px] text-[#5c3138] font-semibold">
                    Mixtape #0411 · For You
                  </span>
                  <span className="text-[14px] font-semibold text-[#5c3138] bg-[#dfd6c7] px-2.5 py-1">
                    SIDE A
                  </span>
                </div>

                <p className="mt-1 text-[14px] font-medium text-[#3f3934] m-0">
                  {track.title} · {track.subtitle}
                </p>

                {/* Tape Window & Rotating Mechanical Reels */}
                <div className="mt-5 bg-[#090a10] text-[#faf8f5] p-5 flex items-center justify-around gap-4">
                  {/* Left Tape Reel */}
                  <div className="flex flex-col items-center">
                    <svg
                      viewBox="0 0 100 100"
                      className={`w-20 h-20 md:w-24 md:h-24 ${isPlaying ? 'reel-spinning' : ''}`}
                      aria-hidden="true"
                    >
                      <circle cx="50" cy="50" r={32 - progressRatio * 12} fill="#221c1a" />
                      <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="#f6e2b8"
                        strokeWidth="3"
                      />
                      <circle cx="50" cy="50" r="9" fill="#ece6dc" />
                      <g stroke="#f6e2b8" strokeWidth="3.5" strokeLinecap="round">
                        <line x1="50" y1="22" x2="50" y2="32" />
                        <line x1="50" y1="68" x2="50" y2="78" />
                        <line x1="25" y1="36" x2="34" y2="41" />
                        <line x1="66" y1="59" x2="75" y2="64" />
                        <line x1="25" y1="64" x2="34" y2="59" />
                        <line x1="66" y1="41" x2="75" y2="36" />
                      </g>
                    </svg>
                  </div>

                  {/* Center Magnetic Tape Bridge */}
                  <div className="hidden sm:flex flex-col items-center justify-center px-3">
                    <div className="text-[14px] text-[#f6e2b8] tabular-nums font-medium">
                      {formatDuration(elapsedSeconds)} / {formatDuration(track.duration)}
                    </div>
                    <div className="mt-2 w-24 h-2 bg-[#171a28] overflow-hidden">
                      <div
                        className="h-full bg-[#f8c8d8]"
                        style={{ width: `${Math.round(progressRatio * 100)}%` }}
                      />
                    </div>
                    <span className="mt-1.5 text-[14px] text-[#d5ccb8]">
                      {isPlaying ? 'Tape Spinning' : 'Ready to Play'}
                    </span>
                  </div>

                  {/* Right Tape Reel */}
                  <div className="flex flex-col items-center">
                    <svg
                      viewBox="0 0 100 100"
                      className={`w-20 h-20 md:w-24 md:h-24 ${isPlaying ? 'reel-spinning' : ''}`}
                      aria-hidden="true"
                    >
                      <circle cx="50" cy="50" r={20 + progressRatio * 12} fill="#221c1a" />
                      <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="#f6e2b8"
                        strokeWidth="3"
                      />
                      <circle cx="50" cy="50" r="9" fill="#ece6dc" />
                      <g stroke="#f6e2b8" strokeWidth="3.5" strokeLinecap="round">
                        <line x1="50" y1="22" x2="50" y2="32" />
                        <line x1="50" y1="68" x2="50" y2="78" />
                        <line x1="25" y1="36" x2="34" y2="41" />
                        <line x1="66" y1="59" x2="75" y2="64" />
                        <line x1="25" y1="64" x2="34" y2="59" />
                        <line x1="66" y1="41" x2="75" y2="36" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interactive Progress Scrubber */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-[14px] text-[#d5ccb8] tabular-nums w-12">
                  {formatDuration(elapsedSeconds)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={track.duration}
                  value={elapsedSeconds}
                  aria-label="Cassette playback progress"
                  onChange={(e) => onSeek(Number(e.target.value))}
                  className="w-full accent-[#f6e2b8] cursor-pointer h-2 bg-[#090a10]"
                />
                <span className="text-[14px] text-[#d5ccb8] tabular-nums w-12 text-right">
                  {formatDuration(track.duration)}
                </span>
              </div>

              {/* Mechanical Transport Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous track"
                    className="p-3.5 bg-[#11131d] hover:bg-[#1f2336] text-[#faf8f5] cursor-pointer transition-transform active:scale-95"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={onTogglePlay}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#f6e2b8] hover:bg-[#faeccf] text-[#090a10] font-semibold text-[17px] cursor-pointer transition-transform active:scale-95"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-[#090a10]" />
                        <span>Pause Tape</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-[#090a10]" />
                        <span>Play Tape</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next track"
                    className="p-3.5 bg-[#11131d] hover:bg-[#1f2336] text-[#faf8f5] cursor-pointer transition-transform active:scale-95"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onToggleMute}
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    className="p-3.5 bg-[#11131d] hover:bg-[#1f2336] text-[#faf8f5] cursor-pointer transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-[#f8c8d8]" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-[#f6e2b8]" />
                    )}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    aria-label="Choose an MP3 audio file from your device"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onUploadAudio(file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-3.5 bg-[#11131d] hover:bg-[#1f2336] text-[#d5ccb8] hover:text-[#faf8f5] text-[14px] font-medium cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4 text-[#f6e2b8]" />
                    <span>Load Your Song</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
