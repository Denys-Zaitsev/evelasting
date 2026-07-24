"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import type {
  StoryMedia as StoryMediaType,
  StoryMediaLayout,
} from "./storyData";
import { localize } from "./storyData";
import { useLanguage } from "../LanguageContext";

type StoryMediaProps = {
  media: StoryMediaType;
};

const desktopLayoutClasses: Record<StoryMediaLayout, string> = {
  "project-left":
    "left-[-14vw] top-1/2 h-[78%] w-[64vw] -translate-y-1/2",

  "project-right":
    "right-[-14vw] top-1/2 h-[78%] w-[64vw] -translate-y-1/2",

  "project-wide":
    "left-1/2 top-1/2 h-[84%] w-[108vw] -translate-x-1/2 -translate-y-1/2",

  "portrait-right":
    "right-[-4vw] top-1/2 h-[88%] w-[48vw] -translate-y-1/2",

  // Обрабатывается отдельным компонентом StoryVerticalVideo.
  "vertical-right":
    "right-[3%] top-1/2 h-[86%] w-[34%] -translate-y-1/2",
};

function getVerticalMask(layout: StoryMediaLayout): string {
  if (layout === "vertical-right") {
    return `
      linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.3) 9%,
        rgba(0, 0, 0, 0.82) 20%,
        black 32%,
        black 70%,
        rgba(0, 0, 0, 0.78) 82%,
        rgba(0, 0, 0, 0.25) 92%,
        transparent 100%
      )
    `;
  }

  return `
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.12) 7%,
      rgba(0, 0, 0, 0.55) 16%,
      rgba(0, 0, 0, 0.9) 27%,
      black 38%,
      black 66%,
      rgba(0, 0, 0, 0.86) 77%,
      rgba(0, 0, 0, 0.45) 88%,
      rgba(0, 0, 0, 0.1) 96%,
      transparent 100%
    )
  `;
}

function getHorizontalMask(layout: StoryMediaLayout): string {
  switch (layout) {
    case "project-left":
      return `
        linear-gradient(
          to right,
          transparent 0%,
          rgba(0, 0, 0, 0.2) 7%,
          rgba(0, 0, 0, 0.78) 18%,
          black 31%,
          black 66%,
          rgba(0, 0, 0, 0.72) 79%,
          rgba(0, 0, 0, 0.18) 92%,
          transparent 100%
        )
      `;

    case "project-right":
      return `
        linear-gradient(
          to right,
          transparent 0%,
          rgba(0, 0, 0, 0.18) 8%,
          rgba(0, 0, 0, 0.72) 21%,
          black 34%,
          black 69%,
          rgba(0, 0, 0, 0.78) 82%,
          rgba(0, 0, 0, 0.2) 93%,
          transparent 100%
        )
      `;

    case "project-wide":
      return `
        linear-gradient(
          to right,
          transparent 0%,
          rgba(0, 0, 0, 0.16) 7%,
          rgba(0, 0, 0, 0.7) 18%,
          black 30%,
          black 70%,
          rgba(0, 0, 0, 0.7) 82%,
          rgba(0, 0, 0, 0.16) 93%,
          transparent 100%
        )
      `;

    case "portrait-right":
      return `
        linear-gradient(
          to right,
          transparent 0%,
          rgba(0, 0, 0, 0.14) 10%,
          rgba(0, 0, 0, 0.56) 25%,
          rgba(0, 0, 0, 0.9) 40%,
          black 56%,
          black 82%,
          rgba(0, 0, 0, 0.55) 93%,
          transparent 100%
        )
      `;

    case "vertical-right":
      return `
        linear-gradient(
          to right,
          transparent 0%,
          rgba(0, 0, 0, 0.38) 13%,
          black 28%,
          black 74%,
          rgba(0, 0, 0, 0.38) 90%,
          transparent 100%
        )
      `;
  }
}

const mobileVerticalMask = `
  linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.45) 10%,
    black 24%,
    black 74%,
    rgba(0, 0, 0, 0.45) 90%,
    transparent 100%
  )
`;

const mobileHorizontalMask = `
  linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 10%,
    black 24%,
    black 76%,
    rgba(0, 0, 0, 0.4) 90%,
    transparent 100%
  )
`;

