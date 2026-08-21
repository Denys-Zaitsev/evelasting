"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useLanguage } from "../LanguageContext";
import LazyAutoplayVideo from "../LazyAutoplayVideo";


const processCaptions = [
  { start: 0, end: 8, eyebrow: "00:03", titleKey: "searchingIdea", descriptionKey: "searchingIdeaDescription" },
  { start: 8, end: 16, eyebrow: "00:10", titleKey: "findingMelody", descriptionKey: "findingMelodyDescription" },
  { start: 16, end: 24, eyebrow: "00:18", titleKey: "buildingAtmosphere", descriptionKey: "buildingAtmosphereDescription" },
  { start: 24, end: 33, eyebrow: "00:27", titleKey: "addingRhythm", descriptionKey: "addingRhythmDescription" },
  { start: 33, end: Number.POSITIVE_INFINITY, eyebrow: "00:35", titleKey: "trackExists", descriptionKey: "trackExistsDescription" },
] as const;

export default function StoryVideo() {
  const { t } = useLanguage();

  const [currentTime, setCurrentTime] = useState(0);

  const prefersReducedMotion = useReducedMotion();

  const activeCaption = useMemo(() => {
    return (
      processCaptions.find(
        (caption) =>
          currentTime >= caption.start &&
          currentTime < caption.end,
      ) ?? processCaptions[0]
    );
  }, [currentTime]);

  return (
    <section
      aria-label={t("creativeProcessLabel")}
      className="relative left-1/2 -mt-56 mb-0 w-screen -translate-x-1/2 sm:-mt-64 md:-mt-72 lg:-mt-80"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.08,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative h-[64vh] min-h-[520px] max-h-[760px] overflow-visible md:h-[72vh]"
      >
        <div
          className="absolute inset-x-[-4vw] inset-y-0 overflow-hidden"
          style={{
            WebkitMaskImage: `
              linear-gradient(
                to bottom,
                transparent 0%,
                rgba(0, 0, 0, 0.18) 7%,
                rgba(0, 0, 0, 0.8) 18%,
                black 34%,
                black 76%,
                rgba(0, 0, 0, 0.72) 88%,
                transparent 100%
              )
            `,
            maskImage: `
              linear-gradient(
                to bottom,
                transparent 0%,
                rgba(0, 0, 0, 0.18) 7%,
                rgba(0, 0, 0, 0.8) 18%,
                black 34%,
                black 76%,
                rgba(0, 0, 0, 0.72) 88%,
                transparent 100%
              )
            `,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          {/* Медленное движение камеры */}
          <motion.div
            className="absolute inset-0"
            animate={
              prefersReducedMotion
                ? {
                    scale: 1,
                    x: "0%",
                    y: "0%",
                  }
                : {
                    scale: [1, 1.015, 1],
                    x: ["0%", "-0.45%", "0%"],
                    y: ["0%", "-0.35%", "0%"],
                  }
            }
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              willChange: "transform",
              transformOrigin: "center center",
            }}
          >
            <LazyAutoplayVideo
              src="/story/midi-process5.mp4"
              onTimeUpdate={(event) =>
                setCurrentTime(event.currentTarget.currentTime)
              }
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: "center 46%",
                opacity: 0.72,
              }}
            />
          </motion.div>

          {/* Общее затемнение */}
          <div className="pointer-events-none absolute inset-0 bg-black/10" />

          {/* Растворение по бокам */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

          {/* Растворение сверху и снизу */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/82" />

          {/* Цветной свет поверх видео */}
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            animate={
              prefersReducedMotion
                ? {
                    opacity: 0.75,
                  }
                : {
                    opacity: [0.58, 0.82, 0.62],
                  }
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `
                radial-gradient(
                  circle at 30% 48%,
                  rgba(168, 85, 247, 0.24),
                  transparent 25%
                ),
                radial-gradient(
                  circle at 66% 44%,
                  rgba(59, 130, 246, 0.18),
                  transparent 28%
                ),
                radial-gradient(
                  circle at 58% 74%,
                  rgba(239, 68, 68, 0.11),
                  transparent 22%
                )
              `,
            }}
          />

          {/* Мягкое центральное свечение */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.04), transparent 20%)",
            }}
          />

          {/* Растворение под главным заголовком */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black via-black/45 to-transparent" />

          {/* Переход к следующей сцене */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 sm:px-10 md:px-16 md:pb-14 lg:px-[10vw]">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_0.78fr] md:items-end">
            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.38em] text-blue-300 md:text-xs">
                {t("process")}
              </p>

              <h3 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl md:text-5xl md:leading-[0.96]">
                {t("everyTrackBegins")}

                <span className="block text-white/45">
                  {t("withSingleIdea")}
                </span>
              </h3>
            </motion.div>

            <div className="md:justify-self-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCaption.titleKey}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="max-w-md border-l border-white/15 pl-5"
                >
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/35 md:text-[10px]">
                    {activeCaption.eyebrow}
                  </p>

                  <p className="mt-2 text-lg font-medium tracking-[-0.025em] text-white md:text-xl">
                    {t(activeCaption.titleKey)}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/45 md:text-sm md:leading-6">
                    {t(activeCaption.descriptionKey)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
