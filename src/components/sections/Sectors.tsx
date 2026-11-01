import { Chip } from '@/components/ui/Chip'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { HomePage } from '@/content/types'

export function Sectors({ data }: { data: HomePage['clients'] }) {
  return (
    <Section tone="light" labelledBy="clients-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          eyebrow={data.eyebrow}
          headline={data.headline}
          intro={data.body}
          id="clients-heading"
          className="reveal lg:col-span-7"
        />
        <div className="reveal lg:col-span-5 lg:pt-14">
          <h3 className="eyebrow text-ink">{data.sectorsLabel}</h3>
          <ul className="mt-6 flex flex-wrap gap-3">
            {data.sectors.map((sector) => (
              <li key={sector}>
                <Chip className="min-h-12 px-6 text-base">{sector}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
