"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { usePlayer } from "../PlayerContext";

type HeroTopProps = { shouldReduceMotion: boolean | null };
export default function HeroTop({ shouldReduceMotion }: HeroTopProps) {
  const { tracks, playTrack } = usePlayer();
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || tracks.length < 2) return;
    const id = window.setInterval(() => setIndex((v) => (v + 1) % tracks.length), 4200);
    return () => window.clearInterval(id);
  }, [paused, tracks.length]);
  const track = tracks[index];
  return <div className="flex flex-col items-center justify-center text-center">
    <motion.button type="button" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => track && playTrack(index)} initial={shouldReduceMotion ? false : {opacity:0,y:-10}} animate={shouldReduceMotion ? undefined : {opacity:1,y:0}} transition={{duration:.75,delay:.15,ease:[.22,1,.36,1]}} className="group flex min-h-20 flex-col items-center">
      <div className="flex items-center gap-4"><span className="h-px w-8 bg-red-500/65"/><span className="text-[10px] uppercase tracking-[.28em] text-red-400/75">{t("latest")}</span><span className="h-px w-8 bg-red-500/65"/></div>
      <span className="relative mt-2 block h-5 min-w-[260px] overflow-hidden text-[11px] font-medium uppercase tracking-[.2em] text-white/55 transition-colors group-hover:text-white">
        <AnimatePresence mode="wait"><motion.span key={track?.id ?? "fallback"} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.45}} className="absolute inset-0">{track?.title ?? "Rebirth of the Ukrainian Phonk"}</motion.span></AnimatePresence>
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[.22em] text-white/25">{t("available")}</span>
    </motion.button>
    <motion.p initial={shouldReduceMotion ? false : {opacity:0,y:8}} animate={shouldReduceMotion ? undefined : {opacity:1,y:0}} transition={{duration:.7,delay:.32,ease:[.22,1,.36,1]}} className="mt-3 text-[10px] font-medium uppercase tracking-[.34em] text-white/35">{t("producer")}</motion.p>
  </div>;
}
