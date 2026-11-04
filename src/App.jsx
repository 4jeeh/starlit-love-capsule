import React, { useState, useEffect } from 'react';
import { StarlightCanvas } from './components/StarlightCanvas';
import { HeroSealedLetter } from './components/HeroSealedLetter';
import { RetroCassettePlayer } from './components/RetroCassettePlayer';
import { ConstellationGallery } from './components/ConstellationGallery';
import { BirthdayCandleSection } from './components/BirthdayCandleSection';
import { AnniversarySection } from './components/AnniversarySection';
import { AmbientCompanion } from './components/AmbientCompanion';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [audioState, setAudioState] = useState(() => soundEngine.getState());

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((nextState) => {
      setAudioState({ ...nextState });
    });
    return unsubscribe;
  }, []);

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
    setBurstTrigger((prev) => prev + 1);
    soundEngine.playEnvelopeChime();
    if (!audioState.isPlaying) {
      setTimeout(() => {
        soundEngine.play();
      }, 450);
    }
  };

  const handleToggleLetter = () => {
    if (!isLetterOpen) {
      handleOpenLetter();
    } else {
      setIsLetterOpen(false);
      soundEngine.playTapeClick(0.9);
    }
  };

  const handleBlowCandle = () => {
    setCandleBlown(true);
    setBurstTrigger((prev) => prev + 1);
    soundEngine.playCandleCelebration();
  };

  const handleRelightCandle = () => {
    setCandleBlown(false);
    soundEngine.playTapeClick(1.05);
  };

  return (
    <div className="relative min-h-dvh bg-[#090a10] text-[#faf8f5]">
      {/* Dynamic Starlight & Constellation Canvas Background */}
      <StarlightCanvas burstTrigger={burstTrigger} />

      {/* Main Content Flow (Acts 1 to 5) */}
      <main className="relative z-10">
        <HeroSealedLetter
          isLetterOpen={isLetterOpen}
          onOpenLetter={handleOpenLetter}
          onToggleLetter={handleToggleLetter}
        />

        <RetroCassettePlayer
          audioState={audioState}
          onTogglePlay={() => soundEngine.togglePlay()}
          onToggleMute={() => soundEngine.toggleMute()}
          onSelectTrack={(idx) => soundEngine.selectTrack(idx)}
          onSeek={(sec) => soundEngine.seekTo(sec)}
          onUploadAudio={(file) => soundEngine.loadCustomFile(file)}
        />

        <ConstellationGallery />

        <BirthdayCandleSection
          candleBlown={candleBlown}
          onBlowCandle={handleBlowCandle}
          onRelightCandle={handleRelightCandle}
        />

        <AnniversarySection />
      </main>

      {/* Ambient 2D Girl Companion in Corner */}
      <AmbientCompanion
        isVisible={isLetterOpen}
        isPlayingMusic={audioState.isPlaying}
        candleBlown={candleBlown}
        onToggleMusic={() => soundEngine.togglePlay()}
      />
    </div>
  );
}
