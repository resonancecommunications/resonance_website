/**
 * Simple fixed-window rate limiter keyed by IP.
 * Uses Upstash Redis (REST) when UPSTASH_REDIS_REST_URL/TOKEN are set, which works
 * across serverless instances; otherwise falls back to per-instance memory.
 */
const WINDOW_SECONDS = 10 * 60
const MAX_REQUESTS = 5

const memory = new Map<string, { count: number; resetAt: number }>()

async function upstashHit(key: string): Promise<number | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(WINDOW_SECONDS), 'NX'],
      ]),
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = (await res.json()) as { result: number }[]
    return data[0]?.result ?? null
  } catch {
    return null
  }
}

function memoryHit(key: string): number {
  const now = Date.now()
  const entry = memory.get(key)
  if (!entry || entry.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 })
    if (memory.size > 5000) memory.clear() // bound memory on long-lived instances
    return 1
  }
  entry.count += 1
  return entry.count
}

/** Returns true when the caller is over the limit. */
export async function isRateLimited(ip: string): Promise<boolean> {
  const key = `inquiry:${ip}`
  const count = (await upstashHit(key)) ?? memoryHit(key)
  return count > MAX_REQUESTS
}
