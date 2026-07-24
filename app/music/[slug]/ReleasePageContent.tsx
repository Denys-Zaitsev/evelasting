"use client";

import Script from "next/script";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import type { Release } from "@/app/components/Music/releases";
import { siteConfig } from "@/lib/site";

const playlistUrl =
  "https://soundcloud.com/evelasting1/sets/evelasting-official-releases";

const playlistPlayerUrl =
  "https://w.soundcloud.com/player/?" +
  new URLSearchParams({
    url: playlistUrl,
    color: "#ef4444",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "false",
    show_reposts: "false",
    visual: "false",
  }).toString();

type SoundCloudTrack = {
  title?: string;
  artwork_url?: string | null;
  permalink_url?: string;
};

type SoundCloudWidget = {
  bind: (event: string, callback: () => void) => void;
  getSounds: (callback: (sounds: SoundCloudTrack[]) => void) => void;
};

type SoundCloudSDK = {
  Widget: {
    (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: { READY: string };
  };
};

function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/\[.*?\]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function improveArtwork(url?: string | null) {
  return url?.replace(/-(?:large|t\d+x\d+)\./, "-t1080x1080.") || "";
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

export default function ReleasePageContent({
  release,
}: {
  release: Release;
}) {
  const engineRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const [liveTrack, setLiveTrack] = useState<SoundCloudTrack | null>(null);
  const [catalogReady, setCatalogReady] = useState(false);

  const initializeWidget = useCallback(() => {
    const sdk = (window as Window & { SC?: SoundCloudSDK }).SC;
    if (!sdk || !engineRef.current || widgetRef.current) return;

    const widget = sdk.Widget(engineRef.current);
    widgetRef.current = widget;

    widget.bind(sdk.Widget.Events.READY, () => {
      widget.getSounds((sounds) => {
        const expected = normalizeTitle(release.title);
        const match = sounds.find((sound) => {
          const candidate = normalizeTitle(sound.title || "");
          return (
            candidate &&
            (candidate === expected ||
              candidate.includes(expected) ||
              expected.includes(candidate))
          );
        });

        setLiveTrack(match || null);
        setCatalogReady(true);
      });
    });
  }, [release.title]);

  const artwork = improveArtwork(liveTrack?.artwork_url);
  const soundCloudUrl = liveTrack?.permalink_url || siteConfig.links.soundcloud;
  const soundCloudPlayer = liveTrack?.permalink_url
    ? "https://w.soundcloud.com/player/?" +
      new URLSearchParams({
        url: liveTrack.permalink_url,
        color: "#ef4444",
        auto_play: "false",
        hide_related: "true",
        show_comments: "false",
        show_user: "true",
        show_reposts: "false",
        visual: "true",
      }).toString()
    : "";

  return (
    <>
      <Script
        src="https://w.soundcloud.com/player/api.js"
        strategy="afterInteractive"
        onLoad={initializeWidget}
        onReady={initializeWidget}
      />
      <iframe
        ref={engineRef}
        title="SoundCloud release catalog"
        src={playlistPlayerUrl}
        allow="autoplay; encrypted-media"
        className="soundcloud-engine"
      />

      <article className="py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,#171717,#080808)] shadow-[0_40px_140px_rgba(0,0,0,0.72)]">
            {artwork ? (
              // SoundCloud supplies the current release artwork at runtime.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={artwork}
                alt={`${release.title} cover artwork`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-8 text-center text-sm font-semibold uppercase tracking-[0.28em] text-white/20">
                {catalogReady ? release.title : "Loading artwork"}
              </div>
            )}
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
              <PlatformLink href={soundCloudUrl} primary>
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

          {soundCloudPlayer ? (
            <iframe
              title={`${release.title} on SoundCloud`}
              src={soundCloudPlayer}
              allow="autoplay"
              loading="lazy"
              className="h-[360px] w-full rounded-2xl border-0"
            />
          ) : (
            <div className="grid h-40 place-items-center rounded-2xl border border-white/10 bg-black/30 px-6 text-center text-sm text-white/35">
              {catalogReady
                ? "This release was not found in the current SoundCloud playlist."
                : "Connecting to the SoundCloud catalog…"}
            </div>
          )}
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
    </>
  );
}
