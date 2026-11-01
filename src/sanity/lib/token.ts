/** Viewer token for draft content. Server-only: never import this from client code. */
export const readToken = process.env.SANITY_API_READ_TOKEN || ''

/** Editor token for writes (seed script, inquiry submissions). Server-only. */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || ''
