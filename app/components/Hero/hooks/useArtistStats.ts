"use client";

import { useEffect, useState } from "react";

export type ArtistStats = {
  youtube: {
    channelId: string;
    title: string;
    views: number;
    subscribers: number;
    videos: number;
  };
  soundcloud: {
    plays: number;
    source: "manual" | "api";
  };
  total: number;
  updatedAt: string;
};

type UseArtistStatsResult = {
  stats: ArtistStats | null;
  loading: boolean;
  error: string | null;
};

export function useArtistStats(): UseArtistStatsResult {
  const [stats, setStats] = useState<ArtistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/artist", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Artist API returned ${response.status}`);
        }

        const data = (await response.json()) as ArtistStats;

        if (!Number.isFinite(data.total) || data.total < 0) {
          throw new Error("Artist API returned an invalid total value");
        }

        setStats(data);
      } catch (caughtError) {
        if (
          caughtError instanceof DOMException &&
          caughtError.name === "AbortError"
        ) {
          return;
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Failed to load artist statistics",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadStats();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    stats,
    loading,
    error,
  };
}