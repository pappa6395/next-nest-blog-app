import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'loremflickr.com',
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: 'ixqazplzndmxjndhualw.supabase.co',
        port: "",
        pathname: "/**"
      },
    ]
  },
  sassOptions: {
    includePaths: ["./styles"],
  },
  eslint: {
    ignoreDuringBuilds: true, // Use this here instead of in ESLint config
  },
  typescript: {
    ignoreBuildErrors: false, // Prevent silent TypeScript issues
  },
  
};

export default nextConfig;
