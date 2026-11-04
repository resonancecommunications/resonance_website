import type { Metadata } from 'next'
import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { SignalField } from '@/components/brand/SignalField'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { PageHero } from '@/components/sections/PageHero'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { getContactPage, getNavigation, getSiteSettings } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage()
  return buildMetadata({
    seo: page.seo,
    title: page.hero.eyebrow || page.hero.headline,
    ogTitle: page.hero.headline,
    ogLabel: page.hero.eyebrow,
    description: page.hero.supportingText?.[0],
    path: '/contact',
  })
}

export default async function ContactPage() {
  const [page, settings, navigation] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getNavigation(),
  ])
  const { info } = page

  // Only real values are shown: empty fields (phone, address) stay hidden.
  const details = [
    {
      label: info.generalInquiriesLabel,
      value: settings.contactEmail,
      href: `mailto:${settings.contactEmail}`,
    },
    settings.phone
      ? {
          label: info.phoneLabel,
          value: settings.phone,
          href: `tel:${settings.phone.replace(/[^\d+]/g, '')}`,
        }
      : null,
    settings.officeAddress
      ? { label: info.officeAddressLabel, value: settings.officeAddress }
      : null,
    settings.location ? { label: info.locationLabel, value: settings.location } : null,
  ].filter((d): d is { label: string; value: string; href?: string } => Boolean(d?.value))

  return (
    <>
      <Breadcrumbs path="/contact" />
      <PageHero hero={page.hero} glow="left" />
      <section className="on-light relative bg-paper text-ink">
        <div className="container-brand grid gap-16 py-20 md:py-28 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div id="contact-information" className="scroll-mt-28 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Eyebrow tone="light" as="h2">
                {info.eyebrow}
              </Eyebrow>
              <dl className="mt-10 space-y-8">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt className="text-sm text-muted-light">{d.label}</dt>
                    <dd className="mt-1 font-display text-xl break-words whitespace-pre-line">
                      {d.href ? (
                        <a
                          href={d.href}
                          className="underline decoration-teal decoration-2 underline-offset-[6px] hover:decoration-ink"
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              {Object.values(settings.social).some(Boolean) ? (
                <div className="mt-8">
                  <p className="text-sm text-muted-light">{navigation.footer.socialHeading}</p>
                  <SocialLinks social={settings.social} tone="light" className="mt-3" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 p-6 sm:p-10 lg:col-span-8 lg:p-14">
            <SignalField
              opacity={0.22}
              color="var(--color-gray)"
              fade="right"
              className="left-auto w-1/2"
            />
            <div className="relative">
              <h2 className="type-h2">{page.form.headline}</h2>
              <div className="mt-10">
                <InquiryForm form={page.form} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {page.closingStatement ? (
        <section className="relative overflow-hidden bg-ink text-paper">
          <div className="container-brand flex flex-col items-start gap-10 py-20 md:flex-row md:items-center md:justify-between md:py-24">
            <p className="max-w-3xl type-h2 text-teal">{page.closingStatement}</p>
            <ResonanceFlow
              artwork="swell"
              segments={[2, 6]}
              animated
              className="h-20 w-auto md:h-28"
            />
          </div>
        </section>
      ) : null}
    </>
  )
}
