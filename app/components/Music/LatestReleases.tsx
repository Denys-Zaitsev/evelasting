"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCallback } from "react";

import { useLanguage } from "../LanguageContext";
import { usePlayer } from "../PlayerContext";
import ReleaseCard from "./ReleaseCard";

export default function LatestReleases() {
  const { tracks, currentTrack, isPlaying, playTrack, setPreviewArtwork } = usePlayer();
  const { t } = useLanguage();
  const latestTracks = tracks.slice(0, 3);

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
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-white/15 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75 transition hover:border-white/35 hover:bg-white/[.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t("viewAllReleases")} <span aria-hidden="true">→</span>
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
