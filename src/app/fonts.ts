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
