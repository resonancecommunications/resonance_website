import type { NextConfig } from 'next'
import { sanity } from 'next-sanity/live/cache-life'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Sanity content is cached until a webhook revalidates its tag (see /api/revalidate).
  cacheLife: {
    default: sanity,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
