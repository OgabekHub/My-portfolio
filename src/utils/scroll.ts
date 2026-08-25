/** Navbar balandligi — bo'limga o'tishda shu qadar joy qoldiriladi. */
export const NAV_OFFSET = 80;

/**
 * Sahifa bo'limiga silliq scroll qiladi.
 * Ilgari bu funksiya Navbar, Hero, Footer va AiCommandCenter'da
 * to'rt marta aynan takrorlangan edi.
 */
export function scrollToSection(targetId: string, offset: number = NAV_OFFSET): void {
  if (typeof window === "undefined") return;

  if (targetId === "#" || targetId === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.querySelector(targetId);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
