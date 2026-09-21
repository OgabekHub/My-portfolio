"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import { FaArrowRight, FaChevronDown, FaChevronUp, FaGithub, FaUpRightFromSquare } from "react-icons/fa6";

// Filtr tugmalari shu tartibda ko'rsatiladi (loyihada uchraydiganlari)
const FILTER_ORDER = ["nextjs", "react", "ai", "ecommerce", "landing"];

// --- 3D Tilt Card Sub-component ---
interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  role?: string;
  techs: string[];
  tags: string[];
  image: string;
  github: string;
  demo: string;
}

function TiltCard({
  project,
  caseHref,
  caseLabel,
  roleLabel,
}: {
  project: ProjectItem;
  caseHref?: string;
  caseLabel: string;
  roleLabel: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  // Tinch holatda soya inline berilmaydi — uni globals.css'dagi .surface-card
  // boshqaradi (qorong'i va yorug' temada har xil). Inline soya faqat og'ish
  // paytida, sichqonchaga ergashishi uchun kerak.
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  });

  const MAX_TILT = 12; // degrees

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateY = ((x - cx) / cx) * MAX_TILT;
    const rotateX = -((y - cy) / cy) * MAX_TILT;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
      transition: "transform 0.08s ease, box-shadow 0.08s ease",
      boxShadow: `${-rotateY * 0.8}px ${rotateX * 0.8}px 32px rgba(200,161,100,0.14), 0 16px 48px rgba(0,0,0,0.2)`,
    });

    // Glare follows mouse
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.10) 0%, transparent 65%)`;
      glare.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease",
    });
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card project-card surface-card visible relative flex flex-col"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className="tilt-glare"
        style={{ opacity: 0, background: "transparent" }}
      />

      {/* Image */}
      <div className="project-image relative overflow-hidden group aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="project-overlay absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center hover:bg-light hover:text-primary transition-all duration-300 shadow-md"
            aria-label="View on GitHub"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href={project.demo}
            target={project.demo.startsWith("#") ? "_self" : "_blank"}
            rel={project.demo.startsWith("#") ? "" : "noopener noreferrer"}
            className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center hover:bg-light hover:text-primary transition-all duration-300 shadow-md"
            aria-label="View live demo"
          >
            <FaUpRightFromSquare className="text-lg" />
          </a>
        </div>
      </div>

      {/* Content — texnologiyalar va havola pastga tekislanadi, shunda bir
          qatordagi kartalar matn uzunligidan qat'i nazar teng ko'rinadi */}
      <div className="project-content p-6 flex flex-col flex-1">
        <h3 className="project-title font-playfair mb-3">
          {project.title}
        </h3>
        <p className="project-description text-sm text-light/80 leading-relaxed mb-4">
          {project.desc}
        </p>
        {project.role && (
          <p className="project-role text-xs mb-5">
            <span className="text-accent/90">{roleLabel}:</span> {project.role}
          </p>
        )}
        <div className="mt-auto">
          <div className="project-tech">
            {project.techs.map((techItem, tIdx) => (
              <span key={tIdx} className="tech-chip sketch-hover">
                {techItem}
              </span>
            ))}
          </div>

          {/* Batafsil tahlil faqat case study yozilgan loyihalarda chiqadi */}
          {caseHref && (
            <a href={caseHref} className="case-link">
              {caseLabel}
              <FaArrowRight className="case-link-arrow" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main Projects Component ---
export default function Projects() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [showAll, setShowAll] = useState<boolean>(false);

  const INITIAL_COUNT = 3; // Boshlang'ich ko'rinadigan loyihalar soni

  // 💡 YANGI LOYIHA QO'SHISH UCHUN YO'RIQNOMA:
  // 1. Shu yerda yangi loyiha id, rasm (image) va linklarni (github, demo) qo'shing.
  // 2. keyin `src/data/translations.ts` faylidagi uz va en bo'limlaridagi projects -> items
  //    ichiga ham xuddi shunday id bilan nomi va ta'rifini qo'shib ketasiz!
  // Eslatma: teglar (tags) shu yerda turadi — ular tilga bog'liq emas.
  // Yangi teg qo'shsangiz, uni FILTER_ORDER ga va translations'dagi projects.filters ga ham qo'shing.
  const projectsData = PROJECTS;

  // Loyihalar ro'yxatini to'g'ri o'qish hamda tarjima berilmagan taqdirda ham hechnima yo'qolmasligini ta'minlash:
  const combinedProjects = projectsData.map((data) => {
    const item = t.projects.items.find((item) => item.id === data.id) || {
      id: data.id,
      title: `Project #${data.id}`,
      desc: "Loyiha haqida batafsil...",
      techs: ["Next.js", "Tailwind"],
    };
    // data oxirida turadi — teglar tarjimadan emas, projectsData'dan olinadi
    return { ...item, ...data };
  });

  const filteredProjects = combinedProjects.filter((project) => {
    if (filter === "all") return true;
    return project.tags?.includes(filter);
  });

  // Tugmalar ro'yxati loyihalardagi haqiqiy teglardan quriladi, shuning uchun
  // hech qachon 0 ta natija beruvchi filtr chiqmaydi.
  const usedTags = new Set(combinedProjects.flatMap((p) => p.tags ?? []));
  const filterButtons = [
    { id: "all", label: t.projects.all },
    ...FILTER_ORDER.filter((tag) => usedTags.has(tag)).map((tag) => ({
      id: tag,
      label: t.projects.filters[tag] ?? tag,
    })),
  ];

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="section-block relative">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.projects.title} />

        {/* Filter buttons — faqat haqiqatan loyihasi bor teglar ko'rsatiladi.
            Telefonda bitta qatorda gorizontal suriladi (uch qatorga o'ralmaydi). */}
        <div className="filter-bar" role="group" aria-label={t.nav.projects}>
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                setFilter(btn.id);
                setShowAll(false);
              }}
              aria-pressed={filter === btn.id}
              className={`filter-pill ${filter === btn.id ? "is-active" : ""}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D tilt */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <TiltCard
                key={project.id}
                project={project}
                caseLabel={t.projects.caseStudy}
                roleLabel={t.projects.roleLabel}
                caseHref={
                  project.caseSlug
                    ? language === "en"
                      ? `/en/case/${project.caseSlug}`
                      : `/loyiha/${project.caseSlug}`
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-light/60 py-16">{t.projects.empty}</p>
        )}

        {/* Show More / Show Less Button */}
        {filteredProjects.length > INITIAL_COUNT && (
          <div className="mt-14 flex justify-center animate-in fade-in duration-500">
            <button
              onClick={() => {
                setShowAll(!showAll);
              }}
              className="hero-btn secondary group flex items-center gap-2 cursor-pointer text-sm font-semibold transition-all duration-300 shadow-md"
            >
              <span>
                {showAll
                  ? t.projects.showLess
                  : `${t.projects.showMore} (+${filteredProjects.length - INITIAL_COUNT})`}
              </span>
              {showAll ? (
                <FaChevronUp className="text-xs transition-transform duration-300 group-hover:-translate-y-1" />
              ) : (
                <FaChevronDown className="text-xs transition-transform duration-300 group-hover:translate-y-1" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
