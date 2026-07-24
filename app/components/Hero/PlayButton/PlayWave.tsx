"use client";

import { motion } from "motion/react";

type PlayWaveProps = {
  delay: number;
  shouldReduceMotion: boolean | null;
  scale: number;
  opacity: number;
};

export default function PlayWave({
  delay,
  shouldReduceMotion,
  scale,
  opacity,
}: PlayWaveProps) {
  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={{
        scale: 0.72,
        opacity: 0,
      }}
      animate={{
        scale: [0.72, scale],
        opacity: [0, opacity, 0],
      }}
      transition={{
        duration: 4.8,
        delay,
        repeat: Infinity,
        ease: [0.2, 0.68, 0.22, 1],
      }}
      className="
        pointer-events-none absolute
        h-28 w-28 rounded-full
        border border-red-500/55
      "
    />
  );
}