'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * Global smooth scroll provider using Lenis.
 * On desktop: delivers smooth inertia momentum wheel scrolling.
 * On mobile/touch: syncTouch is disabled so native momentum gesture scroll is preserved.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
