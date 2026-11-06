# RBK TradeXchange — Design System

**Theme statement:** precise, assured, global trade desk.
Dark "command-centre" navy bands frame light, data-forward content. Product truth (sample document checks, quotations, checklists) is shown instead of decorative imagery.

## Colour (tailwind `brand.*`, anchored to the logo)
| Token | Hex | Use |
|---|---|---|
| `brand-navy` | #022350 | Logo navy, active tabs, number badges |
| `brand-night` / `brand-deep` | #050f24 / #081a3a | Dark hero, footer, CTA surfaces (`.surface-dark`) |
| `brand-blue` | #1d5fd6 | Primary actions, links, focus ring (AA on white) |
| `brand-sky` | #44a0dc | Logo swoosh; gradients and accents only, never body text |
| `brand-turquoise` | #0f9a8a | Positive / matched states |
| `#b7700b` (amber) | | Warnings |
| `rose-600` | | Discrepancies / errors |
| `brand-ink` / `brand-slate` | #0a1630 / #4b5a74 | Headings / body text |
| `brand-paper` / `brand-line` | #f6f8fc / #e3e9f3 | Alternate section background / hairlines |
Legacy names (`violet`, `lavender`, `mint`, `pink`, `peach`…) still exist but were re-tuned into this palette so old components stay consistent.

## Type
- **Sora** (display & headings, `font-heading`), **Inter** (UI & body, `font-sans`), **JetBrains Mono** (labels, figures, document refs, `font-mono`).
- Self-hosted via `@fontsource-variable/*` (no build-time Google Fonts request).
- Sizes: `text-display` (home hero), `text-display-sm` (page heroes), `text-h2` (section titles) — fluid `clamp()` values.
- Eyebrow labels: `.eyebrow` (mono, uppercase, leading rule).

## Components (globals.css)
`.btn-primary` `.btn-secondary` `.btn-light` `.btn-ghost-dark` `.btn-lg` · `.card` `.card-hover` `.card-dark` `.ring-gradient` · `.chip` `.chip-dark` · `.field` `.field-label` · `.range` · `.surface-dark` `.grid-lines` `.grid-lines-light` `.aurora-blob` `.noise` · `.skeleton` · `.link-arrow`

React building blocks in `components/pages/`: `PageHero`, `Section`/`Heading`/`Disclaimer`, `Reveal`/`RevealGroup`/`RevealItem`, `CtaBanner`, `NumberedSteps`, `StepsTimeline`, `ModuleBento`, `StatsStrip`, `OnThisPage`, `DocCard`, `NetworkGraph`, `home-visuals` (ConnectMap, DocCheckVisual, QuoteVisual, DocTypeChips), `auth-shell` (AuthShell, Field, FormError, Spinner).

## Motion
- Easing `cubic-bezier(0.16, 1, 0.3, 1)` (`ease-out-expo`), 0.4–0.8s for reveals, springs for tab pills (`layoutId`).
- Scroll reveals once; page fade on route change; animated mega-menus, drawer, accordions, counters, estimator numbers.
- `MotionConfig reducedMotion="user"` plus a global `prefers-reduced-motion` CSS override.

## Content rules
- No invented statistics, customers, partners, testimonials or certifications. Figures shown are counts derived from `lib/content.ts`.
- Sample / simulated UI is always labelled ("Sample data", "Simulated").
- RBK TradeXchange is described as a technology platform, never a lender.
