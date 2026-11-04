// Web Audio API Analog Sound & Romantic Music Box Engine
// Provides zero-dependency warm music box melodies, analog tape click sounds,
// envelope chime, and candle blow celebration chords, plus custom MP3 playback support.

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentTrackIndex = 0;
    this.stepIndex = 0;
    this.timerId = null;
    this.elapsedSeconds = 0;
    this.progressTimerId = null;
    this.listeners = new Set();
    this.customAudio = null;
    this.usingCustomAudio = false;

    this.tracks = [
      {
        id: 'november-starlight',
        title: 'November Fourth Night',
        subtitle: 'Music Box in F Major',
        duration: 164,
        tempo: 680,
        // Fmaj7 - Dm7 - Gm7 - C7sus4 romantic progression (MIDI notes)
        notes: [
          [65, 69, 72, 76], [77], [76], [72],
          [62, 65, 69, 72], [74], [72], [69],
          [58, 62, 65, 69], [72], [69], [67],
          [60, 64, 67, 70], [72], [74], [76],
          [65, 69, 72, 77], [81], [79], [77],
          [62, 65, 69, 74], [77], [76], [72],
          [58, 62, 67, 70], [74], [72], [69],
          [60, 65, 69, 72], [76], [74], [72],
        ],
        lyrics: [
          'Under the quiet November sky with you...',
          'Every star up there holds a little memory of us.',
          'Thank you for being my safest and warmest place.',
          'This little tape keeps all our favorite laughs together.',
          'Happy 20th birthday to my favorite person in the world.',
          'Here is to walking side by side for many more nights.',
        ],
      },
      {
        id: 'champagne-constellation',
        title: 'Our Little Constellation',
        subtitle: 'Warm Electric Piano in C Major',
        duration: 148,
        tempo: 720,
        notes: [
          [60, 64, 67, 71], [72], [71], [67],
          [57, 60, 64, 69], [71], [69], [64],
          [53, 57, 60, 64], [69], [67], [64],
          [55, 59, 62, 67], [69], [71], [74],
          [60, 64, 67, 72], [76], [74], [71],
          [57, 60, 64, 71], [72], [69], [67],
          [53, 57, 60, 65], [69], [72], [71],
          [55, 59, 62, 67], [71], [69], [67],
        ],
        lyrics: [
          'Out of all the photos and moments we have shared...',
          'Nothing beats simply spending my days right next to you.',
          'Look at how all the little stars connect up there.',
          'Every ordinary day feels special when you are around.',
          'Keep smiling just like you do in all these pictures.',
          'You and I are my favorite constellation.',
        ],
      },
      {
        id: 'forever-anniversary',
        title: 'One Year With You',
        subtitle: 'Celesta Lullaby in G Major',
        duration: 182,
        tempo: 650,
        notes: [
          [55, 59, 62, 66], [71], [69], [67],
          [52, 55, 59, 64], [67], [66], [62],
          [48, 52, 55, 60], [64], [66], [67],
          [50, 54, 57, 62], [66], [69], [66],
          [55, 59, 62, 67], [74], [71], [69],
          [52, 55, 59, 67], [71], [69], [67],
          [48, 52, 55, 64], [67], [69], [71],
          [50, 54, 57, 66], [69], [67], [66],
        ],
        lyrics: [
          'Day by day, we made it to our very first year together...',
          'Loving you gets easier and warmer every single day.',
          'Thank you for your patience, your hugs, and your kindness.',
          'Happy 1st anniversary to us and everything we have built.',
          'No matter what season comes next, I am holding your hand.',
          'Always you, today, tomorrow, and for a long time to come.',
        ],
      },
    ];
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  getState() {
    const track = this.tracks[this.currentTrackIndex];
    const lyricIdx = Math.floor((this.elapsedSeconds / 8) % track.lyrics.length);
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      currentTrackIndex: this.currentTrackIndex,
      track,
      tracks: this.tracks,
      elapsedSeconds: this.elapsedSeconds,
      currentLyric: track.lyrics[lyricIdx] || track.lyrics[0],
      usingCustomAudio: this.usingCustomAudio,
    };
  }

  midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // Tactile mechanical cassette button click
  playTapeClick(pitch = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Short noise burst + low mechanical thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(48, now + 0.045);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.055);
  }

  // Romantic bell / music-box note synthesizer
  playMusicBoxNote(midi, durationSec = 1.8, velocity = 0.14) {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const freq = this.midiToFreq(midi);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle harmonic overtone for warm music-box shimmer
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.18, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.025);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, now + durationSec);

    osc1.connect(noteGain);
    osc2.connect(overtoneGain);
    overtoneGain.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.05);
    osc2.stop(now + durationSec + 0.05);
  }

  // Sparkle chime when opening the sealed letter
  playEnvelopeChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const chord = [65, 69, 72, 76, 81, 84];
    chord.forEach((midi, idx) => {
      setTimeout(() => {
        this.playMusicBoxNote(midi, 2.2, 0.16);
      }, idx * 95);
    });
  }

  // Celebratory chord when blowing out the birthday candle
  playCandleCelebration() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const fanfare = [60, 64, 67, 72, 76, 79, 84];
    fanfare.forEach((midi, idx) => {
      setTimeout(() => {
        this.playMusicBoxNote(midi, 2.6, 0.18);
      }, idx * 80);
    });
  }

  startMelodyLoop() {
    this.stopMelodyLoop();
    const track = this.tracks[this.currentTrackIndex];

    const tick = () => {
      if (!this.isPlaying) return;
      if (typeof document !== 'undefined' && document.hidden) return;
      const chordOrNote = track.notes[this.stepIndex % track.notes.length];
      chordOrNote.forEach((midi, i) => {
        const vel = chordOrNote.length > 1 ? (i === 0 ? 0.12 : 0.09) : 0.15;
        this.playMusicBoxNote(midi, chordOrNote.length > 1 ? 2.4 : 1.5, vel);
      });
      this.stepIndex = (this.stepIndex + 1) % track.notes.length;
    };

    tick();
    this.timerId = setInterval(tick, track.tempo);
    this.progressTimerId = setInterval(() => {
      if (!this.isPlaying) return;
      this.elapsedSeconds = (this.elapsedSeconds + 1) % track.duration;
      this.notify();
    }, 1000);
  }

  stopMelodyLoop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.progressTimerId) {
      clearInterval(this.progressTimerId);
      this.progressTimerId = null;
    }
  }

  play() {
    this.initContext();
    this.playTapeClick(1.1);

    if (this.usingCustomAudio && this.customAudio) {
      this.customAudio.play().catch(() => {});
      this.isPlaying = true;
      this.notify();
      return;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.05, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.45, now + 0.6);
    }

    this.isPlaying = true;
    this.startMelodyLoop();
    this.notify();
  }

  pause() {
    this.playTapeClick(0.85);
    if (this.usingCustomAudio && this.customAudio) {
      this.customAudio.pause();
    }
    this.isPlaying = false;
    this.stopMelodyLoop();
    this.notify();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    this.notify();
  }

  selectTrack(index) {
    if (index < 0 || index >= this.tracks.length) return;
    this.playTapeClick(1.0);
    this.usingCustomAudio = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.currentTrackIndex = index;
    this.stepIndex = 0;
    this.elapsedSeconds = 0;
    if (this.isPlaying) {
      this.startMelodyLoop();
    } else {
      this.play();
    }
    this.notify();
  }

  seekTo(seconds) {
    const track = this.tracks[this.currentTrackIndex];
    this.elapsedSeconds = Math.max(0, Math.min(track.duration - 1, Math.floor(seconds)));
    if (this.usingCustomAudio && this.customAudio) {
      this.customAudio.currentTime = this.elapsedSeconds;
    }
    this.notify();
  }

  loadCustomFile(file) {
    if (!file) return;
    this.stopMelodyLoop();
    if (this.customAudio) {
      this.customAudio.pause();
    }
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.loop = true;
    audio.muted = this.isMuted;

    const customTrack = {
      id: 'custom-user-audio',
      title: file.name.replace(/\.[^/.]+$/, '').slice(0, 28),
      subtitle: 'Your Custom Song',
      duration: 180,
      tempo: 700,
      notes: this.tracks[0].notes,
      lyrics: [
        'Playing a special song just for the two of us...',
        'Every second brings back so many warm memories.',
        'Happy 20th birthday and happy 1st anniversary, my love.',
      ],
    };

    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration && isFinite(audio.duration)) {
        customTrack.duration = Math.floor(audio.duration);
        this.notify();
      }
    });

    audio.addEventListener('timeupdate', () => {
      this.elapsedSeconds = Math.floor(audio.currentTime);
      this.notify();
    });

    this.tracks[3] = customTrack;
    this.currentTrackIndex = 3;
    this.customAudio = audio;
    this.usingCustomAudio = true;
    this.isPlaying = true;
    audio.play().catch(() => {});
    this.notify();
  }
}

export const soundEngine = new SoundEngine();
