"use client";

import { motion } from "motion/react";

import BackgroundEffects from "./BackgroundEffects";
import Discography from "./Discography";
import FeaturedRelease from "./FeaturedRelease";
import NowPlayingRelease from "./NowPlayingRelease";
import { releases } from "./releases";
import { useLanguage } from "../LanguageContext";

export default function MusicSection() {
  const { t } = useLanguage();
  return (
    <section id="music" className="music-section relative isolate overflow-hidden border-t border-white/10 bg-black px-4 py-20 sm:px-6 sm:py-24 md:px-10 lg:px-12 lg:py-32">
      <BackgroundEffects />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.96)_0%,rgba(0,0,0,.2)_11%,rgba(0,0,0,.05)_47%,rgba(0,0,0,.08)_82%,rgba(0,0,0,.94)_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="grid gap-7 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/45 sm:text-xs">{t("liveSelection")}</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.25rem,8vw,4.5rem)] font-semibold tracking-[-0.045em] text-white ">{t("nowPlaying")}</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/50 lg:text-base">{t("musicIntro")}</p>
        </motion.div>

        <NowPlayingRelease />

        <div className="mt-20 border-t border-white/10 pt-16 sm:mt-24 sm:pt-20 lg:mt-32 lg:pt-28">
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/40">{t("originRelease")}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{t("storyBegins")}</h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/45">{t("storyBeginsDescription")}</p>
          </motion.div>
          <FeaturedRelease release={releases[0]} />
        </div>

        <Discography />
      </div>
    </section>
  );
}
