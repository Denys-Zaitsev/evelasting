export type CompactSuffix = "K" | "M" | "B" | "T";

export type CompactParts = {
  integer: string;
  decimals: string;
  suffix: CompactSuffix;
};

export function sanitizeCounterValue(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.round(value));
}

export function formatFullCounter(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(sanitizeCounterValue(value));
}

export function getCompactParts(value: number): CompactParts | null {
  const safeValue = sanitizeCounterValue(value);

  let divisor: number;
  let suffix: CompactSuffix;

  if (safeValue >= 1_000_000_000_000) {
    divisor = 1_000_000_000_000;
    suffix = "T";
  } else if (safeValue >= 1_000_000_000) {
    divisor = 1_000_000_000;
    suffix = "B";
  } else if (safeValue >= 1_000_000) {
    divisor = 1_000_000;
    suffix = "M";
  } else if (safeValue >= 1_000) {
    divisor = 1_000;
    suffix = "K";
  } else {
    return null;
  }

  const normalized = safeValue / divisor;
  const fixed = normalized.toFixed(normalized >= 100 ? 0 : normalized >= 10 ? 1 : 2);
  const [integer, rawDecimals = ""] = fixed.split(".");

  return {
    integer,
    decimals: rawDecimals.replace(/0+$/, ""),
    suffix,
  };
}

export function formatCompactCounter(value: number) {
  const parts = getCompactParts(value);

  if (!parts) {
    return formatFullCounter(value);
  }

  return `${parts.integer}${parts.decimals ? `.${parts.decimals}` : ""}${parts.suffix}`;
}

export function easeOutExpo(progress: number) {
  if (progress >= 1) {
    return 1;
  }

  return 1 - Math.pow(2, -10 * progress);
}
