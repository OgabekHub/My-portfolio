import { hexToRgbTriplet } from "./color";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
}

/**
 * AI yuborgan rang nomini CSS o'zgaruvchilariga bog'lash.
 * Diqqat: Tailwind config rangni rgba(var(--...-rgb), alpha) orqali o'qiydi,
 * shuning uchun hex o'zgaruvchini yolg'iz o'rnatish yetarli emas — RGB tripleti
 * ham yangilanishi shart, aks holda bg-primary / text-accent kabi klasslar
 * eski rangda qolib ketadi.
 * "light" uchun RGB o'zgaruvchi nomi boshqacha: --color-text-main-rgb.
 */
const THEME_VAR_MAP: Record<keyof ThemeColors, { hexVar: string; rgbVar: string }> = {
  primary: { hexVar: "--color-primary", rgbVar: "--color-primary-rgb" },
  secondary: { hexVar: "--color-secondary", rgbVar: "--color-secondary-rgb" },
  accent: { hexVar: "--color-accent", rgbVar: "--color-accent-rgb" },
  light: { hexVar: "--color-light", rgbVar: "--color-text-main-rgb" },
};

/** AI tanlagan ranglarni <html> ga inline o'zgaruvchi sifatida o'rnatadi. */
export function applyAiTheme(colors: Partial<ThemeColors> | null | undefined): void {
  if (!colors || typeof document === "undefined") return;

  const root = document.documentElement;

  (Object.keys(THEME_VAR_MAP) as (keyof ThemeColors)[]).forEach((key) => {
    const hex = colors[key];
    if (!hex) return;

    const triplet = hexToRgbTriplet(hex);
    if (!triplet) return; // buzuq qiymat — bu rangni o'tkazib yuboramiz

    const { hexVar, rgbVar } = THEME_VAR_MAP[key];
    root.style.setProperty(hexVar, hex);
    root.style.setProperty(rgbVar, triplet);
  });
}

/**
 * AI o'rnatgan inline o'zgaruvchilarni tozalaydi va saytni :root / .dark
 * dagi asl ranglariga qaytaradi. Dark/light tugmasi bosilganda chaqiriladi,
 * aks holda AI temasi tugmani o'lik qoldiradi.
 */
export function resetAiTheme(): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  Object.values(THEME_VAR_MAP).forEach(({ hexVar, rgbVar }) => {
    root.style.removeProperty(hexVar);
    root.style.removeProperty(rgbVar);
  });
}
