import type { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Support",
  description: "CALIBRATE client support. Find answers to common questions or reach out to your coach directly.",
  robots: { index: false, follow: false },
};

export default function SupportPage() {
  return <SupportClient />;
}
