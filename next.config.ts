import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the default route / build activity indicator (often confused with product UI).
  devIndicators: false,
};

export default nextConfig;
