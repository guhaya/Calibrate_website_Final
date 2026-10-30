# GVNFIT policy text (review copies)

These three files are the admin-ready text of the GVNFIT legal policies, taken
from the October 2026 drafts (`GVNFIT_*_Draft.md`). Wording is unchanged except
for title-case headings, `**Label:**` formatting on contact lines and sub-headings
in Privacy section 3. Privacy sections 3.7 and 3.8 and the account-deletion
sentence in section 15 are kept from the portal admin's earlier version.

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

## Publishing changes

1. Publish each changed file as a new version in the portal admin.
2. Paste the same text into the matching www.gvnfit.online (Wix) page, then check
   the page height on desktop and phone: Wix keeps a section's old height, so
   shorter text leaves a blank gap.

Format rules the page understands: `## ` section, `### ` sub-section, `- ` bullet,
`**bold**`, `---` divider, and `Effective date:` / `Last updated:` lines above the
first `## ` heading.
