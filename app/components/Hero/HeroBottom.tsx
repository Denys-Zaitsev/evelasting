"use client";

import { motion } from "motion/react";
import { usePlayer } from "../PlayerContext";
import { useLanguage } from "../LanguageContext";
import { useArtistStats } from "./hooks/useArtistStats";
import PlayButton from "./PlayButton/PlayButton";
import StreamsCounter from "./StreamsCounter/StreamsCounter";

const FALLBACK_TOTAL_PLAYS = 1_068_987;
const HOVER_EASE = [0.22, 1, 0.36, 1] as const;

type HeroBottomProps = { shouldReduceMotion: boolean | null };

export default function HeroBottom({ shouldReduceMotion }: HeroBottomProps) {
  const { stats } = useArtistStats();
  const { t } = useLanguage();
  const { isPlaying, togglePlayback } = usePlayer();
  const totalPlays = stats?.total ?? FALLBACK_TOTAL_PLAYS;

  const handlePlay = () => {
    togglePlayback();
    if (!isPlaying) document.getElementById("music")?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="hero-bottom mx-auto grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-5 pb-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6 md:gap-12 lg:gap-16 [@media(max-height:760px)]:gap-4">
      <motion.div initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: HOVER_EASE }} className="order-2 min-w-0 sm:order-1 sm:justify-self-end">
        <div className="group flex cursor-default flex-col items-center text-center sm:items-end sm:text-right">
          <p className="max-w-full text-[clamp(1.7rem,7.5vw,3.65rem)] font-semibold leading-none tracking-[-0.065em] text-white">
            <StreamsCounter value={totalPlays} shouldReduceMotion={shouldReduceMotion} />
          </p>
          <div className="mt-2 flex items-center gap-3 sm:mt-3"><span className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/70 md:text-[9px] md:tracking-[0.32em]">{t("totalPlays")}</span><span className="h-px w-7 bg-red-500/80 transition-all duration-200 group-hover:w-12 sm:w-9" /></div>
          <p className="mt-1.5 text-[7px] uppercase tracking-[0.18em] text-white/68 md:text-[8px] md:tracking-[0.22em]">YouTube <span className="px-1 text-red-500/80">•</span> SoundCloud</p>
        </div>
      </motion.div>

      <div className="order-1 sm:order-2"><PlayButton shouldReduceMotion={shouldReduceMotion} isActive={isPlaying} onClick={handlePlay} /></div>

      <motion.div initial={shouldReduceMotion ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.15, ease: HOVER_EASE }} className="order-3 hidden min-w-0 flex-col items-start text-left sm:flex sm:justify-self-start">
        <p className="max-w-[220px] text-[8px] uppercase leading-5 tracking-[0.24em] text-white/72 md:text-[9px] md:tracking-[0.34em]">{t("soundReturns")}</p>
        <a href="#story" className="group mt-4 inline-flex items-center gap-3 text-[7px] uppercase tracking-[0.24em] text-white/68 transition-colors duration-300 hover:text-white md:text-[8px] md:tracking-[0.3em]"><span className="h-px w-6 bg-white/45 transition-all duration-500 group-hover:w-10 group-hover:bg-red-500" />{t("discover")}</a>
      </motion.div>
    </div>
  );
}
