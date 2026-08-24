import { supabaseAdmin } from "@/lib/supabase";

// Reads the same policy_documents / policy_versions tables that
// calibrate-portal's coach admin (app.gvnfit.online/admin/policies) writes
// to, so an edit made there shows up here without a separate deploy —
// same shared Supabase project, service-role read (RLS on these tables is
// coach/service_role only).

export type PolicyType = "terms" | "privacy" | "refund";

export interface PolicySection {
  title: string;
  content: string;
}

export interface PublicPolicy {
  title: string;
  versionNumber: number;
  updatedAt: string;
  sections: PolicySection[];
}

export async function getPublicPolicy(policyType: PolicyType): Promise<PublicPolicy | null> {
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
    sections: parsePolicySections(version.content),
  };
}

// Content is authored in the admin editor as "## Heading" lines followed by
// blank-line-separated paragraphs and "- " bullets. Splits on headings into
// the same {title, content} shape the legal pages already render.
function parsePolicySections(raw: string): PolicySection[] {
  const lines = raw.split("\n");
  const sections: PolicySection[] = [];
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
    } else {
      buf.push(line);
    }
  }
  flush();

  return sections;
}
