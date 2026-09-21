"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "./SectionHeading";
import type { IconType } from "react-icons";
import { FaCode, FaCss3Alt, FaEye, FaFilm, FaGitAlt, FaGithub, FaHtml5, FaJs, FaMobileScreenButton, FaNpm, FaObjectGroup, FaPalette, FaPenNib, FaReact, FaScrewdriverWrench, FaServer, FaTerminal, FaWind } from "react-icons/fa6";

/**
 * Vercel logosi react-icons'da yo'q — inline SVG sifatida qoladi.
 * O'lchami react-icons kabi 1em: badge ichida boshqa ikonkalar bilan bir xil.
 */
function VercelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 116 100"
      width="1em"
      height="1em"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
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
    <section id="skills" className="section-block relative">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.skills.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-card surface-card">
              <div className="card-head">
                <div className="skill-icon">
                  <category.Icon />
                </div>
                <h3 className="skill-title">{category.title}</h3>
              </div>

              <div className="tech-badges">
                {category.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="tech-badge sketch-hover"
                  >
                    <badge.Icon aria-hidden="true" />
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
