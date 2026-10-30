# GVNFIT legal policy upgrade: implementation report

Prepared 30 October 2026. Branch `legal/policy-upgrade` (local worktree
`/Volumes/Extreme SSD/Development/Calibrate-Website-legal`, cut from `origin/main` 8f62a24).
These are business-policy drafts implemented for review. Nothing here is a legal
certification or a statement of compliance.

## A. Source document validation

| File | Found | Size (bytes) | Read in full |
| --- | --- | --- | --- |
| GVNFIT_Terms_and_Conditions_Draft.md | Downloads only | 15,900 | Yes |
| GVNFIT_Privacy_Policy_Draft.md | Downloads only | 12,691 | Yes |
| GVNFIT_Refund_Cancellation_Rescheduling_Policy_Draft.md | Downloads only | 14,020 | Yes |
| GVNFIT_Complete_Website_Policy_Pack_Draft.md | Downloads only | 42,103 | Yes |
| GVNFIT_Website_Policies_Markdown_Bundle.zip | **Not found** | – | – |

- **Location.** None of the files are in the project root; all four are in `/Volumes/Extreme SSD/Downloads/`.
- **ZIP.** `GVNFIT_Website_Policies_Markdown_Bundle.zip` is not in the project root or Downloads. The wider disk search was stopped at your request, so the ZIP integrity check was **not done**.
- **Master pack.** A mechanical line diff shows each policy body in the master pack is identical to its standalone file. The only differences are the standalone title blocks ("Prepared for website publication review | Draft for legal review") and the closing "Publication note".
- **Wording preserved.** A word-level diff between each draft and the implemented text shows **no words removed or changed**. The comparison ignores case, punctuation and markdown, because headings changed from ALL CAPS to title case and "30--45" became "30–45". Additions are limited to:
  - "Drafting note" markers;
  - "Brand:" labels on contact lines;
  - six sub-headings in Privacy §3, each repeating that paragraph's opening words.
- **Not carried onto the pages.** The title-page lines, the "IMPORTANT" boxes and the publication notes are instructions to the publisher, not clauses. They are listed in section K instead.

**Conflict to resolve (not changed).** The emergency allowance is worded differently:
- Terms §11: "one emergency cancellation allowance per active monthly coaching plan".
- Refund §10: "Each active monthly coaching plan includes one emergency cancellation allowance per calendar month".

They agree for a plan that runs one calendar month. They are ambiguous for plans that cross calendar months, and neither says how the allowance applies to 12-session packages.

## B. Existing website audit

**1. www.gvnfit.online is a Wix site, so it can't be edited from code.** The live pages carry Effective/Last updated 5 October 2026.
- **CALIBRATE terms.** The live Terms §9.1 and Refund §5 set:
  - a 3-month minimum;
  - Monthly billed monthly;
  - Quarterly billed upfront and "non-refundable once the programme has begun";
  - 7-day cooling-off;
  - 7 days' notice before the next billing date;
  - a Razorpay e-mandate.

  These conflict with draft Refund §17.
- **Grievance officer.** The live pages name Vikram, Fitness Director (vlvikram@outlook.com, +91 9962687086), with 48-hour acknowledgement and 1-month resolution. The drafts leave the grievance contact as a placeholder.
- **GST.** The live Terms state "GVNFIT is not registered for GST". The drafts only say GVNFIT does not represent that it is GST-registered.
- **Health consent claim.** The live Terms say health information is collected "only with your separate, explicit consent … by ticking the consent checkbox on the intake form". The portal onboarding form has no such checkbox, only one combined policy-agreement checkbox, so this claim looks inaccurate.
- **Clauses not in the drafts.** The live text claims compliance with the DPDP Act 2023, the IT Act and the SPDI Rules. It also has the following clauses, none of which are in the drafts:
  - a liability cap of fees paid in the last 3 months;
  - exclusive jurisdiction of the Chennai courts;
  - indemnity, force majeure, assignment, waiver, severability, survival and governing language;
  - 7 days' email notice of material changes, with the right to cancel and receive a pro-rata refund;
  - a PAR-Q requirement;
  - all times in IST.
