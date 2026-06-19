import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calibrate.gvnfit.online";

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/apply", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/clients", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/success-stories", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/coaches", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/book", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/support", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
