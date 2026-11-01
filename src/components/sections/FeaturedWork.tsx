import { CtaLink } from '@/components/ui/CtaLink'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/work/ProjectCard'
import type { HomePage, ProjectSummary } from '@/content/types'

/** Renders nothing until at least one client-approved, featured project exists. */
export function FeaturedWork({
  data,
  projects,
}: {
  data: HomePage['featuredWork']
  projects: ProjectSummary[]
}) {
  if (projects.length === 0) return null
  return (
    <Section tone="dark" labelledBy="featured-heading">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={data.eyebrow}
          headline={data.headline}
          intro={data.body}
          tone="dark"
          id="featured-heading"
          className="reveal"
        />
        <CtaLink cta={data.cta} className="shrink-0" />
      </div>
      <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </Section>
  )
}