- **Inconsistent contacts.** The Privacy page "Who we are" has no address or phone. The privacy contact is Vikram, while the contact section gives admin@gvnfit.online. The website is written as https://gvnfit.online in some places and https://www.gvnfit.online in others.
- **Footer.** It links all three policies.

**2. calibrate.gvnfit.online (this repo; production = `origin/main`).**
- **Routes and content source.** The legal pages are `/terms`, `/privacy-policy` and `/refund`, all `noindex`. Their text comes from Supabase via the portal admin.
- **Intros.** The old Terms intro said "By proceeding, you agree to these terms in full", which conflicts with draft Terms §1. The Refund intro referred to "the minimum commitment".
- **Page structure.** There were no breadcrumbs and no effective date, and the footer label was "Terms of Service". `###` rendered as bold paragraphs, and bullets as literal "- " text.
- **Contrast bug.** The section chips sat under the hero's bottom fade overlay, so they rendered dim.
- **3-month minimum and Quarterly copy elsewhere.**
  - `app/pricing/PricingClient.tsx`, with the "Why a 3-month minimum commitment?" FAQ;
  - `app/pricing/page.tsx`, both the metadata and the FAQ JSON-LD;
  - `components/landing/Pricing.tsx`, including the guarantee list item "3-month minimum, then month to month";
  - `components/landing/Faq.tsx`;
  - `app/contact/ContactClient.tsx`, two FAQ answers;
  - `app/support/SupportClient.tsx`;
  - `app/layout.tsx`, the Offer JSON-LD "Minimum 3-month commitment" and "Quarterly … billed upfront";
  - `app/programmes/data.ts`.
- **Visitor tracking.** `VisitorTracker` posts every page view to `/api/track`. The server stores IP, country, region, city, latitude/longitude, user-agent, device, browser, page, referrer and a session ID. There is no notice or consent banner.

**3. Your local checkout (`Calibrate-Website`, branch `main`).** It is 74 commits behind and 1 ahead of `origin/main` (commit aed6e0b, unpushed), and it holds uncommitted work: the assessment form, APIs, `lib/`, CookieConsent and ChatWidget. Its hard-coded legal pages contain older terms:
- ₹25,000/month with a 3-month minimum;
- 14 days' notice;
- payments "non-refundable once coaching has commenced";
- suspension after 5 business days;
- "typically 2 years" retention;
- "respond within 30 days";
- "encrypted data storage … row-level security";
- Google Analytics;
- 18+ only.

Its footer links to app.gvnfit.online/policies. **This checkout was not touched.**

**4. calibrate-portal (app.gvnfit.online), read-only audit.**
- **Onboarding consent.** One required checkbox reads "I have read and agree to the Terms & Conditions, Privacy Policy, and Refund Policy". It links `/policies/{type}` and records the accepted version of each policy.
- **No other consent.** There is no separate marketing, photo or testimonial permission.
- **Out of scope.** Checkout, payments, login and the client dashboard live in this repo. Per your instructions on payments and authentication, nothing there was edited.

## C. Implementation summary

- **Content source.** The three policy texts are admin-ready markdown in `docs/policies/`. The live source stays the Supabase admin, as you chose. No database writes were made.
- **Layout.** `components/legal/PolicyPage.tsx` is extended rather than rewritten. It now has:
  - breadcrumbs, one H1, a short intro, and Effective date and Last updated taken from the policy text;
  - shared policy navigation with `aria-current`;
  - a sticky table of contents on desktop and a collapsible one on mobile;
  - real `<h2>`/`<h3>`/`<ul>` markup;
  - stable number-free anchor IDs with a 112px scroll offset;
  - autolinked web, email and phone details;
  - visible highlighting of every `[placeholder]`, plus a note explaining it;
  - related-policy links and a Contact link.
- **Contrast fix.** The hero overlay no longer dims the page content.
- **Content parsing.** `lib/policies.ts` parses optional `Effective date:` and `Last updated:` lines and builds per-page metadata. It also adds `POLICY_PREVIEW=draft`, which renders the `docs/policies` files locally and is never used on Vercel.
- **Registry.** `lib/policy-routes.ts` holds a single registry of routes, labels, intros and SEO text, safe to import from any component.
- **Unchanged.** No clause meaning was changed and no CALIBRATE marketing copy was edited, as you chose.

