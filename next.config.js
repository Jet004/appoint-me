/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public',
    }
})