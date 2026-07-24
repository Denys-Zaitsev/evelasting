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

export const releases: Release[] = [
  {
    id: 1,
    slug: "rebirth-of-the-ukrainian-phonk",
    title: "Rebirth of the Ukrainian Phonk",
    artist: "Evelasting",
    year: 2023,
    genre: "Ukrainian Phonk",
    description:
      "The release that marked Evelasting's return and introduced the project to listeners around the world.",
    cover: "/images/Rebirth of the Ukrainian Phonk.png",
    soundcloud: "https://soundcloud.com/evelasting1",
    spotify:
      "https://open.spotify.com/track/2gsqaDLcvQS6FAtaZbpHhL",
    playlistIndex: 9,
  },
  {
    id: 2,
    slug: "dreamy-urban-phonk",
    title: "Dreamy Urban Phonk",
    artist: "Evelasting",
    year: 2025,
    genre: "Phonk",
    description:
      "A nocturnal blend of soft atmosphere, urban motion and a restrained phonk pulse.",
    cover: "/images/Dreamy Urban Phonk.jpg",
    soundcloud: "https://soundcloud.com/evelasting1",
    playlistIndex: 1,
  },
  {
    id: 3,
    slug: "eternity-of-sound",
    title: "Eternity Of Sound",
    artist: "Evelasting",
    year: 2025,
    genre: "Phonk",
    description:
      "A spacious, melodic track built around the idea that sound can outlive the moment that created it.",
    cover: "/images/Eternity of Sound.jpg",
    soundcloud: "https://soundcloud.com/evelasting1",
    playlistIndex: 8,
  },
  {
    id: 4,
    slug: "darkness-of-space",
    title: "Darkness Of Space",
    artist: "Evelasting",
    year: 2025,
    genre: "Phonk",
    description:
      "Cold space, distant light and a heavy low end shape one of Evelasting's darkest atmospheres.",
    cover: "/images/Darkness Of Space.png",
    soundcloud: "https://soundcloud.com/evelasting1",
    playlistIndex: 7,
  },
  {
    id: 5,
    slug: "rampage-185",
    title: "Rampage 185",
    artist: "Evelasting",
    year: 2025,
    genre: "Phonk",
    description:
      "An aggressive, high-pressure phonk cut designed around momentum and impact.",
    cover: "/images/Rampage 185.jpg",
    soundcloud: "https://soundcloud.com/evelasting1",
    playlistIndex: 6,
  },
  {
    id: 6,
    slug: "blood-of-the-eternity",
    title: "Blood Of The Eternity",
    artist: "Evelasting",
    year: 2025,
    genre: "Phonk",
    description:
      "A dramatic collision of distorted energy, tension and the recurring theme of eternity.",
    cover: "/images/Blood Of The Eternity.png",
    soundcloud: "https://soundcloud.com/evelasting1",
    playlistIndex: 4,
  },
  {
    id: 7,
    slug: "wrack",
    title: "WRACK",
    artist: "Evelasting",
    year: 2025,
    genre: "Phonk",
    description:
      "Raw percussion and fractured textures turn WRACK into a compact burst of controlled chaos.",
    cover: "/images/WRACK.png",
    soundcloud: "https://soundcloud.com/evelasting1",
    playlistIndex: 3,
  },
  {
    id: 8,
    slug: "yhhb",
    title: "YHHB [EVELASTING - PHONK]",
    artist: "Evelasting",
    year: 2025,
    genre: "Phonk",
    description:
      "A direct and energetic phonk statement with a sharp hook and club-focused movement.",
    cover: "/images/yhhb-phonk.png",
    soundcloud: "https://soundcloud.com/evelasting1",
    playlistIndex: 2,
  },
  {
    id: 9,
    slug: "sunset-fatigue",
    title: "Sunset Fatigue",
    artist: "Evelasting",
    year: 2024,
    genre: "Phonk",
    description:
      "Warm sunset colors meet late-night fatigue in a slower, reflective side of Evelasting's sound.",
    cover: "/images/Sunset Patigue.png",
    soundcloud: "https://soundcloud.com/evelasting1",
    spotify:
      "https://open.spotify.com/track/0FwFtQLezEBeTdFPaappOe",
    playlistIndex: 10,
  },
];

function normalizeReleaseTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/\[.*?\]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getReleaseBySlug(slug: string) {
  return releases.find((release) => release.slug === slug);
}

export function getReleaseByTitle(title: string) {
  const normalizedTitle = normalizeReleaseTitle(title);

  return releases.find((release) => {
    const normalizedReleaseTitle = normalizeReleaseTitle(release.title);
    return (
      normalizedTitle === normalizedReleaseTitle ||
      normalizedTitle.includes(normalizedReleaseTitle) ||
      normalizedReleaseTitle.includes(normalizedTitle)
    );
  });
}

export function slugifyReleaseTitle(title: string) {
  return normalizeReleaseTitle(title).replace(/\s+/g, "-") || "release";
}