## D. Updated routes (calibrate.gvnfit.online, local)

- `/terms-and-conditions` (replaces `/terms`, which now 308-redirects here)
- `/privacy-policy`
- `/refund-policy` (replaces `/refund`, which now 308-redirects here)

## E. Modified files (worktree only; none committed)

| Change | File |
| --- | --- |
| Renamed and rewritten | `app/terms/page.tsx` → `app/terms-and-conditions/page.tsx` |
| Renamed and rewritten | `app/refund/page.tsx` → `app/refund-policy/page.tsx` |
| Modified | `app/privacy-policy/page.tsx` |
| Modified | `components/legal/PolicyPage.tsx` |
| Modified | `lib/policies.ts` |
| Created | `lib/policy-routes.ts` |
| Modified | `next.config.ts` (2 redirects) |
| Modified | `components/layout/Footer.tsx` |
| Modified | `components/landing/Pricing.tsx` (refund link URL and text only) |
| Modified | `components/apply/ApplyForm.tsx` (privacy notice line) |
| Modified | `app/contact/ContactClient.tsx` (privacy notice line) |
| Created | `docs/policies/terms-and-conditions.md` |
| Created | `docs/policies/privacy-policy.md` |
| Created | `docs/policies/refund-policy.md` |
| Created | `docs/policies/README.md` |
| Created | `docs/policies/IMPLEMENTATION-REPORT.md` |

## F. Design and UX

- **Existing design system.** The pages reuse the dark theme, Anton/Schibsted fonts, accent yellow, the `.grid-bg` hero and `.btn-secondary`. No new gradients, icons, animations or cards were added.
- **Readability.** The reading column is at most 720px wide, with 16px body text and 1.75 line height.
- **Navigation.** Policy navigation pills are at least 44px tall. The table of contents is sticky on screens 1024px and wider, and becomes a native `<details>` disclosure below that.

## G. Website integration

- **Footer.** "Terms & Conditions", "Privacy Policy" and "Refund Policy" now point to the new routes, inside `<nav aria-label="Legal">`.
- **Pricing.** The "Fees and cancellations follow our …" link now points to `/refund-policy`.
- **Apply form.** A short privacy notice with a Privacy Policy link appears under the submit button. It is not a checkbox, and submission is unchanged. The live form asks no health questions.
- **Contact form.** The same kind of privacy notice was added. It opens your email app, as before.
- **No changes needed.**
  - Booking: it is a plain link to Google Calendar.
  - Homepage and services pages: they have no forms.
- **Not in this repo (portal).** Onboarding, checkout, payment, login and the client dashboard. The proposed consent changes are below, for you to apply after legal review:
  1. Required checkbox: "I have read and agree to the Terms & Conditions and the Refund, Cancellation & Rescheduling Policy."
  2. Notice, not a checkbox: "We handle your information, including health and fitness details you share for coaching, as described in our Privacy Policy." Ask your lawyer whether health information needs its own explicit consent checkbox.
  3. Optional checkbox, unticked by default: "Send me occasional updates and offers by email or WhatsApp."
  4. Photo, video, testimonial or story use: ask for written permission separately, for each specific use, at the time of use. Never bundle it with onboarding.

## H. Policy consistency (verified mechanically across the three texts)

| Item | Result |
| --- | --- |
| Business, brand, address, phone | Identical everywhere |
| Email | Same placeholder everywhere (not filled) |
| Website | https://www.gvnfit.online everywhere |
| Prepaid unless agreed in writing | Terms §8, Refund §3 agree |
| 12-session deadline, invoice at 3 remaining, no session 13 until verified | Terms §9, Refund §3 agree |
| Session length 30–45 min, up to 60 sometimes, no guarantee of 60 | Terms §6, Refund §13 agree |
| Late arrival does not extend end time | Terms §6–7, Refund §12 agree |
| Rescheduling notice | 16 hours only, Terms §11, Refund §7–8 |
| Emergency allowance | Agrees in substance; wording differs (see A) |
| Penalties and late fees | Only prohibitions; none imposed |
| Refund process | Written request by email/WhatsApp, decision in writing, no invented timeframe |
| Privacy contact | Placeholder (privacy and grievance contacts both unconfirmed) |
| Dates | Placeholders on all three |

