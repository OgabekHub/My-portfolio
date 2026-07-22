"use client";

import React, { useState, useRef, useEffect } from "react";

const LOFI_TRACKS = [
  {
    title: "The Departure",
    artist: "Max Richter",
    url: "/audio/jazz-lofi-1.mp3",
  },
  {
    title: "Comptine d'Un Autre Été",
    artist: "Yann Tiersen",
    url: "/audio/jazz-lofi-2.mp3",
  },
  {
    title: "Una Mattina",
    artist: "Olga Scheps",
    url: "/audio/jazz-lofi-3.mp3",
  }
];

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantToPlayRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // When track changes and audio element remounts, auto-play if needed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    
    if (wantToPlayRef.current) {
      const playWhenReady = () => {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log("Auto-play failed:", e));
      };
      
      if (audio.readyState >= 2) {
        playWhenReady();
      } else {
        audio.addEventListener("canplay", playWhenReady, { once: true });
      }
    }
  }, [currentTrackIndex, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      wantToPlayRef.current = false;
      setIsPlaying(false);
    } else {
      wantToPlayRef.current = true;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Play failed:", e));
    }
  };

  const nextTrack = () => {
    wantToPlayRef.current = isPlaying;
    setIsPlaying(false);
    setCurrentTrackIndex((prev) => (prev + 1) % LOFI_TRACKS.length);
  };

  const prevTrack = () => {
    wantToPlayRef.current = isPlaying;
    setIsPlaying(false);
    setCurrentTrackIndex((prev) => (prev - 1 + LOFI_TRACKS.length) % LOFI_TRACKS.length);
  };

  const handleAudioEnded = () => {
    wantToPlayRef.current = true;
    setCurrentTrackIndex((prev) => (prev + 1) % LOFI_TRACKS.length);
  };

  return (
    <div className={`fixed bottom-[20px] left-[20px] md:bottom-[30px] md:left-[30px] z-[998] transition-all duration-500 flex items-end ${isOpen ? 'w-[280px]' : 'w-[50px]'}`}>
      
      {/* Audio Element - key forces remount on track change */}
      <audio 
        key={currentTrackIndex}
        ref={audioRef}
        src={LOFI_TRACKS[currentTrackIndex].url}
        preload="auto"
        onEnded={handleAudioEnded}
      />

      <div className={`flex items-center gap-3 bg-secondary/90 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-accent/20 p-2 overflow-hidden transition-all duration-500 w-full`}>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-[34px] h-[34px] rounded-full flex-shrink-0 flex items-center justify-center bg-primary text-accent transition-all hover:scale-105 ${isPlaying && !isOpen ? 'animate-pulse' : ''}`}
          title="Lofi Player"
        >
          <i className={`fas fa-music ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}></i>
        </button>

        {/* Player Controls */}
        <div className={`flex flex-col flex-grow justify-center transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute pointer-events-none'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-poppins text-white font-semibold truncate max-w-[120px]">
              {LOFI_TRACKS[currentTrackIndex].title}
            </span>
            <span className="text-[10px] text-accent truncate mr-2">
              {LOFI_TRACKS[currentTrackIndex].artist}
            </span>
          </div>
          
          <div className="flex items-center justify-between pr-2">
            <button onClick={prevTrack} className="text-light/60 hover:text-accent transition-colors text-xs">
              <i className="fas fa-backward-step"></i>
            </button>
            <button onClick={togglePlay} className="text-accent hover:text-white transition-colors text-sm mx-2">
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button onClick={nextTrack} className="text-light/60 hover:text-accent transition-colors text-xs">
              <i className="fas fa-forward-step"></i>
            </button>
            
            <div className="flex items-center gap-1 ml-3 border-l border-white/10 pl-2">
              <i className="fas fa-volume-up text-[10px] text-light/50"></i>
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-12 h-1 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
                title="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
