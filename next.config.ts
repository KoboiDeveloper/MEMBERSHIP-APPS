import type { NextConfig } from "next";
require("dotenv").config();

// Host gambar diambil dari .env, jadi tidak perlu hardcode domain di sini
const imageUrls = [
  process.env.NEXT_PUBLIC_IMAGE_URL,
  process.env.NEXT_PUBLIC_CARD_URL,
  process.env.NEXT_PUBLIC_BRAND_URL,
  process.env.NEXT_PUBLIC_PLACEHOLDER_URL,
].filter((url): url is string => !!url);

const toRemotePattern = (url: string) => {
  const { protocol, hostname, port } = new URL(url);
  return {
    protocol: protocol.replace(":", "") as "http" | "https",
    hostname,
    port,
    pathname: "/**",
  };
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: imageUrls.map(toRemotePattern),
  },
  eslint: {
    ignoreDuringBuilds: true, // Konfig eslint
  },
  output: 'standalone',
};

export default nextConfig;
