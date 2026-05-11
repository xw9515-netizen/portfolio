import { useEffect, useState } from 'react'
import type { ProjectSection } from '../data/projects'

interface TableOfContentsProps {
  /** Anchor id of the top-of-page link (hero) */
  topId: string
  /** Label for the top link (usually the project title) */
  topLabel: string
  /** Section list rendered after the top link */
  sections: ProjectSection[]
}

/**
 * Sticky left-side TOC for the project page.
 * - Each entry has a leading dash that darkens when the section is in view.
 * - Active section is tracked with IntersectionObserver; the band between 20% and 60%
 *   of the viewport is treated as the "active reading zone."
 * - Clicking an entry smooth-scrolls to that section.
 */
export function TableOfContents({ topId, topLabel, sections }: TableOfContentsProps) {
  const allIds = [topId, ...sections.map(s => s.id)]
  const [activeId, setActiveId] = useState<string>(topId)

  useEffect(() => {
    // Map of id → element so we can quickly look up positions
    const elements = allIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Track which sections are intersecting the active band
        const visible = entries
          .filter(e => e.isIntersecting)
          .map(e => e.target.id)
        if (visible.length > 0) {
          // Pick the first one in document order so it doesn't flip-flop
          const first = allIds.find(id => visible.includes(id))
          if (first) setActiveId(first)
        }
      },
      // Active band: 20% from top, 60% from bottom — the upper-middle of the viewport
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIds.join('|')])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Update active eagerly so the click registers instantly even before the observer fires
      setActiveId(id)
    }
  }

  const renderItem = (id: string, label: string) => {
    const isActive = activeId === id
    return (
      <li key={id} style={{ listStyle: 'none' }}>
        <a
          href={`#${id}`}
          onClick={e => handleClick(e, id)}
          className="toc-item text-copy-small"
          data-active={isActive ? 'true' : 'false'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--gap-large)',
            textDecoration: 'none',
            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-subtle)',
            transition: 'color 200ms ease',
            padding: '2px 0',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              width: '12px',
              height: '1px',
              backgroundColor: isActive ? 'var(--color-text-primary)' : 'var(--color-text-subtle)',
              opacity: isActive ? 1 : 0.5,
              transition: 'background-color 200ms ease, opacity 200ms ease',
              flexShrink: 0,
            }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
        </a>
      </li>
    )
  }

  return (
    <nav
      aria-label="Table of contents"
      className="toc"
      style={{
        position: 'sticky',
        top: '160px',
        alignSelf: 'flex-start',
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--gap-medium)' }}>
        {renderItem(topId, topLabel)}
        {sections.map(s => renderItem(s.id, s.caption ?? s.heading ?? s.id))}
      </ul>
    </nav>
  )
}
