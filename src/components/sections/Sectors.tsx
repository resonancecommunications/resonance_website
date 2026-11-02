import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { HomePage, SectorIcon } from '@/content/types'

/** Line icons (24px grid, 1.5 stroke) drawn for the sector cards. */
const ICONS: Record<SectorIcon, string> = {
  corporate: 'M4 21V5l8-3v19M12 21V8l8 3v10M2 21h20M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2',
  finance: 'M3 9l9-6 9 6M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18M3 18h18',
  government: 'M12 2v5M12 2l5 1.8L12 5.6M5 21v-9h14v9M3 21h18M4 12l8-5 8 5M10 21v-5h4v5',
  ngo: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16.5 11a2.5 2.5 0 1 0 0-5M16 14c3.3 0 6 2.4 6 5.5',
  growth: 'M3 20h18M5 16l4.5-4.5 3 3L19 8M15 8h4v4',
}

export function Sectors({ data }: { data: HomePage['clients'] }) {
  return (
    <Section tone="light" labelledBy="clients-heading" gridLines>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <SectionHeading
          eyebrow={data.eyebrow}
          headline={data.headline}
          id="clients-heading"
          className="reveal lg:col-span-7"
        />
        <p className="reveal type-lead text-muted-light lg:col-span-5">{data.body}</p>
      </div>
      <h3 className="mt-16 eyebrow text-ink lg:mt-20">{data.sectorsLabel}</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.sectors.map((sector) => (
          // The scroll-reveal animation owns `transform` on the <li>, so the hover lift
          // lives on the inner card.
          <li key={sector.title} className="reveal flex">
            <div className="group relative flex flex-1 flex-col rounded-[1.5rem] bg-ink p-7 text-paper transition-transform duration-500 ease-brand hover:-translate-y-1">
              <span className="flex size-12 items-center justify-center rounded-full bg-chip text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-ink">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={ICONS[sector.icon] ?? ICONS.corporate} />
                </svg>
              </span>
              <h4 className="mt-10 font-display text-xl leading-tight font-medium">
                {sector.title}
              </h4>
              <p className="mt-3 text-[0.9375rem] text-muted-dark">{sector.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
