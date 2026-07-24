"use client";

import Image from "next/image";
import { memo } from "react";
import { useLanguage } from "../LanguageContext";
import type { PlayerTrack } from "../PlayerContext";

function formatYear(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : String(date.getFullYear());
}

type ReleaseCardProps = {
  track: PlayerTrack;
  index: number;
  active: boolean;
  isPlaying: boolean;
  onPlay: (index: number) => void;
  onPreview: (artwork: string | null) => void;
};

function ReleaseCard({ track, index, active, isPlaying, onPlay, onPreview }: ReleaseCardProps) {
  const { t } = useLanguage();

  return (
    <article
      className="release-card-glass group relative rounded-[26px] p-3 outline-none"
      onMouseEnter={() => onPreview(track.artwork || null)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(track.artwork || null)}
      onBlur={() => onPreview(null)}
    >
      <button type="button" onClick={() => onPlay(track.index)} aria-label={`Play ${track.title}`} className="block w-full rounded-[24px] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/60">
        <div className={`relative aspect-square overflow-hidden rounded-[24px] border bg-neutral-950 shadow-[0_18px_50px_rgba(0,0,0,0.34)] transition-[border-color,box-shadow] duration-300 ${active ? "border-white/35 shadow-[0_24px_70px_rgb(var(--player-accent)/0.18)]" : "border-white/10 group-hover:border-white/20"}`}>
          {track.artwork ? (
            <Image src={track.artwork} alt={`${track.title} cover`} fill unoptimized loading="lazy" sizes="(max-width: 620px) calc(100vw - 72px), (max-width: 980px) 42vw, 28vw" className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025]" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.25em] text-white/25">Evelasting</div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-55" />
          <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/65 px-2.5 py-1.5 text-[8px] tracking-[0.16em] text-white/70 sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[9px]">{String(index + 1).padStart(2, "0")}</div>
          <div className={`absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-opacity sm:bottom-4 sm:right-4 sm:px-4 sm:py-3 sm:text-[9px] ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
            {active && isPlaying ? t("nowPlaying") : t("play")} <span aria-hidden="true">{active && isPlaying ? "▮▮" : "▶"}</span>
          </div>
          {active && <div className="absolute inset-x-5 bottom-0 h-px bg-[rgb(var(--player-accent))] shadow-[0_0_14px_rgb(var(--player-accent))]" />}
        </div>
      </button>

      <div className="mt-3 flex min-w-0 items-start justify-between gap-3 sm:mt-4 sm:gap-4">
        <div className="min-w-0 flex-1">
          <button type="button" onClick={() => onPlay(track.index)} className="block max-w-full text-left"><h3 className="truncate text-sm font-medium text-white/90 transition-colors group-hover:text-white">{track.title}</h3></button>
          <p className="mt-1.5 truncate text-[8px] uppercase tracking-[0.18em] text-white/40 sm:mt-2 sm:text-[9px] sm:tracking-[0.22em]">{track.genre || t("music")}</p>
        </div>
        <span className="shrink-0 pt-0.5 text-[9px] text-white/35 sm:text-[10px]">{formatYear(track.publishedAt)}</span>
      </div>
      <a href={track.permalink} target="_blank" rel="noreferrer" className="mt-2.5 inline-flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white sm:mt-3 sm:text-[9px] sm:tracking-[0.22em]">SoundCloud <span aria-hidden="true">↗</span></a>
    </article>
  );
}

export default memo(ReleaseCard, (prev, next) => prev.track === next.track && prev.index === next.index && prev.active === next.active && prev.isPlaying === next.isPlaying && prev.onPlay === next.onPlay && prev.onPreview === next.onPreview);
