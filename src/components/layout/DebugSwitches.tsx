'use client'

import { useEffect, useState } from 'react'
import { activeDebugSwitches, type DebugSwitch } from '@/lib/debug-switches'

/** Rules for the CSS-level switches, injected at runtime so no build step can strip them. */
const RULES: Partial<Record<DebugSwitch, string>> = {
  reveal:
    '.reveal,.carrier-reveal{animation:none!important;opacity:1!important;transform:none!important;clip-path:none!important}',
  anchor: 'html,body{overflow-anchor:none!important}',
  blur: 'header{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}',
  grain: '.grain::after{display:none!important}',
  shadow: 'main div[style*="z-index"]{box-shadow:none!important}',
  flow: '.flow-segment{animation:none!important}',
}

/** TEMPORARY: applies ?off= switches and shows which are active. */
export function DebugSwitches() {
  const [active, setActive] = useState<DebugSwitch[]>([])

  useEffect(() => {
    const list = activeDebugSwitches()
    if (!list.length) return
    const style = document.createElement('style')
    style.dataset.debugSwitches = ''
    style.textContent = list.map((s) => RULES[s] ?? '').join('\n')
    document.head.appendChild(style)
    // Reading the URL is an external system: sync it into state once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(list)
    return () => style.remove()
  }, [])

  if (!active.length) return null
  return (
    <div className="fixed bottom-3 left-3 z-[80] rounded-full bg-teal px-4 py-2 font-mono text-xs text-ink">
      off: {active.join(', ')}
    </div>
  )
}
