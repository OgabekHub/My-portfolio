"use client";

import React, { useState, useEffect } from 'react';

// --- SYSTEM SYNC (Lights Out) TYPES & LOGIC ---
const GRID_SIZE = 4;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const toggleCell = (board: boolean[], index: number) => {
  const newBoard = [...board];
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;

  newBoard[index] = !newBoard[index]; // self
  if (row > 0) newBoard[index - GRID_SIZE] = !newBoard[index - GRID_SIZE]; // top
  if (row < GRID_SIZE - 1) newBoard[index + GRID_SIZE] = !newBoard[index + GRID_SIZE]; // bottom
  if (col > 0) newBoard[index - 1] = !newBoard[index - 1]; // left
  if (col < GRID_SIZE - 1) newBoard[index + 1] = !newBoard[index + 1]; // right
  
  return newBoard;
};

const generateSolvableBoard = () => {
  let board = Array(TOTAL_CELLS).fill(true);
  const shuffles = 15 + Math.floor(Math.random() * 10);
  for (let i = 0; i < shuffles; i++) {
    board = toggleCell(board, Math.floor(Math.random() * TOTAL_CELLS));
  }
  // Ensure it's not already solved
  if (board.every(Boolean)) {
    board = toggleCell(board, 0);
  }
  return board;
};


// --- DATA FLOW (Pipes) TYPES & LOGIC ---
type PipeType = 'straight' | 'corner';
interface Pipe {
  id: number;
  type: PipeType;
  correctRotations: number[];
  rotation: number;
}

const INITIAL_PIPES: Omit<Pipe, 'rotation'>[] = [
  { id: 0, type: 'corner', correctRotations: [0] },
  { id: 1, type: 'straight', correctRotations: [0, 2] },
  { id: 2, type: 'corner', correctRotations: [2] },
  { id: 3, type: 'corner', correctRotations: [1] },

  { id: 4, type: 'straight', correctRotations: [1, 3] },
  { id: 5, type: 'corner', correctRotations: [3] },
  { id: 6, type: 'corner', correctRotations: [0] },
  { id: 7, type: 'corner', correctRotations: [2] },

  { id: 8, type: 'corner', correctRotations: [1] },
  { id: 9, type: 'corner', correctRotations: [2] },
  { id: 10, type: 'corner', correctRotations: [1] },
  { id: 11, type: 'corner', correctRotations: [3] },

  { id: 12, type: 'straight', correctRotations: [1, 3] },
  { id: 13, type: 'corner', correctRotations: [0] },
  { id: 14, type: 'corner', correctRotations: [3] },
  { id: 15, type: 'straight', correctRotations: [0, 2] },
];

const generatePipesBoard = (): Pipe[] => {
  const board = INITIAL_PIPES.map(p => ({
    ...p,
    rotation: Math.floor(Math.random() * 4)
  }));
  
  // Make sure it's not solved initially
  while (board.every(p => p.correctRotations.includes(p.rotation))) {
    board[0].rotation = (board[0].rotation + 1) % 4;
  }
  return board;
};


// --- MAIN COMPONENT ---
type ViewState = 'menu' | 'system-sync' | 'data-flow';

