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
    optimizePackageImports: [
      '@fortawesome/free-solid-svg-icons',
      '@headlessui/react',
      'react-icons',
      'google-map-react'
    ],
    esmExternals: 'loose'
  },
  // Minimize output
  compress: true,
};

module.exports = nextConfig;
