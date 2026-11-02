import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Carrier } from '@/components/brand/Carrier'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { CtaBand } from '@/components/sections/CtaBand'
import { BrandImage } from '@/components/ui/BrandImage'
import { Section } from '@/components/ui/Section'
import { ProjectGallery } from '@/components/work/ProjectGallery'
import { getOurWorkPage, getProject, getProjectSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

/** Unlisted slugs render fully before responding, so unknown ones return a real 404. */
export const ensureStatic = 'navigation'

/** Placeholder keeps the route valid under Cache Components before any project exists. */
const PLACEHOLDER = '__placeholder__'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.length ? slugs.map(({ slug }) => ({ slug })) : [{ slug: PLACEHOLDER }]
}

export async function generateMetadata({
  params,
}: PageProps<'/our-work/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = slug === PLACEHOLDER ? null : await getProject(slug)
  if (!project) return { robots: { index: false, follow: false } }
  return buildMetadata({
    seo: project.seo,
    title: project.title,
    description: project.overview,
    ogLabel: project.category?.title,
    path: `/our-work/${project.slug}`,
  })
}

export default async function ProjectPage({ params }: PageProps<'/our-work/[slug]'>) {
  // Resolved before any streaming so unknown slugs return a real 404.
  const { slug } = await params
  const [project, page] = await Promise.all([
    slug === PLACEHOLDER ? null : getProject(slug),
    getOurWorkPage(),
  ])
  if (!project) notFound()

  const labels = page.projectLabels
  const sections = [
    { key: 'overview', label: labels.overview, text: project.overview },
    { key: 'objective', label: labels.objective, text: project.objective },
    { key: 'approach', label: labels.approach, text: project.approach },
    { key: 'contribution', label: labels.contribution, text: project.contribution },
    { key: 'outcome', label: labels.outcome, text: project.outcome },
  ].filter((s): s is { key: string; label: string; text: string } => Boolean(s.text))

  return (
    <>
      <Breadcrumbs
        path="/our-work"
        trail={[{ name: project.title, path: `/our-work/${project.slug}` }]}
      />
      <section className="relative overflow-hidden bg-deep text-paper">
        <HeroBackdrop glow="right" />
        <div className="relative container-brand pt-[calc(var(--header-h)+3rem)] pb-16 md:pt-[calc(var(--header-h)+5rem)] md:pb-24">
          <Link
            href="/our-work"
            className="group inline-flex min-h-11 items-center gap-3 text-sm text-muted-dark hover:text-teal"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 12"
              className="h-3 w-5 transition-transform duration-200 group-hover:-translate-x-1"
            >
              <path d="M20 6H3M8 1L3 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {labels.backToWork}
          </Link>
          <h1 className="mt-8 max-w-5xl type-h1 text-teal">{project.title}</h1>
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            {project.client ? (
              <div>
                <dt className="eyebrow text-muted-dark">{labels.client}</dt>
                <dd className="mt-2 font-display text-lg">{project.client}</dd>
              </div>
            ) : null}
            {project.category ? (
              <div>
                <dt className="eyebrow text-muted-dark">{labels.serviceCategory}</dt>
                <dd className="mt-2">
                  <Carrier size="sm">{project.category.title}</Carrier>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        <div className="relative container-brand pb-16 md:pb-24">
          <BrandImage
            image={project.coverImage}
            aspect="16 / 9"
            sizes="(min-width: 1440px) 1300px, 100vw"
            priority
            className="rounded-[1.75rem]"
          />
          {project.coverImage?.caption ? (
            <p className="mt-3 text-sm text-muted-dark">{project.coverImage.caption}</p>
          ) : null}
        </div>
      </section>

      {sections.length ? (
        <Section tone="light">
          <div className="divide-y divide-ink/10">
            {sections.map((section) => (
              <div
                key={section.key}
                className="reveal grid gap-6 py-12 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-16"
              >
                <h2 className="type-h3 lg:col-span-4">{section.label}</h2>
                <p className="max-w-3xl type-lead whitespace-pre-line text-muted-light lg:col-span-8">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {project.gallery?.length ? (
        <Section tone="dark" labelledBy="gallery-heading">
          <h2 id="gallery-heading" className="mb-12 type-h2">
            {labels.gallery}
          </h2>
          <ProjectGallery items={project.gallery} />
        </Section>
      ) : null}

      {project.previous || project.next ? (
        <nav
          aria-label={labels.backToWork}
          className="on-light border-t border-ink/10 bg-paper text-ink"
        >
          <div className="container-brand grid sm:grid-cols-2">
            {[
              { item: project.previous, label: labels.previous, align: 'left' },
              { item: project.next, label: labels.next, align: 'right' },
            ].map(({ item, label, align }) =>
              item ? (
                <Link
                  key={align}
                  href={`/our-work/${item.slug}`}
                  rel={align === 'left' ? 'prev' : 'next'}
                  className={`group flex flex-col gap-2 py-10 md:py-14 ${align === 'right' ? 'sm:items-end sm:text-right' : ''}`}
                >
                  <span className="eyebrow text-muted-light">{label}</span>
                  <span className="type-h3 transition-colors group-hover:text-ink/70">
                    {item.title}
                  </span>
                </Link>
              ) : (
                <span key={align} aria-hidden="true" />
              ),
            )}
          </div>
        </nav>
      ) : null}

      <CtaBand banner={page.closingCta} />
    </>
  )
}
