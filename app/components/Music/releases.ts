export type Release = {
  id: number;
  slug: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  description: string;
  cover: string;
  soundcloud: string;
  spotify?: string;
  playlistIndex: number;
};

const artist = "Evelasting";

/** Verified against the public SoundCloud playlist on 17 September 2026. */
export const releases: Release[] = [
  { id: 1, slug: "rebirth-of-the-ukrainian-phonk", title: "Rebirth Of The Ukrainian Phonk", artist, year: 2022, genre: "Ukrainian Phonk", description: "The release that marked Evelasting's return and introduced the project to listeners around the world.", cover: "/images/Rebirth of the Ukrainian Phonk.png", soundcloud: "https://soundcloud.com/evelasting1/rebirth-of-the-ukrainian-phonk", spotify: "https://open.spotify.com/track/2gsqaDLcvQS6FAtaZbpHhL", playlistIndex: 9 },
  { id: 2, slug: "dreamy-urban-phonk", title: "Dreamy Urban Phonk", artist, year: 2023, genre: "Hip-hop & Rap", description: "A nocturnal blend of soft atmosphere, urban motion and a restrained phonk pulse.", cover: "https://i1.sndcdn.com/artworks-9sfiFSPUiCX7Ou58-yqNjLA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/dreamy-urban-phonk", playlistIndex: 0 },
  { id: 3, slug: "no-spoilers-ii", title: "No SPOILERS II", artist, year: 2024, genre: "Hip-hop & Rap", description: "A focused continuation of No Spoilers, balancing weight, momentum and a cinematic atmosphere.", cover: "https://i1.sndcdn.com/artworks-oYuNyDq8QLIik3a6-cJjK4g-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/no-spoilers-ii", playlistIndex: 1 },
  { id: 4, slug: "unnv-evelasting-phonk", title: "УННВ [EVELASTING - PHONK]", artist, year: 2023, genre: "Hip-hop & Rap", description: "A direct and energetic phonk statement with a sharp hook and club-focused movement.", cover: "https://i1.sndcdn.com/artworks-EzGzxQcZOFmkU3v5-4SK7jA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/unnv-evelasting-phonk", playlistIndex: 2 },
  { id: 5, slug: "wrack", title: "WRACK", artist, year: 2023, genre: "Hip-hop & Rap", description: "Raw percussion and fractured textures turn WRACK into a compact burst of controlled chaos.", cover: "https://i1.sndcdn.com/artworks-yUUaGUjsowwExLVr-jp9gIQ-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/wrack", playlistIndex: 3 },
  { id: 6, slug: "blood-of-the-eternity", title: "Blood Of The Eternity", artist, year: 2023, genre: "Hip-hop & Rap", description: "A dramatic collision of distorted energy, tension and the recurring theme of eternity.", cover: "https://i1.sndcdn.com/artworks-wjygzVi9RCj1u81u-PrjnKA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/blood-of-the-eternity", playlistIndex: 4 },
  { id: 7, slug: "ethereal-dance-of-blades", title: "WHVOAYOU x EVELASTING - Ethereal Dance of Blades", artist, year: 2023, genre: "Hip-hop & Rap", description: "A collaboration built around ethereal texture, sharp movement and the force of a phonk rhythm.", cover: "https://i1.sndcdn.com/artworks-wjygzVi9RCj1u81u-PrjnKA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/whvoayou-x-evelasting-thousand", playlistIndex: 5 },
  { id: 8, slug: "rampage-185", title: "Rampage 185", artist, year: 2022, genre: "Hip-hop & Rap", description: "An aggressive, high-pressure phonk cut designed around momentum and impact.", cover: "https://i1.sndcdn.com/artworks-kW0nyNAKTJbqYrwY-b9SDtA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/rampage-185", playlistIndex: 6 },
  { id: 9, slug: "darkness-of-space", title: "Darkness Of Space", artist, year: 2022, genre: "Hip-hop & Rap", description: "Cold space, distant light and a heavy low end shape one of Evelasting's darkest atmospheres.", cover: "https://i1.sndcdn.com/artworks-VYzDtbbK7jVXSsKe-TSzMnA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/darkness-of-space", playlistIndex: 7 },
  { id: 10, slug: "eternity-of-sound", title: "Eternity Of Sound", artist, year: 2022, genre: "Hip-hop & Rap", description: "A spacious, melodic track built around the idea that sound can outlive the moment that created it.", cover: "https://i1.sndcdn.com/artworks-Btck8g1Te5yOTeku-E9gsbA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/eternity-of-sound", playlistIndex: 8 },
  { id: 11, slug: "sunset-fatigue", title: "Sunset Fatigue", artist, year: 2022, genre: "Dance & EDM", description: "Warm sunset colours meet late-night fatigue in a slower, reflective side of Evelasting's sound.", cover: "https://i1.sndcdn.com/artworks-CPeXCDQ8ZY0NyyS0-qWk2wA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/sunset-fatiguefonc", spotify: "https://open.spotify.com/track/0FwFtQLezEBeTdFPaappOe", playlistIndex: 10 },
  { id: 12, slug: "silence-time", title: "Silence Time", artist, year: 2022, genre: "Violin", description: "A quiet, violin-led pause that reveals the more reflective side of the Evelasting catalogue.", cover: "https://i1.sndcdn.com/artworks-z0jLjhj4FP8rgvr5-cUkB8A-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/silence-time", playlistIndex: 11 },
  { id: 13, slug: "noise-forever", title: "Noise Forever", artist, year: 2022, genre: "Dance & EDM", description: "A tense electronic piece where restless motion and layered noise keep pushing forward.", cover: "https://i1.sndcdn.com/artworks-oZeAi08LHpuKDbb9-zwPxYA-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/noise-forever", playlistIndex: 12 },
  { id: 14, slug: "no-spoilers", title: "No Spoilers", artist, year: 2022, genre: "Hip-hop & Rap", description: "The original No Spoilers combines an understated opening with a heavier, deliberate pulse.", cover: "https://i1.sndcdn.com/artworks-iyN9k5CrS65iva1h-9dm8yw-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/no-spoilers", playlistIndex: 13 },
  { id: 15, slug: "ghost-in-car", title: "Ghost In Car", artist, year: 2022, genre: "Hip-hop & Rap", description: "A dark road-track atmosphere shaped by low-end pressure, distance and motion.", cover: "https://i1.sndcdn.com/artworks-dWXUkOHLVSLk1ymD-CzAdIw-t500x500.jpg", soundcloud: "https://soundcloud.com/evelasting1/ghost-in-car", playlistIndex: 14 },
];

function normalizeReleaseTitle(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/\[.*?\]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function getReleaseBySlug(slug: string) {
  return releases.find((release) => release.slug === slug);
}

export function getReleaseByTitle(title: string) {
  const normalizedTitle = normalizeReleaseTitle(title);
  if (!normalizedTitle) return undefined;

  const exactMatch = releases.find(
    (release) => normalizeReleaseTitle(release.title) === normalizedTitle,
  );
  if (exactMatch) return exactMatch;

  return releases.find((release) => {
    const normalizedReleaseTitle = normalizeReleaseTitle(release.title);
    return normalizedReleaseTitle.length >= 4 && (
      normalizedTitle.includes(normalizedReleaseTitle) ||
      normalizedReleaseTitle.includes(normalizedTitle)
    );
  });
}

export function slugifyReleaseTitle(title: string) {
  const normalized = normalizeReleaseTitle(title);
  if (!normalized) return "release";

  return normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "release";
}
