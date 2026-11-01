import Link from 'next/link'
import type { Cta } from '@/content/types'
import { cn } from '@/lib/utils'

type Tone = 'light' | 'dark'

type CtaLinkProps = {
  cta: Cta
  /** Background the button sits on: sets the secondary (outlined) colours. */
  tone?: Tone
  size?: 'md' | 'lg'
  className?: string
}

const base =
  'group inline-flex min-h-12 items-center justify-center gap-3 rounded-full whitespace-nowrap font-display font-semibold tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-200 ease-brand active:translate-y-px'

const sizes = {
  md: 'px-6 text-[0.9375rem]',
  lg: 'px-8 text-base md:min-h-14',
}

const styles = {
  primary: 'bg-teal text-ink hover:bg-teal-hover',
  secondary: {
    dark: 'border border-white/30 text-paper hover:border-teal hover:text-teal',
    light: 'on-light border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  },
} as const

function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

/** Arrow that slides in on hover, echoing the Carrier's forward motion. */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 12"
      className={cn(
        'h-3 w-5 shrink-0 transition-transform duration-200 ease-brand group-hover:translate-x-1',
        className,
      )}
    >
      <path d="M0 6h17M12 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Primary (teal fill, ink text) or secondary (outlined) call to action. */
export function CtaLink({ cta, tone = 'dark', size = 'md', className }: CtaLinkProps) {
  const style = cta.style === 'secondary' ? styles.secondary[tone] : styles.primary
  const classes = cn(base, sizes[size], style, className)
  const content = (
    <>
      <span>{cta.label}</span>
      <ArrowGlyph />
    </>
  )

  if (isExternal(cta.href)) {
    const newTab = /^(https?:)?\/\//.test(cta.href)
    return (
      <a
        href={cta.href}
        className={classes}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={cta.href} className={classes}>
      {content}
    </Link>
  )
}
