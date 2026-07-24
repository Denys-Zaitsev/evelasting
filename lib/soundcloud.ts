export type SoundCloudStats = {
  plays: number;
  source: "manual" | "api";
};

function parseCount(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "0", 10);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export async function getSoundCloudStats(): Promise<SoundCloudStats> {
  const plays = parseCount(process.env.SOUNDCLOUD_PLAYS);

  return {
    plays,
    source: "manual",
  };
}