import Link from 'next/link'
import { Carrier } from '@/components/brand/Carrier'
import { BrandImage } from '@/components/ui/BrandImage'
import type { ProjectSummary } from '@/content/types'

type ProjectCardProps = {
  project: ProjectSummary
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({ project, priority, headingLevel: Heading = 'h3' }: ProjectCardProps) {
  return (
    <article className="group relative">
      <Link href={`/our-work/${project.slug}`} className="block focus-visible:outline-offset-4">
        <div className="overflow-hidden rounded-2xl">
          <BrandImage
            image={project.coverImage}
            aspect="4 / 3"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            imgClassName="transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-5">
          {project.category ? <Carrier size="sm">{project.category.title}</Carrier> : null}
          <Heading className="mt-4 type-h3 transition-colors group-hover:text-teal">
            {project.title}
          </Heading>
          {project.client ? <p className="mt-1 text-sm text-muted-dark">{project.client}</p> : null}
        </div>
      </Link>
    </article>
  )
}
