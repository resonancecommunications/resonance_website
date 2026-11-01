import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { SplitSection } from '@/components/sections/SplitSection'
import { TextBlock } from '@/components/sections/TextBlock'
import { ValuesGrid } from '@/components/sections/ValuesGrid'
import { VisionMission } from '@/components/sections/VisionMission'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { getAboutPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage()
  return buildMetadata({
    seo: page.seo,
    title: page.hero.eyebrow || page.hero.headline,
    description: page.hero.supportingText?.[0],
    path: '/about',
  })
}

export default async function AboutPage() {
  const page = await getAboutPage()
  return (
    <>
      <PageHero hero={page.hero} glow="right" flow={{ artwork: 'wave', segments: [4, 8] }} />
      <SplitSection
        eyebrow={page.overview.eyebrow}
        headline={page.overview.headline}
        headingId="overview-heading"
      >
        <Paragraphs items={page.overview.body} lead className="text-paper/85" />
      </SplitSection>
      <VisionMission vision={page.vision} mission={page.mission} />
      <TextBlock data={page.philosophy} id="philosophy" />
      <ValuesGrid data={page.values} />
      <TextBlock data={page.approach} id="approach" />
    </>
  )
}
