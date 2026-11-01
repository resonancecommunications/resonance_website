import { createClient } from 'next-sanity'
import { apiVersion, dataset, studioBasePath, studioProjectId } from '../env'

export const client = createClient({
  projectId: studioProjectId,
  dataset,
  apiVersion,
  // Next.js caches responses and webhooks revalidate them, so read fresh from the API.
  useCdn: false,
  perspective: 'published',
  stega: {
    studioUrl: studioBasePath,
    // Never encode values the code compares or uses as URLs/identifiers.
    filter: (props) => {
      const key = props.sourcePath.at(-1)
      if (
        typeof key === 'string' &&
        /^(href|slug|key|style|treatment|linkType|internalPath|url|number|_type)$/.test(key)
      ) {
        return false
      }
      return props.filterDefault(props)
    },
  },
})
