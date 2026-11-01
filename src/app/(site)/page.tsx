import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/CtaBand'
import { DivisionShowcase } from '@/components/sections/DivisionShowcase'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { HomeHero } from '@/components/sections/HomeHero'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Sectors } from '@/components/sections/Sectors'
import { SplitSection } from '@/components/sections/SplitSection'
import { CtaLink } from '@/components/ui/CtaLink'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { getFeaturedProjects, getHomePage, getSiteSettings } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getHomePage(), getSiteSettings()])
  return buildMetadata({
    seo: page.seo,
    title: `${settings.siteName} | ${settings.tagline}`,
    description: page.hero.supportingText?.[0],
    path: '/',
    absoluteTitle: true,
  })
}

export default async function HomePage() {
  const [page, featured] = await Promise.all([getHomePage(), getFeaturedProjects()])

  return (
    <>
      <HomeHero hero={page.hero} />
      <SplitSection
        eyebrow={page.intro.eyebrow}
        headline={page.intro.headline}
        headingId="intro-heading"
      >
        <Paragraphs items={page.intro.body} lead className="text-paper/85" />
        {page.intro.cta ? (
          <div className="mt-10">
            <CtaLink cta={page.intro.cta} />
          </div>
        ) : null}
      </SplitSection>
      <DivisionShowcase data={page.divisions} />
      <ProcessSteps data={page.approach} />
      <Sectors data={page.clients} />
      <FeaturedWork data={page.featuredWork} projects={featured} />
      <CtaBand banner={page.closingCta} />
    </>
  )
}
