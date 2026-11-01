/**
 * Sanity configuration from environment variables. Every value has a safe default
 * so the site builds and renders the bundled spec copy before a project exists.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

/** True once NEXT_PUBLIC_SANITY_PROJECT_ID is set. */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId)

/** Placeholder id so Sanity tooling (schema extract, typegen) can run unconfigured. */
export const studioProjectId = isSanityConfigured ? projectId : 'not-configured'

export const studioBasePath = '/studio'
