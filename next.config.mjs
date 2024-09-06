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
      },
      {
        protocol: 'https',
        hostname: 'qrllfjwkbzxzelkkboit.supabase.co', // Tambahkan domain Supabase di sini
      }
    ],
  },
};

export default nextConfig;
