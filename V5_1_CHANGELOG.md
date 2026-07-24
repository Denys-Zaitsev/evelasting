# Evelasting V5.1 — Scroll Fix

- Removed the nested vertical scroll container created by `overflow-x-hidden` on the main page wrapper.
- Replaced it with `overflow-x-clip`, which clips horizontal visual overflow without turning the main element into a scroll container.
- Added document-level horizontal clipping to `html` and `body`.
- Added a stable scrollbar gutter to prevent layout shifts when the document scrollbar appears.
- Vertical scrolling is now owned only by the browser document; the All Releases rail keeps horizontal-only scrolling.
