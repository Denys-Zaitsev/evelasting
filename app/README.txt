EVELASTING — HERO TO SOUNDCLOUD INTEGRATION

Replace the matching files in app/components/ with the files from this archive.

Changed files:
- components/PlayerContext.tsx
- components/SoundCloudPlayer.tsx
- components/Hero/HeroBottom.tsx
- components/Hero/PlayButton/PlayButton.tsx
- components/Music/MusicSection.tsx

Important:
app/page.tsx must wrap the page content in <PlayerProvider>.

After replacement run:
1. npm run lint
2. npm run build

Result:
- Hero Play smoothly scrolls to #music.
- A queued request starts SoundCloud as soon as its widget is ready.
- The Hero Play button receives an active red state while playback is running.
- The modular StreamsCounter and PlayButton are used; the old duplicated code is removed.
