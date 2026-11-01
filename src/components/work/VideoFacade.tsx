'use client'

import { useState } from 'react'
import { SignalField } from '@/components/brand/SignalField'
import type { GalleryVideo } from '@/content/types'
import { strings } from '@/lib/strings'
import { videoEmbedUrl } from '@/lib/video'

/** Loads the third-party player only after the visitor asks for it. */
export function VideoFacade({ video }: { video: GalleryVideo }) {
  const [playing, setPlaying] = useState(false)
  const embed = videoEmbedUrl(video.url)

  if (playing && embed) {
    return (
      <iframe
        src={embed}
        title={video.title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-2xl"
      />
    )
  }

  const content = (
    <>
      <SignalField opacity={0.12} fade="edges" />
      <span className="relative flex size-16 items-center justify-center rounded-full bg-teal text-ink transition-transform duration-300 group-hover:scale-105">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-6 fill-current">
          <path d="M7 4.5v15l12-7.5z" />
        </svg>
      </span>
      <span className="relative mt-6 max-w-sm px-6 text-center font-display text-lg text-paper">
        {video.title}
      </span>
    </>
  )
  const classes =
    'group relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-surface'

  return embed ? (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={classes}
      aria-label={strings.gallery.watch(video.title)}
    >
      {content}
    </button>
  ) : (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={strings.gallery.watch(video.title)}
    >
      {content}
    </a>
  )
}
