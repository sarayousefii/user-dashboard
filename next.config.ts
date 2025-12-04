/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  webpack: (config : any) => {
    config.devtool = "source-map"; // رفع مشکلات source map
    return config;
  },
};

export default nextConfig;
