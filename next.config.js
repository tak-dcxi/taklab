module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.DOMAIN],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeFonts: true,
  },
}
