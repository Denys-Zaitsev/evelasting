import type { Metadata } from "next";
import Link from "next/link";

import {
  getReleaseBySlug,
  releases,
  type Release,
} from "@/app/components/Music/releases";
import { siteConfig } from "@/lib/site";
import ReleasePageContent from "./ReleasePageContent";

type ReleasePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ track?: string | string[] }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: ReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    return { title: "Release not found" };
  }

  const title = `${release.title} — ${release.artist}`;
  const description = `${release.description} Listen to ${release.title}, a ${release.genre} release by Ukrainian producer Evelasting.`;
  const canonical = `/music/${release.slug}`;

  return {
    title,
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
      title,
      description,
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
      title,
      description,
      images: ["/og/evelasting-og.jpg"],
    },
  };
}

function ReleaseSchema({ release }: { release: Release }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "@id": `${siteConfig.url}/music/${release.slug}#recording`,
    name: release.title,
    url: `${siteConfig.url}/music/${release.slug}`,
    image: `${siteConfig.url}/og/evelasting-og.jpg`,
    description: release.description,
    genre: release.genre,
    datePublished: String(release.year),
    byArtist: {
      "@type": "MusicGroup",
      "@id": `${siteConfig.url}/#artist`,
      name: release.artist,
      url: siteConfig.url,
    },
    sameAs: [siteConfig.links.soundcloud, release.spotify].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function ReleasePage({
  params,
  searchParams,
}: ReleasePageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const knownRelease = getReleaseBySlug(slug);
  const rawTrack = Array.isArray(query.track) ? query.track[0] : query.track;
  const parsedTrack = Number.parseInt(rawTrack || "", 10);
  const fallbackTrackIndex = Number.isFinite(parsedTrack) ? parsedTrack : 0;
  const release: Release =
    knownRelease ||
    ({
      id: fallbackTrackIndex + 1000,
      slug,
      title: titleFromSlug(slug),
      artist: "Evelasting",
      year: new Date().getFullYear(),
      genre: "Phonk",
      description:
        "An official Evelasting release from the current SoundCloud catalog.",
      cover: "/og/evelasting-og.jpg",
      soundcloud: siteConfig.links.soundcloud,
      playlistIndex: fallbackTrackIndex,
    } satisfies Release);
  const trackIndex = Number.isFinite(parsedTrack)
    ? Math.max(0, parsedTrack)
    : release.playlistIndex;

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-5 text-white sm:px-8 sm:py-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(190,24,62,0.2),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(80,20,38,0.14),transparent_38%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-7">
          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.26em] transition-opacity hover:opacity-60 sm:text-sm sm:tracking-[0.34em]"
          >
            EVELASTING
          </Link>
          <Link
            href="/#music"
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-white/35 hover:text-white sm:text-[10px] sm:tracking-[0.18em]"
          >
            All releases
          </Link>
        </header>

        <ReleasePageContent release={release} trackIndex={trackIndex} />

        <footer className="flex flex-col gap-4 border-t border-white/10 py-8 text-[10px] uppercase tracking-[0.2em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Evelasting</p>
          <Link href="/privacy" className="transition hover:text-white">
            Privacy
          </Link>
        </footer>
      </div>

      <ReleaseSchema release={release} />
    </main>
  );
}
