import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/*
 * Official Resonance Flow artwork (brand-assets/patterns/resonance-flow-0x_*.svg).
 * The path data is used unmodified. To animate it, the same path is drawn once per
 * segment and clipped to that segment's column, so each half-circle segment can
 * pulse independently while the overall shape stays exactly the official one.
 */
const ARTWORK = {
  /** Pattern 02-01: even height, segments mirror toward the centre. */
  wave: {
    width: 413.724,
    height: 91.577,
    d: 'M413.724 0V91.577H398.459C382.838 91.577 369.038 83.7431 360.769 71.7947V91.577H345.504C330.487 91.577 317.148 84.3356 308.797 73.1607V91.577H293.532C277.91 91.577 264.111 83.7431 255.842 71.7947V91.577H240.577C227.244 91.577 215.232 85.8661 206.865 76.7595C198.492 85.8661 186.481 91.577 173.147 91.577H157.883V71.7947C149.614 83.7431 135.814 91.577 120.192 91.577H104.928V73.1607C96.5764 84.3356 83.2376 91.577 68.2197 91.577H52.9549V71.7947C44.686 83.7431 30.8862 91.577 15.2648 91.577H0V0H15.2648C30.8862 0 44.686 7.83394 52.9549 19.7823V0H68.2197C83.2376 0 96.5764 7.24145 104.928 18.4163V0H120.192C135.814 0 149.614 7.83394 157.883 19.7823V0H173.147C186.481 0 198.492 5.71087 206.865 14.8176C215.232 5.71087 227.244 0 240.577 0H255.842V19.7878C264.105 7.83394 277.91 0 293.532 0H308.797V18.4163C317.148 7.24145 330.487 0 345.504 0H360.769V19.7878C369.033 7.83394 382.838 0 398.459 0H413.724Z',
    columns: [0, 52.955, 104.928, 157.883, 206.865, 255.842, 308.797, 360.769, 413.724],
  },
  /** Pattern 02-02: segments grow toward the centre (amplification). */
  swell: {
    width: 404.769,
    height: 108.814,
    d: 'M404.769 18.6687V90.1452H392.857C381.389 90.1452 371.178 84.736 364.627 76.3316V96.8874H350.465C337.318 96.8874 325.554 90.9022 317.762 81.5213V103.706H301.323C285.065 103.706 270.635 95.8231 261.652 83.6772V108.814H243.507C227.09 108.814 212.363 101.534 202.387 90.0245C192.407 101.534 177.68 108.814 161.262 108.814H143.117V83.6772C134.129 95.8231 119.699 103.706 103.446 103.706H87.0071V81.5213C79.2156 90.9022 67.4515 96.8874 54.3047 96.8874H40.1428V76.3316C33.5968 84.736 23.3855 90.1452 11.9122 90.1452H0V18.6687H11.9122C23.38 18.6687 33.5913 24.0778 40.1428 32.4823V11.9265H54.3047C67.4515 11.9265 79.2156 17.9062 87.0071 27.2926V5.10742H103.446C119.704 5.10742 134.135 12.9907 143.117 25.1366V0H161.262C177.68 0 192.407 7.27986 202.387 18.7839C212.363 7.28534 227.09 0 243.507 0H261.652V25.1366C270.64 12.9907 285.065 5.10742 301.323 5.10742H317.762V27.2926C325.554 17.9062 337.318 11.9265 350.465 11.9265H364.627V32.4823C371.173 24.0778 381.384 18.6687 392.857 18.6687H404.769Z',
    columns: [0, 40.143, 87.007, 143.117, 202.387, 261.652, 317.762, 364.627, 404.769],
  },
} as const

export type FlowArtwork = keyof typeof ARTWORK
export type FlowFill = 'gradient' | 'solid' | 'fade-left' | 'fade-right'

type ResonanceFlowProps = {
  artwork?: FlowArtwork
  /** Official teal→transparent gradient, solid teal, or a one-sided fade. */
  fill?: FlowFill
  /** Animate the segments. Always static under prefers-reduced-motion. */
  animated?: boolean
  /** Show only part of the sequence (static use, per the guideline): [from, to) segment indexes. */
  segments?: [number, number]
  /** Rotate the whole device: horizontal (default) or vertical. */
  orientation?: 'horizontal' | 'vertical'
  /** Mirror horizontally. */
  flip?: boolean
  className?: string
  style?: CSSProperties
}

const GRADIENTS: Record<FlowFill, { offset: number; opacity: number }[]> = {
  // Matches the official gradient (white → #B1EEE5 → teal → #B1EEE5 → white), rebuilt as
  // teal → transparent so it works on dark grounds as well as light ones.
  gradient: [
    { offset: 0, opacity: 0 },
    { offset: 0.2, opacity: 0.35 },
    { offset: 0.5, opacity: 1 },
    { offset: 0.8, opacity: 0.35 },
    { offset: 1, opacity: 0 },
  ],
  solid: [
    { offset: 0, opacity: 1 },
    { offset: 1, opacity: 1 },
  ],
  'fade-left': [
    { offset: 0, opacity: 0 },
    { offset: 0.6, opacity: 1 },
    { offset: 1, opacity: 1 },
  ],
  'fade-right': [
    { offset: 0, opacity: 1 },
    { offset: 0.4, opacity: 1 },
    { offset: 1, opacity: 0 },
  ],
}

/**
 * Resonance Flow: the dynamic expression of the identity. Use for hero motion,
 * transitions and loading states; when static, prefer a selected portion.
 */
export function ResonanceFlow({
  artwork = 'wave',
  fill = 'gradient',
  animated = false,
  segments,
  orientation = 'horizontal',
  flip = false,
  className,
  style,
}: ResonanceFlowProps) {
  const art = ARTWORK[artwork]
  const id = `rf-${artwork}-${fill}-${segments?.join('-') ?? 'all'}`
  const [from, to] = segments ?? [0, art.columns.length - 1]
  const x0 = art.columns[from]
  const x1 = art.columns[to]

  const transforms = [orientation === 'vertical' ? 'rotate(90deg)' : '', flip ? 'scaleX(-1)' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`${x0} 0 ${x1 - x0} ${art.height}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn('block overflow-visible text-teal', animated && 'flow-animated', className)}
      style={{ ...style, transform: transforms || undefined }}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1={x0} x2={x1} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          {GRADIENTS[fill].map((stop) => (
            <stop
              key={stop.offset}
              offset={stop.offset}
              stopColor="currentColor"
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
        {art.columns.slice(from, to).map((left, i) => (
          <clipPath key={left} id={`${id}-c${i}`}>
            <rect
              x={left}
              y="-1"
              width={art.columns[from + i + 1] - left}
              height={art.height + 2}
            />
          </clipPath>
        ))}
      </defs>
      {art.columns.slice(from, to).map((left, i) => (
        <g key={left} clipPath={`url(#${id}-c${i})`}>
          <path
            className="flow-segment"
            style={{ '--i': i } as CSSProperties}
            d={art.d}
            fill={`url(#${id}-g)`}
          />
        </g>
      ))}
    </svg>
  )
}
