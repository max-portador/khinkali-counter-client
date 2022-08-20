/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },

}

module.exports = nextConfig
