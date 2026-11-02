import { cn } from '@/lib/utils'
import { PointerGlow } from './PointerGlow'

type HeroBackdropProps = {
  /** Where the soft teal arc sits. Divisions use opposite sides. */
  glow?: 'right' | 'left' | 'center'
  className?: string
}

const GLOWS = {
  right:
    'radial-gradient(ellipse 70% 55% at 78% 108%, rgb(1 210 178 / 0.42), rgb(1 210 178 / 0.12) 45%, transparent 70%), radial-gradient(ellipse 120% 80% at 100% 120%, transparent 52%, rgb(1 210 178 / 0.22) 60%, transparent 68%)',
  left: 'radial-gradient(ellipse 70% 55% at 22% 108%, rgb(1 210 178 / 0.42), rgb(1 210 178 / 0.12) 45%, transparent 70%), radial-gradient(ellipse 120% 80% at 0% 120%, transparent 52%, rgb(1 210 178 / 0.22) 60%, transparent 68%)',
  center:
    'radial-gradient(ellipse 60% 50% at 50% 115%, rgb(1 210 178 / 0.4), rgb(1 210 178 / 0.1) 50%, transparent 72%)',
}

/**
 * The guideline cover, in CSS only: green-black ground, soft teal glow arc,
 * fine grid lines and a light grain.
 */
export function HeroBackdrop({ glow = 'right', className }: HeroBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('grain pointer-events-none absolute inset-0', className)}
      style={{ ['--grid-size' as string]: 'clamp(5rem, 9vw, 8.5rem)' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-deep-2)_0%,var(--color-deep)_45%,var(--color-ink)_100%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: GLOWS[glow] }} />
      <div className="absolute inset-0 grid-lines [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <PointerGlow
        variant="grid"
        className="[mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
      />
    </div>
  )
}
