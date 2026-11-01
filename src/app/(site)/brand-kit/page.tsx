import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { Carrier } from '@/components/brand/Carrier'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { Logo, type LogoVariant } from '@/components/brand/Logo'
import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { SignalField } from '@/components/brand/SignalField'
import { Chip } from '@/components/ui/Chip'
import { CtaLink } from '@/components/ui/CtaLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'

/*
 * Internal review page for the brand system. Not linked, not in the sitemap, noindex.
 * Disabled on the Vercel production deployment unless ENABLE_BRAND_KIT=true.
 */
export const metadata: Metadata = {
  title: 'Brand kit',
  robots: { index: false, follow: false },
}

const COLORS = [
  {
    name: 'Connection Teal',
    token: '--color-teal',
    hex: '#01D2B2',
    note: 'Signature signal. Ink text on teal ≈ 10.6:1.',
  },
  {
    name: 'Low Frequency',
    token: '--color-ink',
    hex: '#010101',
    note: 'Teal on ink ≈ 10.6:1. Paper on ink ≈ 19.4:1.',
  },
  {
    name: 'Balanced Tone',
    token: '--color-gray',
    hex: '#C0C1C3',
    note: 'Secondary text on dark ≈ 11.5:1.',
  },
  {
    name: 'Pure Frequency',
    token: '--color-paper',
    hex: '#F8F8F8',
    note: 'Light ground. Never set teal text on it (≈1.8:1).',
  },
]

const DERIVED = [
  { name: 'Teal pale', token: '--color-teal-pale' },
  { name: 'Surface', token: '--color-surface' },
  { name: 'Surface raised', token: '--color-surface-raised' },
  { name: 'Chip', token: '--color-chip' },
  { name: 'Deep', token: '--color-deep' },
  { name: 'Deep 2', token: '--color-deep-2' },
  { name: 'Muted on light', token: '--color-muted-light' },
]

const LOGO_VARIANTS: { variant: LogoVariant; label: string; height: number }[] = [
  { variant: 'horizontal', label: 'Horizontal (main logo)', height: 40 },
  { variant: 'vertical', label: 'Vertical', height: 72 },
  { variant: 'symbol', label: 'Symbol (badge)', height: 96 },
  { variant: 'mini', label: 'Mini (RC mark)', height: 48 },
]

function KitBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-current/15 pt-8">
      <h2 className="mb-8 font-display text-2xl font-light">{title}</h2>
      {children}
    </div>
  )
}

