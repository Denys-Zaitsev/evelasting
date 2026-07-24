# Evelasting music experience update

Implemented:
- Hero play button is synchronized with the global player and toggles play/pause.
- Hero icon switches between play and pause.
- Stronger artwork-driven atmosphere in Now Playing and Hero while music plays.
- All Releases uses a dedicated hover accent from each artwork and returns to the active track color on mouse leave.
- Origin Release cover starts the matching SoundCloud track.
- Floating player can collapse into a compact animated corner button and expand again.
- SoundCloud playlist metadata loading retries incomplete entries to reduce blank artwork/title cards.
- Extracted artwork colors are cached client-side.

Validation:
- npm run lint: passed
- npm run build: passed
- Expected build-time warning remains when YOUTUBE_API_KEY is not present in .env.local.
