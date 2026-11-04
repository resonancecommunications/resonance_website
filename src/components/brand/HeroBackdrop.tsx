import { cn } from '@/lib/utils'
import { PointerGlow } from './PointerGlow'

type HeroBackdropProps = {
  /** Where the soft teal arc sits ('none' for no glow). Divisions use opposite sides. */
  glow?: 'right' | 'left' | 'center' | 'none'
  /** Fine grid lines (with hover glow). Off where another pattern already carries the section. */
  grid?: boolean
  /** Slowly "breathe" the glow (scale + opacity, compositor-only). */
  breathe?: boolean
  className?: string
}

const GLOWS = {
  right:
    'radial-gradient(ellipse 70% 55% at 78% 108%, rgb(1 210 178 / 0.42), rgb(1 210 178 / 0.12) 45%, transparent 70%), radial-gradient(ellipse 120% 80% at 100% 120%, transparent 52%, rgb(1 210 178 / 0.22) 60%, transparent 68%)',
  left: 'radial-gradient(ellipse 70% 55% at 22% 108%, rgb(1 210 178 / 0.42), rgb(1 210 178 / 0.12) 45%, transparent 70%), radial-gradient(ellipse 120% 80% at 0% 120%, transparent 52%, rgb(1 210 178 / 0.22) 60%, transparent 68%)',
  center:
    'radial-gradient(ellipse 72% 62% at 50% 112%, rgb(1 210 178 / 0.68), rgb(1 210 178 / 0.26) 42%, rgb(1 210 178 / 0.06) 62%, transparent 76%)',
  none: null,
}

/**
 * The guideline cover, in CSS only: green-black ground, soft teal glow arc,
 * fine grid lines and a light grain.
 */
export function HeroBackdrop({
  glow = 'right',
  grid = true,
  breathe = false,
  className,
}: HeroBackdropProps) {
  const fade = '[mask-image:linear-gradient(to_bottom,#000,transparent_85%)]'
  return (
    <div
      aria-hidden="true"
      className={cn('grain pointer-events-none absolute inset-0', className)}
      style={{ ['--grid-size' as string]: 'clamp(5rem, 9vw, 8.5rem)' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-deep-2)_0%,var(--color-deep)_45%,var(--color-ink)_100%)]" />
      {GLOWS[glow] ? (
        <div
          className={cn('absolute inset-0', breathe && 'glow-breathe')}
          style={{ backgroundImage: GLOWS[glow] }}
        />
      ) : null}
      {grid ? (
        <>
          <div className={cn('absolute inset-0 grid-lines', fade)} />
          <PointerGlow variant="grid" className={fade} />
        </>
      ) : null}
    </div>
  )
}
