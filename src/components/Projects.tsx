"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  // Local assets data mapped by project id
  const projectsData = [
    {
      id: 1,
      image: "/img/portfolio card.jpg",
      github: "https://github.com/OgabekHub",
      demo: "https://my-portfolio-card.netlify.app/",
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
  ];

  // Combine translations items with asset links
  const combinedProjects = t.projects.items.map((item) => {
    const data = projectsData.find((d) => d.id === item.id) || {
      image: "",
      github: "",
      demo: "",
    };
    return {
      ...item,
      ...data,
    };
  });

  // Filter projects based on selected category tag
  const filteredProjects = combinedProjects.filter((project) => {
    if (filter === "all") return true;
    return project.tags.includes(filter);
  });

  return (
    <section id="projects" className="py-20 bg-primary/40 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-center mb-6">
          {t.projects.title.split(" ")[0]}{" "}
          <span className="text-accent">
            {t.projects.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>

        {/* Filter Tab Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-16 mt-8">
          {[
            { id: "all", label: t.projects.all },
            { id: "react", label: t.projects.react },
            { id: "vanilla", label: t.projects.vanilla },
            { id: "design", label: t.projects.design },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(btn.id);
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

        {/* Projects Grid with fade/scale transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-secondary border border-accent/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-accent/40 transition-all duration-500 ease-in-out transform hover:-translate-y-2"
            >
              <div className="project-image relative overflow-hidden group aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <i className="fab fa-github text-xl"></i>
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
                    <i className="fas fa-external-link-alt text-lg"></i>
                  </a>
                </div>
              </div>

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
                      className="px-3 py-1 rounded-md bg-primary/60 text-accent text-xs font-semibold border border-accent/10"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
