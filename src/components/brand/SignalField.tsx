import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { PointerGlow } from './PointerGlow'

export type SignalFieldFade = 'none' | 'top' | 'bottom' | 'left' | 'right' | 'edges' | 'radial'

const FADES: Record<SignalFieldFade, string | undefined> = {
  none: undefined,
  top: 'linear-gradient(to top, #000 10%, transparent 95%)',
  bottom: 'linear-gradient(to bottom, #000 10%, transparent 95%)',
  left: 'linear-gradient(to left, #000 15%, transparent 90%)',
  right: 'linear-gradient(to right, #000 15%, transparent 90%)',
  edges: 'radial-gradient(ellipse 75% 70% at 50% 50%, transparent 30%, #000 100%)',
  radial: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 0%, transparent 75%)',
}

type SignalFieldProps = {
  /** 0–1. The guideline asks for a light, secondary texture: keep it low. */
  opacity?: number
  /** Stroke colour; defaults to Connection Teal. Pass a CSS colour or token var. */
  color?: string
  /** Fades the field toward the given side so it never competes with content. */
  fade?: SignalFieldFade
  /** Width of one RC unit in rem (the official grid proportions are kept). */
  unit?: number
  /** Shapes under the pointer fill with a faint teal (desktop pointers only). */
  interactive?: boolean
  className?: string
}

/**
 * The Signal Field: outlined RC marks repeated on the official grid.
 * Pure CSS (one 1 KB SVG tile as a mask), decorative and hidden from assistive tech.
 */
export function SignalField({
  opacity = 0.16,
  color = 'var(--color-teal)',
  fade = 'none',
  unit = 4.95,
  interactive = false,
  className,
}: SignalFieldProps) {
  const style = {
    '--sf-opacity': opacity,
    '--sf-color': color,
    '--sf-size': `${unit}rem`,
    ...(FADES[fade] ? { '--sf-fade': FADES[fade] } : {}),
  } as CSSProperties

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
      style={style}
    >
      <div className="signal-field absolute inset-0" />
      {interactive ? (
        <PointerGlow
          variant="signal"
          className="[mask-image:var(--sf-fade,linear-gradient(#000,#000))]"
        />
      ) : null}
    </div>
  )
}
