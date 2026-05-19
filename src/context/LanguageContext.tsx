"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/data/translations";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.uz;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as Language;
    if (savedLang === "uz" || savedLang === "en") {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "uz" ? "en" : "uz";
    setLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  // Default to UZ during SSR, update to active language on client mount
  const activeT = mounted ? translations[language] : translations.uz;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: activeT }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
