"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/utils/scroll";
import SocialLinks from "./SocialLinks";
import { FaArrowRight } from "react-icons/fa6";

export default function Hero() {
  const { t } = useLanguage();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <section id="home" className="pb-20 pt-32 md:pb-28 md:pt-44">
      <div className="page-container grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          <p className="mb-4 text-sm font-medium text-accent">{t.hero.role}</p>
          <h1 className="font-playfair text-5xl font-semibold leading-[1.1] text-light md:text-6xl">
            Og&apos;abek Olimjonov
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-light/70">{t.hero.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="btn btn-primary">
              {t.hero.talk}
              <FaArrowRight className="text-xs" aria-hidden="true" />
            </a>
            <a href="#projects" onClick={(e) => handleScrollTo(e, "#projects")} className="btn btn-ghost">
              {t.hero.work}
            </a>
          </div>

          <SocialLinks className="-ml-2 mt-8" />
        </div>

        <Image
          src="/img/Portrait of Michael Mando in a Black Suit Jacket.png"
          alt="Og'abek Olimjonov"
          width={288}
          height={288}
          priority
          sizes="(max-width: 768px) 160px, 288px"
          className="order-first aspect-square w-40 rounded-2xl object-cover md:order-last md:w-72"
        />
      </div>
    </section>
  );
}
