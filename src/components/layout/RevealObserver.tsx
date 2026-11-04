'use client'

import { useEffect } from 'react'

const SELECTOR = '.reveal:not(.is-visible), .carrier-reveal:not(.is-visible)'

/**
 * Adds .is-visible to .reveal / .carrier-reveal elements the first time they enter the
 * viewport (one-time CSS transition, see globals.css). Watches for elements added by
 * client navigations, since the layout persists across pages.
 *
 * A Carrier starts fully clipped (clip-path), and IntersectionObserver treats a fully
 * clipped target as never intersecting, so its parent is observed instead.
 */
export function RevealObserver() {
  useEffect(() => {
    const pending = new Map<Element, Element[]>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          for (const el of pending.get(entry.target) ?? []) el.classList.add('is-visible')
          pending.delete(entry.target)
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    const track = (el: Element) => {
      const target = el.classList.contains('carrier-reveal') ? (el.parentElement ?? el) : el
      const list = pending.get(target)
      if (list) {
        if (!list.includes(el)) list.push(el)
        return
      }
      pending.set(target, [el])
      io.observe(target)
    }
    const trackAll = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach(track)
    trackAll(document)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations)
        m.addedNodes.forEach((n) => {
          if (n instanceof Element) {
            if (n.matches(SELECTOR)) track(n)
            trackAll(n)
          }
        })
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
