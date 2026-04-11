import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react'

export type PageId = 'home' | string   // 'home' or a project id

interface RouterState {
  pageId: PageId
  transitioning: boolean
}

interface RouterContextValue {
  pageId: PageId
  transitioning: boolean
  navigate: (to: PageId) => void
}

const RouterContext = createContext<RouterContextValue>({
  pageId: 'home',
  transitioning: false,
  navigate: () => {},
})

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RouterState>({ pageId: 'home', transitioning: false })
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Progress bar lasts 0.65 s (matches CSS animation).
  // After it finishes we swap the page — the entering page plays its own slide-up animation.
  const navigate = useCallback((to: PageId) => {
    if (timer.current) clearTimeout(timer.current)
    // Use functional update to avoid stale closure on pageId
    setState(prev => ({ pageId: prev.pageId, transitioning: true }))
    timer.current = setTimeout(() => {
      setState({ pageId: to, transitioning: false })
    }, 650)
  }, [])

  return (
    <RouterContext.Provider value={{ pageId: state.pageId, transitioning: state.transitioning, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}
