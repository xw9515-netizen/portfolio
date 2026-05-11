import { useState, useEffect, useRef } from 'react'
import { Nav } from './components/Nav'
import { ModeToggle } from './components/ModeToggle'
import { PlayButton } from './components/PlayButton'
import { MusicNotes } from './components/MusicNotes'
import { ProgressBar } from './components/ProgressBar'
import { useTheme } from './context/ThemeContext'
import { useRouter } from './context/RouterContext'
import { useAmbientNoise } from './hooks/useAmbientNoise'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'
import { getProject } from './data/projects'

const TRACK_NAMES: Record<'light' | 'dark', string> = {
  light: 'Sandy Beach',
  dark: 'Astral Night',
}

/** Scroll distance (px) after which the header collapses to its compact form. */
const SCROLL_THRESHOLD = 32

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [npMounted, setNpMounted] = useState(false)
  const [npExiting, setNpExiting] = useState(false)
  const npExitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const { theme } = useTheme()
  const { play, pause } = useAmbientNoise(theme)
  const { pageId, transitioning, navigate } = useRouter()

  // Derive current view
  const isHome = pageId === 'home'
  const project = isHome ? null : getProject(pageId)

  // Reset scroll position on every navigation so the new page starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setIsScrolled(false)
  }, [pageId])

  // Track scroll position to collapse the header
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Now Playing mount / unmount animation
  useEffect(() => {
    if (npExitTimer.current) clearTimeout(npExitTimer.current)
    if (isPlaying) {
      setNpExiting(false)
      setNpMounted(true)
    } else if (npMounted) {
      setNpExiting(true)
      npExitTimer.current = setTimeout(() => {
        setNpMounted(false)
        setNpExiting(false)
      }, 160)
    }
  }, [isPlaying])

  // Play / pause audio
  useEffect(() => {
    if (isPlaying) {
      play()
    } else {
      pause()
    }
  }, [isPlaying, play, pause])

  // Nav breadcrumb labels
  const pageName = isHome ? 'Home' : (project?.shortLabel ?? pageId)

  return (
    <div
      className="min-h-screen relative"
      data-scrolled={isScrolled ? 'true' : 'false'}
      style={{ backgroundColor: 'var(--color-bg)', transition: 'background-color 0.2s ease' }}
    >
      {/* ── Progress bar (top of viewport) ── */}
      <ProgressBar active={transitioning} key={transitioning ? 'active' : 'idle'} />

      {/* ── Subtle corner gradient (page background, not in header) ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'var(--corner-gradient)', opacity: 0.12, zIndex: 0 }}
        aria-hidden="true"
      />

      {/* ── Header (sticky; collapses on scroll) ── */}
      <header className="app-header flex items-center justify-between">
        <Nav
          name="Xiang Wang"
          page={pageName}
          onNameClick={!isHome ? () => navigate('home') : undefined}
          collapseSecondary
        />

        <div className="flex items-center" style={{ gap: 'var(--gap-large)' }}>
          {/* Now Playing label — hides on scroll */}
          {npMounted && (
            <div
              data-collapse-on-scroll
              className={`${npExiting ? 'now-playing-exit' : 'now-playing-enter'} flex flex-col items-end`}
              style={{ paddingBottom: 'var(--gap-small)', whiteSpace: 'nowrap' }}
            >
              <span
                className="text-extra-small"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                Playing
              </span>
              <span
                className="text-copy-small"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {TRACK_NAMES[theme]}
              </span>
            </div>
          )}

          {/* Play button with floating notes — stays on scroll */}
          <div className="relative w-8 h-8">
            <PlayButton isPlaying={isPlaying} onToggle={() => setIsPlaying(p => !p)} />
            <MusicNotes isPlaying={isPlaying} />
          </div>

          {/* Mode toggle — hides on scroll */}
          <div data-collapse-on-scroll>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {isHome ? (
          <HomePage key="home" />
        ) : project ? (
          <ProjectPage key={project.id} project={project} />
        ) : (
          // Fallback: unknown project id — go home
          <HomePage key="home-fallback" />
        )}
      </div>
    </div>
  )
}

export default App
