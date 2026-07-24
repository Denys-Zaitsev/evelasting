"use client";

import Image from "next/image";
import { motion } from "motion/react";

type HeroLogoProps = {
  shouldReduceMotion: boolean | null;
};

export default function HeroLogo({ shouldReduceMotion }: HeroLogoProps) {
  return (
    <div className="flex min-h-0 w-full items-center justify-center overflow-visible px-0 sm:px-3">
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 34, scale: 0.84, filter: "blur(14px)" }
        }
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.95,
          delay: 0.28,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative mx-auto flex w-[min(96vw,1500px)] items-center justify-center"
      >
        <Image
          src="/evelasting-logo.png"
          alt="Evelasting"
          width={1800}
          height={450}
          priority
          sizes="(max-width: 640px) 96vw, (max-width: 1280px) 90vw, 1500px"
          className="hero-logo mx-auto h-auto w-full select-none object-contain"
        />
      </motion.div>
    </div>
  );
}
