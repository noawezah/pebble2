import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  redirects() {
    return [{ source: "/ro", destination: "/", permanent: true }];
  },
};

export default nextConfig;
