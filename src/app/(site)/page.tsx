import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/CtaBand'
import { DivisionShowcase } from '@/components/sections/DivisionShowcase'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { StackLayer } from '@/components/layout/StackLayer'
import { HomeHero } from '@/components/sections/HomeHero'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
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

  // Sections stack: each slides up over the previous one while scrolling.
  const layers = [
    <HomeHero key="hero" hero={page.hero} />,
    <SplitSection
      key="intro"
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
    </SplitSection>,
    page.partners.logos.length ? <PartnerLogos key="partners" data={page.partners} /> : null,
    <DivisionShowcase key="divisions" data={page.divisions} />,
    <ProcessSteps key="approach" data={page.approach} />,
    <Sectors key="clients" data={page.clients} />,
    featured.length ? (
      <FeaturedWork key="work" data={page.featuredWork} projects={featured} />
    ) : null,
    <CtaBand key="cta" banner={page.closingCta} />,
  ].filter(Boolean)

  return (
    <>
      {layers.map((layer, i) => (
        <StackLayer key={i} index={i}>
          {layer}
        </StackLayer>
      ))}
    </>
  )
}
