"use client";

import { useReducedMotion } from "motion/react";

import HeroBackground from "./HeroBackground";
import HeroBottom from "./HeroBottom";
import HeroLogo from "./HeroLogo";
import HeroTop from "./HeroTop";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="
        relative h-[100svh] min-h-[640px]
        overflow-hidden bg-black px-6 text-white
        md:px-10
      "
    >
      <HeroBackground
        shouldReduceMotion={shouldReduceMotion}
      />

      <div
        className="
          relative z-10 mx-auto grid h-full w-full max-w-[1700px]
          grid-rows-[72px_100px_minmax(0,1fr)_190px_42px]
          [@media(max-height:760px)]:grid-rows-[64px_82px_minmax(0,1fr)_158px_24px]
          [@media(min-height:1000px)]:grid-rows-[78px_112px_minmax(0,1fr)_215px_52px]
        "
      >
        <div aria-hidden="true" />

        <HeroTop
          shouldReduceMotion={shouldReduceMotion}
        />

        <HeroLogo
          shouldReduceMotion={shouldReduceMotion}
        />

        <HeroBottom
          shouldReduceMotion={shouldReduceMotion}
        />

        <div aria-hidden="true" />
      </div>
    </section>
  );
}