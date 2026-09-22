/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow running smoothly
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
