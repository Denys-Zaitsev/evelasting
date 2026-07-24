# Evelasting player integration

Implemented and verified:

- Hero Play sends a play request through `PlayerContext`.
- The page scrolls to `#music` with reduced-motion support.
- `SoundCloudPlayer` queues the request until the widget is ready and then starts playback.
- SoundCloud PLAY/PAUSE events synchronize the active Hero button state.
- The playlist uses `https://soundcloud.com/evelasting1/sets/evelasting-official-releases`.
- Duplicate Hero components are not used; `HeroBottom` imports the modular `PlayButton` and `StreamsCounter`.
- Remote Google font fetching was removed so production builds do not depend on build-time internet access.
- Site metadata was changed from the default Next.js values to Evelasting branding.

Verification:

- `npm run lint` — passed.
- `npm run build` — passed.

The build logs a handled fallback warning when `YOUTUBE_API_KEY` is absent. Add it to `.env.local` to enable live YouTube statistics.
