/**
 * Seeds the Sanity dataset with all copy from docs/content-spec.pdf
 * (via src/content/defaults.ts).
 *
 *   pnpm seed            create documents that do not exist yet (safe to re-run)
 *   pnpm seed --replace  overwrite existing documents with the spec copy
 *   pnpm seed --dry-run  print the documents without writing anything
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
 * SANITY_API_WRITE_TOKEN (an Editor token) in .env.local.
 * No projects or inquiries are created: projects must be real and client-approved.
 */
import { randomUUID } from 'node:crypto'
import { createClient, type SanityDocumentStub } from '@sanity/client'
import { config } from 'dotenv'
import * as content from '../src/content/defaults'

config({ path: '.env.local', quiet: true })
config({ quiet: true })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN
const replace = process.argv.includes('--replace')
const dryRun = process.argv.includes('--dry-run')

if (!dryRun && (!projectId || !token)) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. Add them to .env.local (see README).',
  )
  process.exit(1)
}

const client = createClient({
  projectId: projectId || 'dry-run',
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-01',
  useCdn: false,
})

type Json = string | number | boolean | null | undefined | Json[] | { [key: string]: Json }
type JsonObject = { [key: string]: Json }

const isObject = (value: Json): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/** Front-end link ({label, href}) → Sanity link fields. */
function toLink(link: JsonObject): JsonObject {
  const { href, ...rest } = link
  const target = String(href)
  const external = /^(https?:|mailto:|tel:)/.test(target)
  return external
    ? { ...rest, linkType: 'external', url: target }
    : { ...rest, linkType: 'internal', internalPath: target }
}

/** Sanity _type for an object inside an array, from its shape and parent field. */
function arrayMemberType(item: JsonObject, parentKey: string): string | undefined {
  if ('label' in item && 'href' in item) return 'navItem'
  if ('key' in item && 'number' in item) return 'division'
  if ('listLabel' in item && 'eyebrow' in item) return 'capabilitySection'
  if ('title' in item && 'description' in item)
    return parentKey === 'steps' ? 'processStep' : 'valueItem'
  return undefined
}

/** Recursively converts front-end shapes into Sanity document data. */
function toSanity(value: Json, parentKey = ''): Json {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (!isObject(item)) return item
      const converted = toSanity(item, parentKey) as JsonObject
      const _type = arrayMemberType(item, parentKey)
      return { _key: randomUUID().slice(0, 12), ...(_type ? { _type } : {}), ...converted }
    })
  }
  if (isObject(value)) {
    const base = 'href' in value && 'label' in value ? toLink(value) : value
    return Object.fromEntries(
      Object.entries(base)
        .filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, toSanity(v, k)]),
    )
  }
  return value
}

function singleton(type: string, data: object): SanityDocumentStub {
  return { _id: type, _type: type, ...(toSanity(data as JsonObject) as JsonObject) }
}

const slug = (current: string) => ({ _type: 'slug', current })

const documents: SanityDocumentStub[] = [
  singleton('siteSettings', content.siteSettings),
  singleton('navigation', content.navigation),
  singleton('homePage', content.homePage),
  singleton('aboutPage', content.aboutPage),
  singleton('servicesPage', content.servicesPage),
  singleton('eventsPage', content.eventsPage),
  singleton('mediaPage', content.mediaPage),
  singleton('ourWorkPage', content.ourWorkPage),
  singleton('contactPage', content.contactPage),
  ...content.services.map((s) => ({
    _id: `service-${s.slug}`,
    _type: 'service',
    ...(toSanity({ ...s, slug: null } as unknown as JsonObject) as JsonObject),
    slug: slug(s.slug),
  })),
  ...content.eventServices.map((s) => ({
    _id: `eventService-${s.order}`,
    _type: 'eventService',
    ...s,
  })),
  ...content.projectCategories.map((c, i) => ({
    _id: `projectCategory-${c.slug}`,
    _type: 'projectCategory',
    title: c.title,
    slug: slug(c.slug),
    order: i + 1,
  })),
]

async function main() {
  if (dryRun) {
    console.log(JSON.stringify(documents, null, 2))
    console.log(`\n${documents.length} documents (dry run, nothing written).`)
    return
  }
  const tx = client.transaction()
  for (const doc of documents) {
    if (replace) tx.createOrReplace(doc as SanityDocumentStub & { _id: string })
    else tx.createIfNotExists(doc as SanityDocumentStub & { _id: string })
  }
  await tx.commit({ visibility: 'async' })
  console.log(
    `${replace ? 'Replaced' : 'Created (if missing)'} ${documents.length} documents in ${projectId}/${dataset}.`,
  )
}

main().catch((error: unknown) => {
  console.error('Seeding failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
