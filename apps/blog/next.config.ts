import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.discordapp.com" },
      {
        protocol: "https",
        hostname: process.env.R2_HOSTNAME || "",
      },
    ],
  },
};

export default nextConfig;
