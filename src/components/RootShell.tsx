import React from "react";
import { playfair, poppins, THEME_SCRIPT } from "@/app/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/components/Toast";
import { buildJsonLd, type Locale } from "@/lib/site";

/**
 * Ikkala til uchun umumiy <html> qobig'i.
 *
 * Har bir til o'z root layout'iga ega (app/(uz) va app/(en)), chunki
 * <html lang> server tomonida to'g'ri bo'lishi kerak: ilgari sayt doim
 * lang="uz" bilan chiqardi va inglizcha matn faqat JS ishlagandan keyin
 * paydo bo'lardi — qidiruv tizimlari uni umuman ko'rmasdi.
 */
export default function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} className="scroll-smooth">
      {/* App Router root layout'ida <head> qo'llab-quvvatlanadi; ESLint qoidasi
          Pages Router uchun yozilgan va bu yerda noto'g'ri ishlaydi. Tema
          skripti sahifa chizilishidan oldin ishlashi kerak, shuning uchun u
          next/script emas, xom <script> bo'lishi shart. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${poppins.variable} font-poppins bg-primary text-light antialiased`}
      >
        <LanguageProvider locale={locale}>
          <ToastProvider>{children}</ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
