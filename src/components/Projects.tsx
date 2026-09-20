"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";
import { FaChevronDown, FaChevronUp, FaGithub, FaUpRightFromSquare } from "react-icons/fa6";

// Filtr tugmalari shu tartibda ko'rsatiladi (loyihada uchraydiganlari)
const FILTER_ORDER = ["nextjs", "react", "ai", "ecommerce", "landing"];

// --- 3D Tilt Card Sub-component ---
interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  techs: string[];
  tags: string[];
  image: string;
  github: string;
  demo: string;
}

function TiltCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
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
      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    });
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card project-card visible bg-secondary border border-accent/10 rounded-2xl overflow-hidden shadow-md hover:border-accent/40 relative animate-in fade-in duration-500"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hand-drawn sketchy dashed hover border */}
      <div className="sketch-card-border" />

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
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
            className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center hover:bg-light hover:text-primary transition-all duration-300 shadow-md"
            aria-label="View on GitHub"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href={project.demo}
            target={project.demo.startsWith("#") ? "_self" : "_blank"}
            rel={project.demo.startsWith("#") ? "" : "noopener noreferrer"}
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
            className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center hover:bg-light hover:text-primary transition-all duration-300 shadow-md"
            aria-label="View live demo"
          >
            <FaUpRightFromSquare className="text-lg" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="project-content p-6">
        <h3 className="project-title text-xl font-bold font-playfair text-accent mb-3">
          {project.title}
        </h3>
        <p className="project-description text-sm text-light/80 leading-relaxed mb-4">
          {project.desc}
        </p>
        <div className="project-tech flex flex-wrap gap-2">
          {project.techs.map((techItem, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 rounded-md bg-primary/60 text-accent text-xs font-semibold border border-accent/10 sketch-hover"
            >
              {techItem}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main Projects Component ---
export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [showAll, setShowAll] = useState<boolean>(false);

  const INITIAL_COUNT = 3; // Boshlang'ich ko'rinadigan loyihalar soni

  // 💡 YANGI LOYIHA QO'SHISH UCHUN YO'RIQNOMA:
  // 1. Shu yerda yangi loyiha id, rasm (image) va linklarni (github, demo) qo'shing.
  // 2. keyin `src/data/translations.ts` faylidagi uz va en bo'limlaridagi projects -> items
  //    ichiga ham xuddi shunday id bilan nomi va ta'rifini qo'shib ketasiz!
  // Eslatma: teglar (tags) shu yerda turadi — ular tilga bog'liq emas.
  // Yangi teg qo'shsangiz, uni FILTER_ORDER ga va translations'dagi projects.filters ga ham qo'shing.
  const projectsData = [
    {
      id: 1,
      image: "/img/devcommons.png",
      github: "https://github.com/OgabekHub/devcommons",
      demo: "https://devcommons.vercel.app/",
      tags: ["nextjs", "react"],
    },
    {
      id: 2,
      image: "/img/agrovision.png",
      github: "https://github.com/OgabekHub",
      demo: "https://agro-vision-ai-zeta.vercel.app/",
      tags: ["ai", "nextjs", "react"],
    },
    {
      id: 3,
      image: "/img/faxrmebel.png",
      github: "https://github.com/OgabekHub",
      demo: "https://faxr-mebel.vercel.app/",
      tags: ["react", "landing"],
    },
    {
      id: 4,
      image: "/img/zetrastore.png",
      github: "https://github.com/OgabekHub/zetra-store",
      demo: "https://zetra-store-one.vercel.app/",
      tags: ["ecommerce", "nextjs", "react"],
    },
    {
      id: 5,
      image: "/img/nexusdevs.png",
      github: "https://github.com/OgabekHub/nexusdevs",
      demo: "https://nexusdevs-xi.vercel.app/",
      tags: ["landing", "nextjs", "react"],
    },
  ];

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
    <section id="projects" className="py-20 bg-primary/40 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-center mb-6">
          {t.projects.title.split(" ")[0]}{" "}
          <span className="text-accent">
            {t.projects.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>

        {/* Filter buttons — faqat haqiqatan loyihasi bor teglar ko'rsatiladi */}
        <div className="flex justify-center flex-wrap gap-4 mb-16 mt-8">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(btn.id);
                setShowAll(false);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-300 ${
                filter === btn.id
                  ? "bg-accent border-accent text-primary shadow-lg shadow-accent/25"
                  : "bg-transparent border-accent/20 text-light/80 hover:border-accent hover:text-accent"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D tilt */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <TiltCard key={project.id} project={project} />
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
                soundManager.playClick();
                setShowAll(!showAll);
              }}
              onMouseEnter={() => soundManager.playHover()}
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
