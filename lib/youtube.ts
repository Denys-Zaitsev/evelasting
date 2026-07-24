const YOUTUBE_API_URL =
  "https://www.googleapis.com/youtube/v3/channels";

const YOUTUBE_HANDLE = "@evelasting";

export type YouTubeStats = {
  channelId: string;
  title: string;
  views: number;
  subscribers: number;
  videos: number;
};

type YouTubeApiResponse = {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
    };
    statistics?: {
      viewCount?: string;
      subscriberCount?: string;
      videoCount?: string;
      hiddenSubscriberCount?: boolean;
    };
  }>;
  error?: {
    code?: number;
    message?: string;
  };
};

function parseCount(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "0", 10);

  return Number.isFinite(parsed) ? parsed : 0;
}

export async function getYouTubeStats(): Promise<YouTubeStats> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "YOUTUBE_API_KEY отсутствует в файле .env.local",
    );
  }

  const params = new URLSearchParams({
    part: "snippet,statistics",
    forHandle: YOUTUBE_HANDLE,
    key: apiKey,
  });

  const response = await fetch(`${YOUTUBE_API_URL}?${params}`, {
    next: {
      revalidate: 600,
    },
  });

  const data = (await response.json()) as YouTubeApiResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message ??
        `YouTube API вернул ошибку ${response.status}`,
    );
  }

  const channel = data.items?.[0];

  if (!channel?.id || !channel.statistics) {
    throw new Error(
      `YouTube-канал ${YOUTUBE_HANDLE} не найден`,
    );
  }

  return {
    channelId: channel.id,
    title: channel.snippet?.title ?? "Evelasting",
    views: parseCount(channel.statistics.viewCount),
    subscribers: parseCount(
      channel.statistics.subscriberCount,
    ),
    videos: parseCount(channel.statistics.videoCount),
  };
}