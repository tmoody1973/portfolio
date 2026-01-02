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
}

module.exports = nextConfig
