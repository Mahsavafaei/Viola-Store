/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ 
        protocol: 'https',
        hostname:'viola.storage.c2.liara.space',
        port:'',
        pathname:'/**'
    }],
  },
  reactStrictMode: false,
};

export default nextConfig;