## I. SEO and accessibility

**Rendered-page checks (passed on all three pages):**
- one H1 and no skipped heading levels;
- no duplicate IDs;
- every table-of-contents anchor has a target (49, 41 and 45 anchors);
- all 15 internal links on each page return 200.

**Search metadata:**
- unique titles: "GVNFIT Terms & Conditions | Guhayavarman Fitness", "GVNFIT Privacy Policy | Guhayavarman Fitness", and "GVNFIT Refund, Cancellation & Rescheduling Policy";
- unique descriptions;
- canonical set to the www.gvnfit.online URL;
- `index, follow` (previously `noindex`).

**Sitemap.** The legal pages are not added to this site's sitemap, because their canonical copy is on www. No structured data was added.

**Accessibility, measured:**
- **Keyboard.** Tab order follows reading order (breadcrumbs → policy navigation → table of contents → content), with a visible outline on every stop.
- **Contrast.** Every text colour passes AA, with the lowest at 5.14:1.
- **Overflow.** No horizontal overflow at 375px, 768px or 1024px, or at 200% root text size.
- **Touch targets.** No controls under 24px on mobile; inline text links are exempt.
- **Scroll offset.** An anchor lands its heading 112px from the top, below the fixed header.

## J. Testing results (actually run)

| Check | Result |
| --- | --- |
| `tsc --noEmit` | Exit 0 |
| ESLint on changed files | Exit 0 |
| ESLint, whole project | 12 problems before and after, all in `/admin` files not touched |
| `npm run build` (Next 16.2.9) | Passed. New routes built as dynamic |
| Automated tests | **None exist**: no test script or test files in the project |
| Route checks | `/terms-and-conditions`, `/privacy-policy`, `/refund-policy` return 200; `/terms` and `/refund` return 308 |
| Link, anchor and metadata checks | Passed (see I) |
| Console | Only errors are `POST /api/track` 500. That is the existing tracker; it fails locally because no database credentials were copied into the worktree. No page errors |
| Responsive (375 / 768 / 1024) | Passed, with screenshots taken |

The rendering checks used the production build with `POLICY_PREVIEW=draft`.

**Not verified:**
- Deep links on first page load (opening `/refund-policy#late-arrival` directly). The in-app browser pane was hidden, and the existing production `/contact#faq` behaves the same there. In-page TOC clicks and hash changes were verified.
- The pages rendering real database content locally, since no credentials were used.
- Form submission end to end, since no credentials were used. The form logic is unchanged; only a static paragraph was added.

## K. Outstanding items (publication blockers unless marked)

1. **Email.** The business, privacy and refund email is a placeholder on all three policies (5 places). The site currently shows Admin@gvnfit.online, but it was not filled in, per your instruction.
2. **Grievance contact.** The person or role and verified contact are placeholders (Privacy §2 and §19). The live Wix site names Vikram, vlvikram@outlook.com; confirm whether that still applies.
3. **Dates.** The Effective date and Last updated date are placeholders on all three.
4. **Drafting notes left in place.**
   - Terms §2: confirm business name, constitution, address and contacts.
   - Privacy §1: confirm legal identity.
   - Privacy §10: verify the actual vendors and data flows.
