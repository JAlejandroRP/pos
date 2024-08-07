/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opticaexpress.hn',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: ''
      }
    ]
  }
};

export default nextConfig;
