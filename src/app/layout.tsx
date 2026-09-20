import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import { ToastProvider } from "@/components/Toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Og'abek Olimjonov | Frontend Developer Portfolio",
  description:
    "Og'abek Olimjonov — Junior Frontend Developer specializing in React.js, Next.js, and modern web technologies. View my projects, skills, and get in touch.",
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
  metadataBase: new URL("https://ogabek.vercel.app"),
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://ogabek.vercel.app",
    siteName: "Og'abek Olimjonov Portfolio",
    title: "Og'abek Olimjonov | Frontend Developer",
    description:
      "Junior Frontend Developer specializing in React.js, Next.js, and modern web technologies.",
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
      "Junior Frontend Developer specializing in React.js, Next.js, and modern web technologies.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // lang="uz" — sayt standart holatda o'zbekcha; til almashtirilsa
  // LanguageProvider <html lang> ni klientda yangilaydi.
  return (
    <html lang="uz" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${poppins.variable} font-poppins bg-primary text-light antialiased`}
      >
        <LanguageProvider>
          <ToastProvider>
            <CustomCursor />
            {children}
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
