"use client";

import React, { useState, useEffect, useCallback } from 'react';

type Player = 'X' | 'O' | null;

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function calculateWinner(squares: Player[]) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function EasterEggGame() {
  const [isActive, setIsActive] = useState(false);
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'DRAW'>(null);
  
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
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  const closeGame = () => {
    setIsActive(false);
  };

  const checkGameEnd = useCallback((currentBoard: Player[]) => {
    const w = calculateWinner(currentBoard);
    if (w) {
      setWinner(w);
      return true;
    }
    if (!currentBoard.includes(null)) {
      setWinner('DRAW');
      return true;
    }
    return false;
  }, []);

  // Computer's turn
  useEffect(() => {
    if (!isActive || isPlayerTurn || winner) return;

    const timer = setTimeout(() => {
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        
        // 1. Try to win
        let moveFound = false;
        for (let i = 0; i < WINNING_LINES.length; i++) {
          const [a, b, c] = WINNING_LINES[i];
          const line = [newBoard[a], newBoard[b], newBoard[c]];
          if (line.filter(cell => cell === 'O').length === 2 && line.includes(null)) {
            const emptyIdx = WINNING_LINES[i][line.indexOf(null)];
            newBoard[emptyIdx] = 'O';
            moveFound = true;
            break;
          }
        }

        // 2. Try to block player
        if (!moveFound) {
          for (let i = 0; i < WINNING_LINES.length; i++) {
            const [a, b, c] = WINNING_LINES[i];
            const line = [newBoard[a], newBoard[b], newBoard[c]];
            if (line.filter(cell => cell === 'X').length === 2 && line.includes(null)) {
              const emptyIdx = WINNING_LINES[i][line.indexOf(null)];
              newBoard[emptyIdx] = 'O';
              moveFound = true;
              break;
            }
          }
        }

        // 3. Play center if available
        if (!moveFound && newBoard[4] === null) {
          newBoard[4] = 'O';
          moveFound = true;
        }

        // 4. Play random empty square
        if (!moveFound) {
          const emptyIndices = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
          if (emptyIndices.length > 0) {
            const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            newBoard[randomIdx] = 'O';
          }
        }

        checkGameEnd(newBoard);
        setIsPlayerTurn(true);
        return newBoard;
      });
    }, 600); // Small delay to feel like computer is "thinking"

    return () => clearTimeout(timer);
  }, [isActive, isPlayerTurn, winner, checkGameEnd]);

  const handleCellClick = (index: number) => {
    if (!isActive || !isPlayerTurn || winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    
    const gameEnded = checkGameEnd(newBoard);
    if (!gameEnded) {
      setIsPlayerTurn(false);
    }
  };

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

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-accent mb-2 tracking-widest">
          TIC-TAC-TOE
        </h2>
        <p className={isPlayerTurn && !winner ? "text-green-400" : "text-white/50"}>
          {winner ? "Game Over" : isPlayerTurn ? "Your turn (X)" : "System is thinking..."}
        </p>
      </div>

      <div className="bg-[#0f172a] p-4 rounded-xl border border-secondary/30 shadow-[0_0_30px_rgba(200,161,100,0.15)] relative">
        <div className="grid grid-cols-3 gap-3">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!!cell || !isPlayerTurn || !!winner}
              className={`w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-5xl sm:text-6xl rounded-lg bg-[#020617] border border-secondary/20 transition-all duration-300
                ${!cell && isPlayerTurn && !winner ? 'hover:bg-secondary/10 cursor-pointer' : 'cursor-default'}
                ${cell === 'X' ? 'text-accent shadow-[inset_0_0_15px_rgba(200,161,100,0.2)]' : cell === 'O' ? 'text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]' : ''}
              `}
            >
              <span className={cell ? "animate-in zoom-in duration-300" : ""}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        {/* Game Over Overlay */}
        {winner && (
          <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center animate-in fade-in duration-500">
            <h3 className={`text-4xl font-bold mb-6 ${winner === 'X' ? 'text-accent' : winner === 'O' ? 'text-red-400' : 'text-white'}`}>
              {winner === 'X' ? 'YOU WIN!' : winner === 'O' ? 'SYSTEM WINS' : 'DRAW'}
            </h3>
            <button 
              onClick={resetGame}
              className="px-6 py-3 rounded-full bg-accent text-[#0f172a] font-bold hover:bg-light transition-colors uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(200,161,100,0.4)]"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-white/40 text-xs text-center max-w-md">
        <p>You discovered the hidden easter egg! Can you beat the system?</p>
      </div>
    </div>
  );
}
