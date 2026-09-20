import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCaseStudy } from "@/data/caseStudies";
import type { Language } from "@/data/translations";
import { FaArrowLeft, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";

const LABELS = {
  uz: {
    back: "Barcha loyihalar",
    role: "Mening rolim",
    period: "Davri",
    stack: "Texnologiyalar",
    live: "Jonli sayt",
    code: "Kod",
  },
  en: {
    back: "All projects",
    role: "My role",
    period: "Period",
    stack: "Stack",
    live: "Live site",
    code: "Code",
  },
} as const;

export default function CaseStudyPage({
  locale,
  slug,
}: {
  locale: Language;
  slug: string;
}) {
  const study = getCaseStudy(locale, slug);
  if (!study) return null;

  const l = LABELS[locale];
  const home = locale === "en" ? "/en" : "/";

  return (
    <>
      <Navbar />

      <main className="pt-28 pb-20 bg-primary">
        <div className="container mx-auto px-4 max-w-4xl">
          <a
            href={`${home}#projects`}
            className="inline-flex items-center gap-2 text-sm text-light/60 hover:text-accent transition-colors mb-8"
          >
            <FaArrowLeft className="text-xs" />
            {l.back}
          </a>

          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-light mb-5 leading-tight">
            {study.title}
          </h1>
          <p className="text-lg md:text-xl text-light/80 leading-relaxed mb-10 max-w-3xl">
            {study.summary}
          </p>

          {/* Rol va davr — ish beruvchi birinchi navbatda shuni qidiradi */}
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 pb-10 border-b border-accent/15">
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wider text-accent mb-2">{l.role}</dt>
              <dd className="text-light/90 text-sm leading-relaxed">{study.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-accent mb-2">{l.period}</dt>
              <dd className="text-light/90 text-sm">{study.period}</dd>
            </div>
          </dl>

          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-accent/15 mb-12">
            <Image
              src={study.image}
              alt={study.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Tekshirsa bo'ladigan raqamlar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-14 p-6 rounded-2xl bg-secondary/40 border border-accent/15">
            {study.facts.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-4 text-sm">
                <span className="text-light/60">{fact.label}</span>
                <span className="text-light/95 text-right font-medium">{fact.value}</span>
              </div>
            ))}
          </div>

          <article className="space-y-12">
            {study.sections.map((section) => (
              // globals.css'da `section { opacity: 0 }` bor va uni bosh
              // sahifadagi IntersectionObserver ochadi. Bu sahifada u observer
              // ishlamaydi, shuning uchun `visible` darhol qo'yiladi; `py-0`
              // esa global bo'lim paddingini bekor qiladi.
              <section key={section.heading} className="visible py-0">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-accent mb-5">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="text-light/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <div className="mt-14 pt-10 border-t border-accent/15">
            <h2 className="text-xs uppercase tracking-wider text-accent mb-4">{l.stack}</h2>
            <ul className="flex flex-wrap gap-2 mb-10">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary/60 border border-accent/15 text-light/85"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-light transition-colors"
              >
                {l.live}
                <FaArrowUpRightFromSquare className="text-xs" />
              </a>
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-accent/40 text-accent font-semibold text-sm hover:bg-accent/10 hover:border-accent transition-colors"
              >
                <FaGithub />
                {l.code}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
