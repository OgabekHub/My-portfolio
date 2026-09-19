"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import SocialLinks from "@/components/SocialLinks";
import { FaCheck } from "react-icons/fa6";

export default function ThankYouPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds <= 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="animate-fadeIn w-full max-w-md text-center">
        <span className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-accent">
          <FaCheck aria-hidden="true" />
        </span>

        <h1 className="font-playfair text-3xl font-semibold text-light">{t.thankYou.title}</h1>
        <p className="mt-4 leading-relaxed text-light/70">{t.thankYou.desc}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button onClick={() => router.push("/")} className="btn btn-primary">
            {t.thankYou.backBtn}
          </button>
          <button onClick={() => router.push("/#projects")} className="btn btn-ghost">
            {t.thankYou.projectsBtn}
          </button>
        </div>

        <p className="mt-8 text-xs text-muted">
          {t.thankYou.redirect} <span className="text-accent">{seconds}</span> {t.thankYou.seconds}
        </p>

        <SocialLinks className="mt-8 justify-center" />
      </div>
    </main>
  );
}
