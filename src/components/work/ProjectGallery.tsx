'use client'

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BrandImage } from '@/components/ui/BrandImage'
import type { GalleryImage, GalleryItem } from '@/content/types'
import { urlForImage } from '@/sanity/lib/image'
import { strings } from '@/lib/strings'
import { cn } from '@/lib/utils'
import { VideoFacade } from './VideoFacade'

/** Project gallery: images open in an accessible lightbox; videos load on demand. */
export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const images = items.filter((item): item is GalleryImage => item._type === 'brandImage')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
    if (index === null && dialog.open) dialog.close()
  }, [index])

  const current = index !== null ? images[index] : null

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {items.map((item, i) => (
            <li key={item._key} className={cn(i % 3 === 0 && 'sm:col-span-2')}>
              {item._type === 'galleryVideo' ? (
                <figure>
                  <VideoFacade video={item} />
                  {item.caption ? (
                    <figcaption className="mt-3 text-sm text-muted-dark">{item.caption}</figcaption>
                  ) : null}
                </figure>
              ) : (
                <figure>
                  <button
                    type="button"
                    onClick={() => setIndex(images.indexOf(item))}
                    aria-label={strings.gallery.open(item.caption || item.alt)}
                    className="group block w-full overflow-hidden rounded-2xl"
                  >
                    <BrandImage
                      image={item}
                      aspect={i % 3 === 0 ? '16 / 9' : '4 / 3'}
                      sizes={
                        i % 3 === 0
                          ? '(min-width: 1440px) 1300px, 100vw'
                          : '(min-width: 640px) 50vw, 100vw'
                      }
                      imgClassName="transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                    />
                  </button>
                  {item.caption ? (
                    <figcaption className="mt-3 text-sm text-muted-dark">{item.caption}</figcaption>
                  ) : null}
                </figure>
              )}
            </li>
          ))}
        </ul>

        <dialog
          ref={dialogRef}
          onClose={close}
          aria-label={current ? current.caption || current.alt : undefined}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
          }}
          className="m-0 h-dvh max-h-none w-full max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/80"
        >
          <div className="flex h-full flex-col">
            <div className="container-brand flex h-16 items-center justify-between">
              <p className="text-sm text-muted-dark" aria-live="polite">
                {index !== null ? strings.gallery.counter(index + 1, images.length) : ''}
              </p>
              <button
                type="button"
                onClick={close}
                className="flex size-12 items-center justify-center rounded-full border border-white/20 hover:border-teal hover:text-teal"
              >
                <span className="sr-only">{strings.gallery.close}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
                  <path
                    d="M5 5l14 14M19 5L5 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20">
              <AnimatePresence mode="wait" initial={false}>
                {current ? (
                  <m.figure
                    key={current._key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative flex h-full w-full flex-col items-center justify-center"
                  >
                    <div className="relative h-full max-h-[78dvh] w-full">
                      <Image
                        src={urlForImage(current).width(2400).url()}
                        alt={current.alt}
                        fill
                        sizes="100vw"
                        className={cn(
                          'object-contain',
                          current.treatment !== 'fullColor' && 'img-bw',
                        )}
                      />
                    </div>
                    {current.caption ? (
                      <figcaption className="mt-4 text-center text-sm text-muted-dark">
                        {current.caption}
                      </figcaption>
                    ) : null}
                  </m.figure>
                ) : null}
              </AnimatePresence>
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute top-1/2 left-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/60 hover:border-teal hover:text-teal sm:left-6"
                  >
                    <span className="sr-only">{strings.gallery.previous}</span>
                    <svg aria-hidden="true" viewBox="0 0 20 12" className="h-3 w-5 rotate-180">
                      <path
                        d="M0 6h17M12 1l5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute top-1/2 right-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/60 hover:border-teal hover:text-teal sm:right-6"
                  >
                    <span className="sr-only">{strings.gallery.next}</span>
                    <svg aria-hidden="true" viewBox="0 0 20 12" className="h-3 w-5">
                      <path
                        d="M0 6h17M12 1l5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </dialog>
      </MotionConfig>
    </LazyMotion>
  )
}
