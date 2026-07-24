"use client";

import { motion } from "motion/react";

type CounterSeparatorProps = {
  value: "," | ".";
  compact?: boolean;
  animate?: boolean;
};

export default function CounterSeparator({
  value,
  compact = false,
  animate = true,
}: CounterSeparatorProps) {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-flex h-[1em] items-end justify-center overflow-hidden leading-none"
      initial={false}
      animate={{
        width: compact ? "0.27em" : "0.33em",
        y: value === "." ? "-0.02em" : "0em",
      }}
      transition={
        animate
          ? {
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }
          : {
              duration: 0,
            }
      }
    >
      {value}
    </motion.span>
  );
}
