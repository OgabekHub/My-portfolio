import { translations } from "./translations";

/** Navigatsiya havolalari — Navbar (desktop + mobil) va Footer shu ro'yxatdan quriladi. */
export const NAV_LINKS = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"];

/** t.nav obyekti uchun tip — kalitlar NAV_LINKS bilan bir xil bo'lishini kafolatlaydi. */
export type NavLabels = Pick<typeof translations.uz.nav, NavKey>;
