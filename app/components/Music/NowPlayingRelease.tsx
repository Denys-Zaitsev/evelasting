"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { usePlayer } from "../PlayerContext";
import { useLanguage } from "../LanguageContext";

function formatDate(value: string) {
  if (!value) return "SoundCloud";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "SoundCloud";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

export default function NowPlayingRelease() {
  const { t } = useLanguage();
  const { currentTrack, tracks, isPlaying, requestPlay } = usePlayer();
  const track = currentTrack ?? tracks[0] ?? null;
  const trackKey = track?.id ?? "loading";

  return (
    <div className="relative mt-14 lg:mt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-20">
        <AnimatePresence mode="wait">
          <motion.div key={`${trackKey}-cover`} initial={{ opacity: 0, x: -45, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 30, scale: 0.98 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <motion.button type="button" onClick={requestPlay} className="group relative block aspect-square w-full overflow-hidden rounded-[30px] border border-white/10 bg-neutral-950 text-left shadow-[0_45px_140px_rgba(0,0,0,0.7)]" whileHover={{ y: -8, rotate: 0.5, scale: 1.012 }}>
              {track?.artwork ? (
                <Image src={track.artwork} alt={`${track.title} cover`} fill unoptimized sizes="(max-width: 1024px) 90vw, 560px" className="object-cover transition duration-1000 ease-out group-hover:scale-[1.035] group-hover:saturate-125" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.4em] text-white/20">Evelasting</div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/30" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[9px] uppercase tracking-[0.28em] text-white/70 backdrop-blur-xl">{isPlaying ? t("playingNow") : t("playRelease")}</div>
            </motion.button>
            <div aria-hidden="true" className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-[rgb(var(--player-accent)/0.28)] blur-[95px]" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={`${trackKey}-copy`} initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="h-[2px] w-16 origin-left bg-gradient-to-r from-[rgb(var(--player-accent))] to-white/85 shadow-[0_0_22px_rgb(var(--player-accent)/0.45)]" />
            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">Now playing · {formatDate(track?.publishedAt ?? "")}</p>
            <h3 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">{track?.title ?? t("loadingOfficial")}</h3>
            <p className="mt-3 text-sm uppercase tracking-[0.22em] text-white/35">{track?.artist ?? "Evelasting"}</p>
            <p className="mt-6 max-w-xl whitespace-pre-line text-sm leading-7 text-white/55 sm:text-base">{track?.description || "Release information is loaded automatically from the official SoundCloud playlist."}</p>

            <div className="mt-9 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md"><p className="text-[9px] uppercase tracking-[0.3em] text-white/35">{t("published")}</p><p className="mt-3 text-lg font-medium text-white/90">{formatDate(track?.publishedAt ?? "")}</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md"><p className="text-[9px] uppercase tracking-[0.3em] text-white/35">{t("genre")}</p><p className="mt-3 text-lg font-medium text-white/90">{track?.genre || t("music")}</p></div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.button type="button" onClick={requestPlay} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[rgb(var(--player-accent)/0.5)] bg-[rgb(var(--player-accent)/0.12)] px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-white">{isPlaying ? t("playing") : t("play")} <span aria-hidden="true">▶</span></motion.button>
              {track?.permalink && <motion.a href={track.permalink} target="_blank" rel="noreferrer" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.035] px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white">SoundCloud <span aria-hidden="true">↗</span></motion.a>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
