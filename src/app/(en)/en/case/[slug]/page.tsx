import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/CaseStudyPage";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/data/caseStudies";

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getCaseStudy("en", params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — case study | Og'abek Olimjonov`,
    description: study.summary,
    alternates: {
      canonical: `/en/case/${study.slug}`,
      languages: {
        "uz-UZ": `/loyiha/${study.slug}`,
        "en-US": `/en/case/${study.slug}`,
        "x-default": `/loyiha/${study.slug}`,
      },
    },
    openGraph: {
      title: `${study.title} — case study`,
      description: study.summary,
      url: `/en/case/${study.slug}`,
      images: [{ url: study.image }],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!getCaseStudy("en", params.slug)) notFound();
  return <CaseStudyPage locale="en" slug={params.slug} />;
}
