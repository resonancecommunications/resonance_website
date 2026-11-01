import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { strings } from '@/lib/strings'

/** Preview banner and click-to-edit overlays, rendered only in Draft Mode. */
export async function DraftModeTools() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null
  return (
    <>
      <VisualEditing />
      <div
        role="status"
        className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-4 rounded-full bg-teal py-2 pr-2 pl-5 font-display text-sm font-semibold text-ink shadow-lg"
      >
        {strings.preview.banner}
        <a
          href="/api/draft/disable"
          className="rounded-full bg-ink px-4 py-2 text-paper hover:bg-surface-raised"
        >
          {strings.preview.exit}
        </a>
      </div>
    </>
  )
}