function getImageAnimation(
  layout: StoryMediaLayout,
  reducedMotion: boolean,
) {
  if (reducedMotion) {
    return {
      scale: 1.025,
      x: "0%",
      y: "0%",
    };
  }

  switch (layout) {
    case "project-left":
      return {
        scale: [1.025, 1.04, 1.025],
        x: ["0%", "-0.9%", "0%"],
        y: ["0%", "-0.4%", "0%"],
      };

    case "project-right":
      return {
        scale: [1.025, 1.04, 1.025],
        x: ["0%", "0.9%", "0%"],
        y: ["0%", "-0.35%", "0%"],
      };

    case "project-wide":
      return {
        scale: [1.02, 1.034, 1.02],
        x: ["0%", "-0.65%", "0.5%", "0%"],
        y: ["0%", "-0.3%", "0%"],
      };

    case "portrait-right":
      return {
        scale: [1.03, 1.045, 1.03],
        x: ["0%", "0.5%", "0%"],
        y: ["0%", "-0.35%", "0%"],
      };

    case "vertical-right":
      return {
        scale: 1,
        x: "0%",
        y: "0%",
      };
  }
}

function getAnimationDuration(layout: StoryMediaLayout) {
  switch (layout) {
    case "project-left":
      return 12;

    case "project-right":
      return 13;

    case "project-wide":
      return 15;

    case "portrait-right":
      return 16;

    case "vertical-right":
      return 14;
  }
}

export default function StoryMedia({
  media,
}: StoryMediaProps) {
  const { language } = useLanguage();
  const mediaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });

  const movement = media.parallax ?? 24;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [movement, -movement],
  );

  const opacity = media.opacity ?? 0.5;
  const isPortrait = media.layout === "portrait-right";

  const verticalMask = getVerticalMask(media.layout);
  const horizontalMask = getHorizontalMask(media.layout);

  const imageAnimation = getImageAnimation(
    media.layout,
    Boolean(prefersReducedMotion),
  );

  const animationDuration = getAnimationDuration(media.layout);

  return (
    <>
      {/* Desktop */}
      <motion.div
        ref={mediaRef}
        aria-hidden="true"
        style={{ y }}
        initial={{
          opacity: 0,
          scale: 1.012,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.22,
        }}
        transition={{
          opacity: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
          scale: {
            duration: 1.05,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className={[
          "pointer-events-none absolute z-0 hidden overflow-hidden will-change-transform md:block",
          desktopLayoutClasses[media.layout],
        ].join(" ")}
      >
        {/* Первая маска: верх и низ */}
        <div
          className="absolute inset-0"
          style={{
            opacity,
            WebkitMaskImage: verticalMask,
            maskImage: verticalMask,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          {/* Вторая маска: левый и правый края */}
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: horizontalMask,
              maskImage: horizontalMask,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          >
            <motion.div
              animate={imageAnimation}
              transition={{
                duration: animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-[-2.5%]"
              style={{
                willChange: "transform",
                transformOrigin: isPortrait
                  ? "68% center"
                  : "center center",
              }}
            >
              <Image
                src={media.src}
                alt=""
                fill
                sizes={isPortrait ? "54vw" : "76vw"}
                className="select-none object-cover"
                style={{
                  objectPosition:
                    media.objectPosition ??
                    (isPortrait ? "68% center" : "center"),
                }}
              />
            </motion.div>

            {!isPortrait && (
              <>
                <div className="absolute inset-0 bg-black/18" />

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/58" />

                <div className="absolute inset-0 bg-gradient-to-r from-black/22 via-transparent to-black/22" />

                <div
                  className="pointer-events-none absolute inset-0 mix-blend-screen"
                  style={{
                    background: `
                      radial-gradient(
                        ellipse at 54% 48%,
                        rgba(65, 105, 230, 0.055),
                        transparent 70%
                      )
                    `,
                  }}
                />
              </>
            )}

            {isPortrait && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/12 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/58" />

                <motion.div
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.34 }
                      : { opacity: [0.26, 0.42, 0.28] }
                  }
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    background: `
                      radial-gradient(
                        circle at 70% 48%,
                        rgba(255, 48, 48, 0.13),
                        transparent 52%
                      )
                    `,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile */}
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
          scale: 1.015,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mt-8 h-[240px] w-full overflow-hidden md:hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: Math.min(opacity + 0.08, 0.88),
            WebkitMaskImage: mobileVerticalMask,
            maskImage: mobileVerticalMask,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: mobileHorizontalMask,
              maskImage: mobileHorizontalMask,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          >
            <Image
              src={media.src}
              alt={localize(media.alt, language)}
              fill
              sizes="100vw"
              className="select-none object-cover"
              style={{
                objectPosition:
                  media.objectPosition ??
                  (isPortrait ? "68% center" : "center"),
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/58" />
          </div>
        </div>
      </motion.div>
    </>
  );
}