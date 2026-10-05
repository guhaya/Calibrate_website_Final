# Website redesign handoff (October 2026)

Branch: `redesign/vemisis-2026` (committed locally, **not pushed**; pushing to `main` auto-deploys to Vercel).

## Brand hierarchy used on the site

- **GVNFIT / Guhayavarman Fitness**: the business (footer wordmark, copyright).
- **CALIBRATE**: the coaching methodology the site sells (logo, headlines).
- **Vemisis**: the training app that delivers CALIBRATE (app sections, app icon, `/features`).

## What changed

- **Design system** (`app/globals.css`): Anton display / Plus Jakarta Sans body / JetBrains Mono labels, pill buttons, `.rv` scroll reveals, `.hl` hand-drawn highlight, `.device` phone frame, panels, marquees, reduced-motion support. `main` and `body` use `overflow-x: clip` (required for the sticky method section).
- **Logo** (`components/layout/Logo.tsx`): new "calibration dial" C mark. Favicon, `apple-icon.png` and `public/og-image.png` (link preview, previously missing) regenerated.
- **Navigation / footer**: floating pill nav that hides on scroll down, full-screen mobile menu; new footer with Vemisis app card.
- **Homepage** (`components/landing/*`): hero with your cutout, app phones and ribbon; stats marquee; problem-to-system diagram; pinned DMAIC scroll story; Vemisis app fan and feature bento; goal cards; results carousel and review marquees; head coach; three steps; pricing; FAQ; yellow closing CTA.
- **Rebuilt pages**: `/how-it-works`, `/features` (Vemisis App), `/pricing`, `/success-stories`, `/coaches`.
- **Restyled pages** (new header, brand colours, existing content kept): `/clients`, `/blog`, `/support`, `/contact`, `/apply`, `/book`, legal pages.
- **Removed**: old `components/home/*`, `ParticleNetwork`, `public/app-screens/*` (all unused after the rebuild). The footer "subscribe" form was removed because it never sent anything.

## Contracts kept intact

- Pricing still loads live plans from `/api/form-data` (admin → Rates); fallback plans show until it responds.
- `/coaches` still reads `team_members` live (`export const dynamic = "force-dynamic"`).
- `/apply`, `/book`, `/contact`, visitor tracking, legal policy pages and all of `/admin` + `/api` are functionally unchanged.

## Assets added (`public/media/`)

- `app/`: 23 Vemisis screenshots (demo account "Alex Rivera"; no real client data), WebP 640px.
- `coach/`: studio cutouts and portraits from `VemisisReel/brand/canva-full`.
- `life/`: images from `VemisisReel/brand/ai-library` (AI-generated brand library; used only as unnamed lifestyle imagery).
- `brand/`: Vemisis app icon, Vemisis mark, GVNFIT wordmark, G monogram.

## Verified

- All 15 public routes plus `/admin` return 200 at 1440px and 390px on a production build (`npm run start`), with no horizontal scroll and no console errors.
- Live pricing confirmed: `/api/form-data` returns the admin-managed plans.
- `npm run build` passes. ESLint is clean for all new/changed public code; remaining errors are pre-existing in `/admin` components.

## Please review before going live

1. **Social proof**: client numbers now use the verified figures (45 clients, 10 countries, 5 continents). The named testimonials are confirmed real clients. Still unverified, carried over from the old site: "98% satisfaction", "4.9/5", "9.8kg average fat lost". "Arjun K." (Results page) shares identical numbers with "James O.".
2. **Existing copy that disagrees with itself**:
   - "James O., Teacher" (homepage) and "Arjun K., Staff Engineer" (Results page) share identical before/after numbers.
   - The Vemisis coach chat screenshot itself shows "Replies usually within 24 hours" (in-app text, not website copy); the website now says 4 hours everywhere.
3. **Assumption**: the site says Vemisis access is included with every plan.

## To go live

```bash
git push origin redesign/vemisis-2026
```

Check the Vercel preview for that branch, then merge into `main` to deploy to calibrate.gvnfit.online.
