/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  devIndicators: {
    buildActivity: false,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/invest/:path*',
        destination: '/invest/index.html',
      },
    ];
  },
};

export default nextConfig;
