import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/CaseStudyPage";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/data/caseStudies";

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getCaseStudy("uz", params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — loyiha tahlili | Og'abek Olimjonov`,
    description: study.summary,
    alternates: {
      canonical: `/loyiha/${study.slug}`,
      languages: {
        "uz-UZ": `/loyiha/${study.slug}`,
        "en-US": `/en/case/${study.slug}`,
        "x-default": `/loyiha/${study.slug}`,
      },
    },
    openGraph: {
      title: `${study.title} — loyiha tahlili`,
      description: study.summary,
      url: `/loyiha/${study.slug}`,
      images: [{ url: study.image }],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!getCaseStudy("uz", params.slug)) notFound();
  return <CaseStudyPage locale="uz" slug={params.slug} />;
}
