/** Navigatsiya havolalari — Navbar (desktop + mobil) va Footer shu ro'yxatdan quriladi. */
export const NAV_LINKS = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"];
