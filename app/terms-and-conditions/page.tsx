import { notFound } from "next/navigation";
import { getPublicPolicy, policyMetadata } from "@/lib/policies";
import PolicyPage from "@/components/legal/PolicyPage";

// Reads live from Supabase on every request so edits made in the coach
// admin (app.gvnfit.online/admin/policies) show up here without a redeploy
// of this separate site.
export const dynamic = "force-dynamic";

export const metadata = policyMetadata("terms");

export default async function TermsPage() {
  const policy = await getPublicPolicy("terms");
  if (!policy) notFound();

  return <PolicyPage policy={policy} policyType="terms" />;
}
