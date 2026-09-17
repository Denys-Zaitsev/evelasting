"use client";

import { useCallback, useMemo, useState } from "react";

import { useLanguage } from "../LanguageContext";
import { usePlayer } from "../PlayerContext";
import ReleaseCard from "./ReleaseCard";

type ReleaseFilter = "all" | "phonk" | "chill" | "collab";

type DiscographyProps = {
  headingLevel?: "h1" | "h2" | "h3";
  isPage?: boolean;
};

function matchesFilter(title: string, genre: string, filter: ReleaseFilter) {
  if (filter === "all") return true;
  const normalizedTitle = title.toLowerCase();
  const value = `${title} ${genre}`.toLowerCase();
  if (filter === "phonk") return /phonk|hip-hop|rap/.test(value);
  if (filter === "chill") return /chill|ambient|wave|dream|sunset|silence|violin/.test(value);
  return /feat\.|featuring|&| x |collab/.test(normalizedTitle);
}

export default function Discography({ headingLevel = "h3", isPage = false }: DiscographyProps) {
  const { tracks, currentTrack, isReady, isPlaying, playTrack, setPreviewArtwork } = usePlayer();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ReleaseFilter>("all");
  const Heading = headingLevel;

  const visibleTracks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tracks.filter((track) => {
      const searchable = `${track.title} ${track.genre || ""}`.toLowerCase();
      return (!normalized || searchable.includes(normalized)) && matchesFilter(track.title, track.genre || "", filter);
    });
  }, [tracks, query, filter]);

  const handlePlay = useCallback((index: number) => playTrack(index), [playTrack]);
  const handlePreview = useCallback((artwork: string | null) => setPreviewArtwork(artwork), [setPreviewArtwork]);


  const filters: Array<{ value: ReleaseFilter; label: string }> = [
    { value: "all", label: t("filterAll") },
    { value: "phonk", label: "Phonk" },
    { value: "chill", label: "Chill" },
    { value: "collab", label: t("filterCollab") },
  ];

  return (
    <div id="discography" className={`relative isolate scroll-mt-24 ${isPage ? "mt-0" : "mt-24 lg:mt-32"}`}>
      <div aria-hidden className="pointer-events-none absolute -inset-x-[18vw] -inset-y-28 -z-10 bg-[radial-gradient(ellipse_62%_42%_at_50%_45%,rgb(var(--release-accent)/.28),transparent_72%)] blur-[25px]" />

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-white/45">{t("discography")}</p>
          <Heading className="mt-3 text-3xl font-semibold tracking-[-.035em] text-white sm:text-5xl">{t("allReleases")}</Heading>
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

          <div className="release-library-scroll" aria-label={t("allReleases")}>
            {visibleTracks.length ? (
              <div className="release-library-grid">
                {visibleTracks.map((track) => {
                  const originalIndex = tracks.findIndex((item) => item.id === track.id);
                  return <div key={track.id} className="release-library-card"><ReleaseCard track={track} index={originalIndex} active={currentTrack?.id === track.id} isPlaying={Boolean(currentTrack?.id === track.id && isPlaying)} onPlay={handlePlay} onPreview={handlePreview} /></div>;
                })}
              </div>
            ) : (
              <div className="release-library-empty">{t("noReleasesFound")}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[.025] px-6 py-16 text-center text-sm text-white/35">{t("loading")}</div>
      )}
    </div>
  );
}
