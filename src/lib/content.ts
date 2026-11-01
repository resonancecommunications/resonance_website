import * as defaults from '@/content/defaults'
import type {
  AboutPage,
  ContactPage,
  EventService,
  EventsPage,
  HomePage,
  MediaPage,
  Navigation,
  OurWorkPage,
  Project,
  ProjectCategory,
  ProjectSummary,
  Service,
  ServicesPage,
  SiteSettings,
} from '@/content/types'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  aboutPageQuery,
  contactPageQuery,
  eventServicesQuery,
  eventsPageQuery,
  featuredProjectsQuery,
  homePageQuery,
  mediaPageQuery,
  navigationQuery,
  ourWorkPageQuery,
  projectCategoriesQuery,
  projectQuery,
  projectSlugsQuery,
  projectsQuery,
  servicesPageQuery,
  servicesQuery,
  siteSettingsQuery,
  sitemapQuery,
} from '@/sanity/lib/queries'
import type {
  AboutPageQueryResult,
  ContactPageQueryResult,
  EventServicesQueryResult,
  EventsPageQueryResult,
  FeaturedProjectsQueryResult,
  HomePageQueryResult,
  MediaPageQueryResult,
  NavigationQueryResult,
  OurWorkPageQueryResult,
  ProjectCategoriesQueryResult,
  ProjectQueryResult,
  ProjectSlugsQueryResult,
  ProjectsQueryResult,
  ServicesPageQueryResult,
  ServicesQueryResult,
  SiteSettingsQueryResult,
  SitemapQueryResult,
} from '@/sanity/types'

/*
 * Compile-time guard: every GROQ projection must return exactly the keys the
 * front-end shape expects. A mismatch fails `pnpm typecheck`.
 */
type SameKeys<A, B> = [Exclude<keyof A, keyof B>, Exclude<keyof B, keyof A>] extends [never, never]
  ? true
  : { extra: Exclude<keyof A, keyof B>; missing: Exclude<keyof B, keyof A> }
type Row<T> = NonNullable<T> extends Array<infer R> ? R : NonNullable<T>

export const keyChecks: [
  SameKeys<Row<SiteSettingsQueryResult>, SiteSettings>,
  SameKeys<Row<NavigationQueryResult>, Navigation>,
  SameKeys<Row<HomePageQueryResult>, HomePage>,
  SameKeys<Row<AboutPageQueryResult>, AboutPage>,
  SameKeys<Row<ServicesPageQueryResult>, ServicesPage>,
  SameKeys<Row<ServicesQueryResult>, Service>,
  SameKeys<Row<EventsPageQueryResult>, EventsPage>,
  SameKeys<Row<EventServicesQueryResult>, EventService>,
  SameKeys<Row<MediaPageQueryResult>, MediaPage>,
  SameKeys<Row<OurWorkPageQueryResult>, OurWorkPage>,
  SameKeys<Row<ProjectCategoriesQueryResult>, ProjectCategory>,
  SameKeys<Row<ProjectsQueryResult>, ProjectSummary>,
  SameKeys<Row<FeaturedProjectsQueryResult>, ProjectSummary>,
  SameKeys<Row<ProjectQueryResult>, Omit<Project, 'previous' | 'next'>>,
  SameKeys<Row<ContactPageQueryResult>, ContactPage>,
] = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]

/**
 * Overlays a Sanity document on the spec defaults, section by section, so a section
 * that has not been filled in yet still renders the spec copy instead of breaking.
 */
function withDefaults<T extends object>(data: unknown, fallback: T): T {
  if (!data || typeof data !== 'object') return fallback
  const merged = { ...fallback } as Record<string, unknown>
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) merged[key] = value
  }
  return merged as T
}

function nonEmpty<T>(rows: T[] | null | undefined): rows is T[] {
  return Array.isArray(rows) && rows.length > 0
}

/* ---------- Global ---------- */

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettingsQueryResult>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  })
  const merged = withDefaults(data, defaults.siteSettings)
  return { ...merged, social: { ...defaults.siteSettings.social, ...merged.social } }
}

export async function getNavigation(): Promise<Navigation> {
  const data = await sanityFetch<NavigationQueryResult>({
    query: navigationQuery,
    tags: ['navigation'],
  })
  return withDefaults(data, defaults.navigation)
}

/* ---------- Pages ---------- */

export async function getHomePage(): Promise<HomePage> {
  const data = await sanityFetch<HomePageQueryResult>({ query: homePageQuery, tags: ['homePage'] })
  return withDefaults(data, defaults.homePage)
}

