import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { SITE_URL, ogBase } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Training & Nutrition Blog",
  description: "Practical guidance on training, nutrition, mindset, and performance, written by CALIBRATE coaches for high-performing professionals.",
  alternates: { canonical: "/blog" },
  openGraph: {
    ...ogBase,
    url: `${SITE_URL}/blog`,
    title: "Training & Nutrition Blog | CALIBRATE",
    description: "Data-driven insights on body recomposition, performance nutrition, and building sustainable fitness systems for busy professionals.",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
