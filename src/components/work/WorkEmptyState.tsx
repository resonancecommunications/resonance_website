import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { SignalField } from '@/components/brand/SignalField'
import { Chip } from '@/components/ui/Chip'
import type { ProjectCategory } from '@/content/types'

type WorkEmptyStateProps = {
  headline: string
  body: string
  categoriesEyebrow: string
  categories: ProjectCategory[]
}

/** Shown until the first client-approved project is published. Keeps the categories visible. */
export function WorkEmptyState({
  headline,
  body,
  categoriesEyebrow,
  categories,
}: WorkEmptyStateProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="reveal relative overflow-hidden rounded-[1.75rem] bg-surface p-8 md:p-12 lg:col-span-7">
        <SignalField opacity={0.1} fade="edges" />
        <ResonanceFlow artwork="wave" animated className="relative w-full max-w-md" />
        <h2 className="relative mt-12 type-h2">{headline}</h2>
        <p className="relative mt-6 max-w-lg type-lead text-muted-dark">{body}</p>
      </div>
      <div className="reveal lg:col-span-5">
        <h2 className="eyebrow text-teal">{categoriesEyebrow}</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c._id}>
              <Chip>{c.title}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
