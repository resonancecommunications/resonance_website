import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { AboutPage } from '@/content/types'
import { pad2 } from '@/lib/utils'

export function ValuesGrid({ data }: { data: AboutPage['values'] }) {
  return (
    <Section tone="dark" labelledBy="values-heading">
      <SectionHeading headline={data.eyebrow} tone="dark" id="values-heading" className="reveal" />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((value, i) => (
          <li key={value.title} className="reveal flex flex-col bg-ink p-8 md:p-10">
            <span aria-hidden="true" className="font-display text-sm text-teal">
              {pad2(i + 1)}
            </span>
            <h3 className="mt-10 inline-flex">
              <span className="rounded-full bg-chip px-5 py-2 font-display text-xl">
                {value.title}
              </span>
            </h3>
            <p className="mt-6 text-muted-dark">{value.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
