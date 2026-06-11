"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";

export default function Footer() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { t } = useLanguage();

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
    <footer className="bg-primary py-16 border-t border-light/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Description Column */}
          <div className="col-span-1">
            <div
              className={`logo-container mb-6 ${isLogoHovered ? "logo-active" : ""}`}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <a
                href="#home"
                onClick={(e) => handleScrollTo(e, "#home")}
                className="flex items-center space-x-2"
              >
                <div className="logo-circle">
                  <svg className="face-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logoBgFooter" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#020617" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                      <linearGradient id="logoRingFooter" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f8f5ec" />
                        <stop offset="45%" stopColor="#c8a164" />
                        <stop offset="100%" stopColor="#8b6b34" />
                      </linearGradient>
                    </defs>

                    {/* Dark background */}
                    <circle cx="40" cy="40" r="38" fill="url(#logoBgFooter)" />

                    {/* Outer border ring */}
                    <circle cx="40" cy="40" r="37" fill="none" stroke="url(#logoRingFooter)" strokeWidth="1.5" opacity="0.5" />

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
                    <circle cx="28.5" cy="40" r="8.5" fill="none" stroke="url(#logoRingFooter)" strokeWidth="4" />

                    {/* Center dot separator */}
                    <circle cx="40.5" cy="40" r="1.8" fill="url(#logoRingFooter)" />

                    {/* Right O: Fine stroke with top-right cut representing apostrophe */}
                    <path d="M 54.4 32.0 A 8.5 8.5 0 1 1 59.5 37.1" fill="none" stroke="url(#logoRingFooter)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="logo-details opacity-0 transition-all duration-500">
                  <span className="text-accent font-playfair tracking-wide">Og&apos;abek</span>
                  <span className="text-light font-playfair text-sm opacity-80">Olimjonov</span>
                </div>
              </a>
            </div>
            <p className="text-light/70 text-sm leading-relaxed mb-8">
              {t.footer.desc}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/OgabekHub"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="footer-social-link"
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
                className="footer-social-link"
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
                className="footer-social-link"
                aria-label="Telegram"
              >
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="footer-title">{t.footer.quickLinks}</h3>
            <ul className="footer-links font-poppins">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    soundManager.playClick();
                    handleScrollTo(e, "#home");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  aria-label="Home"
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    soundManager.playClick();
                    handleScrollTo(e, "#about");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  aria-label="About"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={(e) => {
                    soundManager.playClick();
                    handleScrollTo(e, "#skills");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  aria-label="Skills"
                >
                  {t.nav.skills}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => {
                    soundManager.playClick();
                    handleScrollTo(e, "#projects");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  aria-label="Projects"
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    soundManager.playClick();
                    handleScrollTo(e, "#contact");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  aria-label="Contact"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="footer-title">{t.footer.info}</h3>
            <ul className="footer-contact font-poppins">
              <li>
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <span className="text-sm">olimjonov.ogabek.dev@gmail.com</span>
              </li>
              <li>
                <i className="fas fa-phone" aria-hidden="true"></i>
                <span className="text-sm">+998 97 064 04 24</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span className="text-sm">Namangan, Uzbekistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-light/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-light/50">
              &copy; {new Date().getFullYear()} Og&apos;abek Olimjonov. {t.footer.rights}
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-light/50">
                {t.footer.madeWith} <i className="fas fa-heart text-accent" aria-hidden="true"></i> by Og&apos;abek
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
