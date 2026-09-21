import type { Language } from "@/data/translations";

export interface ChatResponse {
  reply: string;
  action: "navigate" | "talk";
  scrollTarget: string | null;
}

/**
 * API ishlamay qolganda (tarmoq yo'q, kvota tugagan) kalit so'zlar bo'yicha
 * bo'limga yo'naltiradi. Javob tashrifchi turgan til versiyasida.
 */
const REPLIES: Record<Language, Record<"greeting" | "projects" | "skills" | "about" | "contact", string>> = {
  uz: {
    greeting: "Salom! Men Og'abekning AI Copilot yordamchisiman. Sizga qanday yordam bera olaman?",
    projects: "Sizni Og'abekning ishlari joylashgan 'Loyihalar' bo'limiga olib o'taman.",
    skills: "Mana Og'abek biladigan texnologiyalar va ko'nikmalar ro'yxati.",
    about: "Og'abek bilan tanishish uchun 'Men haqimda' bo'limiga o'tamiz.",
    contact: "U bilan bog'lanish uchun 'Aloqa' bo'limiga o'tamiz.",
  },
  en: {
    greeting: "Hi! I'm Og'abek's AI Copilot. How can I help you?",
    projects: "Taking you to the Projects section, where Og'abek's work is.",
    skills: "Here are the technologies and skills Og'abek works with.",
    about: "Let's go to the About section to learn more about Og'abek.",
    contact: "Let's go to the Contact section so you can get in touch with him.",
  },
};

export function handleLocalFallback(message: string, language: Language = "uz"): ChatResponse {
  const query = (message || "").toLowerCase().trim();
  const replies = REPLIES[language];

  let reply = replies.greeting;
  let action: "navigate" | "talk" = "talk";
  let scrollTarget: string | null = null;

  if (query.includes("loyiha") || query.includes("project") || query.includes("work")) {
    action = "navigate";
    scrollTarget = "#projects";
    reply = replies.projects;
  } else if (query.includes("skills") || query.includes("ko'nikma") || query.includes("texnologiya")) {
    action = "navigate";
    scrollTarget = "#skills";
    reply = replies.skills;
  } else if (query.includes("about") || query.includes("haqida") || query.includes("og'abek kim")) {
    action = "navigate";
    scrollTarget = "#about";
    reply = replies.about;
  } else if (query.includes("contact") || query.includes("aloqa") || query.includes("bog'lanish")) {
    action = "navigate";
    scrollTarget = "#contact";
    reply = replies.contact;
  }

  return { reply, action, scrollTarget };
}
