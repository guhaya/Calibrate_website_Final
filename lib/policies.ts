import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";

// Reads the same policy_documents / policy_versions tables that
// calibrate-portal's coach admin (app.gvnfit.online/admin/policies) writes
// to, so an edit made there shows up here without a separate deploy,
// same shared Supabase project, service-role read (RLS on these tables is
// coach/service_role only). The portal's onboarding form also records which
// version a client accepted, so the database stays the single source of
// truth for policy text: nothing here duplicates it.

import { getPolicyInfo, type PolicyType } from "@/lib/policy-routes";

export { POLICIES, getPolicyInfo, type PolicyType, type PolicyInfo } from "@/lib/policy-routes";

// The www.gvnfit.online copies of these pages are the primary (canonical)
// versions; this site serves the same text for CALIBRATE visitors.
const CANONICAL_ORIGIN = "https://www.gvnfit.online";

export function policyMetadata(type: PolicyType): Metadata {
  const info = getPolicyInfo(type);
  return {
    title: { absolute: info.metaTitle },
    description: info.metaDescription,
    alternates: { canonical: `${CANONICAL_ORIGIN}${info.path}` },
    robots: { index: true, follow: true },
    openGraph: { title: info.metaTitle, description: info.metaDescription, url: info.path },
  };
}

export interface PolicySection {
  title: string;
  content: string;
}

export interface PublicPolicy {
  title: string;
  versionNumber: number;
  updatedAt: string;
  /** From an "Effective date:" line above the first heading, if present. */
  effectiveDate: string | null;
  /** From a "Last updated:" line above the first heading, if present. */
  lastUpdated: string | null;
  sections: PolicySection[];
  /** True when the text is the local draft file, not the published version. */
  isDraftPreview: boolean;
}

export async function getPublicPolicy(policyType: PolicyType): Promise<PublicPolicy | null> {
  // Local review of unpublished text: `POLICY_PREVIEW=draft npm run dev`
  // renders docs/policies/*.md through the same page. Never set on Vercel.
  if (process.env.POLICY_PREVIEW === "draft") {
    const info = getPolicyInfo(policyType);
    const raw = await readFile(path.join(process.cwd(), "docs", "policies", info.draftFile), "utf8");
    return {
      title: info.heading,
      versionNumber: 0,
      updatedAt: new Date().toISOString(),
      ...parsePolicyContent(raw),
      isDraftPreview: true,
    };
  }

  const supabase = supabaseAdmin();

  const { data: doc } = await supabase
    .from("policy_documents")
    .select("id, title")
    .eq("policy_type", policyType)
    .maybeSingle();
  if (!doc) return null;

  const { data: version } = await supabase
    .from("policy_versions")
    .select("version_number, content, created_at")
    .eq("policy_document_id", doc.id)
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!version) return null;

  return {
    title: doc.title,
    versionNumber: version.version_number,
    updatedAt: version.created_at,
    ...parsePolicyContent(version.content),
    isDraftPreview: false,
  };
}

// Content is authored in the admin editor as "## Heading" lines followed by
// blank-line-separated paragraphs and "- " bullets. Lines above the first
// heading may carry "Effective date:" and "Last updated:"; everything else
// splits on headings into {title, content} sections.
function parsePolicyContent(raw: string) {
  const lines = raw.split("\n");
  const sections: PolicySection[] = [];
  let effectiveDate: string | null = null;
  let lastUpdated: string | null = null;
  let title = "";
  let buf: string[] = [];

  function flush() {
    if (title) sections.push({ title, content: buf.join("\n").trim() });
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      title = line.slice(3).trim();
      buf = [];
    } else if (!title) {
      const meta = line.match(/^\s*(Effective date|Last updated)\s*:\s*(.+)$/i);
      if (meta) {
        if (meta[1].toLowerCase() === "effective date") effectiveDate = meta[2].trim();
        else lastUpdated = meta[2].trim();
      }
    } else {
      buf.push(line);
    }
  }
  flush();

  return { effectiveDate, lastUpdated, sections };
}
