/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.startpage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "combo.staticflickr.com",
        port: "",
      },
    ],
  },
  eslint: {
    // Explicitly specify that we're using the flat config format
    // This ensures Next.js doesn't misinterpret an .eslintrc file
    dirs: ["."], // Apply ESLint to the entire project
  },
};

export default nextConfig;
