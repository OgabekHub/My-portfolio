"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";
import { scrollToSection } from "@/utils/scroll";
import { NAV_LINKS } from "@/data/navLinks";
import dynamic from "next/dynamic";
import { FaEnvelope, FaGithub, FaHeart, FaLinkedin, FaLocationDot, FaPhone, FaTelegram } from "react-icons/fa6";

const BlobLogo = dynamic(() => import("./BlobLogo"), { ssr: false });

export default function Footer() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { t } = useLanguage();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId);
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
                <div className="w-[56px] h-[56px] flex items-center justify-center flex-shrink-0 relative">
                  <BlobLogo size={56} />
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
                <FaGithub />
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
                <FaLinkedin />
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
                <FaTelegram />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="footer-title">{t.footer.quickLinks}</h3>
            <ul className="footer-links font-poppins">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      soundManager.playClick();
                      handleScrollTo(e, link.href);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="footer-title">{t.footer.info}</h3>
            <ul className="footer-contact font-poppins">
              <li>
                <FaEnvelope aria-hidden="true" />
                <span className="text-sm">olimjonov.ogabek.dev@gmail.com</span>
              </li>
              <li>
                <FaPhone aria-hidden="true" />
                <span className="text-sm">+998 97 064 04 24</span>
              </li>
              <li>
                <FaLocationDot aria-hidden="true" />
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
                {t.footer.madeWith} <FaHeart className="text-accent" aria-hidden="true" /> by Og&apos;abek
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

