"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";

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

    if (targetId === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 80; // Navbar height
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
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
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center space-x-2"
          >
            <div className="logo-circle">
              <svg className="face-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoBg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#020617" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="logoRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f8f5ec" />
                    <stop offset="45%" stopColor="#c8a164" />
                    <stop offset="100%" stopColor="#8b6b34" />
                  </linearGradient>
                </defs>

                {/* Dark background */}
                <circle cx="40" cy="40" r="38" fill="url(#logoBg)" />

                {/* Outer border ring */}
                <circle cx="40" cy="40" r="37" fill="none" stroke="url(#logoRing)" strokeWidth="1.5" opacity="0.5" />

                {/* Inner decorative dashed ring */}
                <circle
                  cx="40" cy="40" r="29"
                  fill="none"
                  stroke="rgba(200,161,100,0.18)"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                  strokeLinecap="round"
                />

                {/* OO Monogram (Konsept A) */}
                {/* Left O: Bold, solid representation */}
                <circle cx="28.5" cy="40" r="8.5" fill="none" stroke="url(#logoRing)" strokeWidth="4" />

                {/* Center dot separator */}
                <circle cx="40.5" cy="40" r="1.8" fill="url(#logoRing)" />

                {/* Right O: Fine stroke with top-right cut representing apostrophe */}
                <path d="M 54.4 32.0 A 8.5 8.5 0 1 1 59.5 37.1" fill="none" stroke="url(#logoRing)" strokeWidth="2" strokeLinecap="round" />
              </svg>
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
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  soundManager.playClick();
                  handleLinkClick(e, "#home");
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="nav-item nav-link"
              >
                {t.nav.home}
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  soundManager.playClick();
                  handleLinkClick(e, "#about");
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="nav-item nav-link"
              >
                {t.nav.about}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={(e) => {
                  soundManager.playClick();
                  handleLinkClick(e, "#skills");
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="nav-item nav-link"
              >
                {t.nav.skills}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  soundManager.playClick();
                  handleLinkClick(e, "#projects");
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="nav-item nav-link"
              >
                {t.nav.projects}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  soundManager.playClick();
                  handleLinkClick(e, "#contact");
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="nav-item nav-link"
              >
                {t.nav.contact}
              </a>
            </li>
          </ul>

          <div className="flex items-center space-x-4 border-l border-gray-600/30 pl-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={handleThemeToggle}
              onMouseEnter={() => soundManager.playHover()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/60 text-accent transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-lg`}></i>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleMuteToggle}
              onMouseEnter={() => soundManager.playHover()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/60 text-accent transition-all duration-300"
              aria-label="Toggle sound"
            >
              <i className={`fas ${isMuted ? "fa-volume-mute" : "fa-volume-up"} text-lg`}></i>
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
              <i className="fa-solid fa-wand-magic-sparkles text-lg text-accent group-hover:scale-110 transition-all"></i>
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
            <i className="fa-solid fa-wand-magic-sparkles text-base text-accent"></i>
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
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav md:hidden ${isOpen ? "active" : ""}`}>
        <ul className="flex flex-col items-center space-y-4 py-6 font-poppins">
          <li>
            <a
              href="#home"
              onClick={(e) => {
                soundManager.playClick();
                handleLinkClick(e, "#home");
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="nav-item text-lg"
            >
              {t.nav.home}
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                soundManager.playClick();
                handleLinkClick(e, "#about");
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="nav-item text-lg"
            >
              {t.nav.about}
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={(e) => {
                soundManager.playClick();
                handleLinkClick(e, "#skills");
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="nav-item text-lg"
            >
              {t.nav.skills}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => {
                soundManager.playClick();
                handleLinkClick(e, "#projects");
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="nav-item text-lg"
            >
              {t.nav.projects}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                soundManager.playClick();
                handleLinkClick(e, "#contact");
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="nav-item text-lg"
            >
              {t.nav.contact}
            </a>
          </li>

          <li className="pt-4 border-t border-gray-600/20 w-[80%] flex items-center justify-center space-x-4 pb-2">
            {/* Dark Mode Toggle for Mobile Drawer */}
            <button
              onClick={handleThemeToggle}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/40 text-accent transition-all duration-300 border border-accent/15"
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-base`}></i>
            </button>

            {/* Sound Toggle for Mobile Drawer */}
            <button
              onClick={handleMuteToggle}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 hover:bg-secondary/40 text-accent transition-all duration-300 border border-accent/15"
              aria-label="Toggle sound"
            >
              <i className={`fas ${isMuted ? "fa-volume-mute" : "fa-volume-up"} text-base`}></i>
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
