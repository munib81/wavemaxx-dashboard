/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true, // Enabling React Strict Mode for development warnings
  swcMinify: true, // Use SWC to minify the code for better performance

  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller build size

  // Additional Webpack configuration for production
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };

    // When not in server mode (i.e., we're building for the browser)
    if (!isServer) {
      // Here you can add any browser-specific webpack config optimizations
    }

    // Example: Omitting heavy libraries from the client-side bundle
    // config.plugins.push(new webpack.IgnorePlugin(/some-heavy-library/));

    return config;
  },

  // Environment variables
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    GoogleMapAPI_Key: process.env.GoogleMapAPI_Key,
    JWT_SECRET: process.env.JWT_SECRET,
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
    domains: ["res.cloudinary.com"],
  },

  // URL Rewrites
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
