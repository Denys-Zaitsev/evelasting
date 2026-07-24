# Evelasting v7.2 — Reliability & Accessibility

## Fixed

- `/api/artist` now returns a stable `200` response when YouTube or another upstream source is unavailable.
- Added safe fallback artist statistics and edge-cache headers.
- Removed an invalid accessible label from the animated streams counter and added screen-reader-only text.
- Prevented the hidden floating player from remaining keyboard-focusable.
- Allowed SoundCloud encrypted media through the site's Permissions Policy and iframe policy.
- Improved contrast for small hero labels and links.

## Optimized

- Added an explicit responsive `sizes` rule to the hero logo.
- Reduced the maximum generated hero-logo image width from 1800 to 1200 pixels.
- Set an appropriate image quality target for the logo.

## Not changed

- Story video files were intentionally left untouched.
- SoundCloud third-party cookies, cache policy, and iframe bfcache behavior remain controlled by SoundCloud.
