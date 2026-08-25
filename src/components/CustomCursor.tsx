"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Skip on mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    // Sichqonchasiz qurilma yoki harakat kamaytirilgan — maxsus kursor kerak emas.
    // CSS'dagi `cursor: none` ham xuddi shu shartlar ostida qo'llanadi, shuning
    // uchun foydalanuvchi kursorsiz qolib ketmaydi.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const orb = orbRef.current;
    if (!dot || !ring || !orb) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let orbX = 0;
    let orbY = 0;
    let hidden = true;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hidden = false;
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      hidden = true;
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      hidden = false;
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

    // Main animation loop — dot + ring + orb
    let animationFrameId: number;

    const animate = () => {
      // -- Cursor dot (instant) --
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // -- Cursor ring (elastic delay) --
      const delay = 3;
      ringX += (mouseX - ringX) / delay;
      ringY += (mouseY - ringY) / delay;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      // -- Orb glow (very slow follow — dreamy lag) --
      const orbDelay = 10;
      orbX += (mouseX - orbX) / orbDelay;
      orbY += (mouseY - orbY) / orbDelay;
      orb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
      orb.style.opacity = hidden ? "0" : "1";

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
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
      {/* Gradient orb glow — slowest follower */}
      <div ref={orbRef} className="cursor-orb" aria-hidden="true" />

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
