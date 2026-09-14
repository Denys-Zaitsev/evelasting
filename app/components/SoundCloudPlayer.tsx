"use client";

import Script from "next/script";
import {
  type CSSProperties,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { trackAnalyticsEvent } from "@/lib/analytics";
import { usePlayer } from "./PlayerContext";
import { useLanguage } from "./LanguageContext";

const playlistUrl =
  "https://soundcloud.com/evelasting1/sets/evelasting-official-releases";

const playerUrl =
  "https://w.soundcloud.com/player/?" +
  new URLSearchParams({
    url: playlistUrl,
    color: "#ef4444",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "false",
    show_reposts: "false",
    show_teaser: "false",
    show_artwork: "false",
    visual: "false",
  }).toString();

type SoundCloudTrack = {
  id?: number | string;
  title?: string;
  artwork_url?: string | null;
  permalink_url?: string;
  duration?: number;
  description?: string | null;
  genre?: string | null;
  created_at?: string;
  release_date?: string | null;
  display_date?: string;
  user?: {
    username?: string;
    avatar_url?: string;
  };
};

type ProgressEvent = {
  currentPosition?: number;
  relativePosition?: number;
};

type SoundCloudWidget = {
  bind: (event: string, callback: (data?: ProgressEvent) => void) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  skip: (soundIndex: number) => void;
  seekTo: (milliseconds: number) => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  getSounds: (callback: (sounds: SoundCloudTrack[]) => void) => void;
  getCurrentSound: (callback: (sound: SoundCloudTrack) => void) => void;
  getCurrentSoundIndex: (callback: (index: number) => void) => void;
  getDuration: (callback: (duration: number) => void) => void;
  isPaused: (callback: (paused: boolean) => void) => void;
};

type SoundCloudSDK = {
  Widget: {
    (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
      FINISH: string;
      PLAY_PROGRESS: string;
      SEEK: string;
    };
  };
};

declare global {
  interface Window {
    SC?: SoundCloudSDK;
  }
}

type PlayerStyle = CSSProperties & {
  "--rotate-x": string;
  "--rotate-y": string;
  "--pointer-x": string;
  "--pointer-y": string;
};

type VolumeStyle = CSSProperties & {
  "--volume-progress": string;
};

type RGB = {
  r: number;
  g: number;
  b: number;
};

const DEFAULT_ACCENT: RGB = {
  r: 185,
  g: 28,
  b: 65,
};

function formatTime(milliseconds: number) {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function improveArtwork(url?: string | null) {
  if (!url) return "";
  return url.replace("-large.", "-t500x500.");
}

function clampColor(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function rgbToString(color: RGB) {
  return `${clampColor(color.r)} ${clampColor(color.g)} ${clampColor(color.b)}`;
}

function enhanceAccent(color: RGB): RGB {
  const max = Math.max(color.r, color.g, color.b);
  const min = Math.min(color.r, color.g, color.b);
  const saturation = max - min;

  if (max < 45 || saturation < 18) {
    return DEFAULT_ACCENT;
  }

  const boost = max < 130 ? 1.35 : 1.12;

  return {
    r: clampColor(color.r * boost),
    g: clampColor(color.g * boost),
    b: clampColor(color.b * boost),
  };
}

function fallbackColor(seed: string): RGB {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = seed.charCodeAt(index) + ((hash << 5) - hash);
  }

  const palette: RGB[] = [
    { r: 220, g: 38, b: 38 },
    { r: 219, g: 39, b: 119 },
    { r: 147, g: 51, b: 234 },
    { r: 79, g: 70, b: 229 },
    { r: 2, g: 132, b: 199 },
    { r: 13, g: 148, b: 136 },
    { r: 202, g: 138, b: 4 },
  ];

  return palette[Math.abs(hash) % palette.length];
}

async function extractDominantColor(
  imageUrl: string,
  fallbackSeed: string,
): Promise<RGB> {
  if (!imageUrl) {
    return fallbackColor(fallbackSeed);
  }

  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", {
          willReadFrequently: true,
        });

        if (!context) {
          resolve(fallbackColor(fallbackSeed));
          return;
        }

        const size = 48;
        canvas.width = size;
        canvas.height = size;

        context.drawImage(image, 0, 0, size, size);

        const pixels = context.getImageData(0, 0, size, size).data;

        let red = 0;
        let green = 0;
        let blue = 0;
        let weightTotal = 0;

        for (let index = 0; index < pixels.length; index += 16) {
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const alpha = pixels[index + 3];

          if (alpha < 170) continue;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max - min;
          const brightness = (r + g + b) / 3;

          if (brightness < 22 || brightness > 238) continue;
          if (saturation < 14) continue;

          const weight = 1 + saturation / 90 + brightness / 510;

          red += r * weight;
          green += g * weight;
          blue += b * weight;
          weightTotal += weight;
        }

        if (weightTotal === 0) {
          resolve(fallbackColor(fallbackSeed));
          return;
        }

        resolve(
          enhanceAccent({
            r: red / weightTotal,
            g: green / weightTotal,
            b: blue / weightTotal,
          }),
        );
      } catch {
        resolve(fallbackColor(fallbackSeed));
      }
    };

    image.onerror = () => {
      resolve(fallbackColor(fallbackSeed));
    };

    image.src = imageUrl;
  });
}

