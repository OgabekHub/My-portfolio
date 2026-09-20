import type { Metadata } from "next";
import "../globals.css";
import RootShell from "@/components/RootShell";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Og'abek Olimjonov | Frontend dasturchi — Portfolio",
  description:
    "Og'abek Olimjonov — Namangandan Junior Frontend dasturchi. React.js, Next.js va zamonaviy veb-texnologiyalar. Loyihalarim, ko'nikmalarim va bog'lanish ma'lumotlari.",
  keywords: [
    "Og'abek Olimjonov",
    "Frontend dasturchi",
    "React dasturchi",
    "Next.js",
    "Portfolio",
    "Veb dasturchi",
    "O'zbekiston",
    "Namangan",
    "UI/UX",
    "JavaScript",
  ],
  authors: [{ name: "Og'abek Olimjonov" }],
  creator: "Og'abek Olimjonov",
  alternates: {
    canonical: "/",
    languages: {
      "uz-UZ": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Og'abek Olimjonov Portfolio",
    title: "Og'abek Olimjonov | Frontend dasturchi",
    description:
      "React.js va Next.js yordamida tez va qulay interfeyslar quruvchi Junior Frontend dasturchi.",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "Og'abek Olimjonov — Frontend dasturchi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Og'abek Olimjonov | Frontend dasturchi",
    description:
      "React.js va Next.js yordamida tez va qulay interfeyslar quruvchi Junior Frontend dasturchi.",
    images: ["/img/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function UzLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="uz">{children}</RootShell>;
}
