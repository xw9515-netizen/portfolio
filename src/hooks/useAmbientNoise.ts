import { useState, useEffect, useCallback } from 'react'

type Mode = 'light' | 'dark'

const TARGET_VOLUME: Record<Mode, number> = { light: 0.5, dark: 0.3 }
const FADE_DURATION  = 30_000   // ms — fade from 0 → TARGET_VOLUME over 30 s
const FADE_INTERVAL  = 50       // ms — step every 50 ms (200 smooth steps)
const SAVE_INTERVAL_MS = 1000
const STORAGE_KEYS = {
  light: 'ambient-pos-light',
  dark:  'ambient-pos-dark',
} as const

// ── Module-level singletons ───────────────────────────────────────────────────

let audios: Partial<Record<Mode, HTMLAudioElement>> = {}
let saveTimer: ReturnType<typeof setInterval> | null = null
let fadeTimer: ReturnType<typeof setInterval> | null = null

function getAudio(mode: Mode): HTMLAudioElement {
  if (!audios[mode]) {
    const base = import.meta.env.BASE_URL
    const src = mode === 'light' ? `${base}light-noise.mp3` : `${base}night-noise.mp3`
    const el = new Audio(src)
    el.loop = true
    el.volume = 0  // always start silent; fade in on play
    const saved = localStorage.getItem(STORAGE_KEYS[mode])
    if (saved) el.currentTime = parseFloat(saved)
    audios[mode] = el
  }
  return audios[mode]!
}

function startFade(audio: HTMLAudioElement, mode: Mode) {
  stopFade()
  audio.volume = 0
  const target = TARGET_VOLUME[mode]
  const step = target / (FADE_DURATION / FADE_INTERVAL)
  fadeTimer = setInterval(() => {
    const next = Math.min(audio.volume + step, target)
    audio.volume = next
    if (next >= target) stopFade()
  }, FADE_INTERVAL)
}

function stopFade() {
  if (fadeTimer !== null) {
    clearInterval(fadeTimer)
    fadeTimer = null
  }
}

function setMediaSession(mode: Mode, base: string, playing: boolean) {
  if (!('mediaSession' in navigator)) return
  if (playing) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title:  mode === 'light' ? 'Sandy Beach' : 'Astral Night',
      artist: 'Ambient',
      album:  'Xiang Wang — Portfolio',
      artwork: [
        { src: `${base}artwork-${mode}.svg`, sizes: '512x512', type: 'image/svg+xml' },
      ],
    })
    navigator.mediaSession.playbackState = 'playing'
  } else {
    navigator.mediaSession.playbackState = 'paused'
  }
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

  // When theme changes mid-play, crossfade: pause old, fade in new
  useEffect(() => {
    const playing = Object.entries(audios).find(([, a]) => a && !a.paused)
    if (!playing) return
    const [oldMode, oldAudio] = playing as [Mode, HTMLAudioElement]
    if (oldMode === theme) return

    localStorage.setItem(STORAGE_KEYS[oldMode], String(oldAudio.currentTime))
    oldAudio.pause()

    const next = getAudio(theme)
    const base = import.meta.env.BASE_URL
    next.play().catch(() => {})
    startFade(next, theme)
    startSaving(theme)
    setMediaSession(theme, base, true)
  }, [theme])

  const play = useCallback(() => {
    const audio = getAudio(theme)
    const saved = localStorage.getItem(STORAGE_KEYS[theme])
    if (saved) audio.currentTime = parseFloat(saved)
    const base = import.meta.env.BASE_URL
    audio.play().catch(() => {})
    startFade(audio, theme)
    startSaving(theme)
    setMediaSession(theme, base, true)
    setIsReady(true)
  }, [theme])

  const pause = useCallback(() => {
    stopFade()
    const audio = audios[theme]
    if (audio) {
      localStorage.setItem(STORAGE_KEYS[theme], String(audio.currentTime))
      audio.pause()
    }
    stopSaving()
    setMediaSession(theme, import.meta.env.BASE_URL, false)
  }, [theme])

  return { play, pause, isReady }
}
