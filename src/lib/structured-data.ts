import type { SiteSettings } from '@/content/types'
import { absoluteUrl } from './site'

/** Organization + LocalBusiness (Addis Ababa) graph for the whole site. */
export function organizationJsonLd(settings: SiteSettings) {
  const sameAs = Object.values(settings.social).filter((v): v is string => Boolean(v))
  const id = absoluteUrl('/#organization')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': id,
        name: settings.siteName,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/brand/vertical_full-color.svg'),
        slogan: settings.brandLine,
        description: settings.description,
        email: settings.contactEmail,
        ...(settings.phone ? { telephone: settings.phone } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'LocalBusiness',
        '@id': absoluteUrl('/#localbusiness'),
        name: settings.siteName,
        parentOrganization: { '@id': id },
        url: absoluteUrl('/'),
        image: absoluteUrl('/brand/horizontal_full-color.svg'),
        email: settings.contactEmail,
        ...(settings.phone ? { telephone: settings.phone } : {}),
        address: {
          '@type': 'PostalAddress',
          ...(settings.officeAddress ? { streetAddress: settings.officeAddress } : {}),
          addressLocality: 'Addis Ababa',
          addressCountry: 'ET',
        },
        areaServed: { '@type': 'Country', name: 'Ethiopia' },
      },
    ],
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
