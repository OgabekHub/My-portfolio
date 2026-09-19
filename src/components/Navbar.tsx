"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/utils/scroll";
import { NAV_LINKS } from "@/data/navLinks";
import Logo from "./Logo";
import { FaBars, FaMoon, FaSun, FaWandMagicSparkles, FaXmark } from "react-icons/fa6";

const openCopilot = () => window.dispatchEvent(new CustomEvent("toggle-ai-copilot"));

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleThemeToggle = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(targetId);
  };

  const themeLabel =
    language === "uz"
      ? isDark ? "Yorug' rejim" : "Qorong'i rejim"
      : isDark ? "Light mode" : "Dark mode";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-light/10 bg-primary/85 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-3"
        >
          <Logo className="h-6" />
          <span className="font-playfair text-lg font-semibold text-light">Og&apos;abek</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-7 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-light/70 transition-colors hover:text-light"
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 border-l border-light/10 pl-4">
            <button onClick={handleThemeToggle} className="icon-btn" aria-label={themeLabel} title={themeLabel}>
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
            <button onClick={openCopilot} className="icon-btn" aria-label="AI Copilot" title="AI Copilot">
              <FaWandMagicSparkles />
            </button>
            <button
              onClick={toggleLanguage}
              className="icon-btn text-xs font-semibold"
              aria-label={language === "uz" ? "EN — Switch to English" : "UZ — O'zbek tiliga o'tish"}
            >
              {language === "uz" ? "EN" : "UZ"}
            </button>
          </div>
        </div>

        {/* Mobil */}
        <div className="flex items-center gap-1 md:hidden">
          <button onClick={openCopilot} className="icon-btn" aria-label="AI Copilot">
            <FaWandMagicSparkles />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="icon-btn"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`${isOpen ? "block" : "hidden"} border-t border-light/10 bg-primary md:hidden`}>
        <ul className="page-container py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block py-2.5 text-light/80 transition-colors hover:text-accent"
              >
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>
        <div className="page-container flex items-center gap-2 border-t border-light/10 py-3">
          <button onClick={handleThemeToggle} className="icon-btn" aria-label={themeLabel}>
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="btn btn-ghost px-3 py-1.5 text-xs"
          >
            {language === "uz" ? "English" : "O'zbekcha"}
          </button>
        </div>
      </div>
    </nav>
  );
}
