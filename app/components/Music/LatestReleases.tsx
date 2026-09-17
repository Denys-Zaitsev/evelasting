"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useMemo } from "react";

import { useLanguage } from "../LanguageContext";
import { usePlayer } from "../PlayerContext";
import ReleaseCard from "./ReleaseCard";

export default function LatestReleases() {
  const { tracks, currentTrack, isPlaying, playTrack, setPreviewArtwork } = usePlayer();
  const { t } = useLanguage();
  const latestTracks = useMemo(
    () =>
      [...tracks]
        .sort((left, right) => {
          const dateDifference =
            Date.parse(right.publishedAt) - Date.parse(left.publishedAt);

          return Number.isNaN(dateDifference)
            ? left.index - right.index
            : dateDifference || left.index - right.index;
        })
        .slice(0, 3),
    [tracks],
  );

  const handlePlay = useCallback((index: number) => playTrack(index), [playTrack]);
  const handlePreview = useCallback(
    (artwork: string | null) => setPreviewArtwork(artwork),
    [setPreviewArtwork],
  );

  return (
    <div className="relative isolate mt-24 scroll-mt-24 lg:mt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[18vw] -inset-y-28 -z-10 bg-[radial-gradient(ellipse_62%_42%_at_50%_45%,rgb(var(--release-accent)/.28),transparent_72%)] blur-[25px]"
      />

      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-white/45">
            {t("discography")}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-.035em] text-white sm:text-5xl">
            {t("latestReleases")}
          </h3>
        </div>
        <div className="max-w-md sm:text-right">
          <p className="text-sm leading-6 text-white/50">
            {t("latestReleasesDescription")}
          </p>
          <Link
            href="/music"
            className="group mt-5 inline-flex min-h-12 items-center justify-center gap-5 rounded-full border border-white/20 bg-black/55 py-1.5 pl-6 pr-1.5 text-[10px] font-semibold uppercase tracking-[.2em] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.07),0_14px_42px_rgba(0,0,0,.34)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--release-accent)/.62)] hover:bg-white/[.07] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_0_34px_rgb(var(--release-accent)/.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t("viewAllReleases")}
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm text-black shadow-[0_4px_16px_rgba(0,0,0,.3)] transition duration-300 group-hover:translate-x-0.5 group-hover:bg-[rgb(var(--release-accent))] group-hover:text-white"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {latestTracks.length > 0 ? (
        <div className="release-library release-library-latest relative mt-10 overflow-hidden rounded-[34px] border border-white/10 bg-black/45 p-4 shadow-[0_34px_120px_rgba(0,0,0,.62)] backdrop-blur-xl md:p-7">
          <div className="release-library-scroll" aria-label={t("latestReleases")}>
            <div className="release-library-grid">
              {latestTracks.map((track) => (
                <motion.div
                  key={track.id}
                  className="release-library-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ReleaseCard
                    track={track}
                    index={track.index}
                    active={currentTrack?.id === track.id}
                    isPlaying={Boolean(currentTrack?.id === track.id && isPlaying)}
                    onPlay={handlePlay}
                    onPreview={handlePreview}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[.025] px-6 py-16 text-center text-sm text-white/35">
          {t("loading")}
        </div>
      )}
    </div>
  );
}