export async function getAboutPage(): Promise<AboutPage> {
  const data = await sanityFetch<AboutPageQueryResult>({
    query: aboutPageQuery,
    tags: ['aboutPage'],
  })
  return withDefaults(data, defaults.aboutPage)
}

export async function getServicesPage(): Promise<ServicesPage> {
  const data = await sanityFetch<ServicesPageQueryResult>({
    query: servicesPageQuery,
    tags: ['servicesPage'],
  })
  return withDefaults(data, defaults.servicesPage)
}

export async function getServices(): Promise<Service[]> {
  const rows = await sanityFetch<ServicesQueryResult>({ query: servicesQuery, tags: ['service'] })
  if (nonEmpty(rows)) return rows as Service[]
  return defaults.services.map((s) => ({ ...s, _id: `service-${s.slug}` }))
}

export async function getEventsPage(): Promise<EventsPage> {
  const data = await sanityFetch<EventsPageQueryResult>({
    query: eventsPageQuery,
    tags: ['eventsPage'],
  })
  return withDefaults(data, defaults.eventsPage)
}

export async function getEventServices(): Promise<EventService[]> {
  const rows = await sanityFetch<EventServicesQueryResult>({
    query: eventServicesQuery,
    tags: ['eventService'],
  })
  if (nonEmpty(rows)) return rows as EventService[]
  return defaults.eventServices.map((s) => ({ ...s, _id: `event-service-${s.order}` }))
}

export async function getMediaPage(): Promise<MediaPage> {
  const data = await sanityFetch<MediaPageQueryResult>({
    query: mediaPageQuery,
    tags: ['mediaPage'],
  })
  return withDefaults(data, defaults.mediaPage)
}

export async function getOurWorkPage(): Promise<OurWorkPage> {
  const data = await sanityFetch<OurWorkPageQueryResult>({
    query: ourWorkPageQuery,
    tags: ['ourWorkPage'],
  })
  return withDefaults(data, defaults.ourWorkPage)
}

export async function getContactPage(): Promise<ContactPage> {
  const data = await sanityFetch<ContactPageQueryResult>({
    query: contactPageQuery,
    tags: ['contactPage'],
  })
  return withDefaults(data, defaults.contactPage)
}

/* ---------- Projects ---------- */

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const rows = await sanityFetch<ProjectCategoriesQueryResult>({
    query: projectCategoriesQuery,
    tags: ['projectCategory'],
  })
  if (nonEmpty(rows)) return rows as ProjectCategory[]
  return defaults.projectCategories.map((c) => ({ ...c, _id: `category-${c.slug}` }))
}

/** Client-approved projects only. Never falls back to placeholder projects. */
export async function getProjects(): Promise<ProjectSummary[]> {
  const rows = await sanityFetch<ProjectsQueryResult>({
    query: projectsQuery,
    tags: ['project', 'projectCategory'],
  })
  return (rows ?? []) as ProjectSummary[]
}

export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  const rows = await sanityFetch<FeaturedProjectsQueryResult>({
    query: featuredProjectsQuery,
    tags: ['project', 'projectCategory'],
  })
  return (rows ?? []) as ProjectSummary[]
}

export async function getProjectSlugs(): Promise<{ slug: string; title: string }[]> {
  const rows = await sanityFetch<ProjectSlugsQueryResult>({
    query: projectSlugsQuery,
    tags: ['project'],
  })
  return (rows ?? []).filter((r): r is { slug: string; title: string; _updatedAt: string } =>
    Boolean(r.slug && r.title),
  )
}

export async function getProject(slug: string): Promise<Project | null> {
  const [project, slugs] = await Promise.all([
    sanityFetch<ProjectQueryResult>({
      query: projectQuery,
      params: { slug },
      tags: ['project', 'projectCategory', `project:${slug}`],
    }),
    getProjectSlugs(),
  ])
  if (!project) return null
  const index = slugs.findIndex((s) => s.slug === slug)
  return {
    ...(project as Omit<Project, 'previous' | 'next'>),
    previous: index > 0 ? slugs[index - 1] : null,
    next: index >= 0 && index < slugs.length - 1 ? slugs[index + 1] : null,
  }
}

export async function getSitemapData() {
  const data = await sanityFetch<SitemapQueryResult>({
    query: sitemapQuery,
    tags: [
      'project',
      'homePage',
      'aboutPage',
      'servicesPage',
      'eventsPage',
      'mediaPage',
      'ourWorkPage',
      'contactPage',
    ],
  })
  return data ?? { pages: [], projects: [] }
}
