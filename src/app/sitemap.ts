import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Ikkala til ham sitemap'da, o'zaro hreflang bilan — ilgari faqat
  // o'zbekcha versiya ro'yxatda edi va inglizcha sahifa umuman yo'q edi.
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          uz: SITE_URL,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          uz: SITE_URL,
          en: `${SITE_URL}/en`,
        },
      },
    },
  ];
}
