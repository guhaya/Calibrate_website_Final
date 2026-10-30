// Routes, labels and page copy for the three legal pages. Kept free of
// server-only imports so the footer and other shared components can use it.

export type PolicyType = "terms" | "privacy" | "refund";

export interface PolicyInfo {
  type: PolicyType;
  /** Page heading and breadcrumb label. */
  heading: string;
  /** Short label for the shared policy navigation and footer. */
  navLabel: string;
  path: string;
  /** File under docs/policies/ holding the admin-ready text for this policy. */
  draftFile: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
}

export const POLICIES: PolicyInfo[] = [
  {
    type: "terms",
    heading: "Terms & Conditions",
    navLabel: "Terms & Conditions",
    path: "/terms-and-conditions",
    draftFile: "terms-and-conditions.md",
    intro:
      "These Terms apply to GVNFIT coaching, personal training and CALIBRATE programmes. They cover packages, payment, sessions, rescheduling and safety. Please read them with the Privacy Policy and the Refund, Cancellation & Rescheduling Policy before you purchase.",
    metaTitle: "GVNFIT Terms & Conditions | Guhayavarman Fitness",
    metaDescription:
      "Terms for GVNFIT and CALIBRATE coaching: packages, prepaid payment, the 12-session renewal deadline, session duration, rescheduling, health disclaimers and your statutory rights.",
  },
  {
    type: "privacy",
    heading: "Privacy Policy",
    navLabel: "Privacy Policy",
    path: "/privacy-policy",
    draftFile: "privacy-policy.md",
    intro:
      "This Policy explains how GVNFIT collects, uses, shares and protects personal information, including the fitness and health information you share for coaching, and how to make a privacy request.",
    metaTitle: "GVNFIT Privacy Policy | Guhayavarman Fitness",
    metaDescription:
      "How GVNFIT handles personal, fitness and health information: what is collected, why, who it is shared with, retention, your access, correction and deletion rights, and how to contact us.",
  },
  {
    type: "refund",
    heading: "Refund, Cancellation & Rescheduling Policy",
    navLabel: "Refund Policy",
    path: "/refund-policy",
    draftFile: "refund-policy.md",
    intro:
      "This Policy explains how rescheduling, cancellations, missed sessions and refund requests are handled for GVNFIT coaching packages and programmes, and how to submit a request.",
    metaTitle: "GVNFIT Refund, Cancellation & Rescheduling Policy",
    metaDescription:
      "GVNFIT's 16-hour rescheduling notice, emergency cancellation allowance, late arrivals, coach cancellations, package validity and how to request a refund in writing.",
  },
];

export function getPolicyInfo(type: PolicyType): PolicyInfo {
  return POLICIES.find((p) => p.type === type)!;
}

export function policyPath(type: PolicyType): string {
  return getPolicyInfo(type).path;
}
