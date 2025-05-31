/** @type {import('next').NextConfig} */
const nextConfig = {
// next.config.js

  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [];
  },
  // Cho phép middleware xử lý tất cả trang dưới /admin
  matcher: ['/admin/:path*'],
};

export default nextConfig;
