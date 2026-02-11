import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable Turbopack dev cache to avoid "Persisting failed: Unable to write SST file" on some systems
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
