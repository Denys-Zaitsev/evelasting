import type { Metadata } from "next";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import BackgroundEffects from "@/app/components/Music/BackgroundEffects";
import Discography from "@/app/components/Music/Discography";
import { releases } from "@/app/components/Music/releases";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music & Releases",
  description:
    "Explore the complete Evelasting discography, play official releases and open every track on SoundCloud.",
  alternates: { canonical: "/music" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/music`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: "Evelasting Music & Releases",
    description:
      "Explore the complete discography of independent Ukrainian producer Evelasting.",
    images: ["/og/evelasting-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evelasting Music & Releases",
    description:
      "Explore the complete discography of independent Ukrainian producer Evelasting.",
    images: ["/og/evelasting-og.jpg"],
  },
};

const musicCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteConfig.url}/music#discography`,
  name: "Evelasting Music & Releases",
  url: `${siteConfig.url}/music`,
  description:
    "The official discography of independent Ukrainian producer Evelasting.",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#artist` },
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: releases.length,
    itemListElement: releases
      .slice()
      .sort((left, right) => left.playlistIndex - right.playlistIndex)
      .map((release, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: release.title,
        url: `${siteConfig.url}/music/${release.slug}`,
      })),
  },
};

export default function MusicPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen overflow-x-clip bg-black text-white">
        <Navbar />
        <section className="music-section relative isolate min-h-screen overflow-hidden border-t border-white/10 bg-black px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 md:px-10 lg:px-12 lg:pb-24 lg:pt-44">
          <BackgroundEffects />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.96)_0%,rgba(0,0,0,.2)_11%,rgba(0,0,0,.05)_47%,rgba(0,0,0,.08)_82%,rgba(0,0,0,.94)_100%)]"
          />
          <div className="relative z-10 mx-auto max-w-7xl">
            <Discography headingLevel="h1" isPage />
          </div>
        </section>
        <Footer />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicCollectionSchema) }}
      />
    </>
  );
}
