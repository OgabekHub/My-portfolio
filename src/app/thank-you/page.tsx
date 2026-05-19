"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function ThankYouPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds <= 0) {
      router.push("/");
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, router]);

  return (
    <div className="relative min-h-screen bg-primary text-light flex flex-col items-center justify-center overflow-hidden font-poppins">
      {/* Background elements */}
      <div className="particles absolute inset-0 pointer-events-none"></div>
      <div className="orb orb-1 absolute w-[400px] h-[400px] rounded-full bg-accent filter blur-[80px] opacity-10 top-[-100px] right-[-100px] animate-pulse"></div>
      <div className="orb orb-2 absolute w-[300px] h-[300px] rounded-full bg-accent/70 filter blur-[80px] opacity-10 bottom-[-80px] left-[-80px] animate-pulse [animation-delay:3s]"></div>

      {/* Thank you card */}
      <div className="card relative z-10 bg-white/5 backdrop-blur-[16px] border border-accent/20 rounded-[28px] py-14 px-12 max-w-[520px] w-[90%] text-center shadow-[0_30px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(200,161,100,0.08)] animate-fadeIn">
        {/* Checkmark icon */}
        <div className="icon-wrap relative w-[90px] h-[90px] rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mx-auto mb-8 shadow-[0_8px_30px_rgba(200,161,100,0.4)]">
          <i className="fas fa-check text-primary text-[2.5rem]"></i>
        </div>

        <h1 className="font-playfair text-[2.2rem] font-bold mb-4 bg-gradient-to-r from-light via-light to-accent bg-clip-text text-transparent">
          {t.thankYou.title}
        </h1>
        
        <div className="divider w-[60px] h-[3px] bg-gradient-to-r from-accent to-accent/60 rounded-[2px] mx-auto mb-8"></div>
        
        <p className="text-light/80 text-base leading-relaxed mb-10">
          {t.thankYou.desc}
        </p>

        <p className="countdown text-xs text-light/40 mb-8">
          {t.thankYou.redirect} <span className="text-accent font-semibold">{seconds}</span> {t.thankYou.seconds}
        </p>

        {/* Buttons */}
        <div className="btn-group flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => router.push("/")}
            className="btn btn-primary bg-gradient-to-r from-accent to-accent/80 text-primary font-bold px-7 py-3 rounded-full shadow-[0_4px_18px_rgba(200,161,100,0.35)] hover:translate-y-[-3px] hover:shadow-[0_8px_28px_rgba(200,161,100,0.5)] transition-all flex items-center gap-2"
          >
            <i className="fas fa-home"></i>
            {t.thankYou.backBtn}
          </button>
          <button
            onClick={() => router.push("/#projects")}
            className="btn btn-secondary bg-transparent border-2 border-accent/40 text-accent font-bold px-7 py-3 rounded-full hover:bg-accent/10 hover:border-accent hover:translate-y-[-3px] transition-all flex items-center gap-2"
          >
            <i className="fas fa-project-diagram"></i>
            {t.thankYou.projectsBtn}
          </button>
        </div>

        {/* Social row */}
        <div className="social-row mt-10 pt-8 border-t border-white/5 flex justify-center gap-4">
          <a
            href="https://github.com/OgabekHub"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-[42px] h-[42px] rounded-full bg-white/5 border border-accent/15 flex items-center justify-center text-accent text-[1.1rem] hover:bg-accent hover:text-primary hover:translate-y-[-4px] hover:shadow-[0_6px_18px_rgba(200,161,100,0.4)] transition-all"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/og-abek-olimjonov-2a52b3364"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-[42px] h-[42px] rounded-full bg-white/5 border border-accent/15 flex items-center justify-center text-accent text-[1.1rem] hover:bg-accent hover:text-primary hover:translate-y-[-4px] hover:shadow-[0_6px_18px_rgba(200,161,100,0.4)] transition-all"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://t.me/olimjonov_ogabek"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-[42px] h-[42px] rounded-full bg-white/5 border border-accent/15 flex items-center justify-center text-accent text-[1.1rem] hover:bg-accent hover:text-primary hover:translate-y-[-4px] hover:shadow-[0_6px_18px_rgba(200,161,100,0.4)] transition-all"
            aria-label="Telegram"
          >
            <i className="fab fa-telegram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
