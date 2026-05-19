"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const words = t.hero.words;

  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
    <section id="home" className="hero min-h-screen flex items-center justify-center bg-primary relative overflow-hidden">
      {/* Animated background particles */}
      <div className="particles-container absolute inset-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="text-center m-auto md:text-center md:w-1/2">
            <div className="mb-4 text-accent font-medium tracking-wider animate-fadeIn">
              {t.hero.role}
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-light hero-title leading-tight">
              <span className="text-accent animate-slideRight">{t.hero.hello}</span>
              <br />
              <span className="animate-slideLeft">{t.hero.im}</span>
              <br />
              <span className="animate-slideRight">{t.hero.surname}</span>
            </h1>
            <p className="text-lg md:text-xl font-poppins text-light/80 mb-8 animate-fadeIn h-[32px]">
              <span className="typing-text">{currentText}</span>
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fadeIn">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="hero-btn primary"
              >
                <span>{t.hero.talk}</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "#projects")}
                className="hero-btn secondary"
              >
                <span>{t.hero.work}</span>
                <i className="fas fa-project-diagram ml-2"></i>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 flex justify-center space-x-4 animate-fadeIn">
              <a
                href="https://github.com/OgabekHub"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/og-abek-olimjonov-2a52b3364?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZCdpoYM8SXiYquzPfhXTIg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://t.me/olimjonov_ogabek"
                target="_blank"
                rel="noopener noreferrer"
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
              <img
                src="/img/Portrait of Michael Mando in a Black Suit Jacket.png"
                alt="Og'abek Olimjonov"
                className="hero-image animate-fadeIn"
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
