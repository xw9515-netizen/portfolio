import { useState, useEffect, useCallback } from 'react'

type Mode = 'light' | 'dark'

const TARGET_VOLUME  = 0.5
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

function startFade(audio: HTMLAudioElement) {
  stopFade()
  audio.volume = 0
  const step = TARGET_VOLUME / (FADE_DURATION / FADE_INTERVAL)
  fadeTimer = setInterval(() => {
    const next = Math.min(audio.volume + step, TARGET_VOLUME)
    audio.volume = next
    if (next >= TARGET_VOLUME) stopFade()
  }, FADE_INTERVAL)
}

function stopFade() {
  if (fadeTimer !== null) {
    clearInterval(fadeTimer)
    fadeTimer = null
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
    next.play().catch(() => {})
    startFade(next)
    startSaving(theme)
  }, [theme])

  const play = useCallback(() => {
    const audio = getAudio(theme)
    const saved = localStorage.getItem(STORAGE_KEYS[theme])
    if (saved) audio.currentTime = parseFloat(saved)
    audio.play().catch(() => {})
    startFade(audio)
    startSaving(theme)
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
  }, [theme])

  return { play, pause, isReady }
}
