"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

import { usePlayer } from "../PlayerContext";

type HeroBackgroundProps = {
  shouldReduceMotion: boolean | null;
};

function BackgroundParticles({
  shouldReduceMotion,
}: HeroBackgroundProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${7 + ((index * 19) % 86)}%`,
        top: `${18 + ((index * 31) % 66)}%`,
        size: index % 4 === 0 ? 2 : 1,
        duration: 12 + (index % 5) * 2,
        delay: (index % 7) * 1.2,
      })),
    [],
  );

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="hero-particles absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{
            x: [
              0,
              particle.id % 2 === 0 ? 9 : -9,
              0,
            ],
            y: [18, -18, -55],
            opacity: [0, 0.22, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-red-500"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 10px rgba(239,68,68,0.45)",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroBackground({
  shouldReduceMotion,
}: HeroBackgroundProps) {
  const { isPlaying, currentTrack } = usePlayer();
  const hasActiveTrack = isPlaying && Boolean(currentTrack);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hero-core-glow absolute left-1/2 top-[52%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[220px] transition-colors duration-1000 md:h-[920px] md:w-[920px]"
        style={{ backgroundColor: hasActiveTrack ? "rgb(var(--hero-accent) / 0.52)" : "rgba(69, 10, 10, 0.45)" }}
      />

      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-1000 ${hasActiveTrack ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: "radial-gradient(ellipse 60% 48% at 50% 56%, rgb(var(--hero-accent) / 0.30), transparent 72%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="hero-orbit hero-orbit-left"
        animate={shouldReduceMotion ? undefined : { x: [-18, 20, -18], y: [10, -16, 10], scale: [0.94, 1.08, 0.94] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-orbit hero-orbit-right"
        animate={shouldReduceMotion ? undefined : { x: [22, -16, 22], y: [-12, 18, -12], scale: [1.06, 0.92, 1.06] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-light-beam hero-light-beam-one"
        animate={shouldReduceMotion ? undefined : { rotate: [-7, 4, -7], opacity: [0.12, 0.3, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-light-beam hero-light-beam-two"
        animate={shouldReduceMotion ? undefined : { rotate: [8, -3, 8], opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.25)_42%,rgba(0,0,0,0.98)_100%)]
        "
      />

      <div
        className="
          absolute inset-x-0 bottom-0 h-32
          bg-gradient-to-t from-black to-transparent
        "
      />

      <BackgroundParticles
        shouldReduceMotion={shouldReduceMotion}
      />
    </div>
  );
}
