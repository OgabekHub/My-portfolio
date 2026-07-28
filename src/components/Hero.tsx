"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import InteractiveParticles from "./InteractiveParticles";
import { soundManager } from "@/utils/sound";

/* -- Magnetic Button Wrapper -- */
function MagneticBtn({ children, className }: { children: React.ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const STRENGTH = 0.38;
  const RADIUS = 80;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el || window.innerWidth < 1024) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < RADIUS) {
      const force = (RADIUS - dist) / RADIUS;
      el.style.transform = `translate(${dx * STRENGTH * force}px, ${dy * STRENGTH * force}px)`;
    }
  };

  const handleMouseLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.55s cubic-bezier(0.16,1,0.3,1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 550);
  };

  return (
    <div
      ref={wrapRef}
      className={`magnetic-wrap ${className || ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const words = t.hero.words;

  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Refs
  const heroRef = useRef<HTMLElement>(null);

  // Reset typewriter when words array changes (language toggle)
  useEffect(() => {
    setWordIndex(0);
    setCurrentText("");
    setIsDeleting(false);
  }, [words]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex];

    const handleTyping = () => {
      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }
    };

    const speed = isDeleting ? 75 : 150;
    timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words]);



  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 80;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={heroRef} id="home" className="hero min-h-screen flex items-center justify-center bg-primary relative overflow-hidden">
      {/* Animated background particles */}
      <InteractiveParticles />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="text-center m-auto md:text-center md:w-1/2">
            <div className="mb-6 animate-fadeIn inline-block">
              <span className="sketch-box px-5 py-1.5 bg-primary/70 text-accent font-mono text-sm tracking-wider inline-flex items-center gap-2">
                <i className="fas fa-terminal text-xs"></i>
                {t.hero.role}
                <span className="text-xs text-accent/80">✏️</span>
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-light hero-title leading-tight">
              <span className="text-accent animate-slideRight">{t.hero.hello}</span>
              <br />
              <span className="animate-slideLeft">{t.hero.im}</span>
              <br />
              <span className="animate-slideRight relative inline-block">
                {t.hero.surname}
                {/* Hand-sketched SVG underline */}
                <svg
                  className="w-full h-4 text-accent mt-1 sketch-underline-svg overflow-visible block"
                  viewBox="0 0 300 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 5 12 Q 75 4, 150 12 T 295 10"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 25 18 Q 140 10, 260 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.7"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl font-poppins text-light/80 mb-8 animate-fadeIn h-[32px]">
              <span className="typing-text">{currentText}</span>
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fadeIn">
              <MagneticBtn>
                <a
                  href="#contact"
                  onClick={(e) => {
                    soundManager.playClick();
                    handleScrollTo(e, "#contact");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="hero-btn primary sketch-hover"
                >
                  <span>{t.hero.talk}</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </MagneticBtn>
              <MagneticBtn>
                <a
                  href="#projects"
                  onClick={(e) => {
                    soundManager.playClick();
                    handleScrollTo(e, "#projects");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="hero-btn secondary sketch-hover"
                >
                  <span>{t.hero.work}</span>
                  <i className="fas fa-project-diagram ml-2"></i>
                </a>
              </MagneticBtn>
            </div>

            {/* Developer Architecture Annotation */}
            <div className="mt-5 animate-fadeIn flex items-center justify-center">
              <span className="sketch-note">
                {"/* "}<i className="fas fa-code text-accent mr-1"></i> Architecting modern high-performance web systems{" */"}
              </span>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 flex justify-center space-x-4 animate-fadeIn">
              <a
                href="https://github.com/OgabekHub"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/og-abek-olimjonov-2a52b3364?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZCdpoYM8SXiYquzPfhXTIg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://t.me/olimjonov_ogabek"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="social-link"
                aria-label="Telegram"
              >
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="hero-image-container">
              <Image
                src="/img/Portrait of Michael Mando in a Black Suit Jacket.png"
                alt="Og'abek Olimjonov"
                className="hero-image animate-fadeIn"
                width={500}
                height={500}
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} aria-label="Scroll to About section">
          <i className="fas fa-chevron-down text-accent text-2xl cursor-pointer"></i>
        </a>
      </div>
    </section>
  );
}
