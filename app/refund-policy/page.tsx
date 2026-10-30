import { notFound } from "next/navigation";
import { getPublicPolicy, policyMetadata } from "@/lib/policies";
import PolicyPage from "@/components/legal/PolicyPage";

export const dynamic = "force-dynamic";

export const metadata = policyMetadata("refund");

export default async function RefundPolicyPage() {
  const policy = await getPublicPolicy("refund");
  if (!policy) notFound();

  return <PolicyPage policy={policy} policyType="refund" />;
}
