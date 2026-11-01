import type { Metadata } from 'next'
import { CapabilitySections } from '@/components/sections/CapabilitySections'
import { CrossLinkBand } from '@/components/sections/CrossLinkBand'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { getMediaPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMediaPage()
  return buildMetadata({
    seo: page.seo,
    title: page.hero.eyebrow || page.hero.headline,
    description: page.hero.supportingText?.[0],
    path: '/media-communications',
  })
}

export default async function MediaCommunicationsPage() {
  const page = await getMediaPage()
  return (
    <>
      <PageHero
        hero={page.hero}
        glow="right"
        flow={{ artwork: 'swell', segments: [4, 8], flip: true }}
      />
      <CapabilitySections sections={page.sections} />
      <CrossLinkBand data={page.crossLink} artwork="wave" />
      <CtaBand banner={page.closingCta} />
    </>
  )
}
