const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['tak-dcxi.microcms.io', 'images.microcms-assets.io'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeFonts: true,
  },
})
