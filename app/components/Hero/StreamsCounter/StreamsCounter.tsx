"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const COUNT_DURATION = 2200;
const COMPACT_DELAY = 650;
const MORPH_DURATION = 0.46;
const MORPH_EASE = [0.22, 1, 0.36, 1] as const;

type StreamsCounterProps = {
  value: number;
  shouldReduceMotion: boolean | null;
};

function sanitizeValue(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.round(value);
}

function formatFullCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatCompactCount(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function StreamsCounter({
  value,
  shouldReduceMotion,
}: StreamsCounterProps) {
  const safeValue = useMemo(
    () => sanitizeValue(value),
    [value],
  );

  const fullValue = useMemo(
    () => formatFullCount(safeValue),
    [safeValue],
  );

  const compactValue = useMemo(
    () => formatCompactCount(safeValue),
    [safeValue],
  );

  const reducedMotion = Boolean(shouldReduceMotion);

  const [count, setCount] = useState(
    reducedMotion ? safeValue : 0,
  );

  const [complete, setComplete] = useState(reducedMotion);
  const [compact, setCompact] = useState(reducedMotion);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    let compactTimeout = 0;

    if (reducedMotion) {
      animationFrame = window.requestAnimationFrame(() => {
        setCount(safeValue);
        setComplete(true);
        setCompact(true);
      });

      return () => {
        window.cancelAnimationFrame(animationFrame);
      };
    }

    animationFrame = window.requestAnimationFrame(
      (startTime) => {
        setCount(0);
        setComplete(false);
        setCompact(false);

        const animate = (currentTime: number) => {
          const progress = Math.min(
            (currentTime - startTime) / COUNT_DURATION,
            1,
          );

          const easedProgress =
            1 - Math.pow(1 - progress, 4);

          setCount(
            Math.round(safeValue * easedProgress),
          );

          if (progress < 1) {
            animationFrame =
              window.requestAnimationFrame(animate);

            return;
          }

          setCount(safeValue);
          setComplete(true);

          compactTimeout = window.setTimeout(() => {
            setCompact(true);
          }, COMPACT_DELAY);
        };

        animate(startTime);
      },
    );

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(compactTimeout);
    };
  }, [reducedMotion, safeValue]);

  const countingValue = formatFullCount(count);

  const showCompact =
    complete && compact && !hovered;

  const reservedCharacters = Math.max(
    fullValue.length,
    compactValue.length,
  );

  return (
    <span
      className="
        relative inline-grid h-[1em]
        cursor-default items-start
        justify-items-end overflow-visible
        whitespace-nowrap px-[0.08em] leading-none
        tabular-nums
      "
      style={{
        width: `calc(${reservedCharacters}ch + 0.2em)`,
      }}
      onMouseEnter={() => {
        if (complete) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <span className="sr-only">{fullValue} total plays</span>

      <motion.span
        aria-hidden="true"
        className="
          col-start-1 row-start-1
          inline-flex justify-end
        "
        initial={false}
        animate={{
          opacity: showCompact ? 0 : 1,
          y: showCompact ? -7 : 0,
          scale: showCompact ? 0.98 : 1,
        }}
        transition={{
          duration: reducedMotion
            ? 0
            : MORPH_DURATION,
          ease: MORPH_EASE,
        }}
      >
        {complete ? fullValue : countingValue}
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="
          col-start-1 row-start-1
          inline-flex justify-end
        "
        initial={false}
        animate={{
          opacity: showCompact ? 1 : 0,
          y: showCompact ? 0 : 7,
          scale: showCompact ? 1 : 0.98,
        }}
        transition={{
          duration: reducedMotion
            ? 0
            : MORPH_DURATION,
          ease: MORPH_EASE,
        }}
      >
        {compactValue}
      </motion.span>
    </span>
  );
}