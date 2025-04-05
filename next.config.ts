import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.startpage.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "i.pinimg.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "cdn.pixabay.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "live.staticflickr.com", // Added Flickr domain here
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
