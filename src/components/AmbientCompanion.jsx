import React, { useState } from 'react';
import { Music, Sparkles, Minimize2 } from 'lucide-react';
import charGirlPng from '../assets/characters/2d2.png';

export function AmbientCompanion({ isVisible, isPlayingMusic, candleBlown, onToggleMusic }) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) return null;

  const statusMessage = candleBlown
    ? 'Yay! Selamat ulang tahun, semoga semua doamu terkabul!'
    : isPlayingMusic
      ? 'Senang rasanya menemanimu sambil mendengarkan melodi kita.'
      : 'Sentuh ikon musik kalau ingin memutar melodi lagi ya.';

  return (
    <aside
      data-ui="ambient-companion"
      aria-label="Pendamping Visual Karakter 2D"
      className="fixed bottom-4 right-4 z-40 flex items-end gap-2.5"
    >
      {!isMinimized && (
        <div className="hidden sm:flex flex-col bg-[#171a28] text-[#faf8f5] p-3.5 max-w-[230px]">
          <p className="font-script text-[24px] text-[#f8c8d8] leading-snug m-0">
            &ldquo;{statusMessage}&rdquo;
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onToggleMusic}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#f6e2b8] bg-[#11131d] hover:bg-[#23273b] px-2.5 py-1.5 cursor-pointer transition-colors"
            >
              <Music className="w-3.5 h-3.5" />
              <span>{isPlayingMusic ? 'Jeda Melodi' : 'Putar Melodi'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              aria-label="Sembunyikan balon pesan"
              className="text-[14px] text-[#d5ccb8] hover:text-[#faf8f5] p-1 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsMinimized((prev) => !prev)}
        aria-label="Tampilkan atau sembunyikan pesan karakter pendamping"
        className="relative group bg-[#171a28] hover:bg-[#202436] p-2 cursor-pointer transition-transform active:scale-95"
      >
        <img
          src={charGirlPng}
          alt="Karakter cewek pendamping"
          loading="lazy"
          width="64"
          height="108"
          className={`w-12 md:w-14 h-auto object-contain select-none ${
            isPlayingMusic ? 'character-happy' : 'character-idle'
          }`}
        />
        <span className="absolute -top-1 -left-1 bg-[#f6e2b8] text-[#090a10] p-1">
          <Sparkles className="w-3 h-3" />
        </span>
      </button>
    </aside>
  );
}
