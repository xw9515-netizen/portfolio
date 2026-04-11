import { useState, useEffect, useRef } from 'react'
import { Nav } from './components/Nav'
import { ModeToggle } from './components/ModeToggle'
import { PlayButton } from './components/PlayButton'
import { MusicNotes } from './components/MusicNotes'
import { ProjectList } from './components/ProjectList'
import { useTheme } from './context/ThemeContext'
import { useAmbientNoise } from './hooks/useAmbientNoise'

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

  useEffect(() => {
    if (isPlaying) {
      play()
    } else {
      pause()
    }
  }, [isPlaying, play, pause])

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', transition: 'background-color 0.2s ease' }}
    >
      {/* ── Subtle corner gradient — colour defined in CSS tokens ── */}
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
        <Nav name="Xiang Wang" page="Home" />

        <div className="flex items-center" style={{ gap: 'var(--gap-large)' }}>
          {/* Now Playing indicator */}
          {npMounted && (
            <div
              className={`${npExiting ? 'now-playing-exit' : 'now-playing-enter'} flex flex-col items-end`}
              style={{ paddingBottom: 'var(--gap-small)', whiteSpace: 'nowrap' }}
            >
              <span
                className="font-semibold"
                style={{
                  fontSize: '10px',
                  lineHeight: '16px',
                  letterSpacing: '0.15px',
                  color: 'var(--color-text-subtle)',
                }}
              >
                Playing
              </span>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '22px',
                  letterSpacing: '0.18px',
                  color: 'var(--color-text-primary)',
                }}
              >
                {TRACK_NAMES[theme]}
              </span>
            </div>
          )}

          {/* Play button with notes floating on top */}
          <div className="relative w-8 h-8">
            <PlayButton isPlaying={isPlaying} onToggle={() => setIsPlaying(p => !p)} />
            <MusicNotes isPlaying={isPlaying} />
          </div>

          <ModeToggle />
        </div>
      </header>

      {/* ── Main content ── */}
      <main
        className="relative"
        style={{ padding: '0 var(--margin-large)', marginTop: 'var(--margin-medium)' }}
      >
        <hr
          style={{
            border: 'none',
            borderTop: '1px dashed var(--color-border)',
            margin: '0 0 var(--margin-medium)',
            transition: 'border-color 0.2s ease',
          }}
        />

        <p
          style={{
            maxWidth: '794px',
            color: 'var(--color-text-primary)',
            margin: '0 0 var(--margin-medium)',
            fontSize: '14px',
            lineHeight: '22px',
            letterSpacing: '0.21px',
          }}
        >
          I&apos;m Xiang Wang, a product designer with five years of experience at{' '}
          [Company], a B2B SaaS startup where I was one of three designers. In a small
          team, ownership isn&apos;t optional — I&apos;ve taken projects from early problem
          framing to shipped product, working closely with engineers and PMs throughout.
          Below is a selection of work across product design and design systems.
        </p>

        <hr
          style={{
            border: 'none',
            borderTop: '1px dashed var(--color-border)',
            margin: '0 0 var(--margin-medium)',
            maxWidth: '794px',
            transition: 'border-color 0.2s ease',
          }}
        />

        <ProjectList />
      </main>
    </div>
  )
}

export default App
