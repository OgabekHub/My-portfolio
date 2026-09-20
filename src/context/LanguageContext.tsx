"use client";

import React, { createContext, useCallback, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, Language } from "@/data/translations";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  /** Joriy tildagi manzil yasaydi: uz uchun "/…", en uchun "/en/…". */
  localeHref: (path?: string) => string;
  t: typeof translations.uz;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Language;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Til endi URL'dan keladi, state'dan emas. Shuning uchun server chizgan
  // HTML allaqachon to'g'ri tilda bo'ladi va qidiruv tizimlari ikkala
  // versiyani ham ko'radi.
  const toggleLanguage = () => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const current = pathname || "/";
    let target: string;

    if (current === "/en" || current.startsWith("/en/")) {
      target = current.slice(3) || "/";
    } else {
      target = current === "/" ? "/en" : `/en${current}`;
    }

    router.push(`${target}${hash}`);
  };

  // useCallback — aks holda har render'da yangi funksiya bo'lib, uni
  // useEffect dependency'siga qo'ygan komponentlar (masalan thank-you
  // sahifasidagi taymer) cheksiz qayta ishga tushardi.
  const localeHref = useCallback(
    (path = "") => {
      const suffix = path.replace(/^\/+/, "");
      const base = locale === "en" ? "/en" : "";
      return suffix ? `${base}/${suffix}` : base || "/";
    },
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{ language: locale, toggleLanguage, localeHref, t: translations[locale] }}
    >
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
