import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CASE_STUDY_SLUGS } from "@/data/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Ikkala til ham sitemap'da, o'zaro hreflang bilan — ilgari faqat
  // o'zbekcha versiya ro'yxatda edi va inglizcha sahifa umuman yo'q edi.
  const home: MetadataRoute.Sitemap = [SITE_URL, `${SITE_URL}/en`].map((url) => ({
    url,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: { uz: SITE_URL, en: `${SITE_URL}/en` },
    },
  }));

  const cases: MetadataRoute.Sitemap = CASE_STUDY_SLUGS.flatMap((slug) => {
    const uzUrl = `${SITE_URL}/loyiha/${slug}`;
    const enUrl = `${SITE_URL}/en/case/${slug}`;
    const alternates = { languages: { uz: uzUrl, en: enUrl } };
    return [
      { url: uzUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.8, alternates },
      { url: enUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.8, alternates },
    ];
  });

  return [...home, ...cases];
}
