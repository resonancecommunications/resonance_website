import Image from 'next/image'
import { cn } from '@/lib/utils'

export type LogoVariant = 'horizontal' | 'vertical' | 'symbol' | 'mini' | 'bw' | 'bwInverted'
export type LogoTone = 'light' | 'dark'

type LogoSpec = {
  /** Official file per background tone, served unmodified from /public/brand. */
  src: Record<LogoTone, string>
  width: number
  height: number
  /**
   * Exclusion zone "X" from the guideline: the height of the R bowl,
   * expressed as a fraction of the rendered logo height.
   */
  x: number
}

const LOGOS: Record<LogoVariant, LogoSpec> = {
  horizontal: {
    src: { light: 'horizontal_full-color.svg', dark: 'horizontal_white-teal.svg' },
    width: 553,
    height: 111,
    x: 72.84 / 111,
  },
  vertical: {
    src: { light: 'vertical_full-color.svg', dark: 'vertical_white-teal.svg' },
    width: 283,
    height: 192,
    x: 71.94 / 192,
  },
  // The guideline names the circular badge "Symbol" ...
  symbol: {
    src: { light: 'badge_full-color.svg', dark: 'badge_white-teal.svg' },
    width: 323,
    height: 320,
    x: 68.57 / 320,
  },
  // ... and the stand-alone RC mark "Mini".
  mini: {
    src: { light: 'icon_teal.svg', dark: 'icon_teal.svg' },
    width: 171,
    height: 124,
    x: 82.32 / 123.48,
  },
  // Monochrome only: white logo for dark grounds, black logo for light grounds.
  bw: {
    src: { light: 'horizontal_white.svg', dark: 'horizontal_white.svg' },
    width: 553,
    height: 111,
    x: 72.84 / 111,
  },
  bwInverted: {
    src: { light: 'horizontal_black.svg', dark: 'horizontal_black.svg' },
    width: 553,
    height: 111,
    x: 72.84 / 111,
  },
}

type LogoProps = {
  variant?: LogoVariant
  /** The background the logo sits on. Picks the legible colourway. */
  tone?: LogoTone
  /** Rendered height of the artwork in px (clear space is added around it). */
  height?: number
  /** Override with an uploaded logo from Sanity (Site Settings → Brand logos). */
  src?: string | null
  /** Accessible name. Pass an empty string when a visible label sits beside it. */
  alt?: string
  priority?: boolean
  className?: string
  /** Set false only when a parent already guarantees the clear space. */
  clearSpace?: boolean
}

/**
 * Renders an official Resonance logo file exactly as supplied: never recoloured,
 * stretched or re-typeset. Wraps it in the guideline's exclusion zone (X on every side).
 */
export function Logo({
  variant = 'horizontal',
  tone = 'light',
  height = 36,
  src,
  alt = 'Resonance Communications',
  priority,
  className,
  clearSpace = true,
}: LogoProps) {
  const spec = LOGOS[variant]
  const width = Math.round((spec.width / spec.height) * height)
  const pad = clearSpace ? Math.round(spec.x * height) : 0

  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      style={{ padding: pad }}
      data-logo={variant}
    >
      <Image
        src={src || `/brand/${spec.src[tone]}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        draggable={false}
        style={{ width, height }}
      />
    </span>
  )
}
