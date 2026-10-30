# GVNFIT policy text (review copies)

These three files are the admin-ready text of the GVNFIT legal policies, taken
from the October 2026 drafts (`GVNFIT_*_Draft.md`). Wording is unchanged except
for title-case headings, `**Label:**` formatting on contact lines, sub-headings
in Privacy section 3, and publisher instructions wrapped as `[Drafting note: ...]`.

| File | Page on this site | Admin policy type |
| --- | --- | --- |
| `terms-and-conditions.md` | `/terms-and-conditions` | `terms` |
| `privacy-policy.md` | `/privacy-policy` | `privacy` |
| `refund-policy.md` | `/refund-policy` | `refund` |

The live pages do **not** read these files. They read the latest version in
Supabase (`policy_documents` / `policy_versions`), which the portal admin at
app.gvnfit.online/admin/policies writes and which onboarding records as the
version a client accepted. These files are the review copy only.

## Preview locally

```bash
npm run build && POLICY_PREVIEW=draft npm run start
```

`POLICY_PREVIEW=draft` makes the three pages render these files instead of the
database, with a "Draft preview" notice. Never set it on Vercel.

## Before publishing (release order)

Every `[bracketed]` item is unconfirmed and is highlighted on the page.

1. Resolve them all (email, grievance contact, both dates, drafting notes) and
   complete the Indian lawyer review.
2. Publish each file as a new version in the portal admin.
3. Paste the same text into the matching www.gvnfit.online (Wix) page. Copy it
   from `wix/*.html` opened in a browser, so formatting survives.
4. Only then merge the code that adds the new routes and page layout. Merging
   first would show the old database text under the new page intros.

Format rules the page understands: `## ` section, `### ` sub-section, `- ` bullet,
`**bold**`, `---` divider, and `Effective date:` / `Last updated:` lines above the
first `## ` heading.
