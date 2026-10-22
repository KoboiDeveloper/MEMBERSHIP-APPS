import type { NextConfig } from "next";
require("dotenv").config();

// Host gambar diambil dari .env, jadi tidak perlu hardcode domain di sini
const imageUrls = [
  process.env.NEXT_PUBLIC_IMAGE_URL,
  process.env.NEXT_PUBLIC_CARD_URL,
  process.env.NEXT_PUBLIC_BRAND_URL,
  process.env.NEXT_PUBLIC_PLACEHOLDER_URL,
];

// Buang spasi/tanda kutip yang kadang ikut terbawa dari env platform deploy
const cleanEnv = (value?: string) =>
  value?.trim().replace(/^[\\'"\s]+|[\\'"\s]+$/g, "");

const toRemotePattern = (value?: string) => {
  const url = cleanEnv(value);
  if (!url) return [];

  try {
    const { protocol, hostname, port } = new URL(url);
    return [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        port,
        pathname: "/**",
      },
    ];
  } catch {
    console.warn(`[next.config] URL gambar di env tidak valid: ${value}`);
    return [];
  }
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: imageUrls.flatMap(toRemotePattern),
  },
  eslint: {
    ignoreDuringBuilds: true, // Konfig eslint
  },
  output: 'standalone',
};

export default nextConfig;
