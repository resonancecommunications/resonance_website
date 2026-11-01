import * as defaults from '@/content/defaults'
import type { Navigation, SiteSettings } from '@/content/types'

export async function getSiteSettings(): Promise<SiteSettings> {
  return defaults.siteSettings
}

export async function getNavigation(): Promise<Navigation> {
  return defaults.navigation
}
