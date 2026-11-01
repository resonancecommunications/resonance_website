import type { Metadata } from 'next'
import type { Seo } from '@/content/types'
import { urlForImage } from '@/sanity/lib/image'
import { getSiteSettings } from './content'

type BuildMetadataInput = {
  seo?: Seo | null
  /** Fallback title, usually the page headline or name. */
  title: string
  description?: string | null
  path: string
  /** Use the title as-is, without the site title template. */
  absoluteTitle?: boolean
}

/** Page metadata from Sanity SEO fields, with sensible fallbacks to page copy and site defaults. */
export async function buildMetadata({
  seo,
  title,
  description,
  path,
  absoluteTitle = false,
}: BuildMetadataInput): Promise<Metadata> {
  const settings = await getSiteSettings()
  const pageTitle = seo?.title || title
  const pageDescription = seo?.description || description || settings.seo.description
  const shareImage = seo?.ogImage ?? settings.seo.ogImage
  const images = shareImage?.asset?.url
    ? [
        {
          url: urlForImage(shareImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: shareImage.alt,
        },
      ]
    : undefined

  return {
    title: absoluteTitle ? { absolute: pageTitle } : pageTitle,
    description: pageDescription,
    alternates: { canonical: path },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: settings.siteName,
      url: path,
      title: pageTitle,
      description: pageDescription,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      ...(settings.socialHandle ? { site: settings.socialHandle } : {}),
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  }
}
