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
};

export async function getArtistStats(): Promise<ArtistStats> {
  const [youtube, soundcloud] = await Promise.all([
    getYouTubeStats(),
    getSoundCloudStats(),
  ]);

  return {
    youtube,
    soundcloud,
    total: youtube.views + soundcloud.plays,
    updatedAt: new Date().toISOString(),
  };
}