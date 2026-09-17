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
  birthPlace: {
    "@type": "Place",
    name: "Kryvyi Rih, Ukraine",
  },
  sameAs: socialProfiles,
};

export default function AboutPage() {
  return (
    <>
      <AboutExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
