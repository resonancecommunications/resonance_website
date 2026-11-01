import type { MetadataRoute } from 'next'
import { getSitemapData } from '@/lib/content'
import { absoluteUrl } from '@/lib/site'

const PAGES: { type: string; path: string; priority: number }[] = [
  { type: 'homePage', path: '/', priority: 1 },
  { type: 'aboutPage', path: '/about', priority: 0.8 },
  { type: 'servicesPage', path: '/services', priority: 0.9 },
  { type: 'eventsPage', path: '/events', priority: 0.9 },
  { type: 'mediaPage', path: '/media-communications', priority: 0.9 },
  { type: 'ourWorkPage', path: '/our-work', priority: 0.8 },
  { type: 'contactPage', path: '/contact', priority: 0.7 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, projects } = await getSitemapData()
  const updated = new Map<string, string>(pages.map((p) => [p._type, p._updatedAt]))

  return [
    ...PAGES.map(({ type, path, priority }) => ({
      url: absoluteUrl(path),
      lastModified: updated.get(type) ?? undefined,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...projects
      .filter((p): p is { slug: string; _updatedAt: string } => Boolean(p.slug))
      .map((p) => ({
        url: absoluteUrl(`/our-work/${p.slug}`),
        lastModified: p._updatedAt,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      })),
  ]
}
