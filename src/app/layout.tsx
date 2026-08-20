import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";

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
    locale: "en_US",
    url: "https://ogabek.vercel.app",
    siteName: "Og'abek Olimjonov Portfolio",
    title: "Og'abek Olimjonov | Frontend Developer",
    description:
      "Junior Frontend Developer specializing in React.js, Next.js, and modern web technologies.",
    images: [
      {
        url: "/img/O.A logo.png",
        width: 1200,
        height: 630,
        alt: "Og'abek Olimjonov - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Og'abek Olimjonov | Frontend Developer",
    description:
      "Junior Frontend Developer specializing in React.js, Next.js, and modern web technologies.",
    images: ["/img/O.A logo.png"],
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
  icons: {
    icon: "/img/favicon.png",
    shortcut: "/img/favicon.png",
    apple: "/img/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          precedence="default"
        />
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
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
