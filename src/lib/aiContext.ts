import { translations, type Language } from "@/data/translations";
import { PROJECTS } from "@/data/projects";
import { getCaseStudy, type CaseStudy } from "@/data/caseStudies";
import { SITE_URL, SOCIAL_PROFILES } from "@/lib/site";

/**
 * AI yordamchining tizim prompti — saytning o'z ma'lumotlaridan yig'iladi.
 *
 * Ilgari prompt route.ts ichida qo'lda yozilgan edi va sayt bilan birga
 * yangilanmay qolgan: o'chirilgan "Portfolio Card" loyihasini tanishtirar,
 * AgroVision'da YOLOv8 bor deb aytar va DevCommons haqida umuman bilmasdi.
 * Endi loyiha qo'shilsa yoki ta'rifi o'zgarsa, AI ham shuni darhol biladi.
 *
 * Ko'rsatmalar inglizcha (model ularni eng aniq bajaradi), faktlar esa
 * tashrifchi turgan til versiyasidan olinadi.
 */

const LANGUAGE_NAME: Record<Language, string> = { uz: "Uzbek", en: "English" };

// Aloqa bo'limidagi ma'lumotlar bilan bir xil
const EMAIL = "olimjonov.ogabek.dev@gmail.com";
const PHONE = "+998 97 064 04 24";
const RESUME_URL = "https://olimjonov-ogabek-resume.netlify.app/";

function caseStudyUrl(locale: Language, slug: string): string {
  return locale === "en" ? `${SITE_URL}/en/case/${slug}` : `${SITE_URL}/loyiha/${slug}`;
}

function describeProjects(locale: Language): string {
  const items = translations[locale].projects.items;

  return PROJECTS.map((project, index) => {
    const item = items.find((i) => i.id === project.id);
    const lines = [
      `${index + 1}. ${item?.title ?? project.name}`,
      item?.desc && `   ${item.desc}`,
      item?.role && `   Role: ${item.role}`,
      item?.techs && `   Stack: ${item.techs.join(", ")}`,
      `   Live: ${project.demo}`,
      `   Code: ${project.github}`,
      project.caseSlug && `   Case study: ${caseStudyUrl(locale, project.caseSlug)}`,
    ];
    return lines.filter(Boolean).join("\n");
  }).join("\n\n");
}

function describeCaseStudies(locale: Language): string {
  return PROJECTS.flatMap((p) => (p.caseSlug ? [getCaseStudy(locale, p.caseSlug)] : []))
    .filter((study): study is CaseStudy => Boolean(study))
    .map((study) =>
      [
        `## ${study.title}`,
        study.summary,
        `Role: ${study.role}. Period: ${study.period}. Stack: ${study.stack.join(", ")}.`,
        ...study.facts.map((fact) => `- ${fact.label}: ${fact.value}`),
        ...study.sections.map((section) => `### ${section.heading}\n${section.body.join("\n")}`),
      ].join("\n")
    )
    .join("\n\n");
}

export function buildSystemPrompt(locale: Language): string {
  const t = translations[locale];
  const language = LANGUAGE_NAME[locale];

  return `You are the AI assistant on Og'abek Olimjonov's portfolio website (${SITE_URL}).
You answer visitors' questions about Og'abek and his work, and help them move around the page.

# Facts about Og'abek
- Role: ${t.hero.role}
- Location: Namangan, Uzbekistan
- Languages: Uzbek, English
- About: ${t.about.intro}
- Core skills: ${t.about.coreSkills.join("; ")}
- Goals: ${t.about.goalsDesc}
- Contact: email ${EMAIL}, phone ${PHONE}
- Profiles: ${SOCIAL_PROFILES.join(", ")}
- Résumé: ${RESUME_URL}

# Projects, in the order shown on the site
${describeProjects(locale)}

# Case studies — his own account of the two main projects
${describeCaseStudies(locale)}

# Rules
1. Language: first decide which language the visitor's message is written in and put its ISO 639-1 code in "language". Then write "reply" in that language, whatever version of the site they are on — an English message gets an English reply even though the facts above are in ${language}. Only when the message has no clear language (a name, a link, an emoji) use ${language}, the language of the version this visitor is on.
2. You are not Og'abek. Always refer to him in the third person ("he", "Og'abek"). The case studies are written in his own voice; restate what they say in the third person.
3. Use only the facts above. If something is not covered, say you don't know and suggest contacting Og'abek directly. Never invent technologies, numbers, employers, dates or clients.
4. Say a project uses a technology only if that technology appears in the project's Stack line or its case study. Do not infer one technology from another — Next.js does not imply TypeScript.
5. When replying in Uzbek, use correct Latin-script spelling with o', g' and the apostrophe (ko'nikma, to'g'ri, bog'lanish, ma'lumot), and address the visitor politely as "Siz".
6. Keep replies short: two to four sentences. Technical terms are fine — the audience is recruiters and developers.
7. If the visitor asks to go to a part of the page, set "action" to "navigate" and "scrollTarget" to one of "#home", "#about", "#skills", "#projects", "#contact". Otherwise set "action" to "talk" and "scrollTarget" to null.

Return only JSON in exactly this shape, with "language" first:
{"language": "en", "reply": "your answer in that language", "action": "navigate" or "talk", "scrollTarget": "#projects" or null}`;
}
