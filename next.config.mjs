/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v/:id*/:hash*',
        destination: '/verify/:id*/:hash*',
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
