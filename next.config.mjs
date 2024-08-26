/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v/:id*',
        destination: '/verify/:id*',
      },
      {
        source: '/dashboard/:sekolah*',
        destination: '/dashboard/raport/:sekolah*',
      },
    ]

    
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  },
};

export default nextConfig;
