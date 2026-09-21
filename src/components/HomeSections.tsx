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
export default function HomeSections() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Update scroll progress bar
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const scrolled = (window.scrollY / totalHeight) * 100;
          setScrollProgress(scrolled);
        }

        // Show/hide back to top button
        setShowBackToTop(window.scrollY > 300);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Animate hero title spans
          if (entry.target.classList.contains("hero")) {
            const spans = entry.target.querySelectorAll(".hero-title span");
            spans.forEach((span) => span.classList.add("visible"));
          }
        }
      });
    }, observerOptions);

    // Cinematic stagger observer for project cards
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".project-card, .skill-card, .about-card");
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add("visible");
            }, i * 120);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    // Query elements to observe
    const observedElements = document.querySelectorAll(
      "section, .about-image-container, .about-card, .about-goals, .skill-card, .project-card, .contact-info, .contact-form, footer"
    );

    observedElements.forEach((el) => observer.observe(el));

    // Stagger containers
    const staggerContainers = document.querySelectorAll("#projects .grid, #skills .grid, #about .grid");
    staggerContainers.forEach((el) => staggerObserver.observe(el));

    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
    };
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>

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

      {/* Back to top button — telefonda kichikroq: 50px tugma karta matni va
          forma maydonlarini yopib qo'yardi */}
      <button
        onClick={scrollToTop}
        className="back-to-top fixed bottom-4 right-4 md:bottom-[30px] md:right-[30px] w-10 h-10 md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center text-base md:text-lg cursor-pointer z-[999] border-none"
        style={{
          display: showBackToTop ? "flex" : "none",
          opacity: showBackToTop ? 1 : 0,
        }}
        title="Go to top"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
}
