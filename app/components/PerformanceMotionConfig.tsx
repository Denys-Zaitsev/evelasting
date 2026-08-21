"use client";

import { MotionConfig } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

export default function PerformanceMotionConfig({
  children,
}: {
  children: ReactNode;
}) {
  const [reduceMobileMotion, setReduceMobileMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const updatePreference = () => setReduceMobileMotion(query.matches);
    const animationFrame = window.requestAnimationFrame(updatePreference);

    query.addEventListener("change", updatePreference);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      query.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <MotionConfig reducedMotion={reduceMobileMotion ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
