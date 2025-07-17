/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '', // optional, omit if not needed
        pathname: '/wordpress/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
    