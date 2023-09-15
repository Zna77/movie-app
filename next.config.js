/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
    // You can define custom remote patterns for TMDB URLs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**", // Adjust the pathname as needed
      },
    ],
  },
};

module.exports = nextConfig;
