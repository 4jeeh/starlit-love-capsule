# DESIGN.md — The Starlit Love Capsule

## Visual World & Art Direction
- **Theme:** Midnight Starlight & Champagne Romance (`place-carries-it` direction adapted to brand palette & typography)
- **Mode:** Experience

## Color Tokens
- `--bg-midnight`: `#090a10` (Deep Space Midnight — primary ground)
- `--bg-surface`: `#11131d` (Elevated surface step 1)
- `--bg-elevated`: `#171a28` (Elevated surface step 2)
- `--ink-ivory`: `#faf8f5` (Warm Cream Ivory — primary full ink, contrast > 15:1)
- `--ink-muted`: `#d5ccb8` (Warm Champagne Muted — secondary text tinted from champagne hue, never neutral gray)
- `--accent-gold`: `#f6e2b8` (Starlight Champagne Gold — primary interactive accent & starlight)
- `--accent-rose`: `#f8c8d8` (Soft Rose Blush — warm character & heart accent)

## Typography
- **Display & Headings (`--font-display`):** `'Cormorant Garamond', Georgia, serif`
  - Every `h1`–`h6` constrained to 2 lines or fewer across 1440px, 768px, and 390px viewports.
  - Tracking `-0.02em` to `-0.03em`, line-height `0.95`–`1.08`.
- **Body & UI (`--font-sans`):** `'Plus Jakarta Sans', sans-serif`
  - Body text `17px` (`1.0625rem`), line-height `1.6`, measure `50–68ch`.
  - Numeric counters use `font-variant-numeric: tabular-nums`.
- **Handwritten Notes (`--font-script`):** `'Caveat', cursive`
  - Used exclusively on physical artifacts: polaroid captions and cassette tape label.

## Craft Rules
- No eyebrow labels above headings; no `01 / 02 / 03` numbering; no monospace font; no emoji icons.
- Browser surfaces themed: `::selection` (`#f6e2b8` on `#090a10`), custom scrollbar, focus-visible ring (`2px solid #f6e2b8`).
- Motion: 60 FPS compositor-friendly `transform` and `opacity` transitions, exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`, full `@media (prefers-reduced-motion: reduce)` support.
