"use client";

import Image from "next/image";
import { motion } from "motion/react";

type HeroLogoProps = {
  shouldReduceMotion: boolean | null;
};

export default function HeroLogo({
  shouldReduceMotion,
}: HeroLogoProps) {
  return (
    <div className="flex min-h-0 items-center justify-center">
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.9,
                filter: "blur(14px)",
              }
        }
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        transition={{
          duration: 1.3,
          delay: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          flex w-[min(78vw,1500px)]
          items-center justify-center
          [@media(max-height:760px)]:w-[min(65vw,1050px)]
          [@media(min-height:1000px)]:w-[min(80vw,1650px)]
        "
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.035, 1],
                  opacity: [0.96, 1, 0.96],
                  filter: [
                    "drop-shadow(0 0 0 rgba(255,255,255,0))",
                    "drop-shadow(0 0 34px rgba(255,255,255,0.16))",
                    "drop-shadow(0 0 0 rgba(255,255,255,0))",
                  ],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full"
        >
          <Image
            src="/images/evelasting-logo.png"
            alt="Evelasting"
            width={1800}
            height={450}
            priority
            className="h-auto w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}