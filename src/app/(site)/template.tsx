import { ViewTransition } from 'react'

/**
 * Templates remount on every navigation (layouts persist), so this wrapper gives each
 * page an enter/exit view transition while the header and footer stay put.
 * Styles: globals.css → "Page transitions".
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}
