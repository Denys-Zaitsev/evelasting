"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from "react";

type NavigatorWithPerformanceHints = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
  deviceMemory?: number;
};

type LazyAutoplayVideoProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
  onTimeUpdate?: (event: SyntheticEvent<HTMLVideoElement>) => void;
};

/**
 * Keeps large background videos out of the initial network payload.
 * The source is attached only when the video is close to the viewport.
 */
export default function LazyAutoplayVideo({
  src,
  className,
  style,
  onTimeUpdate,
}: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [allowPlayback, setAllowPlayback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const navigatorWithHints = navigator as NavigatorWithPerformanceHints;
    const connection = navigatorWithHints.connection;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const constrainedConnection =
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";
    const constrainedHardware =
      (navigatorWithHints.deviceMemory !== undefined &&
        navigatorWithHints.deviceMemory <= 2) ||
      (navigator.hardwareConcurrency !== undefined &&
        navigator.hardwareConcurrency <= 2);

    const animationFrame = window.requestAnimationFrame(() => {
      if (!cancelled) {
        setAllowPlayback(
          !reducedMotion && !constrainedConnection && !constrainedHardware,
        );
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !allowPlayback) return;

    if (!("IntersectionObserver" in window)) {
      const animationFrame = requestAnimationFrame(() => {
        setShouldLoad(true);
        setIsNearViewport(true);
      });
      return () => cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry?.isIntersecting === true;
        setIsNearViewport(isVisible);

        if (isVisible) {
          setShouldLoad(true);
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [allowPlayback]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (!isNearViewport) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Autoplay can be blocked by a user/browser preference. The visual remains optional.
    });
  }, [isNearViewport, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onTimeUpdate={onTimeUpdate}
      className={className}
      style={style}
    />
  );
}
