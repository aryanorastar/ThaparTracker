/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Add this to help with Netlify deployment
  distDir: '.next',
};

module.exports = nextConfig;
