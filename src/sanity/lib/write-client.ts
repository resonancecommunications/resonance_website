import { client } from './client'
import { writeToken } from './token'

/** Server-only client with write access (inquiry submissions). */
export const writeClient = client.withConfig({ token: writeToken, useCdn: false, stega: false })
