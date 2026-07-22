"use client";

import React, { useState, useEffect } from "react";
import BlobLogo from "./BlobLogo";

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
        <div className="flex justify-center items-center h-full w-full">
          <BlobLogo size={96} />
        </div>
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
