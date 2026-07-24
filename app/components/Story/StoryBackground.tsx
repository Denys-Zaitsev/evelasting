"use client";

import { motion } from "motion/react";

import type { StorySceneTone } from "./storyData";

type StoryBackgroundProps = {
  activeTone: StorySceneTone;
};

const toneStyles: Record<
  StorySceneTone,
  {
    primary: string;
    secondary: string;
    line: string;
  }
> = {
  neutral: {
    primary: "rgba(255, 255, 255, 0.03)",
    secondary: "rgba(255, 255, 255, 0.012)",
    line: "rgba(255, 255, 255, 0.07)",
  },

  cold: {
    primary: "rgba(47, 100, 255, 0.085)",
    secondary: "rgba(31, 72, 160, 0.03)",
    line: "rgba(94, 139, 255, 0.14)",
  },

  rebirth: {
    primary: "rgba(61, 69, 255, 0.1)",
    secondary: "rgba(174, 38, 189, 0.04)",
    line: "rgba(105, 132, 255, 0.18)",
  },

  silence: {
    primary: "rgba(110, 25, 25, 0.04)",
    secondary: "rgba(255, 255, 255, 0.008)",
    line: "rgba(255, 255, 255, 0.045)",
  },

  return: {
    primary: "rgba(255, 31, 50, 0.105)",
    secondary: "rgba(255, 83, 31, 0.035)",
    line: "rgba(255, 61, 78, 0.17)",
  },
};

export default function StoryBackground({
  activeTone,
}: StoryBackgroundProps) {
  const style = toneStyles[activeTone];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Основная цветная атмосфера */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `
            radial-gradient(
              circle at 72% 40%,
              ${style.primary} 0%,
              transparent 39%
            ),
            radial-gradient(
              circle at 16% 70%,
              ${style.secondary} 0%,
              transparent 36%
            )
          `,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        className="absolute -left-[12%] top-[18%] h-[34rem] w-[34rem] rounded-full blur-[130px]"
        animate={{
          x: activeTone === "return" ? 140 : activeTone === "cold" ? 30 : 0,
          y: activeTone === "silence" ? 110 : -20,
          opacity: activeTone === "neutral" ? 0.25 : 0.58,
          backgroundColor: style.secondary,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute -right-[10%] top-[42%] h-[38rem] w-[38rem] rounded-full blur-[150px]"
        animate={{
          x: activeTone === "rebirth" ? -120 : 20,
          y: activeTone === "return" ? -90 : 30,
          opacity: activeTone === "silence" ? 0.16 : 0.52,
          backgroundColor: style.primary,
        }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Центральная линия истории */}
      <motion.div
        className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
        animate={{
          backgroundColor: style.line,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/*
        Только вертикальные линии сетки.
        Горизонтальный gradient удалён, потому что именно он
        создавал длинные голубые и красные полосы.
      */}
      <div
        className="absolute inset-0 opacity-[0.014]"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.38) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "96px 100%",
          backgroundPosition: "center top",
        }}
      />

      {/* Дополнительное мягкое затемнение краёв */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 42%,
              rgba(0, 0, 0, 0.12) 72%,
              rgba(0, 0, 0, 0.34) 100%
            )
          `,
        }}
      />

      {/* Переход сверху */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-black/75 to-transparent" />

      {/* Переход снизу */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}