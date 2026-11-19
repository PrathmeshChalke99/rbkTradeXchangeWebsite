/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Lets a second dev server run beside another one without sharing the .next cache.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

module.exports = nextConfig;
