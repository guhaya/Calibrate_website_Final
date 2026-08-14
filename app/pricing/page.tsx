import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Coaching Investment | Pricing",
  description: "CALIBRATE coaching starts at ₹25,000/month. Two tiers, Monthly and Quarterly. Applications open to all, reviewed personally by Guhay within 48 hours.",
  openGraph: {
    title: "Pricing | CALIBRATE",
    description: "Monthly at ₹25,000 or Quarterly at ₹65,000 upfront. Full CALIBRATE protocol, custom training, nutrition, weekly analysis, WhatsApp support.",
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Who is CALIBRATE built for?", acceptedAnswer: { "@type": "Answer", text: "Engineers, product managers, consultants, and founders who work 10+ hour days and have failed at generic fitness programmes before." } },
        { "@type": "Question", name: "Why a 3-month minimum commitment?", acceptedAnswer: { "@type": "Answer", text: "Real body recomposition takes time. The first month establishes baselines; months two and three produce visible, measurable results." } },
        { "@type": "Question", name: "How quickly can I start?", acceptedAnswer: { "@type": "Answer", text: "Applications are open to everyone and Guhay reviews each one personally, usually within 48 hours." } },
        { "@type": "Question", name: "Do I need a gym?", acceptedAnswer: { "@type": "Answer", text: "No. Programmes are built for gym, home gym, hotel gym, or bodyweight setups." } },
        { "@type": "Question", name: "Is the diagnostic call really free?", acceptedAnswer: { "@type": "Answer", text: "Completely free. It's a 20-minute call, not a sales call." } },
      ],
    }),
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
