"use client";

import { useMemo, useRef, useState, type WheelEvent } from "react";

import { useLanguage } from "../LanguageContext";
import { usePlayer } from "../PlayerContext";
import ReleaseCard from "./ReleaseCard";

type ReleaseFilter = "all" | "phonk" | "chill" | "aggressive" | "collab" | "single";

function matchesFilter(title: string, genre: string, filter: ReleaseFilter) {
  if (filter === "all") return true;
  const value = `${title} ${genre}`.toLowerCase();
  if (filter === "phonk") return value.includes("phonk");
  if (filter === "chill") return /chill|ambient|wave|dream|sunset/.test(value);
  if (filter === "aggressive") return /aggressive|drift|hard|rage|rap|trap/.test(value);
  if (filter === "collab") return /feat\.|featuring|&| x |collab/.test(value);
  return !/feat\.|featuring|&| x |collab/.test(value);
}

export default function Discography() {
  const { tracks, currentTrack, isReady } = usePlayer();
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ReleaseFilter>("all");

  const visibleTracks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tracks.filter((track) => {
      const searchable = `${track.title} ${track.genre || ""}`.toLowerCase();
      return (!normalized || searchable.includes(normalized)) && matchesFilter(track.title, track.genre || "", filter);
    });
  }, [tracks, query, filter]);

  const scrollByRows = (direction: number) => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.scrollBy({ top: direction * Math.max(520, grid.clientHeight * 0.9), behavior: "smooth" });
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const grid = gridRef.current;
    if (!grid) return;
    const atTop = grid.scrollTop <= 1;
    const atBottom = grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 1;
    if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) return;
    event.stopPropagation();
  };

  const filters: Array<{ value: ReleaseFilter; label: string }> = [
    { value: "all", label: t("filterAll") },
    { value: "phonk", label: "Phonk" },
    { value: "chill", label: "Chill" },
    { value: "aggressive", label: t("filterAggressive") },
    { value: "collab", label: t("filterCollab") },
    { value: "single", label: t("filterSingle") },
  ];

  return (
    <div id="discography" className="relative isolate mt-24 scroll-mt-24 lg:mt-32">
      <div aria-hidden className="pointer-events-none absolute -inset-x-[18vw] -inset-y-28 -z-10 bg-[radial-gradient(ellipse_62%_42%_at_50%_45%,rgb(var(--release-accent)/.28),transparent_72%)] blur-[25px]" />

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-white/45">{t("discography")}</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-.035em] text-white sm:text-5xl">{t("allReleases")}</h3>
        </div>
        <div className="max-w-md">
          <p className="text-sm leading-6 text-white/50">{t("chooseRelease")}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[.16em] text-white/30">
            {currentTrack ? `${t("active")}: ${currentTrack.title}` : isReady ? t("choose") : t("loading")}
          </p>
        </div>
      </div>

      {tracks.length > 0 ? (
        <div className="release-library relative mt-10 overflow-hidden rounded-[34px] border border-white/10 bg-black/45 p-4 shadow-[0_34px_120px_rgba(0,0,0,.62)] backdrop-blur-xl md:p-7">
          <div className="release-library-toolbar">
            <label className="release-search">
              <span aria-hidden>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchReleases")} aria-label={t("searchReleases")} />
            </label>
            <div className="release-filters" aria-label={t("releaseFilters")}>
              {filters.map((item) => (
                <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={filter === item.value ? "is-active" : ""}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button type="button" aria-label={t("previousReleases")} onClick={() => scrollByRows(-1)} className="release-library-arrow release-library-arrow-up">↑</button>
          <button type="button" aria-label={t("nextReleases")} onClick={() => scrollByRows(1)} className="release-library-arrow release-library-arrow-down">↓</button>
          <div aria-hidden className="release-library-fade release-library-fade-top" />
          <div aria-hidden className="release-library-fade release-library-fade-bottom" />

          <div ref={gridRef} onWheel={handleWheel} className="release-library-scroll" tabIndex={0} aria-label={t("allReleases")}>
            {visibleTracks.length ? (
              <div className="release-library-grid">
                {visibleTracks.map((track) => {
                  const originalIndex = tracks.findIndex((item) => item.id === track.id);
                  return <div key={track.id} className="release-library-card"><ReleaseCard track={track} index={originalIndex} /></div>;
                })}
              </div>
            ) : (
              <div className="release-library-empty">{t("noReleasesFound")}</div>
            )}
          </div>

          <p className="mt-4 text-center text-[10px] uppercase tracking-[.22em] text-white/25">{t("verticalHint")}</p>
        </div>
      ) : (
        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[.025] px-6 py-16 text-center text-sm text-white/35">{t("loading")}</div>
      )}
    </div>
  );
}
