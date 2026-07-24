"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from "react";

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    void video.play().catch(() => {
      // Autoplay can be blocked by a user/browser preference. The visual remains optional.
    });
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      autoPlay={shouldLoad}
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
