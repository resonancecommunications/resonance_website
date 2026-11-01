import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { Section } from '@/components/ui/Section'
import { pad2 } from '@/lib/utils'

/** Numbered capability list on a dark band (Events → Event Production Capabilities). */
export function CapabilityList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <Section tone="dark" labelledBy="capabilities-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <h2 id="capabilities-heading" className="type-h2">
            {heading}
          </h2>
          <ResonanceFlow
            artwork="wave"
            segments={[0, 4]}
            fill="fade-left"
            animated
            className="mt-12 hidden h-24 w-auto lg:block"
          />
        </div>
        <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {items.map((item, i) => (
            <li
              key={item}
              className="reveal flex items-baseline gap-5 border-b border-white/10 py-5 font-display text-lg"
            >
              <span aria-hidden="true" className="w-6 shrink-0 text-sm text-teal">
                {pad2(i + 1)}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
