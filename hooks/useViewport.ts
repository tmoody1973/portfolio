'use client'

import { useState, useEffect } from 'react'

export type ViewportType = 'mobile' | 'tablet' | 'desktop'

interface ViewportState {
  width: number
  height: number
  type: ViewportType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
}

const BREAKPOINTS = {
  mobile: 768,  // < 768px
  tablet: 1200, // 768px - 1199px
  // desktop: >= 1200px
}

/**
 * Hook to track viewport size and device type
 * Returns viewport dimensions and device classification
 */
export function useViewport(): ViewportState {
  const [state, setState] = useState<ViewportState>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    type: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
  })

  useEffect(() => {
    const getViewportType = (width: number): ViewportType => {
      if (width < BREAKPOINTS.mobile) return 'mobile'
      if (width < BREAKPOINTS.tablet) return 'tablet'
      return 'desktop'
    }

    const checkTouchDevice = (): boolean => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-expect-error - msMaxTouchPoints is IE-specific
        navigator.msMaxTouchPoints > 0
      )
    }

    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const type = getViewportType(width)

      setState({
        width,
        height,
        type,
        isMobile: type === 'mobile',
        isTablet: type === 'tablet',
        isDesktop: type === 'desktop',
        isTouchDevice: checkTouchDevice(),
      })
    }

    // Initial update
    updateViewport()

    // Listen for resize
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return state
}

export default useViewport
