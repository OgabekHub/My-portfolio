"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Check if user agent is mobile/tablet to avoid rendering custom cursor
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

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

    // Animation loop for elastic ring delay
    let animationFrameId: number;
    const animate = () => {
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const delay = 3; // Elasticity speed — past qiymat tezroq (1=darhol, 10=juda sekin)
      ringX += (mouseX - ringX) / delay;
      ringY += (mouseY - ringY) / delay;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Mouse hover detection to scale cursor on interactive elements
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

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHidden ? "hidden-cursor" : ""}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHidden ? "hidden-cursor" : ""} ${
          isHovered ? "hovered-cursor" : ""
        }`}
      />
    </>
  );
}
