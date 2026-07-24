# Evelasting Website v2.0

Implemented in this build:

- official SoundCloud playlist changed to `boba-698696018/sets/evelasting-official-releases`;
- SoundCloud Widget API is the live source for the release list and playlist order;
- track title, artist, artwork, duration, description, genre and available publication date are published through `PlayerContext`;
- `All Releases` is generated from SoundCloud at runtime rather than the local release array;
- clicking a release cover or title selects and plays that track in the site player;
- every release retains a separate SoundCloud link;
- current release is highlighted with a `Now Playing` state;
- `Now Playing` metadata is rendered from SoundCloud data;
- page atmosphere changes only with the current track, not on card hover;
- dominant accent color is extracted automatically from the current artwork;
- the fixed desktop / bottom mobile SoundCloud player remains synchronized;
- the static `The Story Begins` origin block remains intentionally editorial.

Validation:

- `npm run lint` passes;
- `npm run build` passes;
- build can log the existing optional `YOUTUBE_API_KEY` warning when `.env.local` is absent.

Operational workflow:

1. Add or reorder tracks in the official SoundCloud playlist.
2. Reload/redeploy the website.
3. The release grid and playback order update without editing release data in code.
