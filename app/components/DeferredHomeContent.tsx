"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HomeBelowFold = dynamic(() => import("./HomeBelowFold"), {
  ssr: false,
});

export default function DeferredHomeContent() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    if (!mobile.matches) {
      const animationFrame = window.requestAnimationFrame(() => {
        setShouldLoad(true);
      });
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const trigger = triggerRef.current;
    if (!trigger || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { threshold: 0.01 },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  if (shouldLoad) return <HomeBelowFold />;

  return (
    <div
      ref={triggerRef}
      aria-hidden="true"
      className="mobile-content-trigger h-[45svh] bg-black md:h-px"
    />
  );
}
