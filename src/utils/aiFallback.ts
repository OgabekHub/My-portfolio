export interface ChatResponse {
  reply: string;
  action: "navigate" | "talk";
  scrollTarget: string | null;
}

/** /api/chat ishlamaganda kalit so'zlarga asoslangan oddiy javob. */
export function handleLocalFallback(message: string): ChatResponse {
  const query = (message || "").toLowerCase().trim();

  if (query.includes("loyiha") || query.includes("project") || query.includes("work")) {
    return {
      action: "navigate",
      scrollTarget: "#projects",
      reply: "Sizni Og'abekning ishlari joylashgan 'Projects' bo'limiga olib o'taman.",
    };
  }
  if (query.includes("skills") || query.includes("ko'nikma") || query.includes("texnologiya")) {
    return {
      action: "navigate",
      scrollTarget: "#skills",
      reply: "Mana Og'abek biladigan texnologiyalar va ko'nikmalar ro'yxati.",
    };
  }
  if (query.includes("about") || query.includes("haqida") || query.includes("og'abek kim")) {
    return {
      action: "navigate",
      scrollTarget: "#about",
      reply: "Og'abek haqidagi ma'lumotlar bilan tanishish uchun 'About' bo'limiga o'tamiz.",
    };
  }
  if (query.includes("contact") || query.includes("aloqa") || query.includes("bog'lanish")) {
    return {
      action: "navigate",
      scrollTarget: "#contact",
      reply: "U bilan bog'lanish uchun 'Contact' bo'limiga o'tamiz.",
    };
  }

  return {
    action: "talk",
    scrollTarget: null,
    reply: "Salom! Men Og'abekning AI Copilot yordamchisiman. Sizga qanday yordam bera olaman?",
  };
}
