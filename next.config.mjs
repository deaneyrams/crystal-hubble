/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use export for Cloudflare Pages, standalone for API server (Digital Ocean)
  output: process.env.NEXT_PRIVATE_STANDALONE ? 'standalone' : 'export',
  devIndicators: {
    buildActivity: false,
  },
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['pdfkit', 'qrcode', 'nodemailer'],
  },
};

export default nextConfig;
