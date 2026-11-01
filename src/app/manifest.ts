import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Resonance Communications',
    short_name: 'Resonance',
    description: 'Integrated Events, Media & Corporate Communications.',
    start_url: '/',
    display: 'browser',
    background_color: '#010101',
    theme_color: '#010101',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
