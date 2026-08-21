"use client";

import { motion, useReducedMotion } from "motion/react";

import LazyAutoplayVideo from "../LazyAutoplayVideo";
import type { StoryMedia as StoryMediaType } from "./storyData";

type StoryVerticalVideoProps = {
  media: StoryMediaType;
};

export default function StoryVerticalVideo({
  media,
}: StoryVerticalVideoProps) {
  const prefersReducedMotion = useReducedMotion();

  const desktopOpacity = Math.min(media.opacity ?? 0.28, 0.4);
  const mobileOpacity = Math.min(desktopOpacity + 0.12, 0.58);

  return (
    <>
      {/* Desktop */}
      <motion.div
        aria-hidden="true"
        initial={{
          opacity: 0,
          y: 28,
          scale: 1.03,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.18,
        }}
        transition={{
          duration: 1.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute right-[-1%] top-[44%] z-[2] hidden h-[92%] w-[42%] -translate-y-1/2 overflow-visible md:block"
      >
        {/* Внешнее холодное свечение */}
        <motion.div
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? { opacity: 0.55, scale: 1 }
              : {
                  opacity: [0.38, 0.62, 0.44],
                  scale: [0.98, 1.04, 1],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-[8%] rounded-[45%] blur-[90px]"
          style={{
            background: `
              radial-gradient(
                ellipse at 50% 48%,
                rgba(68, 118, 255, 0.2) 0%,
                rgba(80, 70, 210, 0.12) 38%,
                transparent 76%
              )
            `,
          }}
        />

        {/* Само видео с мягкой маской со всех сторон */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: `
              radial-gradient(
                ellipse at 52% 48%,
                black 0%,
                black 42%,
                rgba(0, 0, 0, 0.9) 56%,
                rgba(0, 0, 0, 0.5) 72%,
                rgba(0, 0, 0, 0.15) 86%,
                transparent 100%
              )
            `,
            maskImage: `
              radial-gradient(
                ellipse at 52% 48%,
                black 0%,
                black 42%,
                rgba(0, 0, 0, 0.9) 56%,
                rgba(0, 0, 0, 0.5) 72%,
                rgba(0, 0, 0, 0.15) 86%,
                transparent 100%
              )
            `,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? {
                    scale: 1,
                    x: "0%",
                    y: "0%",
                  }
                : {
                    scale: [1, 1.018, 1],
                    x: ["0%", "-0.4%", "0%"],
                    y: ["0%", "-0.25%", "0%"],
                  }
            }
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: desktopOpacity,
              willChange: "transform",
            }}
          >
            <LazyAutoplayVideo
              src={media.src}
              className="h-full w-full object-cover"
              style={{ objectPosition: media.objectPosition ?? "center" }}
            />
          </motion.div>

          {/* Общее затемнение */}
          <div className="pointer-events-none absolute inset-0 bg-black/10" />

          {/* Затемняем сторону возле текста */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/15 to-black/25" />

          {/* Растворяем верх и низ */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75" />

          {/* Холодное свечение непосредственно на видео */}
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            animate={
              prefersReducedMotion
                ? { opacity: 0.6 }
                : { opacity: [.42, 0.5, 0.48] }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `
                radial-gradient(
                  circle at 42% 38%,
                  rgba(95, 140, 255, 0.24),
                  transparent 36%
                ),
                radial-gradient(
                  circle at 64% 64%,
                  rgba(115, 80, 255, 0.16),
                  transparent 43%
                )
              `,
            }}
          />

          {/* Лёгкий свет в центре */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.03), transparent 58%)",
            }}
          />
        </div>
      </motion.div>

      {/* Mobile */}
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
          scale: 1.02,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.22,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mt-8 h-[460px] w-full overflow-hidden md:hidden"
        style={{
          WebkitMaskImage: `
            linear-gradient(
              to bottom,
              transparent 0%,
              black 14%,
              black 82%,
              transparent 100%
            )
          `,
          maskImage: `
            linear-gradient(
              to bottom,
              transparent 0%,
              black 14%,
              black 82%,
              transparent 100%
            )
          `,
        }}
      >
        <LazyAutoplayVideo
          src={media.src}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: media.objectPosition ?? "center",
            opacity: mobileOpacity,
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />

        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at center, rgba(80,120,255,0.16), transparent 65%)",
          }}
        />
      </motion.div>
    </>
  );
}
