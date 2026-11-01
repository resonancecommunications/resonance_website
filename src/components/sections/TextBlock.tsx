import { CtaLink } from '@/components/ui/CtaLink'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { Section, type SectionTone } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TextSection } from '@/content/types'

type TextBlockProps = {
  data: TextSection
  id: string
  tone?: SectionTone
}

/** Heading on the left, paragraphs (and optional CTA) on the right. */
export function TextBlock({ data, id, tone = 'light' }: TextBlockProps) {
  const light = tone === 'light'
  return (
    <Section tone={tone} labelledBy={`${id}-heading`} id={id}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          eyebrow={data.eyebrow}
          headline={data.headline}
          tone={light ? 'light' : 'dark'}
          id={`${id}-heading`}
          className="reveal lg:col-span-6"
        />
        <div className="reveal lg:col-span-6 lg:pt-12">
          <Paragraphs
            items={data.body}
            lead
            className={
              light
                ? 'text-muted-light [&>p:first-child]:text-ink'
                : 'text-muted-dark [&>p:first-child]:text-paper'
            }
          />
          {data.cta ? (
            <div className="mt-10">
              <CtaLink cta={data.cta} tone={light ? 'light' : 'dark'} size="lg" />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
