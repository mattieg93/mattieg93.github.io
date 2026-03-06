import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeWrapper } from "@/components/theme-wrapper";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://mattgraham93.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mattie Graham | AI & Analytics Engineer",
    template: "%s | Mattie Graham",
  },
  description:
    "AI & Analytics Engineer specializing in data pipelines, machine learning, RAG systems, and full-stack analytics tooling. Available for freelance projects on Upwork.",
  keywords: [
    "AI engineer",
    "analytics engineer",
    "data science",
    "machine learning",
    "RAG",
    "Python",
    "Azure",
    "full-stack",
    "Upwork",
    "freelance data engineer",
    "Mattie Graham",
  ],
  authors: [{ name: "Mattie Graham", url: siteUrl }],
  creator: "Mattie Graham",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mattie Graham",
    title: "Mattie Graham | AI & Analytics Engineer",
    description:
      "AI & Analytics Engineer specializing in data pipelines, machine learning, RAG systems, and full-stack analytics tooling. Available for freelance projects on Upwork.",
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
    title: "Mattie Graham | AI & Analytics Engineer",
    description:
      "AI & Analytics Engineer - data pipelines, ML, RAG, full-stack analytics. Available for Upwork projects.",
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
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
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