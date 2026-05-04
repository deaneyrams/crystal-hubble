/** @type {import('next').NextConfig} */
const nextConfig = {
  // Auto-detect Cloudflare Pages (CF_PAGES) for export, otherwise default to standalone server (Digital Ocean)
  output: 'standalone',
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
