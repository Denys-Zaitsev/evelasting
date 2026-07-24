# Evelasting v7.3 — Responsive & Stability

- Rebuilt the Hero layout for 320px phones through large desktops.
- Added the missing responsive Hero logo component while preserving high-resolution rendering.
- Made the main play control scale by viewport instead of becoming oversized.
- Fixed mobile ordering and sizing for play count, play control, and supporting copy.
- Hardened Navbar spacing and typography for narrow screens.
- Removed per-card Motion observers and hover transforms from All Releases.
- Memoized release cards so player state changes update only affected cards.
- Removed nested wheel interception and internal scrolling on phones.
- Added content-visibility for off-screen release cards.
- Disabled expensive backdrop filters in the release library on tablets and phones.
- Added global overflow/media guards and compact mobile release controls.
- Preserved the existing design, media, player behavior, and desktop presentation.
