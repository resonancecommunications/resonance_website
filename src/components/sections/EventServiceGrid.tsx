import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { EventService } from '@/content/types'
import { pad2 } from '@/lib/utils'

export function EventServiceGrid({ heading, items }: { heading: string; items: EventService[] }) {
  return (
    <Section tone="light" labelledBy="event-services-heading" gridLines>
      <SectionHeading headline={heading} id="event-services-heading" className="reveal" />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item._id}
            className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper p-8 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper md:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-teal transition-transform duration-500 ease-brand group-hover:scale-x-100"
            />
            <span
              aria-hidden="true"
              className="font-display text-sm text-muted-light group-hover:text-teal"
            >
              {pad2(i + 1)}
            </span>
            <h3 className="mt-10 type-h3">{item.title}</h3>
            <p className="mt-4 text-muted-light transition-colors group-hover:text-muted-dark">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
