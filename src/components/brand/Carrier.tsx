import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/*
 * Official Resonance Carrier terminal (brand-assets/patterns/carrier.svg), cropped to
 * the cut/rounded RC termination. The bar itself is a plain teal block so it can grow
 * with its content while the terminal keeps its exact proportions.
 */
const TERMINAL_X = 752.696
const TERMINAL_W = 1032 - TERMINAL_X
const TERMINAL_H = 205

function CarrierTerminal() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`${TERMINAL_X} 0 ${TERMINAL_W} ${TERMINAL_H}`}
      preserveAspectRatio="xMinYMid meet"
      className="-ml-px block h-full w-auto shrink-0 text-teal"
      style={{ aspectRatio: `${TERMINAL_W} / ${TERMINAL_H}` }}
    >
      <path
        fill="currentColor"
        d="M998.12 0.00370161H1032V204.896H998.12C942.023 204.896 896.48 158.992 896.48 102.45C896.48 45.9079 942.023 0.00370161 998.12 0.00370161Z"
      />
      <path
        fill="currentColor"
        d="M0 0H752.696H820.456C857.859 0 888.216 30.6054 888.216 68.2975C888.216 105.92 857.963 136.482 820.662 136.595L888.216 136.594V204.892H752.696V205H0V0Z"
      />
    </svg>
  )
}

type CarrierProps = {
  children: ReactNode
  /** Optional second line (e.g. a role under a name, a category under a title). */
  meta?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  as?: ElementType
  /** Slide in when scrolled into view (CSS only; static under reduced motion). */
  reveal?: boolean
  className?: string
}

// Explicit heights: the terminal's width derives from the bar height, so the bar
// height must not depend on the terminal (avoids a circular layout).
const SIZES = {
  sm: {
    h: 'h-7',
    hMeta: 'h-10',
    bar: 'pl-3 pr-2 text-[0.6875rem] tracking-[0.18em]',
    meta: 'text-[0.625rem]',
  },
  md: { h: 'h-9', hMeta: 'h-12', bar: 'pl-4 pr-3 text-sm tracking-[0.14em]', meta: 'text-xs' },
  lg: {
    h: 'h-14',
    hMeta: 'h-[4.5rem]',
    bar: 'pl-5 pr-4 text-xl tracking-[0.04em] md:text-2xl',
    meta: 'text-sm',
  },
}

/**
 * The Resonance Carrier: a teal bar with the RC termination that identifies and
 * introduces information. Always attach it to real content.
 */
export function Carrier({
  children,
  meta,
  size = 'md',
  as: Tag = 'span',
  reveal = false,
  className,
}: CarrierProps) {
  const s = SIZES[size]
  return (
    <Tag
      className={cn(
        'inline-flex max-w-full items-stretch',
        meta ? s.hMeta : s.h,
        reveal && 'carrier-reveal',
        className,
      )}
    >
      <span
        className={cn(
          'flex min-w-0 flex-col justify-center overflow-hidden bg-teal font-display leading-tight font-bold whitespace-nowrap text-ink uppercase',
          s.bar,
        )}
      >
        <span className="truncate">{children}</span>
        {meta ? (
          <span className={cn('font-sans font-medium tracking-[0.12em] normal-case', s.meta)}>
            {meta}
          </span>
        ) : null}
      </span>
      <CarrierTerminal />
    </Tag>
  )
}
