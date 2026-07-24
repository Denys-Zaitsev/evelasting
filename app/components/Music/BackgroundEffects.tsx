"use client";

import { motion } from "motion/react";

const drift = { duration: 16, repeat: Infinity, ease: "easeInOut" as const };

export default function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div className="absolute -left-[20rem] top-[3rem] h-[66rem] w-[66rem] rounded-full bg-[rgb(var(--player-accent)/0.42)] blur-[150px]" animate={{ x: [0, 44, 0], y: [0, 28, 0], scale: [.96, 1.1, .96], opacity: [.7, 1, .7] }} transition={drift} />
      <motion.div className="absolute right-[-18rem] top-[30rem] h-[58rem] w-[58rem] rounded-full bg-[rgb(var(--release-accent)/0.34)] blur-[150px]" animate={{ x: [0, -38, 0], y: [0, -26, 0], scale: [1, 1.12, 1], opacity: [.58, .9, .58] }} transition={{ ...drift, duration: 18 }} />
      <motion.div className="absolute left-[8%] top-[78rem] h-[46rem] w-[46rem] rounded-full bg-[rgb(var(--release-accent)/0.28)] blur-[135px]" animate={{ x: [0, 52, 0], y: [0, -34, 0], opacity: [.48, .82, .48] }} transition={{ ...drift, duration: 19 }} />
      <motion.div className="absolute right-[2%] top-[142rem] h-[52rem] w-[52rem] rounded-full bg-[rgb(var(--release-accent)/0.31)] blur-[145px]" animate={{ x: [0, -46, 0], y: [0, 30, 0], opacity: [.5, .86, .5] }} transition={{ ...drift, duration: 21 }} />
      <motion.div className="absolute left-[18%] bottom-[10rem] h-[50rem] w-[50rem] rounded-full bg-[rgb(var(--player-accent)/0.22)] blur-[150px]" animate={{ x: [0, 35, 0], y: [0, -25, 0], opacity: [.42, .72, .42] }} transition={{ ...drift, duration: 20 }} />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, transparent 0%, rgb(var(--release-accent) / .08) 24%, transparent 43%, rgb(var(--release-accent) / .10) 67%, transparent 86%)" }} />
    </div>
  );
}
