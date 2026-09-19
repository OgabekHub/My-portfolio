"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <div className="page-container reveal">
        <h2 className="section-title">{t.about.title}</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-light/80">{t.about.intro}</p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.about.interestsTitle}
            </h3>
            <ul className="space-y-1.5 text-light/80">
              {t.about.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.about.goalsTitle}
            </h3>
            <p className="leading-relaxed text-light/80">{t.about.goalsDesc}</p>
          </div>
        </div>

        <a
          href="https://olimjonov-ogabek-resume.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost mt-12"
        >
          {t.about.viewResume}
          <FaArrowUpRightFromSquare className="text-xs" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
