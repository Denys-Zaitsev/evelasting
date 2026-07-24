"use client";

import { motion } from "motion/react";

import { usePlayer } from "../PlayerContext";
import { useLanguage } from "../LanguageContext";
import { useArtistStats } from "./hooks/useArtistStats";
import PlayButton from "./PlayButton/PlayButton";
import StreamsCounter from "./StreamsCounter/StreamsCounter";

const FALLBACK_TOTAL_PLAYS = 1_068_987;
const HOVER_EASE = [0.22, 1, 0.36, 1] as const;

type HeroBottomProps = {
  shouldReduceMotion: boolean | null;
};

export default function HeroBottom({
  shouldReduceMotion,
}: HeroBottomProps) {
  const { stats } = useArtistStats();
  const { t } = useLanguage();
  const { isPlaying, togglePlayback } = usePlayer();

  const totalPlays = stats?.total ?? FALLBACK_TOTAL_PLAYS;

  const handlePlay = () => {
    togglePlayback();

    if (!isPlaying) {
      document.getElementById("music")?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-16 [@media(max-height:760px)]:scale-[0.88] [@media(max-height:760px)]:gap-8">
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                x: -22,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          ease: HOVER_EASE,
        }}
      >
        <motion.div
          className="group flex cursor-default flex-col items-end pr-2 text-right md:pr-3"
        >
          <p className="text-[clamp(2rem,3vw,3.65rem)] font-semibold leading-none tracking-[-0.065em] text-white ">
            <StreamsCounter
              value={totalPlays}
              shouldReduceMotion={shouldReduceMotion}
            />
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-[8px] font-medium uppercase tracking-[0.32em] text-white/70 md:text-[9px]">
              {t("totalPlays")}
            </span>

            <span className="h-px w-9 bg-red-500/80 transition-all duration-200 group-hover:w-14" />
          </div>

          <p className="mt-2 text-[7px] uppercase tracking-[0.22em] text-white/38 md:text-[8px]">
            YouTube{" "}
            <span className="px-1 text-red-500/80">•</span>{" "}
            SoundCloud
          </p>
        </motion.div>
      </motion.div>

      <PlayButton
        shouldReduceMotion={shouldReduceMotion}
        isActive={isPlaying}
        onClick={handlePlay}
      />

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                x: 22,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 1.15,
          ease: HOVER_EASE,
        }}
        className="flex flex-col items-start text-left"
      >
        <p className="max-w-[220px] text-[8px] uppercase leading-5 tracking-[0.34em] text-white/56 md:text-[9px]">
          {t("soundReturns")}
        </p>

        <a
          href="#story"
          className="group mt-4 inline-flex items-center gap-3 text-[7px] uppercase tracking-[0.3em] text-white/30 transition-colors duration-300 hover:text-white md:text-[8px]"
        >
          <span className="h-px w-6 bg-white/20 transition-all duration-500 group-hover:w-10 group-hover:bg-red-500" />
          {t("discover")}
        </a>
      </motion.div>
    </div>
  );
}
