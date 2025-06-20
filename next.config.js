/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      {
        source: '/tweets/:path*',
        destination: 'http://localhost:3000/tweets/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
