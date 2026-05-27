"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<"badges" | "progress">("badges");

  const skillCategories = [
    {
      title: t.skills.frontend,
      icon: "fa-code",
      badges: [
        { name: "HTML5", icon: "fab fa-html5", level: 95 },
        { name: "CSS3", icon: "fab fa-css3-alt", level: 90 },
        { name: "JavaScript", icon: "fab fa-js", level: 85 },
        { name: "React.js", icon: "fab fa-react", level: 80 },
        { name: "Tailwind", icon: "fas fa-wind", level: 90 },
      ],
    },
    {
      title: t.skills.design,
      icon: "fa-palette",
      badges: [
        { name: "Figma", icon: "fas fa-pen-nib", level: 85 },
        { name: "Responsive", icon: "fas fa-mobile-alt", level: 95 },
        { name: "UI/UX", icon: "fas fa-eye", level: 80 },
        { name: "Animations", icon: "fas fa-film", level: 75 },
        { name: "Wireframing", icon: "fas fa-object-group", level: 75 },
      ],
    },
    {
      title: t.skills.tools,
      icon: "fa-tools",
      badges: [
        { name: "Git", icon: "fab fa-git-alt", level: 85 },
        { name: "GitHub", icon: "fab fa-github", level: 85 },
        { name: "NPM", icon: "fab fa-npm", level: 80 },
        { name: "CLI", icon: "fas fa-terminal", level: 75 },
        { name: "Netlify", icon: "fas fa-server", level: 80 },
        { name: "Vercel", icon: "custom-vercel", level: 85 },
      ],
    },
  ];

  // Helper to render FontAwesome icons or custom SVGs (like Vercel)
  const renderIcon = (icon: string, customClass?: string) => {
    if (icon === "custom-vercel") {
      return (
        <svg
          viewBox="0 0 116 100"
          fill="currentColor"
          className={customClass || "w-3.5 h-3 text-accent inline-block mr-1.5"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0Z" />
        </svg>
      );
    }
    return <i className={`${icon} ${customClass || ""}`}></i>;
  };

  return (
    <section id="skills" className="py-20 bg-secondary relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-center mb-6">
          {t.skills.title.split(" ")[0]}{" "}
          <span className="text-accent">
            {t.skills.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>

        {/* View Mode Toggle Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-primary/50 border border-accent/15 p-1 rounded-full flex items-center shadow-inner">
            <button
              onClick={() => setViewMode("badges")}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                viewMode === "badges"
                  ? "bg-accent text-primary shadow-md"
                  : "text-light/70 hover:text-accent"
              }`}
            >
              {t.skills.badgesView}
            </button>
            <button
              onClick={() => setViewMode("progress")}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                viewMode === "progress"
                  ? "bg-accent text-primary shadow-md"
                  : "text-light/70 hover:text-accent"
              }`}
            >
              {t.skills.progressView}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-card">
              <div className="skill-icon">
                <i className={`fas ${category.icon}`}></i>
              </div>
              <h3 className="skill-title">{category.title}</h3>
              
              {viewMode === "badges" ? (
                /* Badges view */
                <div className="tech-badges">
                  {category.badges.map((badge, bIdx) => (
                    <span key={bIdx} className="tech-badge flex items-center">
                      {renderIcon(badge.icon)}
                      <span>{badge.name}</span>
                    </span>
                  ))}
                </div>
              ) : (
                /* Animated progress bars view */
                <div className="skill-items">
                  {category.badges.map((badge, bIdx) => (
                    <div key={bIdx} className="skill-item">
                      <div className="skill-info">
                        <span className="flex items-center gap-2">
                          {renderIcon(badge.icon, "text-accent text-sm w-4 flex justify-center items-center")}
                          {badge.name}
                        </span>
                        <span className="skill-percentage">{badge.level}%</span>
                      </div>
                      <div className="skill-progress bg-primary/40 border border-accent/5">
                        <div
                          className="progress"
                          style={{ width: `${badge.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
