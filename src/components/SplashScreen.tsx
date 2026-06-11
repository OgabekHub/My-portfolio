"use client";

import React, { useState, useEffect } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    const alreadyShown = sessionStorage.getItem("splash_shown");
    if (alreadyShown) return;

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    // Start exit animation after 2.6s
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 2600);

    // Fully hide after exit animation (2.6s + 0.85s)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("splash_shown", "1");
    }, 3450);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen${isLeaving ? " splash-leaving" : ""}`} aria-hidden="true">
      {/* Logo */}
      <div className="splash-logo">
        <svg
          className="splash-svg"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="splashBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="splashRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8f5ec" />
              <stop offset="45%" stopColor="#c8a164" />
              <stop offset="100%" stopColor="#8b6b34" />
            </linearGradient>
          </defs>
          {/* Dark background */}
          <circle cx="40" cy="40" r="38" fill="url(#splashBg)" />
          {/* Outer border ring */}
          <circle cx="40" cy="40" r="37" fill="none" stroke="url(#splashRing)" strokeWidth="1.5" opacity="0.5" />
          {/* Dashed inner ring */}
          <circle
            cx="40" cy="40" r="29"
            fill="none"
            stroke="rgba(200,161,100,0.18)"
            strokeWidth="1"
            strokeDasharray="3 6"
            strokeLinecap="round"
          />
          {/* Main O ring */}
          <circle cx="40" cy="40" r="18" fill="none" stroke="url(#splashRing)" strokeWidth="3.5" />
          {/* Apostrophe dot — O' belgisi */}
          <circle cx="57" cy="14" r="4.5" fill="#c8a164" />
          <circle cx="57" cy="14" r="2" fill="#f8f5ec" opacity="0.7" />
        </svg>
      </div>

      {/* Name */}
      <div className="splash-name">
        <span className="splash-firstname">Og&apos;abek</span>
        <span className="splash-surname">Olimjonov</span>
      </div>

      {/* Role */}
      <p className="splash-role">Frontend Developer</p>

      {/* Loading bar */}
      <div className="splash-bar-wrap">
        <div className="splash-bar-inner" />
      </div>
    </div>
  );
}
