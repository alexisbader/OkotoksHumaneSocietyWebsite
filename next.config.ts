import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components / partial prefetching stay off for this skeletal CMS scaffold
  // so Sanity-backed dynamic routes build without Suspense ceremony. Re-enable later
  // when adopting PPR patterns intentionally.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
