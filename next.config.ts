/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nymbo-virtual-try-on.hf.space',
        port: '',
      },
    ],
  },
};

export default nextConfig;