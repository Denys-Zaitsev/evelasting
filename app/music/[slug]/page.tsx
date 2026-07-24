import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getReleaseBySlug,
  releases,
  type Release,
} from "@/app/components/Music/releases";
import { siteConfig } from "@/lib/site";

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
          url: release.cover,
          alt: `${release.title} cover artwork`,
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

function PlatformLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full border px-6 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
        primary
          ? "border-red-500/55 bg-red-600/15 text-white hover:border-red-400 hover:bg-red-600/25"
          : "border-white/15 bg-white/[0.035] text-white/65 hover:border-white/35 hover:text-white"
      }`}
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function ReleaseSchema({ release }: { release: Release }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "@id": `${siteConfig.url}/music/${release.slug}#recording`,
    name: release.title,
    url: `${siteConfig.url}/music/${release.slug}`,
    image: `${siteConfig.url}${encodeURI(release.cover)}`,
    description: release.description,
    genre: release.genre,
    datePublished: String(release.year),
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

  const soundCloudPlayer = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    release.soundcloud,
  )}&color=%23ef4444&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true`;

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-5 py-8 text-white sm:px-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(190,24,62,0.2),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(80,20,38,0.14),transparent_38%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-white/10 pb-7">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.34em] transition-opacity hover:opacity-60"
          >
            EVELASTING
          </Link>
          <Link
            href="/#music"
            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 transition hover:border-white/35 hover:text-white"
          >
            All releases
          </Link>
        </header>

        <article className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[34px] border border-white/10 bg-neutral-950 shadow-[0_40px_140px_rgba(0,0,0,0.72)]">
              <Image
                src={release.cover}
                alt={`${release.title} cover artwork`}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 520px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-black/35" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-red-400/80">
                Official release · {release.year}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                {release.title}
              </h1>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
                {release.artist} · {release.genre}
              </p>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/55">
                {release.description}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <PlatformLink href={release.soundcloud} primary>
                  SoundCloud
                </PlatformLink>
                {release.spotify && (
                  <PlatformLink href={release.spotify}>Spotify</PlatformLink>
                )}
                <PlatformLink href={siteConfig.links.youtube}>
                  YouTube
                </PlatformLink>
              </div>
            </div>
          </div>

          <section className="mt-16 rounded-[30px] border border-white/10 bg-white/[0.025] p-4 sm:p-6 lg:mt-24">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-red-400/70">
                  Listen
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                  Play the release
                </h2>
              </div>
              <p className="text-xs text-white/30">Powered by SoundCloud</p>
            </div>
            <iframe
              title={`${release.title} on SoundCloud`}
              src={soundCloudPlayer}
              allow="autoplay"
              loading="lazy"
              className="h-[360px] w-full rounded-2xl border-0"
            />
          </section>

          <nav
            aria-label="More Evelasting releases"
            className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              href="/#music"
              className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 transition hover:text-white"
            >
              ← Back to discography
            </Link>
            <Link
              href="/#contact"
              className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 transition hover:text-white"
            >
              Follow Evelasting →
            </Link>
          </nav>
        </article>

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
