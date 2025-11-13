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
  compiler: {
    // https://nextjs.org/docs/architecture/nextjs-compiler#remove-console
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
