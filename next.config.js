/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is disabled because in previous version Fluent UI doesn't support this feature.
  // Here's to match my main project's environment.
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
