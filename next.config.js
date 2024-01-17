const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
        port: '',
        pathname: '/086ab6/leey00nsu',
      },
    ],
  },
  // output: "export",
  // trailingSlash: true,
};

module.exports = withContentlayer(nextConfig);
