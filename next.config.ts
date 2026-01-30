import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Empty config to satisfy Next.js 16 requirement when webpack is configured
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        fs: false,
        path: false,
        os: false,
        stream: false,
        buffer: false,
        util: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
