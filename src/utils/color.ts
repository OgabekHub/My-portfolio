/**
 * "#c8a164" yoki "#fff" ni Tailwind'ning rgba(var(--...), alpha) formati uchun
 * "200, 161, 100" ko'rinishidagi triplet'ga aylantiradi.
 * Noto'g'ri qiymat kelsa null qaytaradi — chaqiruvchi uni o'tkazib yuboradi.
 */
export function hexToRgbTriplet(hex: string): string | null {
  if (typeof hex !== "string") return null;

  let value = hex.trim().replace(/^#/, "");

  // Qisqartirilgan shakl: "fff" -> "ffffff"
  if (value.length === 3) {
    value = value
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  if (!/^[0-9a-fA-F]{6}$/.test(value)) return null;

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}
