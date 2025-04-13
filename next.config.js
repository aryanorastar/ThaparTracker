/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Using standalone mode to support API routes
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['dbpytnlpgbuzibmnnvks.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Netlify specific configuration
  distDir: '.next',
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
};

module.exports = nextConfig;
