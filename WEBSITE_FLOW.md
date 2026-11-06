# RBK TradeXchange: Website Flow & Page Map

## 1. Visitor journey (how the website flows)

1. **Discover**: Home (`/`) opens with an animated five-slide hero (Business Finance, Trade Finance, Supply Chain, E-Docs, Lender Quotes: three short points and three photos each), then a tabbed finance explorer for the three categories, document-AI and lender-quote highlights, the five-step process, platform modules, a live finance estimator and latest guides.
2. **Understand a product**: `/finance` → `/finance/[category]` → `/finance/[category]/[product]`
   (e.g. `/finance/international-trade-finance/lc-solutions`: every sub-product, how it works, who it is for, documents, FAQs).
3. **Explore the platform**: `/platform` → `/platform/[slug]` (AI document analysis, business finance, network management, lender quotations, e-docs studio, responsible AI).
4. **Try tools**: finance estimator (`/finance#estimator`) and e-docs live previews (`/documents/[slug]`).
5. **Learn**: `/resources` (search + tag filter) → `/resources/[slug]`.
6. **Decide**: `/pricing`, `/faq`, `/how-it-works`.
7. **Convert**: `/signup` → `/login` → portal. `/contact` for questions.

## 2. Route map

| URL | Type | Source of content |
|---|---|---|
| `/` | static | `app/(site)/page.tsx` |
| `/finance` | static | `lib/content.ts → categories` |
| `/finance/[category]` | dynamic (3 pages) | `categories[]` |
| `/finance/[category]/[product]` | dynamic (11 pages, 34 sub-products) | `categories[].products[]` |
| `/platform` | static | `modules[]` |
| `/platform/[slug]` | dynamic (6 pages) | `modules[]` |
| `/documents` | static | `eDocs[]` |
| `/documents/[slug]` | dynamic (6 pages) | `eDocs[]` |
| `/resources` | static, client filter | `resources[]` |
| `/resources/[slug]` | dynamic (5 pages) | `resources[]` |
| `/how-it-works`, `/pricing`, `/faq` | static | existing section components + `flow[]` |
| `/contact`, `/login`, `/signup` | unchanged | existing pages |
| `/sitemap.xml`, `/robots.txt`, 404 | generated | `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx` |

## 3. Adding or editing pages

Open `lib/content.ts`. Add an object to `categories[].products`, `modules`, `eDocs` or `resources` and the page, navigation cards, sitemap and static params update automatically.
Set `NEXT_PUBLIC_SITE_URL` in your environment so the sitemap uses your real domain.

## 4. Images

Real photos (Pexels) are defined in `lib/photos.ts` and listed by section in `IMAGE_URLS.md`. Each slot also has a bundled SVG illustration in `public/images/` that is used automatically if a photo fails to load. To swap a photo, change its ID in `lib/photos.ts` or use your own URL.

## 5. Layout

`app/(site)/layout.tsx` wraps every marketing page with the Navbar and Footer. Contact, login and signup keep their original standalone layouts. Design tokens and components are documented in `DESIGN_SYSTEM.md`; the redesign change log is in `REDESIGN_NOTES.md`.
