import Image from 'next/image'
import type { BrandImage as BrandImageType } from '@/content/types'
import { urlForImage } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'
import { SignalField } from '@/components/brand/SignalField'

type BrandImageProps = {
  image?: BrandImageType | null
  /** Rendered aspect ratio, e.g. "4 / 3". The image is cropped to it around the hotspot. */
  aspect?: string
  sizes: string
  priority?: boolean
  className?: string
  imgClassName?: string
}

/**
 * Sanity image with the brand photography treatment applied:
 * black & white by default, optional full colour or teal overlay.
 * Without an image it renders the brand placeholder (dark field + Signal Field).
 */
export function BrandImage({
  image,
  aspect = '4 / 3',
  sizes,
  priority,
  className,
  imgClassName,
}: BrandImageProps) {
  const wrapper = cn('relative overflow-hidden bg-surface', className)

  if (!image?.asset?.url) {
    return (
      <div aria-hidden="true" className={wrapper} style={{ aspectRatio: aspect }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_120%,rgb(1_210_178/0.28),transparent_65%)]" />
        <SignalField opacity={0.14} fade="edges" />
      </div>
    )
  }

  const treatment = image.treatment ?? 'blackAndWhite'
  const src = urlForImage(image).width(2000).url()

  return (
    <div className={wrapper} style={{ aspectRatio: aspect }}>
      <Image
        src={src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={image.asset.metadata?.lqip ?? undefined}
        className={cn('object-cover', treatment !== 'fullColor' && 'img-bw', imgClassName)}
        style={
          image.hotspot
            ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` }
            : undefined
        }
      />
      {treatment === 'tealOverlay' ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-teal mix-blend-multiply"
          style={{ opacity: (image.overlayOpacity ?? 55) / 100 }}
        />
      ) : null}
    </div>
  )
}
