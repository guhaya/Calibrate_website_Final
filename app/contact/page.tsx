import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CALIBRATE. For coaching enquiries, press, or anything else, reach out directly.",
  openGraph: {
    title: "Contact | CALIBRATE",
    description: "Reach the CALIBRATE team. Coaching enquiries, press, or general questions.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
