"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

import StoryBackground from "./StoryBackground";
import StoryIntro from "./StoryIntro";
import StoryVideo from "./StoryVideo";
import StoryScene from "./StoryScene";

import {
  storyScenes,
  type StorySceneTone,
} from "./storyData";

export default function StorySection() {
  const { t } = useLanguage();
  const [activeTone, setActiveTone] =
    useState<StorySceneTone>("neutral");

  return (
    <section
      id="story"
      className="relative isolate overflow-hidden border-t border-white/10 bg-black px-6 md:px-12"
    >
      <StoryBackground activeTone={activeTone} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <StoryIntro />

        <StoryVideo />

        <div className="relative">
          {storyScenes.map((scene, index) => (
            <StoryScene
              key={scene.id}
              scene={scene}
              index={index}
              onEnter={setActiveTone}
            />
          ))}
        </div>

        <motion.div
          onViewportEnter={() => setActiveTone("return")}
          viewport={{ amount: 0.45 }}
          className="relative flex min-h-[58vh] items-center justify-center py-16 text-center md:min-h-[68vh] md:py-20"
        >
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.7,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xs uppercase tracking-[0.38em] text-red-400"
            >
              {t("endingBrand")}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.55,
              }}
              transition={{
                duration: 0.85,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl md:text-8xl lg:text-[6.6rem] lg:leading-[0.92]"
            >
              {t("endingTitle1")}
              <span className="block text-red-400">{t("endingTitle2")}</span>
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{
                once: true,
                amount: 0.7,
              }}
              transition={{
                duration: 0.75,
                delay: 0.28,
              }}
              className="mx-auto mt-10 max-w-2xl border-t border-white/10 pt-7"
            >
              <p className="text-base leading-8 text-white/45 md:text-lg">
                {t("endingNotEnd")}
              </p>

              <p className="mt-1 text-base font-medium leading-8 text-white md:text-lg">
                {t("endingReturn")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}