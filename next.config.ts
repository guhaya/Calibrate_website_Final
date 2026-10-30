import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The stories on this page were illustrative, not real clients, so it was removed.
      { source: "/success-stories", destination: "/how-it-works", permanent: true },
      // Legal pages moved to the same paths as www.gvnfit.online.
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/refund", destination: "/refund-policy", permanent: true },
    ];
  },
};

export default nextConfig;
