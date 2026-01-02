/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Skip type checking during build (run separately)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Mark Sanity packages as external (not bundled)
  serverExternalPackages: ['sanity', '@sanity/vision', 'next-sanity'],

  // Empty turbopack config to use default settings
  turbopack: {},

  // Image configuration for external sources
  images: {
    // Allow images from Spinitron (Apple Music artwork) and Sanity CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mzstatic.com', // Apple Music artwork
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Sanity CDN
      },
    ],
    // Add quality 85 to avoid the console warning
    qualities: [75, 85],
  },
}

module.exports = nextConfig
