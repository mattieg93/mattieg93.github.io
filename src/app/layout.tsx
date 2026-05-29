import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeWrapper } from "@/components/theme-wrapper";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://mattieg93.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mattie Graham | AI & Analytics Engineer",
    template: "%s | Mattie Graham",
  },
  description:
    "Senior AI & Analytics Engineer. 9+ years at Meta and Microsoft building production AI, forecasting, and experimentation systems at the intersection of business strategy, data engineering, and applied AI. Pursuing an MS in AI at CU Boulder.",
  keywords: [
    "AI engineer",
    "analytics engineer",
    "data science",
    "machine learning",
    "RAG",
    "Python",
    "Azure",
    "data engineering",
    "Mattie Graham",
    "University of Colorado Boulder",
    "MS Artificial Intelligence",
  ],
  authors: [{ name: "Mattie Graham", url: siteUrl }],
  creator: "Mattie Graham",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mattie Graham",
    title: "Mattie Graham | Senior AI & Analytics Engineer",
    description:
      "9+ years at Meta and Microsoft building production AI, forecasting, and experimentation systems. Business strategy + data engineering + applied AI.",
    images: [
      {
        url: "/assets/images/1843.png",
        width: 400,
        height: 400,
        alt: "Mattie Graham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mattie Graham | Senior AI & Analytics Engineer",
    description:
      "Production AI, forecasting, and experimentation systems. Meta + Microsoft. MS AI · CU Boulder.",
    images: ["/assets/images/1843.png"],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'dark';
                var validPalettes = ['core', 'editorial-impact', 'editorial-lab'];
                var urlPalette = new URLSearchParams(window.location.search).get('palette');
                var palette = (urlPalette && validPalettes.indexOf(urlPalette) !== -1)
                  ? urlPalette
                  : (localStorage.getItem('palette') || 'core');
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.setAttribute('data-palette', palette);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeWrapper>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </ThemeWrapper>
      </body>
    </html>
  );
}