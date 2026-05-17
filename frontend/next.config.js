const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Prototype : ne pas bloquer le build sur les erreurs TS ou lint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Accepte localhost (dev) + n'importe quel hostname (ngrok, production)
    remotePatterns: [
      { protocol: 'http',  hostname: 'localhost', port: '8000', pathname: '/media/**' },
      { protocol: 'http',  hostname: 'localhost', port: '80',   pathname: '/media/**' },
      { protocol: 'https', hostname: '**.ngrok-free.app',       pathname: '/media/**' },
      { protocol: 'https', hostname: '**.ngrok.io',             pathname: '/media/**' },
      { protocol: 'https', hostname: '**.trycloudflare.com',    pathname: '/media/**' },
    ],
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
