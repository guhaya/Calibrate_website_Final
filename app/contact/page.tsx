import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { SITE_URL, ogBase } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CALIBRATE. For coaching enquiries, press, or anything else, reach out directly.",
  alternates: { canonical: "/contact" },
  openGraph: {
    ...ogBase,
    url: `${SITE_URL}/contact`,
    title: "Contact | CALIBRATE",
    description: "Reach the CALIBRATE team. Coaching enquiries, press, or general questions.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
