import { useEffect, useState, useCallback } from 'react'

// Tracks from playlist 37i9dQZF1DWUKPeBypcpcP (Nature Noise / ambient)
const TRACK_IDS = [
  '51YRQWYbAo95LP94OMvNax', // Forest Stream Green Noise
  '59qpYkbZNKjClf9lm4EPyw', // Rain In The Forest
  '5v7R6BktiMgdeBfTfy8Sqy', // Wind My Waterfall
  '6yZBV5DSJid7XUyAJEDriM', // Everflow Basin Green Noise
  '32P4T0N1VrlARqPree7vQA', // Soothing Sounds of Lealt Falls
  '5R113kfoXvoFBlIPpUUuRd', // Calming Creek
  '4IN9DfDgYHljkNpWA3yk3g', // Andorra Labines Waterfall
  '7iYvAA5fEmNPcHxTQQzT79', // Isle of Skye Calming Waterfalls
  '0MTfsLQgjT1Mlpz0gZxgcQ', // Forest Noise
  '2RdwazBXL6qW5v1kCj27X5', // Mossflow Green Noise
  '08WqDRfDIHCroRHoYuAP66', // Riverlight Through Leaves
  '44h5mvTeasof8sPZdCNQVS', // Rain Puddles
  '5s8EezAFdXNiHOvOutgtOU', // Ground Level
  '3D2GrmhenTD06ndgz7MjTJ', // Continuous Rain
  '0lyKoc6Batb1kDGCtw6pdF', // Sleepy Rain Noise
]

const VOLUME = 0.5

// Picked once per page load — resets on refresh
const SELECTED_TRACK_URI = `spotify:track:${TRACK_IDS[Math.floor(Math.random() * TRACK_IDS.length)]}`

// ── Module-level singleton ────────────────────────────────────────────────────
// Lives outside React so it survives HMR and component remounts.

type EmbedController = {
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  destroy: () => void
}

type IFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string },
    callback: (controller: EmbedController) => void
  ) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void
  }
}

let controller: EmbedController | null = null
let initStarted = false
let pendingPlay = false
const readyListeners: Array<() => void> = []

function notifyReady() {
  readyListeners.forEach(fn => fn())
  readyListeners.length = 0
}

function injectHideRule() {
  if (document.getElementById('spotify-hide')) return
  const style = document.createElement('style')
  style.id = 'spotify-hide'
  style.textContent = [
    'iframe[src*="spotify.com/embed"] {',
    '  position: fixed !important;',
    '  left: -9999px !important;',
    '  top: -9999px !important;',
    '  width: 1px !important;',
    '  height: 1px !important;',
    '  pointer-events: none !important;',
    '}',
  ].join('\n')
  document.head.appendChild(style)
}

function initSpotify() {
  if (initStarted) return
  initStarted = true

  // Inject the CSS rule before Spotify adds the iframe so it's hidden immediately
  injectHideRule()

  const container = document.createElement('div')
  container.style.cssText =
    'position:fixed;left:-9999px;top:-9999px;width:300px;height:80px;overflow:hidden;pointer-events:none'
  document.body.appendChild(container)

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    IFrameAPI.createController(container, { uri: SELECTED_TRACK_URI }, (ctrl) => {
      ctrl.setVolume(VOLUME)
      controller = ctrl
      notifyReady()
      if (pendingPlay) {
        pendingPlay = false
        ctrl.play()
      }
    })
  }

  const script = document.createElement('script')
  script.src = 'https://open.spotify.com/embed/iframe-api/v1'
  script.async = true
  document.head.appendChild(script)
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useSpotify() {
  const [isReady, setIsReady] = useState(() => controller !== null)

  useEffect(() => {
    if (controller) return
    const onReady = () => setIsReady(true)
    readyListeners.push(onReady)
    return () => {
      const i = readyListeners.indexOf(onReady)
      if (i !== -1) readyListeners.splice(i, 1)
    }
  }, [])

  const play = useCallback(() => {
    initSpotify()
    if (controller) {
      controller.setVolume(VOLUME)
      controller.play()
    } else {
      pendingPlay = true
    }
  }, [])

  const pause = useCallback(() => {
    pendingPlay = false
    controller?.pause()
  }, [])

  return { play, pause, isReady }
}
