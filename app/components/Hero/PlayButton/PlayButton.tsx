"use client";

import { motion } from "motion/react";

import PlayIcon from "./PlayIcon";
import PlayWave from "./PlayWave";
import { useLanguage } from "../../LanguageContext";

type PlayButtonProps = {
  shouldReduceMotion: boolean | null;
  isActive?: boolean;
  onClick?: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PlayButton({
  shouldReduceMotion,
  isActive = false,
  onClick,
}: PlayButtonProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.82,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
        delay: 0.95,
        ease: EASE,
      }}
      className="
        group/play relative
        flex items-center justify-center
      "
    >
      <PlayWave
        delay={0}
        scale={1.7}
        opacity={0.48}
        shouldReduceMotion={shouldReduceMotion}
      />

      <PlayWave
        delay={1.6}
        scale={2.05}
        opacity={0.32}
        shouldReduceMotion={shouldReduceMotion}
      />

      <PlayWave
        delay={3.2}
        scale={2.4}
        opacity={0.2}
        shouldReduceMotion={shouldReduceMotion}
      />

      <motion.span
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [0.9, 1.12, 0.9],
                opacity: [0.18, 0.42, 0.18],
              }
        }
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none absolute
          h-52 w-52 rounded-full
          bg-red-600/25 blur-[58px]
          transition-transform duration-500
          group-hover/play:scale-125
        "
      />

      <motion.span
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none absolute
          h-36 w-36 rounded-full
          border border-dashed border-white/10
          transition-all duration-500
          group-hover/play:border-red-500/35
        "
      />

      <motion.a
        href="#music"
        aria-label={
          isActive
            ? t("pauseEvelasting")
            : t("playEvelasting")
        }
        data-active={isActive}
        onClick={(event) => {
          if (!onClick) return;

          event.preventDefault();
          onClick();
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.08,
              }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.96,
              }
        }
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 19,
        }}
        className={`
          relative z-10 flex
          h-28 w-28 items-center justify-center
          overflow-hidden rounded-full
          border outline-none
          transition-[background-color,border-color,color,box-shadow]
          duration-300
          hover:border-red-400
          hover:bg-red-600
          hover:text-white
          hover:shadow-[0_0_90px_rgba(239,68,68,0.48)]
          focus-visible:ring-2
          focus-visible:ring-red-500
          focus-visible:ring-offset-4
          focus-visible:ring-offset-black
          [@media(max-height:760px)]:h-24
          [@media(max-height:760px)]:w-24
          [@media(min-height:950px)]:h-32
          [@media(min-height:950px)]:w-32
          ${
            isActive
              ? "border-red-400 bg-red-600 text-white shadow-[0_0_100px_rgba(239,68,68,0.55)]"
              : "border-white/20 bg-white text-black shadow-[0_0_42px_rgba(255,255,255,0.1)]"
          }
        `}
      >
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            rounded-full
            bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.34),transparent_58%)]
            opacity-0
            transition-opacity duration-300
            group-hover/play:opacity-100
          "
        />

        <motion.span
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["-140%", "150%"],
                }
          }
          transition={{
            duration: 4.6,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: EASE,
          }}
          className="
            pointer-events-none absolute
            inset-y-0 w-10 -skew-x-12
            bg-white/30 blur-md
          "
        />

        <span
          className="
            pointer-events-none absolute inset-[8px]
            rounded-full border border-black/8
            transition-colors duration-300
            group-hover/play:border-white/20
          "
        />

        <PlayIcon isPlaying={isActive} />
      </motion.a>
    </motion.div>
  );
}