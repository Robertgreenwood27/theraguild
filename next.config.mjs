// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'euxtzzuhwcesplbizhjc.supabase.co', // Your Supabase project URL
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'euxtzzuhwcesplbizhjc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
