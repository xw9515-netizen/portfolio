interface PlayButtonProps {
  isPlaying: boolean
  onToggle: () => void
}

export function PlayButton({ isPlaying, onToggle }: PlayButtonProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
      className="btn-play flex items-center justify-center w-8 h-8 rounded-md"
    >
      {isPlaying ? (
        <img src="/pause.svg" alt="Pause" className="w-4 h-4" />
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 2L11 7L3 12V2Z" fill="var(--color-text-subtle)" />
        </svg>
      )}
    </button>
  )
}
