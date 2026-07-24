import type { Metadata, Viewport } from "next";

import { siteConfig, socialProfiles } from "@/lib/site";
import PwaRegistration from "./components/PwaRegistration";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Evelasting",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Evelasting", url: siteConfig.url }],
  creator: "Evelasting",
  publisher: "Evelasting",
  category: "music",
  keywords: [
    "Evelasting",
    "Ukrainian producer",
    "phonk",
    "chill phonk",
    "drift phonk",
    "ambient phonk",
    "independent artist",
    "music producer",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/icons/favicon-32.png",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [
      {
        url: "/og/evelasting-og.jpg",
        width: 1200,
        height: 630,
        alt: "Evelasting — Independent Ukrainian Producer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og/evelasting-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "music:musician": socialProfiles.join(","),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#050505",
};

const artistSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": `${siteConfig.url}/#artist`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/og/evelasting-og.jpg`,
  description: siteConfig.description,
  genre: siteConfig.artist.genres,
  foundingLocation: {
    "@type": "Place",
    name: siteConfig.artist.origin,
  },
  sameAs: socialProfiles,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <PwaRegistration />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }}
        />
      </body>
    </html>
  );
}
