import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getReleaseBySlug,
  releases,
  type Release,
} from "@/app/components/Music/releases";
import { siteConfig } from "@/lib/site";
import ReleasePageContent from "./ReleasePageContent";
import ReleasePageChrome from "./ReleasePageChrome";

type ReleasePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: ReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    notFound();
  }

  const title = `${release.title} — ${release.artist}`;
  const description = `${release.description} Official release by Evelasting.`;
  const canonical = `/music/${release.slug}`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      release.title,
      release.artist,
      release.genre,
      "Ukrainian producer",
      "phonk music",
    ],
    alternates: { canonical },
    openGraph: {
      type: "music.song",
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      images: [
        {
          url: release.cover,
          alt: `${release.title} — ${release.artist}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [release.cover],
    },
  };
}

function ReleaseSchema({ release }: { release: Release }) {
  const image = release.cover.startsWith("http")
    ? release.cover
    : `${siteConfig.url}${encodeURI(release.cover)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "@id": `${siteConfig.url}/music/${release.slug}#recording`,
    name: release.title,
    url: `${siteConfig.url}/music/${release.slug}`,
    image,
    description: release.description,
    genre: release.genre,
    datePublished: String(release.year),
    mainEntityOfPage: `${siteConfig.url}/music/${release.slug}`,
    isPartOf: {
      "@type": "CollectionPage",
      "@id": `${siteConfig.url}/music#discography`,
      name: "Evelasting Music & Releases",
    },
    byArtist: {
      "@type": "MusicGroup",
      "@id": `${siteConfig.url}/#artist`,
      name: release.artist,
      url: siteConfig.url,
    },
    sameAs: [release.soundcloud, release.spotify].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) notFound();

  return (
    <>
      <ReleasePageChrome>
        <ReleasePageContent release={release} />
      </ReleasePageChrome>
      <ReleaseSchema release={release} />
    </>
  );
}
