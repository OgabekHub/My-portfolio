import { translations } from "./translations";

/** Navigatsiya havolalari — Navbar (desktop + mobil) shu ro'yxatdan quriladi.
 *  Bosh sahifaga logo olib boradi, shuning uchun bu yerda #home yo'q. */
export const NAV_LINKS = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"];

/** t.nav obyekti uchun tip — kalitlar NAV_LINKS bilan bir xil bo'lishini kafolatlaydi. */
export type NavLabels = Pick<typeof translations.uz.nav, NavKey>;
