# Evelasting V7 — Release Edition

## Release infrastructure
- Production metadata with canonical `https://evelasting.com`.
- Open Graph and large Twitter/X preview cards.
- MusicGroup structured data with all official artist profiles.
- Generated `robots.txt`, `sitemap.xml`, and web app manifest.
- Dedicated cinematic 404 page.
- Security and long-lived static asset cache headers.

## Performance
- Reduced the two story video assets from roughly 500 MB combined to under 18 MB combined.
- Added fast-start MP4 layout for quicker playback initiation.
- Added AVIF/WebP negotiation and long-lived image caching.

## Music experience
- Media Session API integration for system play/pause, previous/next, seeking, artwork, and lock-screen metadata.
- Current artwork is reflected in the browser favicon while a release is active.
- Corrected official SoundCloud, Apple Music, Spotify, Telegram, YouTube, TikTok, and Instagram destinations.

## PWA
- Installable manifest with standard and maskable icons.
- Lightweight production service worker with network-first navigation and safe shell caching.

## Accessibility and resilience
- Skip-to-content link and semantic main target.
- Global keyboard focus indicator.
- Reduced-motion fallback for visitors who request it.
- Existing keyboard player controls preserved.

## Brand assets
- New 1200×630 social sharing image.
- New favicon, Apple touch icon, 192 px and 512 px application icons.
