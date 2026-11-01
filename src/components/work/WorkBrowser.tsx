'use client'

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { ProjectCategory, ProjectSummary } from '@/content/types'
import { strings } from '@/lib/strings'
import { cn } from '@/lib/utils'
import { ProjectCard } from './ProjectCard'

type WorkBrowserProps = {
  projects: ProjectSummary[]
  categories: ProjectCategory[]
  allLabel: string
}

/** Category filter chips (state kept in ?category=) and the animated project grid. */
export function WorkBrowser({ projects, categories, allLabel }: WorkBrowserProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const requested = searchParams.get('category')
  const active = categories.some((c) => c.slug === requested) ? requested : null
  const visible = active ? projects.filter((p) => p.category?.slug === active) : projects

  function select(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set('category', slug)
    else params.delete('category')
    const query = params.toString()
    // Native history updates keep Next.js' router in sync without a server round trip.
    window.history.replaceState(null, '', query ? `${pathname}?${query}` : pathname)
  }

  const chips = [
    { slug: null, title: allLabel },
    ...categories.map((c) => ({ slug: c.slug, title: c.title })),
  ]

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div role="group" aria-label={strings.work.filterLabel} className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const pressed = chip.slug === active
            return (
              <button
                key={chip.slug ?? 'all'}
                type="button"
                aria-pressed={pressed}
                onClick={() => select(chip.slug)}
                className={cn(
                  'min-h-11 rounded-full px-5 font-display text-[0.9375rem] transition-colors duration-200',
                  pressed
                    ? 'bg-teal text-ink'
                    : 'bg-chip text-paper hover:bg-surface-raised hover:text-teal',
                )}
              >
                {chip.title}
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="mt-8 text-sm text-muted-dark">
          {visible.length ? strings.work.showing(visible.length) : strings.work.noneInCategory}
        </p>

        <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <m.li
                key={project._id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} priority={i < 3} headingLevel="h2" />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </MotionConfig>
    </LazyMotion>
  )
}
