import type { Metadata } from "next";

import { siteConfig, socialProfiles } from "@/lib/site";
import AboutExperience from "./AboutExperience";

export const metadata: Metadata = {
  title: "About Denys Zaitsev",
  description:
    "Meet Denys Zaitsev, the independent Ukrainian producer from Kryvyi Rih behind Evelasting, and discover the story behind the music.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: "Denys Zaitsev — The Artist Behind Evelasting",
    description:
      "The story of Denys Zaitsev, the independent Ukrainian producer behind Evelasting.",
    images: [
      {
        url: "/about/denys-zaitsev.webp",
        width: 1254,
        height: 1254,
        alt: "Denys Zaitsev — Evelasting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denys Zaitsev — The Artist Behind Evelasting",
    description: "The story of the independent Ukrainian producer behind Evelasting.",
    images: ["/about/denys-zaitsev.webp"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/about#denys-zaitsev`,
  name: "Denys Zaitsev",
  alternateName: "Evelasting",
  url: `${siteConfig.url}/about`,
  image: `${siteConfig.url}/about/denys-zaitsev.webp`,
  jobTitle: "Independent music producer",
  mainEntityOfPage: { "@id": `${siteConfig.url}/about#webpage` },
  birthPlace: {
    "@type": "Place",
    name: "Kryvyi Rih, Ukraine",
  },
  sameAs: socialProfiles,
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/about#webpage`,
  url: `${siteConfig.url}/about`,
  name: "About Denys Zaitsev | Evelasting",
  description:
    "Meet Denys Zaitsev, the independent Ukrainian producer behind Evelasting.",
  mainEntity: { "@id": `${siteConfig.url}/about#denys-zaitsev` },
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  inLanguage: "en",
};

export default function AboutPage() {
  return (
    <>
      <AboutExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
    </>
  );
}
