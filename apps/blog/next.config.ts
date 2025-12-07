import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: process.env.R2_HOSTNAME
      ? [
          {
            protocol: "https",
            hostname: process.env.R2_HOSTNAME,
          },
        ]
      : [],
  },
  compiler: {
    // https://nextjs.org/docs/architecture/nextjs-compiler#remove-console
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
