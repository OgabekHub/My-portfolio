import type { Metadata } from "next";
import "../globals.css";
import RootShell from "@/components/RootShell";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Og'abek Olimjonov | Frontend Developer Portfolio",
  description:
    "Og'abek Olimjonov — Junior Frontend Developer from Namangan, Uzbekistan, specializing in React.js, Next.js and modern web technologies. View my projects, skills and get in touch.",
  keywords: [
    "Og'abek Olimjonov",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Web Developer",
    "Uzbekistan",
    "Namangan",
    "UI/UX",
    "JavaScript",
  ],
  authors: [{ name: "Og'abek Olimjonov" }],
  creator: "Og'abek Olimjonov",
  alternates: {
    canonical: "/en",
    languages: {
      "uz-UZ": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["uz_UZ"],
    url: "/en",
    siteName: "Og'abek Olimjonov Portfolio",
    title: "Og'abek Olimjonov | Frontend Developer",
    description:
      "Junior Frontend Developer building fast, accessible interfaces with React.js and Next.js.",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "Og'abek Olimjonov — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Og'abek Olimjonov | Frontend Developer",
    description:
      "Junior Frontend Developer building fast, accessible interfaces with React.js and Next.js.",
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

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
