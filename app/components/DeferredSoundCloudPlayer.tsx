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
    if (!("IntersectionObserver" in window)) return;

    let intersectionObserver: IntersectionObserver | null = null;

    const observeMusicSection = () => {
      const musicSection = document.getElementById("music");
      if (!musicSection) return false;

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          setMusicIsNear(true);
          intersectionObserver?.disconnect();
        },
        { rootMargin: "120px 0px" },
      );

      intersectionObserver.observe(musicSection);
      return true;
    };

    if (observeMusicSection()) {
      return () => intersectionObserver?.disconnect();
    }

    const mutationObserver = new MutationObserver(() => {
      if (!observeMusicSection()) return;
      mutationObserver.disconnect();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, []);

  return shouldLoad ? <SoundCloudPlayer /> : null;
}
