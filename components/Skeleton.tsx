import React from "react";

type SkeletonProps = {
  className?: string;
  tone?: "light" | "dark";
};

// Blok abu-abu berdenyut sebagai placeholder konten yang sedang dimuat
export function Skeleton({ className = "", tone = "light" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`animate-pulse ${/\brounded/.test(className) ? "" : "rounded-md"} ${
        tone === "dark" ? "bg-white/20" : "bg-gray-200"
      } ${className}`}
    />
  );
}
