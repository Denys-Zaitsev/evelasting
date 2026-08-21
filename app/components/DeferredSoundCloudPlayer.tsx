"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { usePlayer } from "./PlayerContext";

const SoundCloudPlayer = dynamic(() => import("./SoundCloudPlayer"), {
  ssr: false,
});

export default function DeferredSoundCloudPlayer() {
  const { playRequested, toggleRequested } = usePlayer();
  const [musicIsNear, setMusicIsNear] = useState(false);
  const shouldLoad =
    musicIsNear || playRequested > 0 || toggleRequested > 0;

  useEffect(() => {
    const musicSection = document.getElementById("music");
    if (!musicSection || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setMusicIsNear(true);
        observer.disconnect();
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(musicSection);
    return () => observer.disconnect();
  }, []);

  return shouldLoad ? <SoundCloudPlayer /> : null;
}
