/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'gznfqbcsprhambfkzcex.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      }
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
