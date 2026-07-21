"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Grid size for the snake game
const GRID_SIZE = 20;
const CELL_SIZE = 20;

export default function EasterEggGame() {
  const [isActive, setIsActive] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  // Listen for the custom event to start the easter egg
  useEffect(() => {
    const handleTrigger = () => {
      setIsActive(true);
      resetGame();
    };
    
    window.addEventListener('easter-egg-trigger', handleTrigger);
    return () => window.removeEventListener('easter-egg-trigger', handleTrigger);
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const closeGame = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !isActive) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check collision with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        });
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, isActive]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      
      // Prevent scrolling when playing
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          if (gameOver) resetGame();
          else setIsPaused(!isPaused);
          break;
        case 'Escape':
          closeGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isActive, gameOver, isPaused]);

  // Game loop
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isActive && !gameOver && !isPaused) {
      intervalId = setInterval(moveSnake, 120 - Math.min(score, 80)); // Gets slightly faster
    }
    return () => clearInterval(intervalId);
  }, [isActive, gameOver, isPaused, moveSnake, score]);


  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617]/90 backdrop-blur-sm flex flex-col items-center justify-center font-mono">
      <div className="absolute top-8 right-8">
        <button 
          onClick={closeGame}
          className="text-white/50 hover:text-white transition-colors p-2 text-xl"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-accent mb-2 tracking-widest animate-pulse">
          HACKER MODE ACTIVATED
        </h2>
        <p className="text-green-400">Catch the bugs. Score: {score}</p>
      </div>

      <div 
        ref={gameAreaRef}
        className="relative bg-[#0f172a] border-2 border-accent shadow-[0_0_20px_rgba(200,161,100,0.3)]"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE 
        }}
      >
        {/* Snake rendering */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute rounded-sm"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: index === 0 ? '#c8a164' : '#f8f5ec',
              opacity: index === 0 ? 1 : 0.8,
              border: '1px solid #0f172a'
            }}
          />
        ))}

        {/* Food (Bug) rendering */}
        <div
          className="absolute flex items-center justify-center text-red-500 animate-bounce"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            fontSize: '14px'
          }}
        >
          <i className="fas fa-bug"></i>
        </div>

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center">
            <h3 className="text-red-500 text-2xl font-bold mb-2">SYSTEM CRASHED</h3>
            <p className="text-white mb-4">Final Score: {score}</p>
            <button 
              onClick={resetGame}
              className="px-4 py-2 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-primary transition-colors uppercase tracking-wider text-sm"
            >
              Reboot (Space)
            </button>
          </div>
        )}

        {/* Paused Screen */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold tracking-widest">PAUSED</h3>
          </div>
        )}
      </div>

      <div className="mt-6 text-white/50 text-xs text-center">
        <p>Use W, A, S, D or Arrows to move.</p>
        <p>Press Space to pause/resume. Press Esc to exit.</p>
      </div>
    </div>
  );
}
