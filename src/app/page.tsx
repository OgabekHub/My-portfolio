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
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setScrollProgress(scrolled);
      }

      // Show/hide back to top button
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
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

    // Query elements to observe
    const observedElements = document.querySelectorAll(
      "section, .about-image-container, .about-card, .about-goals, .skill-card, .project-card, .contact-info, .contact-form, footer"
    );

    observedElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
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

      <SplashScreen />
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

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-[20px] right-[20px] md:bottom-[30px] md:right-[30px] w-[50px] h-[50px] rounded-full bg-accent text-primary flex items-center justify-center text-lg cursor-pointer transition-all duration-300 z-[999] border-none shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:translate-y-[-5px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
        style={{
          display: showBackToTop ? "flex" : "none",
          opacity: showBackToTop ? 1 : 0,
        }}
        title="Go to top"
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
