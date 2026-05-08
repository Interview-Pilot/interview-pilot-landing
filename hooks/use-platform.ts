'use client'

import { useState, useEffect } from 'react'
import {
  detectPlatformFromUserAgent,
  type DownloadPlatform,
} from '#lib/download-routing'

export type Platform = DownloadPlatform

/**
 * Hook to detect the user's platform (iOS, Android, or Desktop)
 * Uses user agent detection to determine the platform
 *
 * @returns The detected platform: 'ios', 'android', or 'desktop'
 */
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('unknown')

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    setPlatform(detectPlatformFromUserAgent(userAgent))
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
