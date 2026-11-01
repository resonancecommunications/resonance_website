import { CtaLink } from '@/components/ui/CtaLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { Section } from '@/components/ui/Section'
import type { HomePage } from '@/content/types'
import { pad2 } from '@/lib/utils'

/** "The Resonance Approach": vertical timeline on mobile, horizontal stepper on desktop. */
export function ProcessSteps({ data }: { data: HomePage['approach'] }) {
  return (
    <Section tone="dark" labelledBy="approach-heading" gridLines>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-6">
          {data.eyebrow ? <Eyebrow className="mb-6">{data.eyebrow}</Eyebrow> : null}
          <h2 id="approach-heading" className="type-h2">
            {data.headline}
          </h2>
        </div>
        <Paragraphs
          items={data.body}
          lead
          className="reveal text-muted-dark lg:col-span-6 lg:pt-12"
        />
      </div>

      <h3 className="mt-20 eyebrow text-teal lg:mt-28">{data.processLabel}</h3>
      <ol className="relative mt-10 grid gap-0 lg:grid-cols-6 lg:gap-6">
        {/* connecting line */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-white/15 lg:top-[0.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
        />
        {data.steps.map((step, i) => (
          <li key={step.title} className="reveal relative pb-10 pl-10 last:pb-0 lg:pb-0 lg:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 size-[0.875rem] rounded-full border-2 border-teal bg-ink lg:relative lg:block"
            />
            <p className="font-display text-sm text-teal lg:mt-8" aria-hidden="true">
              {pad2(i + 1)}
            </p>
            <p className="mt-2 font-display text-xl font-medium">{step.title}</p>
            <p className="mt-3 text-[0.9375rem] text-muted-dark">{step.description}</p>
          </li>
        ))}
      </ol>
      {data.cta ? (
        <div className="mt-16">
          <CtaLink cta={data.cta} size="lg" />
        </div>
      ) : null}
    </Section>
  )
}
