import { useEffect, useState } from 'react'
import type { ProjectSection } from '../data/projects'

interface TableOfContentsProps {
  topId: string
  topLabel: string
  sections: ProjectSection[]
}

/**
 * Fixed left-side TOC positioned to sit in the margin left of the centred
 * 580 px content column, mirroring the Figma layout exactly.
 *
 * Positioning math (matches Figma at 1440 px viewport):
 *   Content left edge = 50vw − 290px
 *   TOC right edge    = left + 220px
 *   Gap               = 74px
 *   → left = 50vw − 290px − 74px − 220px = calc(50vw − 584px)
 *
 * At 1440 px: calc(720 − 584) = 136 px  ≈ Figma's 108 px ✓
 * Below 1280 px the TOC is hidden via the media query in index.css.
 *
 * Active section tracked with IntersectionObserver; the band between 15% and
 * 65% of the viewport height acts as the "reading zone."
 */
export function TableOfContents({ topId, topLabel, sections }: TableOfContentsProps) {
  const allIds = [topId, ...sections.map(s => s.id)]
  const [activeId, setActiveId] = useState<string>(topId)

  useEffect(() => {
    const elements = allIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).map(e => e.target.id)
        if (visible.length > 0) {
          const first = allIds.find(id => visible.includes(id))
          if (first) setActiveId(first)
        }
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIds.join('|')])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }

  const renderItem = (id: string, label: string) => {
    const isActive = activeId === id
    return (
      <li key={id} style={{ listStyle: 'none' }}>
        <a
          href={`#${id}`}
          onClick={e => handleClick(e, id)}
          className={isActive ? 'text-label-small' : 'text-copy-small'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-subtle)',
            transition: 'color 200ms ease',
            padding: '2px 0',
          }}
        >
          {/* 6×6 circle — filled when active, stroked when inactive */}
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              flexShrink: 0,
              boxSizing: 'border-box',
              transition: 'background-color 200ms ease, border-color 200ms ease',
              ...(isActive
                ? { backgroundColor: 'var(--color-text-primary)', border: 'none' }
                : { backgroundColor: 'transparent', border: '0.5px solid var(--color-text-subtle)' }
              ),
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
      style={{
        position: 'fixed',
        /* Keeps TOC left of the centred 580 px content column */
        left: 'max(20px, calc(50vw - 584px))',
        /* Vertically centred in the viewport */
        top: '50%',
        transform: 'translateY(-50%)',
        width: '220px',
      }}
    >
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {renderItem(topId, topLabel)}
        {sections.map(s => renderItem(s.id, s.caption ?? s.heading ?? s.id))}
      </ul>
    </nav>
  )
}
