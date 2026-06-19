# CALIBRATE Website — Deployment Guide

## Stack
- **Framework**: Next.js 16 (App Router, fully static export)
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Fonts**: Syne (headings) + Figtree (body) via Google Fonts
- **Language**: TypeScript

## Local Development
```bash
cd calibrate
npm install
npm run dev
# → http://localhost:3000
```

## Production Build
```bash
npm run build
# Outputs to .next/ — all routes are statically prerendered
```

---

## Deployment Options

### Option 1: Vercel (Recommended — zero config)
```bash
npm i -g vercel
cd calibrate
vercel
# Follow prompts — deploys in ~60 seconds
```
Or connect your GitHub repo at vercel.com for auto-deploys on push.

### Option 2: Netlify
```bash
# Add to next.config.ts: output: 'export'
npm run build
# Upload the .next/ folder (or connect repo at netlify.com)
```

### Option 3: Any Node.js Host (Railway, Render, Fly.io)
```bash
npm run build
npm start
# Runs on PORT env var (default 3000)
```

---

## Environment Variables
None required for the base site. When you add integrations, set these:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live domain (e.g. https://calibrate.fitness) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |

---

## Update `metadataBase` Before Launch
In `app/layout.tsx`, update the URL to your live domain:
```ts
metadataBase: new URL("https://yourcalibratedomain.com"),
```

## Update `sitemap.ts` Base URL
In `app/sitemap.ts`, update:
```ts
const baseUrl = "https://yourcalibratedomain.com";
```

---

## Pages
| Route | Purpose |
|---|---|
| `/` | Home — hero, metrics, ecosystem, features, comparison, testimonials |
| `/features` | Deep feature sections (Coach Portal, Client App, Automation Engine) |
| `/coaches` | Coach-targeted pain points and solutions |
| `/clients` | Client journey and app experience |
| `/pricing` | Three-tier pricing with feature matrix |
| `/success-stories` | Coach and client case studies |
| `/blog` | Content hub with category filtering |
| `/support` | Demo booking form, contact methods, FAQ |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots file |

---

## Adding Real Integrations

### Demo Booking
Replace the form in `app/support/page.tsx` with Calendly embed:
```tsx
<iframe src="https://calendly.com/your-link" ... />
```
Or use Cal.com, HubSpot meetings, or a custom webhook.

### Email Capture (Newsletter)
Replace the subscribe form in `app/blog/page.tsx` with your email provider (Mailchimp, ConvertKit, Resend, etc.).

### Analytics
Add to `app/layout.tsx`:
```tsx
import Script from 'next/script'
<Script src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID" />
```

### Contact Form
The demo booking form in `/support` currently fires `setSubmitted(true)` on submit. Wire it to a real endpoint (Resend, Formspree, or a Next.js API route) to receive submissions.

---

## Design Tokens (CSS Variables)
All colours are in `app/globals.css`:
```css
--bg-primary: #0E1720
--bg-secondary: #16212D
--accent: #D4AF37        /* Gold */
--text-primary: #FFFFFF
--text-secondary: #9AA4B2
--success: #22C55E
--error: #EF4444
```

## Typography
- **Display/Headings**: Syne (800 weight for hero, 700 for sections)
- **Body**: Figtree (400 regular, 500 medium, 600 semibold)
- Both loaded from Google Fonts in `app/layout.tsx` `<head>`

---

## SEO Checklist Before Launch
- [ ] Update `metadataBase` in `app/layout.tsx`
- [ ] Add real `og-image.png` to `/public/` (1200×630px)
- [ ] Update sitemap base URL in `app/sitemap.ts`
- [ ] Add Google Search Console verification meta tag
- [ ] Submit sitemap to Google Search Console
- [ ] Test Core Web Vitals with PageSpeed Insights
