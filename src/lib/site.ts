import { PROJECTS } from "@/data/projects";

export const SITE_URL = "https://ogabek.vercel.app";

export const SOCIAL_PROFILES = [
  "https://github.com/OgabekHub",
  "https://www.linkedin.com/in/og-abek-olimjonov-2a52b3364",
  "https://t.me/olimjonov_ogabek",
];

export type Locale = "uz" | "en";

/** Har bir til uchun sahifa manzili: uz — ildizda, en — /en ostida. */
export function localePath(locale: Locale, path = ""): string {
  const suffix = path.replace(/^\/+/, "");
  const base = locale === "en" ? "/en" : "";
  return suffix ? `${base}/${suffix}` : base || "/";
}

/**
 * JSON-LD: Person + uning loyihalari ItemList sifatida.
 *
 * Buning yo'qligi saytni AI Overviews va shunga o'xshash yig'uvchilar uchun
 * ko'rinmas qiladi — matn bor, lekin uni kim yozgani va nima qilgani
 * mashina o'qiy oladigan shaklda yo'q edi.
 */
export function buildJsonLd(locale: Locale) {
  const pageUrl = `${SITE_URL}${localePath(locale)}`;

  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Og'abek Olimjonov",
    alternateName: ["Ogabek Olimjonov", "Ogʻabek Olimjonov"],
    jobTitle: locale === "uz" ? "Frontend dasturchi" : "Frontend Developer",
    description:
      locale === "uz"
        ? "React va Next.js yordamida tez va qulay interfeyslar quruvchi frontend dasturchi."
        : "Frontend developer building fast, accessible interfaces with React and Next.js.",
    url: pageUrl,
    image: `${SITE_URL}/img/og-image.png`,
    email: "mailto:olimjonov.ogabek.dev@gmail.com",
    telephone: "+998970640424",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Namangan",
      addressCountry: "UZ",
    },
    knowsLanguage: [
      { "@type": "Language", name: "Uzbek", alternateName: "uz" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    knowsAbout: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "UI/UX Design",
      "Figma",
      "Git",
    ],
    sameAs: SOCIAL_PROFILES,
  };

  const projects = {
    "@type": "ItemList",
    "@id": `${pageUrl}#projects`,
    name: locale === "uz" ? "Loyihalar" : "Projects",
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.demo,
        image: `${SITE_URL}${project.image}`,
        author: { "@id": `${SITE_URL}/#person` },
        keywords: project.tags.join(", "),
      },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: pageUrl,
    name: "Og'abek Olimjonov — Portfolio",
    inLanguage: locale,
    author: { "@id": `${SITE_URL}/#person` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, projects],
  };
}
