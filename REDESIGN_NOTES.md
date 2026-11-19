# Redesign change log

## Foundation
- `tailwind.config.ts` — new palette from logo navy/sky, Sora/Inter/JetBrains Mono, fluid type sizes, shadows, motion keyframes, extra opacity steps.
- `app/globals.css` — rewritten (≈2,000 → ≈330 lines): tokens, buttons, cards, fields, slider, dark surfaces, skeletons, reduced-motion override. Dead landing-page CSS removed.
- `app/layout.tsx` — self-hosted fonts, skip link, updated metadata, theme colour, global `Providers` (MotionConfig).
- `lib/utils.ts` — tailwind-merge taught the custom font sizes.
- Palette hexes in `lib/content.ts`, `lib/site-config.ts` and section components remapped; fallback SVG illustrations recoloured.
- `lib/content.ts` — removed the invented category stats (approval %, ratings, turnaround).

## Shell
- Navbar: transparent-over-dark → frosted on scroll, white/colour logo switch (logo was oversized at 144px), animated Finance and Platform mega-menus, hover pill, active underline, scroll-progress bar, Escape to close, mobile slide-in drawer with expandable sections.
- Footer: dark navy, logo, contact, four link columns, platform + AI disclaimers.
- PageHero, Section/Heading, CTA banner, breadcrumbs, photo (skeleton + fade + fallback), reveal helpers.

## Pages
- Home: dark hero carousel (all 5 slides, autoplay/pause/swipe kept) with labelled sample AI-check card; factual stats strip; product ribbon; new "who it connects" hub diagram; finance explorer; AI document cross-check vignette + trade-document coverage; lender quotation vignette; module bento; 5-step timeline; estimator; guides; CTA.
- Finance hub, category, product (sticky "on this page" nav, numbered mechanism, fit vs considerations, documents + FAQs side by side).
- Platform overview (bento + framed interactive workbench + workflow) and module pages (capabilities, workflow; new adaptive-checklist, partner-graph and template sections for modules that had none; prev/next cards).
- E-Docs (miniature document cards, workflow), template pages (redesigned live preview).
- Resources (animated filters, search clear, empty state), article (dark header, sticky table of contents, apply CTA).
- How it works (timeline, readiness checklist from the existing guide, site-flow map), Pricing (dark featured plan, **buttons now link to /signup and /contact**, pricing FAQs), FAQ (category side nav, contact card), 404.
- Login, Signup, Contact: split-screen layout; Supabase/auth and form logic unchanged; proper labels, autocomplete, password visibility labels, password-strength hint, subject quick-picks.

## Removed (unused, not rendered anywhere)
`components/site/hero.tsx`, `features-section.tsx`, `platform-capabilities.tsx`, `business-finance-section.tsx`, `final-cta.tsx`, `trade-workflow.tsx` (replaced by `components/pages/steps-timeline.tsx`).

## Verified
`tsc --noEmit` clean · `next build` succeeds (49 static pages) · all routes checked at 1440px and 390px: no runtime/hydration errors, no horizontal overflow, one `<h1>` per page, reduced-motion mode clean.
