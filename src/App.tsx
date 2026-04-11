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

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [npMounted, setNpMounted] = useState(false)
  const [npExiting, setNpExiting] = useState(false)
  const npExitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { theme } = useTheme()
  const { play, pause } = useAmbientNoise(theme)
  const { pageId, transitioning, navigate } = useRouter()

  // Derive current view
  const isHome = pageId === 'home'
  const project = isHome ? null : getProject(pageId)

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
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', transition: 'background-color 0.2s ease' }}
    >
      {/* ── Progress bar (top of viewport) ── */}
      <ProgressBar active={transitioning} key={transitioning ? 'active' : 'idle'} />

      {/* ── Subtle corner gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'var(--corner-gradient)', opacity: 0.12 }}
        aria-hidden="true"
      />

      {/* ── Header ── */}
      <header
        className="relative flex items-center justify-between"
        style={{ padding: '32px var(--margin-large) 0' }}
      >
        <Nav
          name="Xiang Wang"
          page={pageName}
          onNameClick={!isHome ? () => navigate('home') : undefined}
        />

        <div className="flex items-center" style={{ gap: 'var(--gap-large)' }}>
          {/* Now Playing indicator */}
          {npMounted && (
            <div
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

          {/* Play button with floating notes */}
          <div className="relative w-8 h-8">
            <PlayButton isPlaying={isPlaying} onToggle={() => setIsPlaying(p => !p)} />
            <MusicNotes isPlaying={isPlaying} />
          </div>

          <ModeToggle />
        </div>
      </header>

      {/* ── Page content — key triggers slide-up animation on each navigation ── */}
      {isHome ? (
        <HomePage key="home" />
      ) : project ? (
        <ProjectPage key={project.id} project={project} />
      ) : (
        // Fallback: unknown project id — go home
        <HomePage key="home-fallback" />
      )}
    </div>
  )
}

export default App
