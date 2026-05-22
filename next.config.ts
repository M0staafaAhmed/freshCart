import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
      },
    ],
  },
  async redirects(){
    return [
      {
        source: '/profile', 
        destination: '/profile/addresses', 
        permanent: true,
      }
    ]
  }
};

export default nextConfig;