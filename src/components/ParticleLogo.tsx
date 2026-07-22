"use client";

import React, { useEffect, useRef } from "react";

interface ParticleLogoProps {
  size?: number;
  text?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  friction: number;
  ease: number;

  constructor(x: number, y: number, color: string) {
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = Math.random() * 1.5 + 0.5;
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.85;
    this.ease = 0.1;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }

  update(mouse: { x: number; y: number; radius: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Force direction
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    
    // Max distance
    const maxDistance = mouse.radius;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * 5;
    const directionY = forceDirectionY * force * 5;

    if (distance < mouse.radius) {
      this.vx -= directionX;
      this.vy -= directionY;
    } else {
      this.x += (this.originX - this.x) * this.ease;
      this.y += (this.originY - this.y) * this.ease;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;
  }
}

export default function ParticleLogo({ size = 56, text = "O/" }: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 25 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    let particlesArray: Particle[] = [];

    const init = () => {
      particlesArray = [];
      ctx.clearRect(0, 0, size, size);
      
      // Draw text to read pixels
      ctx.fillStyle = "white";
      ctx.font = `bold ${size * 0.55}px Poppins, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, size / 2, size / 2);

      const textCoordinates = ctx.getImageData(0, 0, size * dpr, size * dpr);
      
      ctx.clearRect(0, 0, size, size);

      // Create particles based on pixel data
      // Step size determines density (higher = fewer particles)
      const step = 2 * dpr;
      
      for (let y = 0, y2 = textCoordinates.height; y < y2; y += step) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x += step) {
          const index = (y * 4 * textCoordinates.width) + (x * 4);
          const alpha = textCoordinates.data[index + 3];
          
          if (alpha > 128) {
            // Determine color based on position (O vs /)
            const isSlash = (x / dpr) > (size * 0.55);
            const color = isSlash ? "#c8a164" : "#f8f5ec"; // Accent gold vs light text
            
            particlesArray.push(
              new Particle(x / dpr, y / dpr, color)
            );
          }
        }
      }
      
      particlesRef.current = particlesArray;
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw(ctx);
        particlesArray[i].update(mouseRef.current);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [size, text]);

  // Event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
      style={{
        display: "block",
        filter: "drop-shadow(0 0 8px rgba(200,161,100,0.2)) drop-shadow(0 0 2px rgba(248,245,236,0.5))",
      }}
    />
  );
}
