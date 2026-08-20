"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Timeline() {
  const { t } = useLanguage();

  const icons = [
    "fas fa-laptop-code",
    "fas fa-university",
    "fas fa-graduation-cap",
  ];

  return (
    <section id="experience" className="py-20 bg-primary/30 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-center mb-16">
          {t.about.timelineTitle.split(" ")[0]}{" "}
          <span className="text-accent">
            {t.about.timelineTitle.split(" ").slice(1).join(" ")}
          </span>
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-accent/20 md:-translate-x-[1px]" />

          {t.about.timeline.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-accent/15 border-2 border-accent flex items-center justify-center z-10 shadow-[0_0_20px_rgba(200,161,100,0.2)]">
                <i className={`${icons[idx] || "fas fa-circle"} text-accent text-sm`} />
              </div>

              {/* Content card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] bg-secondary/50 border border-accent/10 rounded-2xl p-6 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(200,161,100,0.1)] ${
                  idx % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                {/* Period badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3 border border-accent/15">
                  <i className="fas fa-calendar-alt text-[10px]" />
                  {item.period}
                </span>

                <h3 className="text-lg font-bold text-accent font-playfair mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-light/50 mb-3 flex items-center gap-1.5">
                  <i className="fas fa-map-marker-alt text-[10px]" />
                  {item.location}
                </p>

                <p className="text-sm text-light/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
