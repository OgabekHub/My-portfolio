"use client";

import React, { useState, useRef, useEffect } from "react";

const LOFI_TRACKS = [
  {
    title: "Lofi Study",
    artist: "FASSounds",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  },
  {
    title: "Chillout Lofi",
    artist: "BoDleasons",
    url: "https://cdn.pixabay.com/download/audio/2022/04/27/audio_69bc74900a.mp3?filename=chillout-lofi-107775.mp3",
  },
  {
    title: "Lofi Ambient",
    artist: "Playsound",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_a165f90f23.mp3?filename=lofi-ambient-115312.mp3",
  }
];

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % LOFI_TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
      }, 50);
    }
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + LOFI_TRACKS.length) % LOFI_TRACKS.length;
    setCurrentTrackIndex(prevIndex);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
      }, 50);
    }
  };

  const handleAudioEnded = () => {
    nextTrack();
  };

  return (
    <div className={`fixed bottom-[20px] left-[20px] md:bottom-[30px] md:left-[30px] z-[998] transition-all duration-500 flex items-end ${isOpen ? 'w-[280px]' : 'w-[50px]'}`}>
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={LOFI_TRACKS[currentTrackIndex].url}
        onEnded={handleAudioEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
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