5. **Legal constitution of Lakchinna Digitals.** Unconfirmed; the drafts state only "MSME-registered".
6. **GST status.** Unconfirmed. The live Wix site says "not registered"; the drafts make no statement.
7. **Retention schedule.** Privacy §14 commits to an internal retention schedule. None exists in the code or documents, and no retention periods are stated.
8. **Vendors and data flows.** Unverified. This site's production code uses Supabase (database), Vercel (hosting, plus IP geolocation headers) and Google Calendar (booking link). The live Wix text names Razorpay for payments, and the Vemisis app handles coaching delivery; neither was found in this repo. Telegram notifications exist only in your uncommitted local work. Some of these providers may process data outside India (Privacy §12).
9. **Visitor tracking.** It logs IP, city and latitude/longitude per page view with no notice or consent. Privacy §3.6 and §9 do not mention IP-derived location. A lawyer should decide on wording, consent and retention.
10. **CALIBRATE 3-month minimum and non-refundable Quarterly plan.** Still sold on Pricing, Home, FAQ, Contact, Support and in JSON-LD, which conflicts with Refund §17. Recommended fix, depending on your decision:
    - If the plan continues: create a separate CALIBRATE programme agreement that discloses the term, billing, cancellation and refund before purchase, and link it from Pricing.
    - If it is retired: remove the commitment wording from the marketing copy and JSON-LD.
11. **Existing CALIBRATE clients** signed under the live terms (3-month minimum, Quarterly upfront). The new terms do not apply retroactively (Terms §9 and §22, Refund §22). Keep their accepted versions on record. The portal already stores accepted version numbers.
12. **Emergency allowance wording** differs between Terms §11 and Refund §10, and it is unclear how it applies to 12-session packages.
13. **Clauses in the live Wix Terms that the drafts drop.** Decide with your lawyer whether to keep any of them:
    - limitation of liability and the liability cap;
    - Chennai jurisdiction, with Consumer Commission rights;
    - indemnity, force majeure, assignment, waiver, severability, survival and governing language;
    - 7 days' notice of changes;
    - PAR-Q;
    - IST;
    - the account-security and acceptable-use lists;
    - Wix Refund clauses on chargebacks, payment gateway charges and package transfer.

    Your brief listed limitation of liability, dispute resolution and jurisdiction, but the Terms draft does not contain them. They were **not invented**.
14. **DPDP.** The drafts avoid claiming full DPDP compliance; the live Wix text claims it. Have a lawyer confirm which provisions are in force and what notice or consent is required for health data.
15. **Health consent.** The live Wix claim of a separate health-consent checkbox appears untrue; see B.
16. **Canonical.** The pages point to www.gvnfit.online, which only makes sense once the Wix pages carry the same text. Until then, either update Wix first or ask me to make calibrate self-canonical.
17. **Indian lawyer review** of all three policies, especially refund calculation and deductions, expiry, the CALIBRATE structure, cross-border processing, children's data and grievance timelines.

## L. Deployment status

- **Code.** Local only, uncommitted, on branch `legal/policy-upgrade` in a separate worktree. Not pushed, not deployed. Pushing to `main` auto-deploys to Vercel; it has not been pushed.
- **Database.** No writes. The live pages still show the current admin text until you publish new versions in the portal admin.
- **Portal.** Publishing there queues a client notice for your review; emails are sent only by a separate action.
- **Wix.** Not changed. Paste-ready copies are in `docs/policies/wix/*.html`: open each in a browser, then select and copy into the matching Wix page.
- **Your original checkout** (`Calibrate-Website`): its working tree and staged changes are untouched. The shared repository did change in three ways:
  - `git fetch` updated the remote-tracking refs;
  - a local branch `legal/policy-upgrade` was created;
  - a worktree was registered at `../Calibrate-Website-legal`.

  To remove it later: `git worktree remove ../Calibrate-Website-legal`, then `git branch -D legal/policy-upgrade`.
- **Local preview server.** Stopped. Restart it with the command in `docs/policies/README.md`.

### Release order (precondition for going live)

All rendering checks used the draft files. If this code reached production before the new text is published, the new intros and descriptions would sit above the **old** database text:
- the page would describe rules (16-hour notice, 12-session deadline) that the text doesn't contain;
- it would show "[Not stated]" for the effective date;
- its canonical tag would point at Wix pages that still carry the 3-month minimum.

Release in this order:
1. Resolve every item in K and complete the lawyer review.
2. Publish the three texts as new versions in the portal admin. The current production template renders them acceptably.
3. Update the three Wix pages with the same text.
4. Only then merge `legal/policy-upgrade` into `main`, which deploys calibrate.gvnfit.online.
