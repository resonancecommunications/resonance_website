import { Carrier } from '@/components/brand/Carrier'
import { BulletList } from '@/components/ui/BulletList'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { Section } from '@/components/ui/Section'
import type { CapabilitySection } from '@/content/types'
import { pad2, slugify } from '@/lib/utils'

/** The Media & Communications capability sections, alternating light and dark. */
export function CapabilitySections({ sections }: { sections: CapabilitySection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        const light = i % 2 === 0
        const id = slugify(section.eyebrow)
        return (
          <Section
            key={section.eyebrow}
            id={id}
            tone={light ? 'light' : 'surface'}
            labelledBy={`${id}-heading`}
            className="scroll-mt-16"
          >
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="reveal lg:col-span-7">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={
                      light
                        ? 'font-display text-sm text-muted-light'
                        : 'font-display text-sm text-teal'
                    }
                  >
                    {pad2(i + 1)}
                  </span>
                  <Carrier size="sm" reveal>
                    {section.eyebrow}
                  </Carrier>
                </div>
                <h2 id={`${id}-heading`} className="mt-8 type-h2">
                  {section.headline}
                </h2>
                <Paragraphs
                  items={section.body}
                  className={
                    light ? 'mt-6 type-lead text-muted-light' : 'mt-6 type-lead text-muted-dark'
                  }
                />
              </div>
              <div className="reveal lg:col-span-5 lg:pt-20">
                <h3 className={light ? 'eyebrow text-ink' : 'eyebrow text-teal'}>
                  {section.listLabel}
                </h3>
                <BulletList
                  items={section.items}
                  tone={light ? 'light' : 'dark'}
                  className="mt-3"
                />
              </div>
            </div>
          </Section>
        )
      })}
    </>
  )
}
