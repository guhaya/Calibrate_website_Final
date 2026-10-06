// Page-level `openGraph` replaces the root layout's instead of merging with it,
// so every page spreads these in to keep the share image and site name.
export const SITE_URL = "https://calibrate.gvnfit.online";

export const ogBase = {
  type: "website" as const,
  locale: "en_IN",
  siteName: "CALIBRATE",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "CALIBRATE | Precision Performance Coaching",
    },
  ],
};
