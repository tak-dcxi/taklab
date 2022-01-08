import React, { useState, useEffect } from 'react'
import { breakpoints } from '~/constant/breakpoints'

export const useMatchMedia = (): { [key: string]: boolean } => {
  const [media, setMedia] = useState<{ [key: string]: boolean }>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  })

  useEffect(() => {
    const handleResize = (): void =>
      setMedia({
        sm: window.matchMedia(breakpoints.sm).matches,
        md: window.matchMedia(breakpoints.md).matches,
        lg: window.matchMedia(breakpoints.lg).matches,
        xl: window.matchMedia(breakpoints.xl).matches,
        xxl: window.matchMedia(breakpoints.xxl).matches,
      })

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return media
}
