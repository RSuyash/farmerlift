import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "admin.farmerlift.in",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com", // For video thumbnails
      },
    ],
  },
};

export default nextConfig;
