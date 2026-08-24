import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicPolicy } from "@/lib/policies";
import PolicyPage from "@/components/legal/PolicyPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CALIBRATE privacy policy, how we collect, use, and protect your personal information.",
  robots: { index: false, follow: false },
};

export default async function PrivacyPolicyPage() {
  const policy = await getPublicPolicy("privacy");
  if (!policy) notFound();

  return (
    <PolicyPage
      policy={policy}
      policyType="privacy"
      intro="This Privacy Policy explains how CALIBRATE (operated by GVN Fit) collects, uses, and protects your personal information when you use our website or coaching services. Please read it carefully."
    />
  );
}
