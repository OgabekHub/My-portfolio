"use client";

import React, { useEffect, useRef, useState } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Skip on mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = sparkleCanvasRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let lastSpawnTime = 0;
    const sparkles: Sparkle[] = [];

    // Resize canvas to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".project-card") ||
        target.closest(".tech-badge") ||
        target.closest(".resume-download-btn") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Main animation loop — cursor + sparkles
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      // -- Cursor dot (instant) --
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // -- Cursor ring (elastic delay) --
      const delay = 3;
      ringX += (mouseX - ringX) / delay;
      ringY += (mouseY - ringY) / delay;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // -- Spawn sparkles every ~28ms when mouse is active --
      if (!isHidden && timestamp - lastSpawnTime > 28 && mouseX > 0) {
        for (let i = 0; i < 2; i++) {
          sparkles.push({
            x: mouseX + (Math.random() - 0.5) * 10,
            y: mouseY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8 - 0.6,
            life: 0,
            maxLife: 28 + Math.random() * 22,
            size: Math.random() * 2.2 + 0.6,
          });
        }
        lastSpawnTime = timestamp;
      }

      // -- Render sparkles --
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.045; // gravity

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          continue;
        }

        const alpha = (1 - s.life / s.maxLife) * 0.88;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 161, 100, ${alpha})`;
        ctx.shadowBlur = 7;
        ctx.shadowColor = `rgba(200, 161, 100, ${alpha * 0.55})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Sparkle trail canvas */}
      <canvas ref={sparkleCanvasRef} className="sparkle-canvas" aria-hidden="true" />

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHidden ? "hidden-cursor" : ""}`}
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHidden ? "hidden-cursor" : ""} ${
          isHovered ? "hovered-cursor" : ""
        }`}
      />
    </>
  );
}
