import { Playfair_Display, Poppins } from "next/font/google";

/**
 * Shriftlar ikkala til uchun bitta joyda — har bir root layout shu yerdan
 * o'qiydi, shunda `next/font` bitta nusxa hosil qiladi.
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * globals.css'da bo'limlar va kartalar `opacity: 0` bilan boshlanadi va ularni
 * IntersectionObserver `.visible` klassi bilan ochadi. JS ishlamasa sayt
 * bo'm-bo'sh ko'rinadi — faqat navbar qoladi. Bu blok <noscript> ichida
 * beriladi, shuning uchun JS ishlayotganda hech narsaga ta'sir qilmaydi.
 */
export const NOSCRIPT_REVEAL_CSS = `
  section, footer,
  #about, #skills, #projects, #contact,
  .section-animate,
  .hero-title span,
  .about-image-container, .about-text, .about-card, .about-card ul li, .about-goals,
  .skill-card, .project-card,
  .contact-info, .contact-form {
    opacity: 1 !important;
    transform: none !important;
  }
  .heading-sketch path { stroke-dashoffset: 0 !important; }
`;

/** Sahifa chizilishidan oldin temani qo'yadi — "oq lampochka" effektini oldini oladi. */
export const THEME_SCRIPT = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })()
`;