export default function SoundCloudPlayer() {
  const { t } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const previousVolumeRef = useRef(70);
  const accentRequestRef = useRef(0);
  const handledPlayRequestRef = useRef(0);
  const handledToggleRequestRef = useRef(0);
  const tracksRef = useRef<SoundCloudTrack[]>([]);
  const releaseColorAnimationRef = useRef<number | null>(null);
  const playerShellRef = useRef<HTMLDivElement>(null);
  const suppressPlayerToggleRef = useRef(false);
  const trackedTrackRef = useRef<string | null>(null);
  const trackedStartRef = useRef(false);
  const trackedMilestonesRef = useRef<Set<number>>(new Set());

  const {
    playRequested,
    toggleRequested,
    requestedTrackIndex,
    setPlaying,
    setReady: publishReady,
    setCurrentTrack: publishTrack,
    setTracks: publishTracks,
    previewArtwork,
  } = usePlayer();

  const [tracks, setTracks] = useState<SoundCloudTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<SoundCloudTrack | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [closedAtRequests, setClosedAtRequests] = useState<{
    play: number;
    toggle: number;
  } | null>(null);
  const [playerPosition, setPlayerPosition] = useState<{
    x: number;
    y: number;
  } | null>(() => {
    const saved = window.localStorage.getItem("evelasting-player-position");
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved) as { x?: number; y?: number };
      return typeof parsed.x === "number" && typeof parsed.y === "number"
        ? { x: parsed.x, y: parsed.y }
        : null;
    } catch {
      window.localStorage.removeItem("evelasting-player-position");
      return null;
    }
  });
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  const isMuted = volume === 0;
  const isPlayerClosed =
    closedAtRequests !== null &&
    playRequested <= closedAtRequests.play &&
    toggleRequested <= closedAtRequests.toggle;
  const playerIsVisible =
    (playRequested > 0 || toggleRequested > 0) && !isPlayerClosed;

  useEffect(() => {
    if (!playerPosition) return;
    window.localStorage.setItem(
      "evelasting-player-position",
      JSON.stringify(playerPosition),
    );
  }, [playerPosition]);

  useEffect(() => {
    const keepInsideViewport = () => {
      setPlayerPosition((current) => {
        if (!current) return current;
        const width = isCollapsed ? (window.innerWidth <= 760 ? 64 : 68) : window.innerWidth <= 1180 ? 300 : 340;
        const height = isCollapsed ? (window.innerWidth <= 760 ? 64 : 68) : window.innerWidth <= 760 ? 116 : 520;
        const topMargin = !isCollapsed && window.innerWidth > 760 ? 48 : 8;
        return {
          x: Math.max(8, Math.min(current.x, window.innerWidth - width - 8)),
          y: Math.max(topMargin, Math.min(current.y, window.innerHeight - height - 8)),
        };
      });
    };
    window.addEventListener("resize", keepInsideViewport);
    keepInsideViewport();
    return () => window.removeEventListener("resize", keepInsideViewport);
  }, [isCollapsed]);

  const startPlayerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    const interactiveTarget = target.closest("button, input, a, [data-no-drag='true']");

    // The collapsed artwork is both a button and a drag handle. Controls in the
    // expanded player stay clickable and never begin a drag gesture.
    if (interactiveTarget && !isCollapsed) return;

    const shell = event.currentTarget;
    const bounds = shell.getBoundingClientRect();
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: bounds.left,
      originY: bounds.top,
      moved: false,
    };
    suppressPlayerToggleRef.current = false;
    shell.setPointerCapture(event.pointerId);
    shell.classList.add("floating-player-dragging");
    event.preventDefault();
  };

  const movePlayer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const shell = event.currentTarget;
    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5) {
      drag.moved = true;
      suppressPlayerToggleRef.current = true;
    }
    const width = shell.offsetWidth;
    const height = shell.offsetHeight;
    const topMargin = !isCollapsed && window.innerWidth > 760 ? 48 : 8;
    const x = Math.max(
      8,
      Math.min(drag.originX + event.clientX - drag.startX, window.innerWidth - width - 8),
    );
    const y = Math.max(
      topMargin,
      Math.min(drag.originY + event.clientY - drag.startY, window.innerHeight - height - 8),
    );
    setPlayerPosition({ x, y });
  };

  const stopPlayerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragStateRef.current = null;
    suppressPlayerToggleRef.current = drag.moved;
    const shell = event.currentTarget;
    shell.classList.remove("floating-player-dragging");

    const bounds = shell.getBoundingClientRect();
    const margin = 12;
    const topMargin = !isCollapsed && window.innerWidth > 760 ? 48 : margin;
    const snapDistance = 52;
    let x = bounds.left;
    let y = bounds.top;

    if (bounds.left < snapDistance) x = margin;
    if (window.innerWidth - bounds.right < snapDistance) x = window.innerWidth - bounds.width - margin;
    if (bounds.top < snapDistance) y = topMargin;
    if (window.innerHeight - bounds.bottom < snapDistance) y = window.innerHeight - bounds.height - margin;

    setPlayerPosition({
      x: Math.max(margin, Math.min(x, window.innerWidth - bounds.width - margin)),
      y: Math.max(topMargin, Math.min(y, window.innerHeight - bounds.height - margin)),
    });

    if (shell.hasPointerCapture(event.pointerId)) shell.releasePointerCapture(event.pointerId);

    // pointerdown uses preventDefault() so the browser may suppress the native
    // click event on the collapsed artwork. Treat a stationary pointer gesture
    // as the expand action directly; a real drag only changes the position.
    if (isCollapsed && !drag.moved) {
      window.requestAnimationFrame(() => toggleCollapsedPlayer());
    }
  };


  const toggleCollapsedPlayer = () => {
    if (suppressPlayerToggleRef.current) {
      suppressPlayerToggleRef.current = false;
      return;
    }

    const shell = playerShellRef.current;
    const bounds = shell?.getBoundingClientRect();
    const margin = 12;

    if (!isCollapsed) {
      // Collapse into the same visual corner occupied by the full player.
      // Keeping the right edge fixed prevents the icon from jumping toward
      // the centre of the screen when its width changes from 340px to 68px.
      if (bounds) {
        const iconSize = window.innerWidth <= 760 ? 64 : 68;
        setPlayerPosition({
          x: Math.max(margin, Math.min(bounds.right - iconSize, window.innerWidth - iconSize - margin)),
          y: Math.max(margin, Math.min(bounds.top, window.innerHeight - iconSize - margin)),
        });
      }
      setIsCollapsed(true);
      return;
    }

    // Expand leftward from the icon so it remains anchored where the user
    // placed it and the full card never opens outside the viewport.
    if (bounds) {
      const expandedWidth = window.innerWidth <= 760
        ? Math.min(340, window.innerWidth - 16)
        : window.innerWidth <= 1180
          ? 300
          : 340;
      const expandedHeight = window.innerWidth <= 760 ? 116 : 520;
      const expandedTopMargin = window.innerWidth <= 760 ? margin : 48;
      setPlayerPosition({
        x: Math.max(margin, Math.min(bounds.right - expandedWidth, window.innerWidth - expandedWidth - margin)),
        y: Math.max(expandedTopMargin, Math.min(bounds.top, window.innerHeight - expandedHeight - margin)),
      });
    }
    setIsCollapsed(false);
  };

  const artwork =
    improveArtwork(currentTrack?.artwork_url) ||
    improveArtwork(currentTrack?.user?.avatar_url);

  const animateReleaseAccent = useCallback((target: RGB, duration = 760) => {
    if (releaseColorAnimationRef.current !== null) {
      cancelAnimationFrame(releaseColorAnimationRef.current);
    }

    const root = document.documentElement;
    const rawCurrent = getComputedStyle(root)
      .getPropertyValue("--release-accent")
      .trim()
      .split(/\s+/)
      .map(Number);
    const start: RGB = {
      r: Number.isFinite(rawCurrent[0]) ? rawCurrent[0] : DEFAULT_ACCENT.r,
      g: Number.isFinite(rawCurrent[1]) ? rawCurrent[1] : DEFAULT_ACCENT.g,
      b: Number.isFinite(rawCurrent[2]) ? rawCurrent[2] : DEFAULT_ACCENT.b,
    };
    const startedAt = performance.now();

    const tick = (now: number) => {
      const linear = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - linear, 3);
      root.style.setProperty(
        "--release-accent",
        rgbToString({
          r: start.r + (target.r - start.r) * eased,
          g: start.g + (target.g - start.g) * eased,
          b: start.b + (target.b - start.b) * eased,
        }),
      );
      if (linear < 1) {
        releaseColorAnimationRef.current = requestAnimationFrame(tick);
      } else {
        releaseColorAnimationRef.current = null;
      }
    };

    releaseColorAnimationRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!currentTrack) return;

    publishTrack({
      id: String(currentTrack.id ?? currentTrack.permalink_url ?? currentIndex),
      title: currentTrack.title || "Evelasting Official Releases",
      artwork,
      permalink: currentTrack.permalink_url || playlistUrl,
      artist: currentTrack.user?.username || "Evelasting",
      index: currentIndex,
      total: tracks.length,
      duration: currentTrack.duration || duration || 0,
      description: currentTrack.description?.trim() || "",
      genre: currentTrack.genre?.trim() || "Phonk",
      publishedAt:
        currentTrack.release_date ||
        currentTrack.display_date ||
        currentTrack.created_at ||
        "",
    });
  }, [
    artwork,
    currentIndex,
    currentTrack,
    duration,
    publishTrack,
    tracks.length,
  ]);

  useEffect(() => {
    const requestId = accentRequestRef.current + 1;
    accentRequestRef.current = requestId;

    const fallbackSeed =
      currentTrack?.title ||
      currentTrack?.permalink_url ||
      artwork ||
      "Evelasting";

    void extractDominantColor(artwork, fallbackSeed).then((accent) => {
      if (accentRequestRef.current !== requestId) return;

      const accentValue = rgbToString(accent);

      document.documentElement.style.setProperty(
        "--player-accent",
        accentValue,
      );

      document.documentElement.style.setProperty("--hero-accent", accentValue);

      if (!previewArtwork) {
        animateReleaseAccent(accent);
      }
    });
  }, [
    artwork,
    currentTrack?.permalink_url,
    currentTrack?.title,
    previewArtwork,
    animateReleaseAccent,
  ]);

  useEffect(() => {
    if (!previewArtwork) {
      const current = getComputedStyle(document.documentElement)
        .getPropertyValue("--player-accent")
        .trim()
        .split(/\s+/)
        .map(Number);
      animateReleaseAccent({
        r: current[0] || DEFAULT_ACCENT.r,
        g: current[1] || DEFAULT_ACCENT.g,
        b: current[2] || DEFAULT_ACCENT.b,
      });
      return;
    }

    const requestId = accentRequestRef.current + 1;
    accentRequestRef.current = requestId;
    void extractDominantColor(previewArtwork, previewArtwork).then((accent) => {
      if (accentRequestRef.current !== requestId) return;
      animateReleaseAccent(accent, 680);
    });
  }, [animateReleaseAccent, previewArtwork]);

  const refreshCurrentTrack = useCallback(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    widget.getCurrentSound((sound) => setCurrentTrack(sound));
    widget.getCurrentSoundIndex((index) => setCurrentIndex(index));
    widget.getDuration((trackDuration) => setDuration(trackDuration || 0));
    widget.isPaused((paused) => setIsPlaying(!paused));
    widget.getVolume((currentVolume) => {
      const safeVolume = Math.max(0, Math.min(100, currentVolume || 0));

      setVolume(safeVolume);

      if (safeVolume > 0) {
        previousVolumeRef.current = safeVolume;
      }
    });
  }, []);

  const loadPlaylistTracks = useCallback(
    (widget: SoundCloudWidget) => {
      const load = (attempt: number) => {
        widget.getSounds((sounds) => {
          const safeSounds = Array.isArray(sounds) ? sounds : [];

          const previousTracks = tracksRef.current;
          const mergedTracks = safeSounds.map((sound, index) => ({
            ...previousTracks[index],
            ...sound,
            user: {
              ...previousTracks[index]?.user,
              ...sound?.user,
            },
          }));

          tracksRef.current = mergedTracks;
          setTracks(mergedTracks);

          const publishedTracks = mergedTracks.map((sound, index) => ({
            id: String(
              sound.id ?? sound.permalink_url ?? `soundcloud-track-${index}`,
            ),
            title: sound.title || `Release ${index + 1}`,
            artwork:
              improveArtwork(sound.artwork_url) ||
              improveArtwork(sound.user?.avatar_url),
            permalink: sound.permalink_url || playlistUrl,
            artist: sound.user?.username || "Evelasting",
            index,
            total: mergedTracks.length,
            duration: sound.duration || 0,
            description: sound.description?.trim() || "",
            genre: sound.genre?.trim() || "Phonk",
            publishedAt:
              sound.release_date ||
              sound.display_date ||
              sound.created_at ||
              "",
          }));

          publishTracks(publishedTracks);

          const incomplete = safeSounds.some(
            (sound) =>
              !sound?.title || !sound?.permalink_url || !sound?.artwork_url,
          );

          if (incomplete && attempt < 5) {
            window.setTimeout(() => load(attempt + 1), 900 + attempt * 650);
          }
        });
      };

      load(0);
    },
    [publishTracks],
  );

  const initializeWidget = useCallback(() => {
    if (!window.SC || !iframeRef.current || widgetRef.current) {
      return;
    }

    const widget = window.SC.Widget(iframeRef.current);
    const events = window.SC.Widget.Events;

    widgetRef.current = widget;

    widget.bind(events.READY, () => {
      setIsReady(true);
      publishReady(true);
      widget.setVolume(70);
      setVolume(70);
      previousVolumeRef.current = 70;

      loadPlaylistTracks(widget);

      refreshCurrentTrack();
    });

    widget.bind(events.PLAY, () => {
      setIsPlaying(true);
      setPlaying(true);
      refreshCurrentTrack();
      widget.getCurrentSound((sound) => {
        const trackId = String(sound.id ?? sound.permalink_url ?? sound.title);
        if (trackedTrackRef.current !== trackId) {
          trackedTrackRef.current = trackId;
          trackedStartRef.current = false;
          trackedMilestonesRef.current = new Set();
        }
        if (trackedStartRef.current) return;
        trackedStartRef.current = true;
        trackAnalyticsEvent("audio_start", {
          track_id: trackId,
          track_title: sound.title || "Unknown release",
          artist: sound.user?.username || "Evelasting",
          duration_seconds: Math.round((sound.duration || 0) / 1000),
        });
      });
    });

    widget.bind(events.PAUSE, () => {
      setIsPlaying(false);
      setPlaying(false);
    });

    widget.bind(events.FINISH, () => {
      setPosition(0);
      widget.getCurrentSound((sound) => {
        trackAnalyticsEvent("audio_complete", {
          track_id: String(sound.id ?? sound.permalink_url ?? sound.title),
          track_title: sound.title || "Unknown release",
        });
        trackedStartRef.current = false;
        trackedMilestonesRef.current = new Set();
      });
      window.setTimeout(refreshCurrentTrack, 180);
    });

    widget.bind(events.PLAY_PROGRESS, (event) => {
      if (typeof event?.currentPosition === "number") {
        setPosition(event.currentPosition);
      }

      if (typeof event?.relativePosition === "number") {
        const percent = Math.floor(event.relativePosition * 100);
        const milestone = [25, 50, 75].find(
          (value) =>
            percent >= value && !trackedMilestonesRef.current.has(value),
        );

        if (milestone) {
          trackedMilestonesRef.current.add(milestone);
          widget.getCurrentSound((sound) => {
            trackAnalyticsEvent("audio_progress", {
              track_id: String(sound.id ?? sound.permalink_url ?? sound.title),
              track_title: sound.title || "Unknown release",
              percent: milestone,
            });
          });
        }
      }
    });

    widget.bind(events.SEEK, (event) => {
      if (typeof event?.currentPosition === "number") {
        setPosition(event.currentPosition);
      }
    });
  }, [loadPlaylistTracks, publishReady, refreshCurrentTrack, setPlaying]);

  useEffect(() => {
    if (!isReady || playRequested <= handledPlayRequestRef.current) {
      return;
    }

    handledPlayRequestRef.current = playRequested;
    const widget = widgetRef.current;
    if (!widget) return;

    if (requestedTrackIndex !== null) {
      widget.skip(requestedTrackIndex);
      window.setTimeout(() => {
        refreshCurrentTrack();
        widget.play();
      }, 160);
      return;
    }

    widget.play();
  }, [isReady, playRequested, refreshCurrentTrack, requestedTrackIndex]);

  useEffect(() => {
    if (!isReady || toggleRequested <= handledToggleRequestRef.current) return;
    handledToggleRequestRef.current = toggleRequested;
    const widget = widgetRef.current;
    if (!widget) return;
    widget.isPaused((paused) => {
      if (paused) widget.play();
      else widget.pause();
    });
  }, [isReady, toggleRequested]);

  const togglePlayback = () => {
    const widget = widgetRef.current;
    if (!widget || !isReady) return;

    if (isPlaying) {
      widget.pause();
    } else {
      widget.play();
    }
  };

  const closePlayer = () => {
    const widget = widgetRef.current;

    widget?.pause();
    widget?.seekTo(0);
    setPosition(0);
    setIsPlaying(false);
    setPlaying(false);
    setIsCollapsed(false);
    setClosedAtRequests({ play: playRequested, toggle: toggleRequested });

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = "none";
      try {
        navigator.mediaSession.setPositionState();
      } catch {
        // Clearing the position state is optional in some browsers.
      }
    }
  };

  const previousTrack = useCallback(() => {
    const widget = widgetRef.current;
    if (!widget || !isReady) return;

    setPosition(0);
    widget.prev();
    window.setTimeout(refreshCurrentTrack, 180);
  }, [isReady, refreshCurrentTrack]);

  const nextTrack = useCallback(() => {
    const widget = widgetRef.current;
    if (!widget || !isReady) return;

    setPosition(0);
    widget.next();
    window.setTimeout(refreshCurrentTrack, 180);
  }, [isReady, refreshCurrentTrack]);

  const seekTrack = useCallback((newPosition: number) => {
    const widget = widgetRef.current;
    if (!widget || !isReady) return;

    widget.seekTo(newPosition);
    setPosition(newPosition);
  }, [isReady]);

  const changeVolume = (newVolume: number) => {
    const widget = widgetRef.current;
    if (!widget || !isReady) return;

    const safeVolume = Math.max(0, Math.min(100, newVolume));

    widget.setVolume(safeVolume);
    setVolume(safeVolume);

    if (safeVolume > 0) {
      previousVolumeRef.current = safeVolume;
    }
  };

  const toggleMute = () => {
    if (!isReady) return;

    if (volume > 0) {
      previousVolumeRef.current = volume;
      changeVolume(0);
    } else {
      changeVolume(previousVolumeRef.current || 70);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    const percentX = (event.clientX - bounds.left) / bounds.width;
    const percentY = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--rotate-x", `${(0.5 - percentY) * 5}deg`);
    card.style.setProperty("--rotate-y", `${(percentX - 0.5) * 5}deg`);
    card.style.setProperty("--pointer-x", `${percentX * 100}%`);
    card.style.setProperty("--pointer-y", `${percentY * 100}%`);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
  };

  const cardStyle: PlayerStyle = {
    "--rotate-x": "0deg",
    "--rotate-y": "0deg",
    "--pointer-x": "50%",
    "--pointer-y": "50%",
  };

  const volumeStyle: VolumeStyle = {
    "--volume-progress": `${volume}%`,
  };

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (isPlayerClosed) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      const widget = widgetRef.current;
      if (!widget || !isReady) return;
      if (event.code === "Space") {
        event.preventDefault();
        widget.isPaused((paused) => paused ? widget.play() : widget.pause());
      } else if (event.code === "ArrowRight") {
        widget.next();
        window.setTimeout(refreshCurrentTrack, 180);
      } else if (event.code === "ArrowLeft") {
        widget.prev();
        window.setTimeout(refreshCurrentTrack, 180);
      } else if (event.key.toLowerCase() === "m") {
        if (volume > 0) { previousVolumeRef.current = volume; widget.setVolume(0); setVolume(0); }
        else { const restored = previousVolumeRef.current || 70; widget.setVolume(restored); setVolume(restored); }
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [isPlayerClosed, isReady, refreshCurrentTrack, volume]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]') ?? document.head.appendChild(document.createElement("meta"));
    const accentValue = getComputedStyle(document.documentElement).getPropertyValue("--player-accent").trim() || "185 28 65";
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", `rgb(${accentValue.replaceAll(" ", ", ")})`);
  }, [currentTrack]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || !currentTrack || isPlayerClosed) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title || "Evelasting Official Releases",
      artist: currentTrack.user?.username || "Evelasting",
      album: "Evelasting Official Releases",
      artwork: artwork
        ? [
            { src: artwork, sizes: "500x500", type: "image/jpeg" },
          ]
        : [{ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }],
    });

    const safeHandler = (
      action: MediaSessionAction,
      handler: MediaSessionActionHandler | null,
    ) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Some browsers expose Media Session but omit individual actions.
      }
    };

    safeHandler("play", () => widgetRef.current?.play());
    safeHandler("pause", () => widgetRef.current?.pause());
    safeHandler("previoustrack", previousTrack);
    safeHandler("nexttrack", nextTrack);
    safeHandler("seekbackward", (details) => {
      seekTrack(Math.max(0, position - (details.seekOffset ?? 10) * 1000));
    });
    safeHandler("seekforward", (details) => {
      seekTrack(Math.min(duration, position + (details.seekOffset ?? 10) * 1000));
    });
    safeHandler("seekto", (details) => {
      if (typeof details.seekTime === "number") seekTrack(details.seekTime * 1000);
    });

    return () => {
      ["play", "pause", "previoustrack", "nexttrack", "seekbackward", "seekforward", "seekto"].forEach(
        (action) => safeHandler(action as MediaSessionAction, null),
      );
    };
  }, [
    artwork,
    currentTrack,
    duration,
    isPlayerClosed,
    nextTrack,
    position,
    previousTrack,
    seekTrack,
  ]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    if (isPlayerClosed) {
      navigator.mediaSession.playbackState = "none";
      return;
    }
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    if (duration > 0 && position >= 0 && position <= duration) {
      try {
        navigator.mediaSession.setPositionState({
          duration: duration / 1000,
          playbackRate: 1,
          position: Math.min(position, duration - 1) / 1000,
        });
      } catch {
        // Position state is optional and may reject incomplete SoundCloud data.
      }
    }
  }, [duration, isPlayerClosed, isPlaying, position]);

  useEffect(() => {
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!icon) return;
    icon.href = isPlayerClosed ? "/icons/favicon-32.png" : artwork || "/icons/favicon-32.png";
    return () => { icon.href = "/icons/favicon-32.png"; };
  }, [artwork, isPlayerClosed]);

  return (
    <>
      <Script
        src="https://w.soundcloud.com/player/api.js"
        strategy="afterInteractive"
        onLoad={initializeWidget}
        onReady={initializeWidget}
      />

      <iframe
        ref={iframeRef}
        title="SoundCloud audio engine"
        src={playerUrl}
        allow="autoplay; encrypted-media"
        scrolling="no"
        frameBorder="0"
        className="soundcloud-engine"
      />

      <div
        ref={playerShellRef}
        className={`custom-player-perspective floating-player-shell ${
          playerIsVisible ? "floating-player-visible" : ""
        } ${isCollapsed ? "floating-player-collapsed" : ""} ${
          playerPosition ? "floating-player-positioned" : ""
        }`}
        style={
          playerPosition
            ? ({
                "--floating-player-x": `${playerPosition.x}px`,
                "--floating-player-y": `${playerPosition.y}px`,
              } as CSSProperties)
            : undefined
        }
        onPointerDown={startPlayerDrag}
        onPointerMove={movePlayer}
        onPointerUp={stopPlayerDrag}
        onPointerCancel={stopPlayerDrag}
        inert={!playerIsVisible}
      >
        <div className="mobile-player-dock" aria-label={t("nowPlaying")}>
          <span
            className="mobile-player-art"
            style={artwork ? { backgroundImage: `url("${artwork}")` } : undefined}
            aria-hidden="true"
          />
          <button
            type="button"
            className="mobile-player-copy"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={toggleCollapsedPlayer}
            aria-label={isCollapsed ? t("expandPlayer") : t("collapsePlayer")}
          >
            <span>{t("nowPlaying")}</span>
            <strong>{currentTrack?.title || "Evelasting"}</strong>
          </button>
          <div className="mobile-player-transport">
            <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={previousTrack} disabled={!isReady} aria-label="Previous track">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5 8 12l10 7V5ZM5 5v14" /></svg>
            </button>
            <button type="button" className="mobile-player-play" onPointerDown={(event) => event.stopPropagation()} onClick={togglePlayback} disabled={!isReady} aria-label={isPlaying ? "Pause track" : "Play track"}>
              {isPlaying ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path className="is-filled" d="m8 5 11 7-11 7V5Z" /></svg>}
            </button>
            <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={nextTrack} disabled={!isReady} aria-label="Next track">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 5 10 7-10 7V5Zm13 0v14" /></svg>
            </button>
            <button type="button" className="mobile-player-close" onPointerDown={(event) => event.stopPropagation()} onClick={closePlayer} aria-label="Close player" title="Close player">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" /></svg>
            </button>
          </div>
        </div>

        {isCollapsed && (
          <button
            type="button"
            className="floating-player-toggle floating-player-toggle-mini"
            onClick={() => {
              // Collapsed clicks are handled in stopPlayerDrag so click and drag
              // remain mutually exclusive even with pointer capture enabled.
            }}
            aria-label={t("expandPlayer")}
            title={t("expandPlayer")}
          >
            <>
              <span
                className="floating-player-mini-art"
                style={artwork ? { backgroundImage: `url("${artwork}")` } : undefined}
              />
              <span className="floating-player-mini-preview" aria-hidden="true">
                <span
                  className="floating-player-mini-preview-art"
                  style={artwork ? { backgroundImage: `url("${artwork}")` } : undefined}
                />
                <span className="floating-player-mini-copy">
                  <span className="floating-player-mini-label">{t("nowPlaying")}</span>
                  <span className="floating-player-mini-title">
                    {currentTrack?.title || "Evelasting"}
                  </span>
                </span>
                <span className={`floating-player-mini-status ${isPlaying ? "is-playing" : ""}`}>
                  <i />
                  <i />
                  <i />
                </span>
              </span>
            </>
          </button>
        )}

        <div
          className={`custom-player ${
            isPlaying ? "custom-player-playing" : ""
          }`}
          style={cardStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {!isCollapsed && (
            <div className="floating-player-crown" data-no-drag="true" role="group" aria-label="Player window controls">
              <button
                type="button"
                className="floating-player-crown-button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={toggleCollapsedPlayer}
                aria-label={t("collapsePlayer")}
                title={t("collapsePlayer")}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </button>
              <span className="floating-player-crown-divider" aria-hidden="true" />
              <button
                type="button"
                className="floating-player-crown-button floating-player-close"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={closePlayer}
                aria-label="Close player"
                title="Close player"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 7l10 10M17 7 7 17" />
                </svg>
              </button>
            </div>
          )}
          <div className="custom-player-outer-glow" />
          <div className="custom-player-pointer-light" />
          <div className="custom-player-surface" />

          <div className="relative z-10">
            <div
              className={`custom-player-cover ${
                isPlaying ? "custom-player-cover-playing" : ""
              }`}
              style={
                artwork
                  ? {
                      backgroundImage: `linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.76),
                        transparent 55%
                      ), url("${artwork}")`,
                    }
                  : undefined
              }
            >
              {!artwork && (
                <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.35em] text-white/25">
                  Evelasting
                </div>
              )}

              <div className="custom-player-particles" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[8px] uppercase tracking-[0.25em] text-white/60 backdrop-blur-md">
                SoundCloud
              </div>
            </div>

            <div className="mt-4 text-left">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[8px] uppercase tracking-[0.34em] text-white/40">
                  {isReady ? t("nowPlaying") : t("connecting")}
                </p>
                <span className={`player-spectrum ${isPlaying ? "is-active" : ""}`} aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </span>
              </div>

              <p className="mt-2 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-white/95">
                {currentTrack?.title || "Evelasting Official Releases"}
              </p>

              <p className="mt-1 text-[10px] text-white/40">
                {currentTrack?.user?.username || "Evelasting"}
              </p>
            </div>

            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={100}
                value={Math.min(position, duration || 0)}
                onChange={(event) => seekTrack(Number(event.target.value))}
                disabled={!isReady || duration === 0}
                aria-label={t("trackProgress")}
                className="custom-player-range w-full"
                style={{
                  background: `linear-gradient(
                    to right,
                    rgb(var(--player-accent)) 0%,
                    rgb(var(--player-accent)) ${progress}%,
                    rgba(255, 255, 255, 0.14) ${progress}%,
                    rgba(255, 255, 255, 0.14) 100%
                  )`,
                }}
              />

              <div className="mt-2 flex justify-between text-[9px] text-white/40">
                <span>{formatTime(position)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="custom-player-controls mt-4">
              <div className="custom-player-main-controls">
                <button
                  type="button"
                  onClick={previousTrack}
                  disabled={!isReady}
                  aria-label="Previous track"
                  className="custom-player-side-button"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 20L9 12L19 4V20Z" />
                    <path d="M5 19V5" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={togglePlayback}
                  disabled={!isReady}
                  aria-label={isPlaying ? "Pause track" : "Play track"}
                  className="custom-player-play-button"
                >
                  {isPlaying ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M9 5V19" />
                      <path d="M15 5V19" />
                    </svg>
                  ) : (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={nextTrack}
                  disabled={!isReady}
                  aria-label="Next track"
                  className="custom-player-side-button"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 4L15 12L5 20V4Z" />
                    <path d="M19 5V19" />
                  </svg>
                </button>
              </div>

              <div className="custom-player-volume">
                <div className="custom-player-volume-panel">
                  <span className="custom-player-volume-value">{volume}</span>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={(event) =>
                      changeVolume(Number(event.target.value))
                    }
                    disabled={!isReady}
                    aria-label="Volume"
                    className="custom-volume-range"
                    style={volumeStyle}
                  />

                  <span className="custom-player-volume-min">0</span>
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  disabled={!isReady}
                  aria-label={isMuted ? "Enable sound" : "Mute sound"}
                  className="custom-player-volume-button"
                >
                  {isMuted ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M11 5L6 9H3V15H6L11 19V5Z" />
                      <path d="M18 9L22 13" />
                      <path d="M22 9L18 13" />
                    </svg>
                  ) : volume < 50 ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M11 5L6 9H3V15H6L11 19V5Z" />
                      <path d="M15 9C16.4 10.4 16.4 13.6 15 15" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M11 5L6 9H3V15H6L11 19V5Z" />
                      <path d="M15 9C16.4 10.4 16.4 13.6 15 15" />
                      <path d="M18 6C21.3 9.3 21.3 14.7 18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
              <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                {tracks.length > 0
                  ? `${currentIndex + 1} / ${tracks.length}`
                  : t("loadingShort")}
              </span>

              <a
                href={currentTrack?.permalink_url || playlistUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[8px] uppercase tracking-[0.2em] text-white/40 transition hover:text-white"
              >
                {t("open")} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
