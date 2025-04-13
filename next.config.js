/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Static export for Netlify compatibility
  output: 'export',
  // Required for static export
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
};

module.exports = nextConfig;
