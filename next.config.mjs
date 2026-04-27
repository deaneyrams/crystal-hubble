/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use export for Cloudflare Pages, standalone for API server
  output: process.env.NEXT_PRIVATE_STANDALONE ? 'standalone' : 'export',
  devIndicators: {
    buildActivity: false,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
