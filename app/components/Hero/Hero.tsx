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
        relative min-h-[100svh] overflow-hidden bg-black px-4 text-white sm:px-6 md:px-10
      "
    >
      <HeroBackground
        shouldReduceMotion={shouldReduceMotion}
      />

      <div
        className="
          relative z-10 mx-auto grid h-full w-full max-w-[1700px]
          min-h-[100svh] grid-rows-[72px_112px_minmax(180px,1fr)_auto_20px] py-[env(safe-area-inset-top)]
          sm:grid-rows-[72px_100px_minmax(260px,1fr)_190px_36px]
          [@media(max-height:760px)]:grid-rows-[58px_76px_minmax(190px,1fr)_146px_18px]
          [@media(min-height:1000px)]:grid-rows-[78px_112px_minmax(300px,1fr)_215px_52px]
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
