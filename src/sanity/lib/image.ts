import { createImageUrlBuilder } from '@sanity/image-url'
import type { BrandImage } from '@/content/types'
import { dataset, studioProjectId } from '../env'

const builder = createImageUrlBuilder({ projectId: studioProjectId, dataset })

/** Image URL respecting the editor's crop and hotspot. */
export function urlForImage(image: BrandImage) {
  return builder.image(image).auto('format').fit('crop')
}
