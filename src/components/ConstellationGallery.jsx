import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { MEMORIES_DATA } from '../data/memoriesData';

function PolaroidCard({ item, index, onOpen }) {
  const [imgSrc, setImgSrc] = useState(item.src);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch') return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-ny * 10).toFixed(2)),
      ry: Number((nx * 10).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Asymmetrical editorial stagger across columns
  const staggerClass =
    index % 4 === 1
      ? 'md:mt-12'
      : index % 4 === 2
        ? 'md:mt-4'
        : index % 4 === 3
          ? 'md:mt-16'
          : 'md:mt-0';

  return (
    <motion.article
      initial={{ opacity: 0.85, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${staggerClass} flex flex-col`}
    >
      <button
        ref={cardRef}
        type="button"
        onClick={() => onOpen(index)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={`Buka cerita kenangan: ${item.title}`}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${item.rotation}deg)`,
        }}
        className="group w-full text-left bg-[#ece6dc] text-[#1b1917] p-3.5 pb-5 cursor-pointer transition-transform duration-200 ease-out"
      >
        <div className="relative w-full aspect-[4/5] bg-[#11131d] overflow-hidden">
          <img
            src={imgSrc}
            alt={item.title}
            loading="lazy"
            width="800"
            height="1000"
            onError={() => {
              if (imgSrc !== item.fallback) {
                setImgSrc(item.fallback);
              }
            }}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="mt-4 px-1">
          <h3 className="font-display text-[24px] font-semibold text-[#1b1917] m-0">
            {item.title}
          </h3>
          <p className="mt-1 text-[14px] text-[#5c534c] m-0">
            {item.date} · {item.location}
          </p>
          <p className="mt-2 font-script text-[24px] text-[#5c3138] leading-snug m-0">
            &ldquo;{item.handwrittenNote}&rdquo;
          </p>
        </div>
      </button>
    </motion.article>
  );
}

export function ConstellationGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalImgSrc, setModalImgSrc] = useState('');
  const dialogRef = useRef(null);

  const activeMemory = selectedIndex !== null ? MEMORIES_DATA[selectedIndex] : null;

  const openModal = (idx) => {
    setSelectedIndex(idx);
    setModalImgSrc(MEMORIES_DATA[idx].src);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  const closeModal = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
    setSelectedIndex(null);
  };

  const showPrev = () => {
    if (selectedIndex === null) return;
    const prevIdx = (selectedIndex - 1 + MEMORIES_DATA.length) % MEMORIES_DATA.length;
    setSelectedIndex(prevIdx);
    setModalImgSrc(MEMORIES_DATA[prevIdx].src);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    const nextIdx = (selectedIndex + 1) % MEMORIES_DATA.length;
    setSelectedIndex(nextIdx);
    setModalImgSrc(MEMORIES_DATA[nextIdx].src);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      setSelectedIndex(null);
    };

    const handleLightDismissFallback = (event) => {
      if ('closedBy' in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (isDialogContent) return;
      dialog.close();
    };

    dialog.addEventListener('close', handleNativeClose);
    dialog.addEventListener('click', handleLightDismissFallback);
    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      dialog.removeEventListener('click', handleLightDismissFallback);
    };
  }, []);

  return (
    <section
      id="kenangan"
      aria-labelledby="gallery-heading"
      className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 py-24 md:py-32"
    >
      {/* Editorial Header Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
        <div className="lg:col-span-7">
          <motion.h2
            id="gallery-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-[#faf8f5] m-0"
            style={{ fontSize: 'clamp(2.1rem, 1.4rem + 2.6vw, 3.6rem)' }}
          >
            Rasi Kenangan Kita
          </motion.h2>
        </div>
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[17px] leading-[1.6] text-[#d5ccb8] m-0"
          >
            Setiap polaroid di bawah ini adalah satu bintang di langit perjalanan kita. Sentuh
            kartu mana pun untuk membaca catatan tangan yang kutulis khusus untuk momen itu.
          </motion.p>
        </div>
      </div>

      {/* Asymmetrical Polaroid Constellation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-9">
        {MEMORIES_DATA.map((item, idx) => (
          <PolaroidCard key={item.id} item={item} index={idx} onOpen={openModal} />
        ))}
      </div>

      {/* Native Accessible Lightbox Dialog with closedby="any" */}
      <dialog
        ref={dialogRef}
        {...{ closedby: 'any' }}
        aria-labelledby="lightbox-dialog-title"
        className="memory-dialog"
      >
        {activeMemory && (
          <div
            data-ui="lightbox-card"
            className="bg-[#11131d] text-[#faf8f5] p-5 sm:p-7 md:p-9 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
          >
            {/* Left Polaroid Frame Inside Dialog */}
            <div className="md:col-span-6 bg-[#ece6dc] text-[#1b1917] p-3.5 pb-5">
              <div className="w-full aspect-[4/5] bg-[#090a10] overflow-hidden">
                <img
                  src={modalImgSrc}
                  alt={activeMemory.title}
                  width="800"
                  height="1000"
                  onError={() => {
                    if (modalImgSrc !== activeMemory.fallback) {
                      setModalImgSrc(activeMemory.fallback);
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 font-script text-[24px] text-[#5c3138] text-center m-0">
                &ldquo;{activeMemory.handwrittenNote}&rdquo;
              </p>
            </div>

            {/* Right Story & Navigation Controls */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[14px] text-[#f6e2b8]">
                    <Sparkles className="w-4 h-4" />
                    <span>Kenangan Pilihan</span>
                  </span>

                  <form method="dialog">
                    <button
                      type="submit"
                      onClick={closeModal}
                      aria-label="Tutup jendela kenangan"
                      className="p-2.5 bg-[#171a28] hover:bg-[#23273b] text-[#faf8f5] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </form>
                </div>

                <h3
                  id="lightbox-dialog-title"
                  className="mt-4 font-display text-[24px] font-semibold text-[#faf8f5] m-0"
                >
                  {activeMemory.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[14px] text-[#d5ccb8]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#f6e2b8]" />
                    <span>{activeMemory.date}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#f8c8d8]" />
                    <span>{activeMemory.location}</span>
                  </span>
                </div>

                <p className="mt-6 text-[17px] leading-[1.65] text-[#faf8f5]">
                  {activeMemory.story}
                </p>

                <div className="mt-6 bg-[#171a28] p-4">
                  <p className="font-script text-[24px] text-[#f8c8d8] m-0">
                    Catatan Kecil: &ldquo;{activeMemory.handwrittenNote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={showPrev}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-[#171a28] hover:bg-[#22273b] text-[#faf8f5] text-[14px] font-medium cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-[#f6e2b8] hover:bg-[#faeccf] text-[#090a10] text-[14px] font-semibold cursor-pointer transition-colors"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
