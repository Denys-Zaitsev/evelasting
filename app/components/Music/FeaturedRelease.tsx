"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { usePlayer } from "../PlayerContext";
import type { Release } from "./releases";

type FeaturedReleaseProps = {
  release: Release;
};

const revealTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

export default function FeaturedRelease({
  release,
}: FeaturedReleaseProps) {
  const { t } = useLanguage();
  const { tracks, currentTrack, isPlaying, playTrack, setPreviewArtwork } = usePlayer();
  const releaseTitle = release.title.toLowerCase();
  const targetTrack = tracks.find((track) => {
    const title = track.title.toLowerCase();
    return title.includes("rebirth") || title === releaseTitle;
  });
  const active = Boolean(targetTrack && currentTrack?.id === targetTrack.id && isPlaying);

  const playOriginRelease = () => {
    if (targetTrack) playTrack(targetTrack.index);
  };

  return (
    <div className="relative mt-14 lg:mt-20">
      {/* Огромная фоновая надпись */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-1/2 -z-10 hidden -translate-y-1/2 select-none whitespace-nowrap text-[clamp(140px,20vw,360px)] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.025] lg:block"
        initial={{
          opacity: 0,
          x: -80,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        Rebirth
      </motion.div>

      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-20">
        {/* Обложка */}
        <motion.div
          initial={{
            opacity: 0,
            x: -70,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={revealTransition}
          className="relative"
        >
          <motion.button
            type="button"
            onClick={playOriginRelease}
            onHoverStart={() => setPreviewArtwork(targetTrack?.artwork || release.cover)}
            onHoverEnd={() => setPreviewArtwork(null)}
            disabled={!targetTrack}
            aria-label={`Play ${release.title}`}
            className="group relative block aspect-square w-full overflow-hidden rounded-[30px] border border-white/10 bg-neutral-950 text-left shadow-[0_45px_140px_rgba(0,0,0,0.7)] outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-wait"
            whileHover={{
              y: -8,
              rotate: 0.5,
              scale: 1.012,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Image
              src={release.cover}
              alt={`${release.title} cover`}
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover transition duration-1000 ease-out group-hover:scale-[1.035] group-hover:saturate-125"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/30" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

            <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/[0.06]" />
            <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/65 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              {active ? `${t("playingNow")}  ▮▮` : targetTrack ? `${t("playRelease")}  ▶` : t("loadingRelease")}
            </div>
          </motion.button>

          {/* Свечение позади обложки */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-[rgb(var(--release-accent)/0.32)] blur-[90px] transition-colors duration-700"
          />
        </motion.div>

        {/* Информация */}
        <motion.div
          initial={{
            opacity: 0,
            x: 70,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            ...revealTransition,
            delay: 0.12,
          }}
        >
          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-[2px] w-16 origin-left bg-gradient-to-r from-blue-500 to-yellow-400 shadow-[0_0_22px_rgba(59,130,246,0.45)]"
          />

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
            Origin release · {release.year}
          </p>

          <h3 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            {release.title}
          </h3>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            {release.description}
          </p>

          {/* Метаданные */}
          <div className="mt-9 grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{
                y: -3,
                borderColor: "rgba(255,255,255,0.22)",
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md"
            >
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                Released
              </p>

              <p className="mt-3 text-lg font-medium text-white/90">
                {release.year}
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -3,
                borderColor: "rgba(255,255,255,0.22)",
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md"
            >
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                Genre
              </p>

              <p className="mt-3 text-lg font-medium text-white/90">
                {release.genre}
              </p>
            </motion.div>
          </div>

          {/* Платформы */}
          <div className="mt-8">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              {t("availableOn")}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <motion.a
                href={release.soundcloud}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-blue-500/50 bg-blue-500/10 px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(59,130,246,0.12)] transition hover:border-blue-400/80 hover:bg-blue-500/20"
              >
                SoundCloud
                <span aria-hidden="true">↗</span>
              </motion.a>

              {release.spotify && (
                <motion.a
                  href={release.spotify}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.035] px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
                >
                  Spotify
                  <span aria-hidden="true">↗</span>
                </motion.a>
              )}

              <Link
                href={`/music/${release.slug}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
              >
                Release page
              </Link>

              <motion.a
                href="#discography"
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-transparent px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55 transition hover:border-white/30 hover:text-white"
              >
                All releases
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
