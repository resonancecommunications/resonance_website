import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { ProjectGrid } from '@/components/work/ProjectGrid'
import { WorkBrowser } from '@/components/work/WorkBrowser'
import { WorkEmptyState } from '@/components/work/WorkEmptyState'
import { getOurWorkPage, getProjectCategories, getProjects } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getOurWorkPage()
  return buildMetadata({
    seo: page.seo,
    title: page.hero.eyebrow || page.hero.headline,
    ogTitle: page.hero.headline,
    ogLabel: page.hero.eyebrow,
    description: page.hero.supportingText?.[0],
    path: '/our-work',
  })
}

export default async function OurWorkPage() {
  const [page, projects, categories] = await Promise.all([
    getOurWorkPage(),
    getProjects(),
    getProjectCategories(),
  ])

  return (
    <>
      <Breadcrumbs path="/our-work" />
      <PageHero hero={page.hero} glow="center" />
      <Section tone="dark" className="pt-16 md:pt-20 lg:pt-24">
        {projects.length === 0 ? (
          <WorkEmptyState
            headline={page.emptyState.headline}
            body={page.emptyState.body}
            categoriesEyebrow={page.categoriesEyebrow}
            categories={categories}
          />
        ) : (
          <>
            <h2 className="sr-only">{page.categoriesEyebrow}</h2>
            <Suspense fallback={<ProjectGrid projects={projects} />}>
              <WorkBrowser projects={projects} categories={categories} allLabel={page.allLabel} />
            </Suspense>
          </>
        )}
      </Section>
      <CtaBand banner={page.closingCta} />
    </>
  )
}
