import type { NextConfig } from 'next';

const securityHeaders = [
  // Prevent clickjacking — deny framing from all origins
  { key: 'X-Frame-Options', value: 'DENY' },
  // Stop browsers from sniffing content type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Disable Referer header leaking for cross-origin navigation
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict permission-granting APIs not needed by this app
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  images: {
    // Allow Next.js Image to optimize these external sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
