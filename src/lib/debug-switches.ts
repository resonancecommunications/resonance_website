/*
 * TEMPORARY (Chrome glitch investigation): ?off=reveal,anchor,stack,blur,glow,grain,shadow,flow
 * turns individual effects off so they can be isolated in a real browser. Remove when done.
 */
export const DEBUG_SWITCHES = [
  'reveal',
  'anchor',
  'stack',
  'blur',
  'glow',
  'grain',
  'shadow',
  'flow',
] as const
export type DebugSwitch = (typeof DEBUG_SWITCHES)[number]

export function activeDebugSwitches(): DebugSwitch[] {
  if (typeof window === 'undefined') return []
  const raw = new URLSearchParams(window.location.search).get('off')
  if (!raw) return []
  const wanted = raw.split(',').map((s) => s.trim())
  return wanted.includes('all')
    ? [...DEBUG_SWITCHES]
    : DEBUG_SWITCHES.filter((s) => wanted.includes(s))
}

export function isOff(name: DebugSwitch) {
  return activeDebugSwitches().includes(name)
}
