import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { ServicePortfolio } from '@/components/sections/ServicePortfolio'
import { getServices, getServicesPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage()
  return buildMetadata({
    seo: page.seo,
    title: page.hero.eyebrow || page.hero.headline,
    description: page.hero.supportingText?.[0],
    path: '/services',
  })
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getServicesPage(), getServices()])
  return (
    <>
      <PageHero hero={page.hero} glow="center" flow={{ artwork: 'swell', segments: [0, 4] }} />
      <ServicePortfolio
        eyebrow={page.portfolio.eyebrow}
        navLabel={page.portfolio.navLabel}
        services={services}
      />
      {page.closing.cta ? (
        <CtaBand banner={{ headline: page.closing.statement, primaryCta: page.closing.cta }} />
      ) : null}
    </>
  )
}
