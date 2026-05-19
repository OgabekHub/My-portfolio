"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t.skills.frontend,
      icon: "fa-code",
      badges: [
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "React.js", icon: "fab fa-react" },
        { name: "Tailwind", icon: "fas fa-wind" },
      ],
    },
    {
      title: t.skills.design,
      icon: "fa-palette",
      badges: [
        { name: "Figma", icon: "fas fa-pen-nib" },
        { name: "Responsive", icon: "fas fa-mobile-alt" },
        { name: "UI/UX", icon: "fas fa-eye" },
        { name: "Animations", icon: "fas fa-film" },
        { name: "Wireframing", icon: "fas fa-object-group" },
      ],
    },
    {
      title: t.skills.tools,
      icon: "fa-tools",
      badges: [
        { name: "Git", icon: "fab fa-git-alt" },
        { name: "GitHub", icon: "fab fa-github" },
        { name: "NPM", icon: "fab fa-npm" },
        { name: "CLI", icon: "fas fa-terminal" },
        { name: "Netlify", icon: "fas fa-server" },
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
            <div key={idx} className="skill-card">
              <div className="skill-icon">
                <i className={`fas ${category.icon}`}></i>
              </div>
              <h3 className="skill-title">{category.title}</h3>
              <div className="tech-badges">
                {category.badges.map((badge, bIdx) => (
                  <span key={bIdx} className="tech-badge">
                    <i className={badge.icon}></i> {badge.name}
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
