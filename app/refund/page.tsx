import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicPolicy } from "@/lib/policies";
import PolicyPage from "@/components/legal/PolicyPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "CALIBRATE refund and cancellation policy for coaching programmes.",
  robots: { index: false, follow: false },
};

export default async function RefundPolicyPage() {
  const policy = await getPublicPolicy("refund");
  if (!policy) notFound();

  return (
    <PolicyPage
      policy={policy}
      policyType="refund"
      intro="This Refund Policy explains cancellation terms, the cooling-off window, and how refund requests are handled for CALIBRATE coaching programmes. Please read it carefully before enrolling."
    />
  );
}
