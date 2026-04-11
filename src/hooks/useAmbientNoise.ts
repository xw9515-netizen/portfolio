import { useState, useEffect, useCallback } from 'react'

type Mode = 'light' | 'dark'

const VOLUME = 0.3
const SAVE_INTERVAL_MS = 1000
const STORAGE_KEYS = {
  light: 'ambient-pos-light',
  dark: 'ambient-pos-dark',
} as const

// ── Module-level singletons ───────────────────────────────────────────────────
// One Audio element per track, created lazily and reused across renders/remounts.

let audios: Partial<Record<Mode, HTMLAudioElement>> = {}
let saveTimer: ReturnType<typeof setInterval> | null = null

function getAudio(mode: Mode): HTMLAudioElement {
  if (!audios[mode]) {
    const base = import.meta.env.BASE_URL
    const src = mode === 'light' ? `${base}light-noise.mp3` : `${base}night-noise.mp3`
    const el = new Audio(src)
    el.loop = true
    el.volume = VOLUME
    // Restore saved position (best-effort — some browsers ignore this before play)
    const saved = localStorage.getItem(STORAGE_KEYS[mode])
    if (saved) el.currentTime = parseFloat(saved)
    audios[mode] = el
  }
  return audios[mode]!
}

function startSaving(mode: Mode) {
  stopSaving()
  saveTimer = setInterval(() => {
    const audio = audios[mode]
    if (audio && !audio.paused) {
      localStorage.setItem(STORAGE_KEYS[mode], String(audio.currentTime))
    }
  }, SAVE_INTERVAL_MS)
}

function stopSaving() {
  if (saveTimer !== null) {
    clearInterval(saveTimer)
    saveTimer = null
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useAmbientNoise(theme: Mode) {
  const [isReady, setIsReady] = useState(false)

  // When theme changes mid-play, crossfade: pause old, play new
  useEffect(() => {
    const playing = Object.entries(audios).find(([, a]) => a && !a.paused)
    if (!playing) return
    const [oldMode, oldAudio] = playing as [Mode, HTMLAudioElement]
    if (oldMode === theme) return

    // Save position of the track we're leaving
    localStorage.setItem(STORAGE_KEYS[oldMode], String(oldAudio.currentTime))
    oldAudio.pause()

    const next = getAudio(theme)
    next.play().catch(() => {}) // user gesture already given
    startSaving(theme)
  }, [theme])

  const play = useCallback(() => {
    const audio = getAudio(theme)
    // Restore saved position before playing
    const saved = localStorage.getItem(STORAGE_KEYS[theme])
    if (saved) audio.currentTime = parseFloat(saved)
    audio.play().catch(() => {})
    startSaving(theme)
    setIsReady(true)
  }, [theme])

  const pause = useCallback(() => {
    const audio = audios[theme]
    if (audio) {
      localStorage.setItem(STORAGE_KEYS[theme], String(audio.currentTime))
      audio.pause()
    }
    stopSaving()
  }, [theme])

  return { play, pause, isReady }
}
