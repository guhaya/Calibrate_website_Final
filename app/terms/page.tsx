import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicPolicy } from "@/lib/policies";
import PolicyPage from "@/components/legal/PolicyPage";

// Reads live from Supabase on every request so edits made in the coach
// admin (app.gvnfit.online/admin/policies) show up here without a redeploy
// of this separate site.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CALIBRATE terms of service, the agreement governing your use of our coaching services and website.",
  robots: { index: false, follow: false },
};

export default async function TermsPage() {
  const policy = await getPublicPolicy("terms");
  if (!policy) notFound();

  return (
    <PolicyPage
      policy={policy}
      policyType="terms"
      intro="Please read these Terms of Service carefully before enrolling in any CALIBRATE coaching programme or using this website. By proceeding, you agree to these terms in full."
    />
  );
}