export default function EasterEggGame() {
  const [isActive, setIsActive] = useState(false);
  const [view, setView] = useState<ViewState>('menu');
  
  // System Sync State
  const [lightsBoard, setLightsBoard] = useState<boolean[]>([]);
  const [lightsWon, setLightsWon] = useState(false);
  const [lightsMoves, setLightsMoves] = useState(0);

  // Data Flow State
  const [pipesBoard, setPipesBoard] = useState<Pipe[]>([]);
  const [pipesWon, setPipesWon] = useState(false);
  const [pipesMoves, setPipesMoves] = useState(0);

  // Listen for the custom event to start the easter egg
  useEffect(() => {
    const handleTrigger = () => {
      setIsActive(true);
      setView('menu');
      initLights();
      initPipes();
    };
    
    window.addEventListener('easter-egg-trigger', handleTrigger);
    return () => window.removeEventListener('easter-egg-trigger', handleTrigger);
  }, []);

  const initLights = () => {
    setLightsBoard(generateSolvableBoard());
    setLightsWon(false);
    setLightsMoves(0);
  };

  const initPipes = () => {
    setPipesBoard(generatePipesBoard());
    setPipesWon(false);
    setPipesMoves(0);
  };

  const closeOverlay = () => {
    setIsActive(false);
  };

  const handleLightClick = (index: number) => {
    if (lightsWon) return;
    const newBoard = toggleCell(lightsBoard, index);
    setLightsBoard(newBoard);
    setLightsMoves(m => m + 1);
    
    if (newBoard.every(Boolean)) {
      setLightsWon(true);
    }
  };

  const handlePipeClick = (index: number) => {
    if (pipesWon) return;
    const newBoard = [...pipesBoard];
    newBoard[index].rotation = (newBoard[index].rotation + 1) % 4;
    setPipesBoard(newBoard);
    setPipesMoves(m => m + 1);

    if (newBoard.every(p => p.correctRotations.includes(p.rotation))) {
      setPipesWon(true);
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617]/95 backdrop-blur-md flex flex-col items-center justify-center font-mono cursor-auto selection:bg-accent/30">
      <div className="absolute top-8 right-8">
        <button 
          onClick={closeOverlay}
          className="clickable text-white/50 hover:text-accent transition-colors p-2 text-xl"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="w-full max-w-2xl px-4">
        {view === 'menu' && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4 tracking-widest shadow-accent/20 drop-shadow-lg">
                HACKER OS v2.0
              </h1>
              <p className="text-white/60">Select a subsystem to bypass security</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => { initLights(); setView('system-sync'); }}
                className="clickable group p-6 rounded-xl bg-[#0f172a] border border-secondary/20 hover:border-accent hover:shadow-[0_0_20px_rgba(200,161,100,0.15)] transition-all text-left flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-th-large"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">System Sync</h3>
                  <p className="text-sm text-white/50">Align all nodes to green to restore system power. A classic Lights Out protocol.</p>
                </div>
              </button>

              <button 
                onClick={() => { initPipes(); setView('data-flow'); }}
                className="clickable group p-6 rounded-xl bg-[#0f172a] border border-secondary/20 hover:border-accent hover:shadow-[0_0_20px_rgba(200,161,100,0.15)] transition-all text-left flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-network-wired"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Data Flow</h3>
                  <p className="text-sm text-white/50">Rotate the circuit nodes to establish a secure continuous data connection.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {view === 'system-sync' && (
          <div className="animate-in slide-in-from-right duration-300 flex flex-col items-center">
            <div className="w-full flex justify-between items-end mb-8">
              <div>
                <button 
                  onClick={() => setView('menu')}
                  className="clickable text-white/50 hover:text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2 transition-colors"
                >
                  <i className="fas fa-chevron-left"></i> Main Menu
                </button>
                <h2 className="text-3xl font-bold text-white">System Sync</h2>
              </div>
              <div className="text-right text-white/50">
                Moves: <span className="text-accent">{lightsMoves}</span>
              </div>
            </div>

            <div className="bg-[#0f172a] p-4 sm:p-6 rounded-2xl border border-secondary/30 relative">
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {lightsBoard.map((isOn, index) => (
                  <button
                    key={index}
                    onClick={() => handleLightClick(index)}
                    className={`clickable w-16 h-16 sm:w-20 sm:h-20 rounded-xl transition-all duration-300 border
                      ${isOn 
                        ? 'bg-accent border-accent shadow-[0_0_15px_rgba(200,161,100,0.5)]' 
                        : 'bg-[#020617] border-white/10 hover:border-white/30'}
                    `}
                  />
                ))}
              </div>

              {lightsWon && (
                <div className="absolute inset-0 bg-[#0f172a]/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-3xl mb-4">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">System Synced!</h3>
                  <p className="text-white/60 mb-6">Completed in {lightsMoves} moves</p>
                  <button 
                    onClick={initLights}
                    className="clickable px-6 py-3 rounded-full bg-accent text-[#0f172a] font-bold hover:bg-light transition-colors uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(200,161,100,0.4)]"
                  >
                    Next Level
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'data-flow' && (
          <div className="animate-in slide-in-from-right duration-300 flex flex-col items-center">
            <div className="w-full flex justify-between items-end mb-8">
              <div>
                <button 
                  onClick={() => setView('menu')}
                  className="clickable text-white/50 hover:text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2 transition-colors"
                >
                  <i className="fas fa-chevron-left"></i> Main Menu
                </button>
                <h2 className="text-3xl font-bold text-white">Data Flow</h2>
              </div>
              <div className="text-right text-white/50">
                Rotations: <span className="text-accent">{pipesMoves}</span>
              </div>
            </div>

            <div className="bg-[#0f172a] p-4 sm:p-6 rounded-2xl border border-secondary/30 relative">
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {pipesBoard.map((pipe, index) => (
                  <button
                    key={index}
                    onClick={() => handlePipeClick(index)}
                    className="clickable w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#020617] border border-white/5 hover:bg-white/5 transition-colors flex items-center justify-center relative overflow-hidden group"
                  >
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out"
                      style={{ transform: `rotate(${pipe.rotation * 90}deg)` }}
                    >
                      {pipe.type === 'straight' && (
                        <div className={`w-full h-4 sm:h-6 ${pipesWon ? 'bg-accent shadow-[0_0_10px_rgba(200,161,100,0.8)]' : 'bg-white/30 group-hover:bg-white/50'}`} />
                      )}
                      {pipe.type === 'corner' && (
                        <div className={`absolute top-0 right-0 w-1/2 h-1/2 border-l-4 border-b-4 sm:border-l-6 sm:border-b-6 rounded-bl-xl
                          ${pipesWon ? 'border-accent drop-shadow-[0_0_8px_rgba(200,161,100,0.8)]' : 'border-white/30 group-hover:border-white/50'}`} 
                          style={{
                            borderLeftWidth: '0.35rem',
                            borderBottomWidth: '0.35rem'
                          }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {pipesWon && (
                <div className="absolute inset-0 bg-[#0f172a]/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-3xl mb-4">
                    <i className="fas fa-lock-open"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Connection Secured!</h3>
                  <p className="text-white/60 mb-6">Completed in {pipesMoves} rotations</p>
                  <button 
                    onClick={initPipes}
                    className="clickable px-6 py-3 rounded-full bg-accent text-[#0f172a] font-bold hover:bg-light transition-colors uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(200,161,100,0.4)]"
                  >
                    Next Level
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
