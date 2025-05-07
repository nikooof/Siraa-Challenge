import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/upload",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:8000/parse",
      },
      {
        source: "/api/:path*",
        destination: "http://backend:8000/submit",
      },
    ];
  },
};

export default nextConfig;
