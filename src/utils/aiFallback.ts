export interface ChatResponse {
  reply: string;
  action: "navigate" | "talk";
  scrollTarget: string | null;
}

export function handleLocalFallback(message: string): ChatResponse {
  const query = (message || "").toLowerCase().trim();

  // Default: chat mode
  let reply = "Salom! Men Og'abekning AI Copilot yordamchisiman. Sizga qanday yordam bera olaman?";
  let action: "navigate" | "talk" = "talk";
  let scrollTarget: string | null = null;

  if (query.includes("loyiha") || query.includes("project") || query.includes("work")) {
    action = "navigate";
    scrollTarget = "#projects";
    reply = "Sizni Og'abekning ishlari joylashgan 'Projects' bo'limiga olib o'taman.";
  } else if (query.includes("skills") || query.includes("ko'nikma") || query.includes("texnologiya")) {
    action = "navigate";
    scrollTarget = "#skills";
    reply = "Mana Og'abek biladigan texnologiyalar va ko'nikmalar ro'yxati.";
  } else if (query.includes("about") || query.includes("haqida") || query.includes("og'abek kim")) {
    action = "navigate";
    scrollTarget = "#about";
    reply = "Og'abek haqidagi ma'lumotlar bilan tanishish uchun 'About' bo'limiga o'tamiz.";
  } else if (query.includes("contact") || query.includes("aloqa") || query.includes("bog'lanish")) {
    action = "navigate";
    scrollTarget = "#contact";
    reply = "U bilan bog'lanish uchun 'Contact' bo'limiga o'tamiz.";
  }

  return { reply, action, scrollTarget };
}
