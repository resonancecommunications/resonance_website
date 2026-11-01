import type { ProjectSummary } from '@/content/types'
import { ProjectCard } from './ProjectCard'

/** Static, unfiltered grid. Also the no-JS / prerender fallback for WorkBrowser. */
export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <li key={project._id}>
          <ProjectCard project={project} priority={i < 3} headingLevel="h2" />
        </li>
      ))}
    </ul>
  )
}
