"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

import { type PlayerTrack, usePlayer } from "../PlayerContext";

function formatYear(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : String(date.getFullYear());
}

export default function ReleaseCard({ track, index }: { track: PlayerTrack; index: number }) {
  const { t } = useLanguage();
  const { currentTrack, isPlaying, playTrack, setPreviewArtwork } = usePlayer();
  const active = currentTrack?.id === track.id;

  return (
    <motion.article
      className="release-card-glass group relative rounded-[26px] p-3 outline-none"
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.055, 0.35), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -7 }}
      onHoverStart={() => setPreviewArtwork(track.artwork || null)}
      onHoverEnd={() => setPreviewArtwork(null)}
      onFocusCapture={() => setPreviewArtwork(track.artwork || null)}
      onBlurCapture={() => setPreviewArtwork(null)}
    >
      <button
        type="button"
        onClick={() => playTrack(track.index)}
        aria-label={`Play ${track.title}`}
        className="block w-full rounded-[24px] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <div
          className={`relative aspect-square overflow-hidden rounded-[24px] border bg-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.38)] transition duration-500 ${
            active
              ? "border-white/35 shadow-[0_30px_100px_rgb(var(--player-accent)/0.24)]"
              : "border-white/10 group-hover:border-white/20 group-hover:shadow-[0_32px_90px_rgba(0,0,0,0.58)]"
          }`}
        >
          {track.artwork ? (
            <Image
              src={track.artwork}
              alt={`${track.title} cover`}
              fill
              unoptimized
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:saturate-[1.12]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.35em] text-white/25">Evelasting</div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-60" />
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-[9px] tracking-[0.2em] text-white/65 backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition ${active ? "opacity-100" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}>
            {active && isPlaying ? t("nowPlaying") : t("play")}
            <span aria-hidden="true">{active && isPlaying ? "▮▮" : "▶"}</span>
          </div>

          {active && (
            <div className="absolute inset-x-6 bottom-0 h-px bg-[rgb(var(--player-accent))] shadow-[0_0_18px_rgb(var(--player-accent))]" />
          )}
        </div>
      </button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <button type="button" onClick={() => playTrack(track.index)} className="block max-w-full text-left">
            <h3 className="truncate text-sm font-medium text-white/90 transition group-hover:text-white">{track.title}</h3>
          </button>
          <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/35">{track.genre || t("music")}</p>
        </div>
        <span className="shrink-0 pt-0.5 text-[10px] text-white/30">{formatYear(track.publishedAt)}</span>
      </div>

      <a
        href={track.permalink}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35 transition hover:text-white"
      >
        SoundCloud <span aria-hidden="true">↗</span>
      </a>
    </motion.article>
  );
}
