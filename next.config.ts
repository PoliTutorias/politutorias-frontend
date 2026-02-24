import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
<<<<<<< HEAD
      {
        protocol: "https",
        hostname: "example.com",
      },
=======
>>>>>>> aee0c9fdf06e07b032bef37a879054a5881641a3
    ],
  },
};

export default nextConfig;
