"use client";

import DigitWheel from "./DigitWheel";

type CounterDigitProps = {
  value: string;
  animate?: boolean;
  duration?: number;
};

export default function CounterDigit({
  value,
  animate = true,
  duration,
}: CounterDigitProps) {
  const digit = Number.parseInt(value, 10);

  if (Number.isNaN(digit)) {
    return null;
  }

  return (
    <DigitWheel
      digit={digit}
      animate={animate}
      duration={duration}
    />
  );
}
