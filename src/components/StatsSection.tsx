"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function StatsSection() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    {
      icon: "fas fa-calendar-alt",
      target: 2,
      suffix: "+",
      labelUz: "Yil Tajriba",
      labelEn: "Years Experience",
    },
    {
      icon: "fas fa-folder-open",
      target: 5,
      suffix: "+",
      labelUz: "Loyihalar",
      labelEn: "Projects Built",
    },
    {
      icon: "fas fa-layer-group",
      target: 15,
      suffix: "+",
      labelUz: "Texnologiyalar",
      labelEn: "Technologies",
    },
    {
      icon: "fas fa-award",
      target: 100,
      suffix: "%",
      labelUz: "Mas'uliyat",
      labelEn: "Dedication",
    },
  ];

  // Start counting when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Animate counters with easeOut
  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2200;
    const targets = stats.map((s) => s.target);
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(targets.map((t) => Math.round(eased * t)));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="stats-section py-16 relative overflow-hidden"
    >
      <div className="stats-bg-lines" aria-hidden="true" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon-wrap">
                <i className={`${stat.icon} stat-icon`} aria-hidden="true" />
              </div>

              <div className="stat-number">
                <span className="stat-count">{counts[idx]}</span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>

              <p className="stat-label">
                {language === "uz" ? stat.labelUz : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
