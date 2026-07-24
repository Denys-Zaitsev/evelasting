"use client";

import { motion } from "motion/react";

const DIGITS = Array.from({ length: 10 }, (_, index) => index);

type DigitWheelProps = {
  digit: number;
  animate?: boolean;
  duration?: number;
};

export default function DigitWheel({
  digit,
  animate = true,
  duration = 0.22,
}: DigitWheelProps) {
  const safeDigit = Math.min(9, Math.max(0, Math.round(digit)));

  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[1em] w-[0.61em] overflow-hidden align-top"
    >
      <motion.span
        className="absolute left-0 top-0 flex w-full flex-col"
        initial={false}
        animate={{
          y: `${safeDigit * -1}em`,
        }}
        transition={
          animate
            ? {
                duration,
                ease: [0.22, 1, 0.36, 1],
              }
            : {
                duration: 0,
              }
        }
      >
        {DIGITS.map((item) => (
          <span
            key={item}
            className="flex h-[1em] w-full items-center justify-center leading-none"
          >
            {item}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