export default function BrandKitPage() {
  if (process.env.VERCEL_ENV === 'production' && process.env.ENABLE_BRAND_KIT !== 'true') {
    notFound()
  }

  return (
    <>
      <section className="relative overflow-hidden bg-deep text-paper">
        <HeroBackdrop />
        <div className="relative container-brand py-24 md:py-32">
          <Carrier size="sm">Internal</Carrier>
          <h1 className="mt-8 text-display text-6xl text-teal md:text-8xl">Brand kit</h1>
          <p className="mt-6 max-w-xl text-muted-dark">
            Tokens, type, logo variants and graphic devices from docs/brand-guidelines.pdf, as
            implemented on the website.
          </p>
        </div>
      </section>

      <Section tone="light" className="space-y-0">
        <div className="space-y-20">
          <KitBlock title="Colour: official palette">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLORS.map((c) => (
                <div
                  key={c.token}
                  className="overflow-hidden rounded-2xl border border-ink/10 bg-white"
                >
                  <div className="h-32" style={{ background: `var(${c.token})` }} />
                  <div className="space-y-1 p-5 text-sm">
                    <p className="font-display text-lg">{c.name}</p>
                    <p className="font-mono">{c.hex}</p>
                    <p className="text-muted-light">{c.token}</p>
                    <p className="text-muted-light">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {DERIVED.map((c) => (
                <div key={c.token} className="text-xs">
                  <div
                    className="h-14 rounded-lg border border-ink/10"
                    style={{ background: `var(${c.token})` }}
                  />
                  <p className="mt-2 font-medium">{c.name}</p>
                  <p className="text-muted-light">{c.token}</p>
                </div>
              ))}
            </div>
          </KitBlock>

          <KitBlock title="Typography">
            <div className="space-y-8">
              <div>
                <p className="mb-2 eyebrow text-muted-light">Display / Bricolage Grotesque Light</p>
                <p className="text-display text-5xl md:text-7xl">
                  Where Experiences Meet Communication.
                </p>
              </div>
              <div>
                <p className="mb-2 eyebrow text-muted-light">H2 / Bricolage Grotesque</p>
                <p className="font-display text-4xl font-light tracking-tight">
                  Two Divisions. One Integrated Vision.
                </p>
              </div>
              <div>
                <p className="mb-2 eyebrow text-muted-light">H3 / Bricolage Grotesque Medium</p>
                <p className="font-display text-2xl font-medium">
                  Experiences That Bring People Together.
                </p>
              </div>
              <div>
                <p className="mb-2 eyebrow text-muted-light">
                  Wordmark label / Bricolage Grotesque Bold, uppercase
                </p>
                <p className="text-wordmark text-3xl">Resonance Communications</p>
              </div>
              <div className="max-w-2xl">
                <p className="mb-2 eyebrow text-muted-light">Body / IBM Plex Sans</p>
                <p className="text-lg">
                  We bring events, media, and strategic communications together to help
                  organizations connect with people, communicate with purpose, and create
                  experiences worth remembering.
                </p>
              </div>
              <div>
                <p className="mb-2 eyebrow text-muted-light">Eyebrow (light / dark)</p>
                <Eyebrow tone="light">Who We Are</Eyebrow>
              </div>
              <div>
                <p className="mb-2 eyebrow text-muted-light">Amharic / Nokia Pure Headline</p>
                <p lang="am" className="text-6xl font-bold">
                  ሀሁለሉ
                </p>
                <p lang="am" className="mt-2 text-2xl font-[250]">
                  ሀ ሁ ሂ ሃ ሄ ህ ሆ ለ ሉ ሊ ላ ሌ ል ሎ
                </p>
              </div>
            </div>
          </KitBlock>

          <KitBlock title="Logo variants on light (exclusion zone outlined)">
            <div className="flex flex-wrap items-end gap-8">
              {LOGO_VARIANTS.map((l) => (
                <figure key={l.variant} className="space-y-3">
                  <Logo
                    variant={l.variant}
                    tone="light"
                    height={l.height}
                    className="outline outline-1 outline-ink/25 outline-dashed"
                  />
                  <figcaption className="text-xs text-muted-light">{l.label}</figcaption>
                </figure>
              ))}
              <figure className="space-y-3">
                <Logo
                  variant="bwInverted"
                  height={40}
                  className="outline outline-1 outline-ink/25 outline-dashed"
                />
                <figcaption className="text-xs text-muted-light">B&amp;W inverted</figcaption>
              </figure>
            </div>
          </KitBlock>
        </div>
      </Section>

      <Section tone="dark">
        <div className="space-y-20">
          <KitBlock title="Logo variants on dark">
            <div className="flex flex-wrap items-end gap-8">
              {LOGO_VARIANTS.map((l) => (
                <figure key={l.variant} className="space-y-3">
                  <Logo
                    variant={l.variant}
                    tone="dark"
                    height={l.height}
                    className="outline outline-1 outline-white/25 outline-dashed"
                  />
                  <figcaption className="text-xs text-muted-dark">{l.label}</figcaption>
                </figure>
              ))}
              <figure className="space-y-3">
                <Logo
                  variant="bw"
                  height={40}
                  className="outline outline-1 outline-white/25 outline-dashed"
                />
                <figcaption className="text-xs text-muted-dark">Black &amp; white</figcaption>
              </figure>
            </div>
          </KitBlock>

          <KitBlock title="Signal Field">
            <div className="grid gap-4 md:grid-cols-3">
              {(['none', 'edges', 'bottom'] as const).map((fade) => (
                <div key={fade} className="relative h-64 overflow-hidden rounded-2xl bg-surface">
                  <SignalField opacity={0.35} fade={fade} />
                  <p className="absolute bottom-4 left-4 text-xs text-muted-dark">
                    fade=&quot;{fade}&quot;
                  </p>
                </div>
              ))}
            </div>
            <div className="on-light relative mt-4 h-48 overflow-hidden rounded-2xl bg-paper">
              <SignalField opacity={0.5} fade="right" />
              <p className="absolute bottom-4 left-4 text-xs text-muted-light">
                On paper, fade=&quot;right&quot;
              </p>
            </div>
          </KitBlock>

          <KitBlock title="Resonance Flow">
            <div className="grid gap-10 md:grid-cols-2">
              <figure className="space-y-3">
                <ResonanceFlow artwork="wave" animated className="w-full" />
                <figcaption className="text-xs text-muted-dark">wave (02-01), animated</figcaption>
              </figure>
              <figure className="space-y-3">
                <ResonanceFlow artwork="swell" animated className="w-full" />
                <figcaption className="text-xs text-muted-dark">swell (02-02), animated</figcaption>
              </figure>
              <figure className="space-y-3">
                <ResonanceFlow artwork="wave" fill="solid" className="w-full" />
                <figcaption className="text-xs text-muted-dark">solid, static</figcaption>
              </figure>
              <figure className="space-y-3">
                <ResonanceFlow
                  artwork="swell"
                  fill="fade-left"
                  segments={[4, 8]}
                  className="h-24"
                />
                <figcaption className="text-xs text-muted-dark">
                  selected portion (segments 4–8)
                </figcaption>
              </figure>
            </div>
          </KitBlock>

          <KitBlock title="Resonance Carrier">
            <div className="flex flex-col items-start gap-6">
              <Carrier size="sm">Section label</Carrier>
              <Carrier size="md" meta="Service Category">
                Project title
              </Carrier>
              <Carrier size="lg" meta="Position">
                Name plate
              </Carrier>
            </div>
          </KitBlock>

          <KitBlock title="Buttons, chips, eyebrows">
            <div className="flex flex-wrap items-center gap-4">
              <CtaLink cta={{ label: 'Start a Project', href: '#', style: 'primary' }} />
              <CtaLink cta={{ label: 'Explore Our Services', href: '#', style: 'secondary' }} />
              <Chip>Connection</Chip>
              <Chip>Impact</Chip>
              <Chip>Precise</Chip>
              <Eyebrow>What We Do</Eyebrow>
            </div>
          </KitBlock>
        </div>
      </Section>
    </>
  )
}
