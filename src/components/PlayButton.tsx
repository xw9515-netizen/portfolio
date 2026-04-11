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
      <img
        src={`${import.meta.env.BASE_URL}${isPlaying ? 'pause.svg' : 'play.svg'}`}
        alt={isPlaying ? 'Pause' : 'Play'}
        className="w-4 h-4"
      />
    </button>
  )
}
