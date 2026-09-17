"use client";

import Image from "next/image";
import Link from "next/link";

import type { Release } from "@/app/components/Music/releases";
import { useLanguage } from "@/app/components/LanguageContext";
import { siteConfig } from "@/lib/site";

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
      {children}
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </a>
  );
}

export default function ReleasePageContent({ release }: { release: Release }) {
  const { t } = useLanguage();
  const soundCloudPlayer =
    "https://w.soundcloud.com/player/?" +
    new URLSearchParams({
      url: release.soundcloud,
      color: "#ef4444",
      auto_play: "false",
      hide_related: "true",
      show_comments: "false",
      show_user: "true",
      show_reposts: "false",
      visual: "true",
    }).toString();

  return (
    <article className="py-10 sm:py-20">
      <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,#171717,#080808)] shadow-[0_40px_140px_rgba(0,0,0,0.72)] sm:rounded-[34px]">
          <Image
            src={release.cover}
            alt={`${release.title} cover artwork`}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 520px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-black/35" />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-red-400/80">
            {t("officialRelease")} · {release.year}
          </p>
          <h1 className="mt-4 break-words text-[clamp(2.25rem,12vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] sm:mt-5">
            {release.title}
          </h1>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
            {release.artist} · {release.genre}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:mt-8 sm:text-base sm:leading-8">
            {release.description}
          </p>

          <div className="mt-8 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap">
            <PlatformLink href={release.soundcloud} primary>SoundCloud</PlatformLink>
            {release.spotify && <PlatformLink href={release.spotify}>Spotify</PlatformLink>}
            <PlatformLink href={siteConfig.links.youtube}>YouTube</PlatformLink>
          </div>
        </div>
      </div>

      <section className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.025] p-3 sm:mt-16 sm:rounded-[30px] sm:p-6 lg:mt-24">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-red-400/70">{t("listen")}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">{t("playTheRelease")}</h2>
          </div>
          <p className="text-xs text-white/30">{t("poweredBySoundCloud")}</p>
        </div>

        <iframe
          title={`${release.title} on SoundCloud`}
          src={soundCloudPlayer}
          allow="autoplay; encrypted-media"
          loading="lazy"
          className="h-[280px] w-full rounded-2xl border-0 sm:h-[360px]"
        />
      </section>

      <nav aria-label={t("moreReleases")} className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/#music" className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 transition hover:text-white">
          ← {t("backToDiscography")}
        </Link>
        <Link href="/#contact" className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 transition hover:text-white">
          {t("followEvelasting")} →
        </Link>
      </nav>
    </article>
  );
}
