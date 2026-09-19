"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AiCommandCenter from "@/components/AiCommandCenter";
import { FaArrowUp } from "react-icons/fa6";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // .reveal elementlari ko'rinishga kirganda bir marta yumshoq paydo bo'ladi.
  // threshold 0: element qanchalik baland bo'lmasin, bir pikseli kirishi yetarli.
  // (0.1 bo'lganda viewport'dan 10 barobar baland Projects bloki qisqa yoki
  // kattalashtirilgan oynada hech qachon "visible" bo'lmay, bo'sh qolardi.)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <AiCommandCenter />

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="icon-btn animate-fadeIn fixed bottom-6 right-6 z-40 border border-light/15 bg-primary/80 backdrop-blur"
          title="Go to top"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
