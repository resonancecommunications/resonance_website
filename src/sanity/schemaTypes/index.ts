import type { SchemaTypeDefinition } from 'sanity'
import { eventService } from './documents/eventService'
import { inquiry } from './documents/inquiry'
import { project } from './documents/project'
import { projectCategory } from './documents/projectCategory'
import { service } from './documents/service'
import { brandImage } from './objects/brandImage'
import { crossLink } from './objects/crossLink'
import { cta } from './objects/cta'
import { ctaBanner } from './objects/ctaBanner'
import { galleryVideo } from './objects/galleryVideo'
import { heroBlock } from './objects/heroBlock'
import {
  capabilitySection,
  division,
  partnerLogo,
  processStep,
  sectorItem,
  valueItem,
} from './objects/items'
import { navItem } from './objects/navItem'
import { seo } from './objects/seo'
import { textSection } from './objects/textSection'
import { navigation } from './singletons/navigation'
import {
  aboutPage,
  contactPage,
  eventsPage,
  homePage,
  mediaPage,
  ourWorkPage,
  servicesPage,
} from './singletons/pages'
import { siteSettings } from './singletons/siteSettings'

/** Document types that exist exactly once, with a fixed document id equal to the type name. */
export const SINGLETON_TYPES = [
  'siteSettings',
  'navigation',
  'homePage',
  'aboutPage',
  'servicesPage',
  'eventsPage',
  'mediaPage',
  'ourWorkPage',
  'contactPage',
] as const

export type SingletonType = (typeof SINGLETON_TYPES)[number]

export const schemaTypes: SchemaTypeDefinition[] = [
  // singletons
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  servicesPage,
  eventsPage,
  mediaPage,
  ourWorkPage,
  contactPage,
  // collections
  service,
  eventService,
  project,
  projectCategory,
  inquiry,
  // objects
  seo,
  cta,
  navItem,
  brandImage,
  galleryVideo,
  heroBlock,
  textSection,
  ctaBanner,
  crossLink,
  processStep,
  valueItem,
  division,
  capabilitySection,
  sectorItem,
  partnerLogo,
]
