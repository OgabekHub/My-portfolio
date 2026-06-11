"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-primary/30 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-center mb-16">
          {t.about.title.split(" ")[0]}{" "}
          <span className="text-accent">
            {t.about.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center">
            <div className="about-image-container">
              <Image
                src="/img/Portrait of Michael Mando in a Black Suit Jacket.png"
                alt="Og'abek Olimjonov"
                className="about-image"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
              <div className="about-image-overlay"></div>
            </div>
          </div>

          {/* About Content */}
          <div className="md:w-2/3">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-light/90">
                {t.about.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills Card */}
                <div className="about-card bg-secondary/40 border border-accent/15 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="about-card-icon text-accent text-2xl mb-4">
                    <i className="fas fa-code"></i>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-3">{t.about.coreSkillsTitle}</h3>
                  <ul className="list-disc list-inside space-y-2 text-light/80 text-sm">
                    {t.about.coreSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>

                {/* Interests Card */}
                <div className="about-card bg-secondary/40 border border-accent/15 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="about-card-icon text-accent text-2xl mb-4">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-3">{t.about.interestsTitle}</h3>
                  <ul className="list-disc list-inside space-y-2 text-light/80 text-sm">
                    {t.about.interests.map((interest, index) => (
                      <li key={index}>{interest}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Goals Banner */}
              <div className="about-goals bg-secondary/35 border border-accent/15 p-6 rounded-2xl flex items-start gap-4">
                <div className="about-goals-icon text-accent text-3xl mt-1">
                  <i className="fas fa-bullseye"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-2">{t.about.goalsTitle}</h3>
                  <p className="text-light/80 text-sm leading-relaxed">
                    {t.about.goalsDesc}
                  </p>
                </div>
              </div>

              {/* Resume Button */}
              <div className="mt-8">
                <a
                  href="https://olimjonov-ogabek-resume.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-download-btn inline-flex items-center gap-2"
                  id="about-resume-btn"
                >
                  <i className="fas fa-file-pdf"></i>
                  <span>{t.about.viewResume}</span>
                  <i className="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
