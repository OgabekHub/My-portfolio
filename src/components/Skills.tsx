"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";
import type { IconType } from "react-icons";
import { FaCode, FaCss3Alt, FaEye, FaFilm, FaGitAlt, FaGithub, FaHtml5, FaJs, FaMobileScreenButton, FaNpm, FaObjectGroup, FaPalette, FaPenNib, FaReact, FaScrewdriverWrench, FaServer, FaTerminal, FaWind } from "react-icons/fa6";

/** Vercel logosi react-icons'da yo'q — inline SVG sifatida qoladi. */
function VercelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 116 100"
      fill="currentColor"
      className={className || "w-3.5 h-3 text-accent inline-block mr-1.5"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0Z" />
    </svg>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  const skillCategories: {
    title: string;
    Icon: IconType;
    badges: { name: string; Icon: IconType }[];
  }[] = [
    {
      title: t.skills.frontend,
      Icon: FaCode,
      badges: [
        { name: "HTML5", Icon: FaHtml5 },
        { name: "CSS3", Icon: FaCss3Alt },
        { name: "JavaScript", Icon: FaJs },
        { name: "React.js", Icon: FaReact },
        { name: "Tailwind", Icon: FaWind },
      ],
    },
    {
      title: t.skills.design,
      Icon: FaPalette,
      badges: [
        { name: "Figma", Icon: FaPenNib },
        { name: "Responsive", Icon: FaMobileScreenButton },
        { name: "UI/UX", Icon: FaEye },
        { name: "Animations", Icon: FaFilm },
        { name: "Wireframing", Icon: FaObjectGroup },
      ],
    },
    {
      title: t.skills.tools,
      Icon: FaScrewdriverWrench,
      badges: [
        { name: "Git", Icon: FaGitAlt },
        { name: "GitHub", Icon: FaGithub },
        { name: "NPM", Icon: FaNpm },
        { name: "CLI", Icon: FaTerminal },
        { name: "Netlify", Icon: FaServer },
        { name: "Vercel", Icon: VercelIcon },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-secondary relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-center mb-16">
          {t.skills.title.split(" ")[0]}{" "}
          <span className="text-accent">
            {t.skills.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-card sketch-hover">
              <div className="skill-icon">
                <category.Icon />
              </div>
              <h3 className="skill-title">{category.title}</h3>
              
              <div className="tech-badges">
                {category.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    onMouseEnter={() => soundManager.playHover()}
                    className="tech-badge flex items-center sketch-hover"
                  >
                    <badge.Icon className="mr-1.5" />
                    <span>{badge.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
