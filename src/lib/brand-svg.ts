import { readFile } from 'node:fs/promises'

/*
 * Official logo files for ImageResponse (OG image, apple icon), read unmodified from
 * /public/brand. Static URLs so the bundler traces exactly these files.
 */
const FILES = {
  horizontalDark: () => new URL('../../public/brand/horizontal_white-teal.svg', import.meta.url),
  iconBlack: () => new URL('../../public/brand/icon_black.svg', import.meta.url),
}

export async function brandSvgDataUri(file: keyof typeof FILES) {
  const svg = await readFile(FILES[file](), 'utf8')
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
