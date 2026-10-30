import { notFound } from "next/navigation";
import { getPublicPolicy, policyMetadata } from "@/lib/policies";
import PolicyPage from "@/components/legal/PolicyPage";

export const dynamic = "force-dynamic";

export const metadata = policyMetadata("privacy");

export default async function PrivacyPolicyPage() {
  const policy = await getPublicPolicy("privacy");
  if (!policy) notFound();

  return <PolicyPage policy={policy} policyType="privacy" />;
}
