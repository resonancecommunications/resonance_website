import { getNavigation } from '@/lib/content'
import { breadcrumbJsonLd } from '@/lib/structured-data'
import { JsonLd } from './JsonLd'

/**
 * BreadcrumbList structured data for an inner page. Names come from the navigation
 * labels so they stay in sync with what visitors see.
 */
export async function Breadcrumbs({
  path,
  trail = [],
}: {
  path: string
  trail?: { name: string; path: string }[]
}) {
  const navigation = await getNavigation()
  const label = (href: string) => navigation.main.find((n) => n.href === href)?.label
  const items = [
    { name: label('/') ?? 'Home', path: '/' },
    { name: label(path) ?? path, path },
    ...trail,
  ]
  return <JsonLd data={breadcrumbJsonLd(items)} />
}
