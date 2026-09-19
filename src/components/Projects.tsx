"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";

// Yangi loyiha qo'shish:
// 1. Shu ro'yxatga id, rasm va havolalarni qo'shing.
// 2. src/data/translations.ts dagi uz va en -> projects.items ga xuddi shu id bilan
//    nomi, ta'rifi va texnologiyalarini qo'shing.
const PROJECTS = [
  {
    id: 1,
    image: "/img/devcommons.png",
    github: "https://github.com/OgabekHub/devcommons",
    demo: "https://devcommons.vercel.app/",
  },
  {
    id: 2,
    image: "/img/agrovision.png",
    github: "https://github.com/OgabekHub",
    demo: "https://agro-vision-ai-zeta.vercel.app/",
  },
  {
    id: 3,
    image: "/img/faxrmebel.png",
    github: "https://github.com/OgabekHub",
    demo: "https://faxr-mebel.vercel.app/",
  },
  {
    id: 4,
    image: "/img/zetrastore.png",
    github: "https://github.com/OgabekHub/zetra-store",
    demo: "https://zetra-store-one.vercel.app/",
  },
  {
    id: 5,
    image: "/img/nexusdevs.png",
    github: "https://github.com/OgabekHub/nexusdevs",
    demo: "https://nexusdevs-xi.vercel.app/",
  },
];

export default function Projects() {
  const { t } = useLanguage();

  // Tarjima topilmasa ham loyiha yo'qolib qolmasin
  const projects = PROJECTS.map((project) => ({
    title: `Project #${project.id}`,
    desc: "",
    techs: [] as string[],
    ...t.projects.items.find((item) => item.id === project.id),
    ...project,
  }));

  return (
    <section id="projects" className="section">
      <div className="page-container reveal">
        <h2 className="section-title">{t.projects.title}</h2>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id}>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl border border-light/10 transition-opacity hover:opacity-90"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={project.image}
                  alt=""
                  width={960}
                  height={540}
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="aspect-video w-full object-cover object-top"
                />
              </a>

              <h3 className="mt-5 font-playfair text-xl font-semibold text-light">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-light/70">{project.desc}</p>
              <p className="mt-3 text-xs text-muted">{project.techs.join(" · ")}</p>

              <div className="mt-4 flex items-center gap-5 text-sm font-medium">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1.5"
                >
                  {t.projects.liveDemo}
                  <FaArrowUpRightFromSquare className="text-[10px]" aria-hidden="true" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-light"
                >
                  <FaGithub aria-hidden="true" />
                  {t.projects.gitHub}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
