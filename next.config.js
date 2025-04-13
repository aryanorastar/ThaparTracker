/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Use standalone mode for better API support
  output: 'standalone',
  // Image optimization settings
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
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
  // Optimize bundle size
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@fortawesome/free-solid-svg-icons', '@headlessui/react', 'react-icons'],
  },
  // Minimize output
  compress: true,
};

module.exports = nextConfig;
