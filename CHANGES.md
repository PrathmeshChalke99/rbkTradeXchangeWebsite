# Update notes

Navbar and footer files were NOT edited.

## Colour: navy #022350 + coral #FA7F63
- tailwind.config.ts -> `brand.accent` (DEFAULT coral #FA7F63, dark #B8452A for small text on white, soft #FEEEE9, glow #FDB9A8).
  Change these values to re-theme the whole site. `shadow-glow-coral` added.
- app/globals.css: coral gradient primary buttons (navy text, AA contrast), coral hover borders, eyebrow, link arrows,
  coral highlight gradient text, slider, selection. `html, body { overflow-x: clip }` stops sideways scroll on phones.
- Navbar "Log in" turns coral automatically (shared .btn-primary). The navbar file itself still has a few orange hover classes.

## White hero + AI sections
- Heroes (home carousel + every inner page) and the AI section sit on pure white; colour only appears in accents and a very faint glow.

## AI report PDFs (components/pages/report-journey.tsx)
- Each of the 4 AI steps now has a "Sample PDF report" card with Preview (opens the PDF in a dialog) and Download,
  plus a 3-step explainer (upload -> AI writes the report -> your team reviews).
- Sample PDFs (illustrative data, clearly labelled SAMPLE) are in public/reports/:
  sample-document-check.pdf, sample-lc-discrepancy.pdf, sample-finance-readiness.pdf, sample-lender-quotes.pdf.
- To use YOUR reports: overwrite those files (same names) with anonymised real ones, or change the `pdf.file` paths in `steps`.
- If a browser can't show PDFs inline, the dialog offers "Open in new tab" and "Download".
- Report screenshots now fall back to the built-in animated version when an image file is missing (fixes the blank Step 3 card).

## 3D and motion
- components/pages/tilt-3d.tsx (new): cards tilt toward the pointer with a glare; children can pop forward with translateZ.
- components/pages/hero-3d.tsx (new): 3D scene (document card, floating chips, spinning cube, orbit ring) for page heroes without a photo.
- page-hero.tsx: every inner page hero is white with a 3D media area (tilting photo + floating chip, or the 3D scene).
- Home hero: small spinning cube. Module cards and the AI report tilt in 3D.
- reveal.tsx: new `variant` prop (up, left, right, zoom, tilt); staggered items scale in. Section headings reveal on scroll.
- app/(site)/template.tsx: smoother page transition. All motion respects reduced-motion settings.

## Other
- lib/content.ts: optional `video` added to Product/Module types (navbar used it; typecheck failed before).
- `npm run typecheck` and `npm run build` pass.

## To do on your side
- Replace the sample PDFs with your anonymised real ones. The site is public.
- Optional: add public/images/finance_readiness.png for Step 3 (otherwise the animated version shows).
