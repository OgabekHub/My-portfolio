"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  const groups = [
    { title: t.skills.frontend, items: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind"] },
    { title: t.skills.design, items: ["Figma", "Responsive", "UI/UX", "Animations", "Wireframing"] },
    { title: t.skills.tools, items: ["Git", "GitHub", "NPM", "CLI", "Netlify", "Vercel"] },
  ];

  return (
    <section id="skills" className="section">
      <div className="page-container reveal">
        <h2 className="section-title">{t.skills.title}</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
