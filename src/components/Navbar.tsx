"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";
import { scrollToSection } from "@/utils/scroll";
import { NAV_LINKS } from "@/data/navLinks";
import dynamic from "next/dynamic";
import { FaBars, FaMoon, FaSun, FaVolumeHigh, FaVolumeXmark, FaWandMagicSparkles, FaXmark } from "react-icons/fa6";

const BlobLogo = dynamic(() => import("./BlobLogo"), { ssr: false });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const [isDark, setIsDark] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const isLight = !document.documentElement.classList.contains("dark");
    setIsDark(!isLight);
    setIsMuted(soundManager.getMuteStatus());
  }, []);

  const handleMuteToggle = () => {
    soundManager.playClick();
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleThemeToggle = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    soundManager.playThemeToggle(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(targetId);
  };

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    clickCountRef.current += 1;
    
    if (clickCountRef.current === 5) {
      soundManager.playClick();
      window.dispatchEvent(new CustomEvent('easter-egg-trigger'));
      clickCountRef.current = 0;
    }

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);
  };

  return (
    <nav className="fixed w-full bg-primary/95 backdrop-blur-sm shadow-lg z-50 border-b border-secondary/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className={`logo-container ${isLogoHovered ? "logo-active" : ""}`}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <a
            href="#home"
            onClick={(e) => {
              handleLinkClick(e, "#home");
              handleLogoClick();
            }}
            className="flex items-center space-x-2"
          >
            <div className="w-[56px] h-[56px] flex items-center justify-center flex-shrink-0 relative">
              <BlobLogo size={56} />
            </div>

            <div className="logo-details opacity-0 transition-all duration-500">
              <span className="text-accent font-playfair tracking-wide">Og&apos;abek</span>
              <span className="text-light font-playfair text-sm md:text-base opacity-80">
                Olimjonov
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-poppins">
          <ul className="flex space-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    soundManager.playClick();
                    handleLinkClick(e, link.href);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="nav-item nav-link"
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4 border-l border-gray-600/30 pl-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={handleThemeToggle}
              onMouseEnter={() => soundManager.playHover()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/60 text-accent transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleMuteToggle}
              onMouseEnter={() => soundManager.playHover()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/60 text-accent transition-all duration-300"
              aria-label="Toggle sound"
            >
              {isMuted ? <FaVolumeXmark className="text-lg" /> : <FaVolumeHigh className="text-lg" />}
            </button>

            {/* AI Copilot Magic/Sparkles Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                window.dispatchEvent(new CustomEvent("toggle-ai-copilot"));
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/60 text-accent transition-all duration-300 relative group"
              aria-label="AI Copilot"
              title="AI Copilot"
            >
              <FaWandMagicSparkles className="text-lg text-accent group-hover:scale-110 transition-all" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-primary animate-ping"></span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-primary"></span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => {
                soundManager.playClick();
                toggleLanguage();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="border border-accent/40 rounded-full px-3 py-1 text-sm font-semibold bg-transparent hover:bg-accent/10 hover:border-accent text-accent transition-all duration-300 min-w-[42px]"
            >
              {language === "uz" ? "EN" : "UZ"}
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* AI Copilot Magic/Sparkles Button for Mobile */}
          <button
            onClick={() => {
              soundManager.playClick();
              window.dispatchEvent(new CustomEvent("toggle-ai-copilot"));
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary/20 text-accent relative hover:bg-secondary/40 active:scale-95 transition-all"
            aria-label="AI Copilot"
            title="AI Copilot"
          >
            <FaWandMagicSparkles className="text-base text-accent" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full border border-primary animate-ping"></span>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full border border-primary"></span>
          </button>

          <button
            id="menu-btn"
            onClick={() => {
              soundManager.playClick();
              toggleMenu();
            }}
            className={`${isOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div id="mobile-nav" className={`mobile-nav md:hidden ${isOpen ? "active" : ""}`}>
        <ul className="flex flex-col items-center space-y-4 py-6 font-poppins">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  soundManager.playClick();
                  handleLinkClick(e, link.href);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="nav-item text-lg"
              >
                {t.nav[link.key]}
              </a>
            </li>
          ))}

          <li className="pt-4 border-t border-gray-600/20 w-[80%] flex items-center justify-center space-x-4 pb-2">
            {/* Dark Mode Toggle for Mobile Drawer */}
            <button
              onClick={handleThemeToggle}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/40 text-accent transition-all duration-300 border border-accent/15"
              aria-label="Toggle dark mode"
            >
              {isDark ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
            </button>

            {/* Sound Toggle for Mobile Drawer */}
            <button
              onClick={handleMuteToggle}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/40 text-accent transition-all duration-300 border border-accent/15"
              aria-label="Toggle sound"
            >
              {isMuted ? <FaVolumeXmark className="text-base" /> : <FaVolumeHigh className="text-base" />}
            </button>

            {/* Language Switcher for Mobile */}
            <button
              onClick={() => {
                soundManager.playClick();
                toggleLanguage();
                setIsOpen(false);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="h-10 px-4 rounded-full flex items-center justify-center border border-accent/40 text-xs font-semibold bg-transparent hover:bg-accent/10 text-accent transition-all duration-300 min-w-[100px]"
            >
              {language === "uz" ? "English" : "O'zbekcha"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

