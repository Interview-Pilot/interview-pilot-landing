'use client'

import { useState, useEffect } from 'react'

export type Platform = 'ios' | 'android' | 'desktop'

/**
 * Hook to detect the user's platform (iOS, Android, or Desktop)
 * Uses user agent detection to determine the platform
 *
 * @returns The detected platform: 'ios', 'android', or 'desktop'
 */
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('desktop')

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
    const isAndroid = /android/i.test(userAgent)

    if (isIOS) {
      setPlatform('ios')
    } else if (isAndroid) {
      setPlatform('android')
    } else {
      setPlatform('desktop')
    }
  }, [])

  return platform
}

/**
 * Helper function to check if running on mobile (iOS or Android)
 */
export function useIsMobile(): boolean {
  const platform = usePlatform()
  return platform === 'ios' || platform === 'android'
}
