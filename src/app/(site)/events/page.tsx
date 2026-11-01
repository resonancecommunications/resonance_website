import type { Metadata } from 'next'
import { CapabilityList } from '@/components/sections/CapabilityList'
import { CrossLinkBand } from '@/components/sections/CrossLinkBand'
import { CtaBand } from '@/components/sections/CtaBand'
import { EventServiceGrid } from '@/components/sections/EventServiceGrid'
import { PageHero } from '@/components/sections/PageHero'
import { SplitSection } from '@/components/sections/SplitSection'
import { TextBlock } from '@/components/sections/TextBlock'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { getEventServices, getEventsPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEventsPage()
  return buildMetadata({
    seo: page.seo,
    title: page.hero.eyebrow || page.hero.headline,
    description: page.hero.supportingText?.[0],
    path: '/events',
  })
}

export default async function EventsPage() {
  const [page, eventServices] = await Promise.all([getEventsPage(), getEventServices()])
  return (
    <>
      <PageHero hero={page.hero} glow="left" flow={{ artwork: 'wave', segments: [0, 4] }} />
      <SplitSection
        eyebrow={page.whatWeDo.eyebrow}
        headline={page.whatWeDo.headline}
        headingId="what-we-do-heading"
      >
        <Paragraphs items={page.whatWeDo.body} lead className="text-paper/85" />
      </SplitSection>
      <EventServiceGrid heading={page.eventServices.eyebrow} items={eventServices} />
      <CapabilityList heading={page.capabilities.eyebrow} items={page.capabilities.items} />
      <TextBlock data={page.integrated} id="integrated" />
      <CrossLinkBand data={page.crossLink} artwork="swell" />
      <CtaBand banner={page.closingCta} />
    </>
  )
}
