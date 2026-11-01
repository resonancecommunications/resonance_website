type ClassValue = string | false | null | undefined

/** Joins class names, skipping falsy values. */
export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ')
}

/** Converts a title to a URL-safe anchor id. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Two-digit index label used across the site ("01", "02", ...). */
export function pad2(n: number) {
  return String(n).padStart(2, '0')
}
