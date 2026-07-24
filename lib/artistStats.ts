import {
  getSoundCloudStats,
  type SoundCloudStats,
} from "@/lib/soundcloud";
import {
  getYouTubeStats,
  type YouTubeStats,
} from "@/lib/youtube";

export type ArtistStats = {
  youtube: YouTubeStats;
  soundcloud: SoundCloudStats;
  total: number;
  updatedAt: string;
  degraded?: boolean;
};

const FALLBACK_TOTAL_PLAYS = 1_068_987;

const EMPTY_YOUTUBE_STATS: YouTubeStats = {
  channelId: "",
  title: "Evelasting",
  views: 0,
  subscribers: 0,
  videos: 0,
};

function getFallbackTotal(soundcloudPlays: number): number {
  const configured = Number.parseInt(
    process.env.ARTIST_TOTAL_PLAYS_FALLBACK ?? "",
    10,
  );

  if (Number.isFinite(configured) && configured >= 0) {
    return Math.max(configured, soundcloudPlays);
  }

  return Math.max(FALLBACK_TOTAL_PLAYS, soundcloudPlays);
}

/**
 * Returns usable statistics even when an upstream provider is unavailable.
 * A third-party API outage must not turn the site's own endpoint into a 500.
 */
export async function getArtistStats(): Promise<ArtistStats> {
  const [youtubeResult, soundcloudResult] = await Promise.allSettled([
    getYouTubeStats(),
    getSoundCloudStats(),
  ]);

  const youtube =
    youtubeResult.status === "fulfilled"
      ? youtubeResult.value
      : EMPTY_YOUTUBE_STATS;

  const soundcloud =
    soundcloudResult.status === "fulfilled"
      ? soundcloudResult.value
      : ({ plays: 0, source: "manual" } satisfies SoundCloudStats);

  const degraded =
    youtubeResult.status === "rejected" ||
    soundcloudResult.status === "rejected";

  if (youtubeResult.status === "rejected") {
    console.warn(
      "[artistStats] YouTube statistics unavailable; using fallback total.",
      youtubeResult.reason,
    );
  }

  if (soundcloudResult.status === "rejected") {
    console.warn(
      "[artistStats] SoundCloud statistics unavailable; using fallback total.",
      soundcloudResult.reason,
    );
  }

  const providerTotal = youtube.views + soundcloud.plays;

  return {
    youtube,
    soundcloud,
    total: degraded ? getFallbackTotal(soundcloud.plays) : providerTotal,
    updatedAt: new Date().toISOString(),
    ...(degraded ? { degraded: true } : {}),
  };
}
