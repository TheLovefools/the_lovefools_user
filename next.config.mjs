import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  sassOptions: {
    includePaths: [path.resolve('./styles')],
  },
};

export default nextConfig;
