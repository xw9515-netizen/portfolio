interface MusicNotesProps {
  isPlaying: boolean
}

export function MusicNotes({ isPlaying }: MusicNotesProps) {
  const state = isPlaying ? 'running' : 'paused'
  const hidden = isPlaying ? undefined : 0

  return (
    // Absolutely covers the play button; notes escape upward via overflow-visible
    <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
      <img src="/music-note-1.svg" alt="" className="music-note music-note-1"
        style={{ animationPlayState: state, opacity: hidden }} />
      <img src="/music-note-2.svg" alt="" className="music-note music-note-2"
        style={{ animationPlayState: state, opacity: hidden }} />
      <img src="/music-note-1.svg" alt="" className="music-note music-note-3"
        style={{ animationPlayState: state, opacity: hidden }} />
    </div>
  )
}
