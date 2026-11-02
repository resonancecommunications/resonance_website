import Image from 'next/image'
import { cn } from '@/lib/utils'

type SpinningBadgeProps = {
  size?: number
  alt: string
  className?: string
}

/**
 * The official Symbol badge with its lettering ring slowly rotating around the RC mark.
 * Ring and mark are the badge's own paths split into two files (geometry unchanged).
 */
export function SpinningBadge({ size = 88, alt, className }: SpinningBadgeProps) {
  // Clear space X for the badge ≈ 0.214 × height (see Logo).
  const pad = Math.round(size * 0.214)
  return (
    <span className={cn('relative inline-block shrink-0', className)} style={{ padding: pad }}>
      <span className="relative block" style={{ width: size * (323 / 320), height: size }}>
        <Image
          src="/brand/badge-ring_white-teal.svg"
          alt={alt}
          fill
          unoptimized
          className="animate-[spin_28s_linear_infinite] motion-reduce:animate-none"
        />
        <Image src="/brand/badge-mark_teal.svg" alt="" fill unoptimized />
      </span>
    </span>
  )
}
