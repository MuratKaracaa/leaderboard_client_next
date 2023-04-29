/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: true,
    },
  },
  distDir: "out",
};

module.exports = nextConfig;
