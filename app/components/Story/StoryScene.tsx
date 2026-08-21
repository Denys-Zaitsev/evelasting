"use client";

import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

import StoryMedia from "./StoryMedia";
import StoryVerticalVideo from "./StoryVerticalVideo";

import type {
  StoryScene as StorySceneType,
  StorySceneTone,
} from "./storyData";
import { localize } from "./storyData";

type StorySceneProps = {
  scene: StorySceneType;
  index: number;
  onEnter: (tone: StorySceneTone) => void;
};

const accentClasses: Record<StorySceneTone, string> = {
  neutral: "text-white/50",
  cold: "text-blue-300",
  rebirth: "text-blue-300",
  silence: "text-white/32",
  return: "text-red-400",
};

const markerClasses: Record<StorySceneTone, string> = {
  neutral: "border-white/20 bg-white/10",
  cold: "border-blue-300/45 bg-blue-400/20",
  rebirth: "border-blue-300/65 bg-blue-400/35",
  silence: "border-white/15 bg-white/10",
  return: "border-red-400/65 bg-red-500/35",
};

export default function StoryScene({
  scene,
  index,
  onEnter,
}: StorySceneProps) {
  const { language } = useLanguage();
  const isEven = index % 2 === 0;
  const isVerticalVideo = scene.media?.layout === "vertical-right";

  return (
    <motion.article
      onViewportEnter={() => onEnter(scene.tone)}
      viewport={{
        amount: 0.38,
        margin: "-10% 0px -10% 0px",
      }}
      className="story-scene relative grid min-h-[48vh] items-center overflow-visible py-10 md:min-h-[58vh] md:grid-cols-2 md:py-14"
    >
      {scene.media &&
        (isVerticalVideo ? (
          <StoryVerticalVideo media={scene.media} />
        ) : (
          <StoryMedia media={scene.media} />
        ))}

      {scene.oversizedWord && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[19vw] font-black tracking-[-0.075em] text-white/[0.025] md:text-[14vw]"
        >
          {scene.oversizedWord ? localize(scene.oversizedWord, language) : ""}
        </motion.p>
      )}

      <div
        className={[
          "relative z-10",
          isEven
            ? "md:col-start-1 md:pr-16 lg:pr-24"
            : "md:col-start-2 md:pl-16 lg:pl-24",
        ].join(" ")}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: isEven ? -22 : 22,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.36,
          }}
          transition={{
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div className="flex items-center gap-4">
            <span
              className={[
                "h-2.5 w-2.5 rounded-full border",
                markerClasses[scene.tone],
              ].join(" ")}
            />

            <p
              className={[
                "text-xs font-medium uppercase tracking-[0.34em]",
                accentClasses[scene.tone],
              ].join(" ")}
            >
              {localize(scene.label, language)}
            </p>
          </div>

          <h3 className="story-scene-title mt-6 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl md:leading-[1.04]">
            {localize(scene.title, language)}
          </h3>

          {scene.description && (
            <p className="mt-6 max-w-xl text-base leading-7 text-white/52 md:text-lg md:leading-8">
              {scene.description ? localize(scene.description, language) : ""}
            </p>
          )}

          {scene.lines && (
            <div className="mt-7 max-w-xl space-y-2">
              {scene.lines.map((line, lineIndex) => {
                const isFinalRebirthLine =
                  scene.tone === "rebirth" &&
                  lineIndex === scene.lines!.length - 1;

                const isFinalReturnLine =
                  scene.tone === "return" &&
                  lineIndex === scene.lines!.length - 1;

                return (
                  <motion.p
                    key={`${scene.id}-${lineIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + lineIndex * 0.07,
                    }}
                    className={[
                      "text-base leading-7 md:text-lg",
                      isFinalRebirthLine
                        ? "font-medium text-white"
                        : isFinalReturnLine
                          ? "font-medium text-red-300"
                          : "text-white/44",
                    ].join(" ")}
                  >
                    {localize(line, language)}
                  </motion.p>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className={[
          "absolute left-1/2 top-1/2 z-[4] hidden h-px w-16 -translate-x-1/2 bg-gradient-to-r md:block",
          isEven
            ? "from-white/15 to-transparent"
            : "from-transparent to-white/15",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "absolute left-1/2 top-1/2 z-[5] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border md:block",
          markerClasses[scene.tone],
        ].join(" ")}
      />
    </motion.article>
  );
}
