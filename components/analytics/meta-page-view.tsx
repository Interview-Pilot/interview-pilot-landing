'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function MetaPageView() {
  const pathname = usePathname()
  const isInitialPage = useRef(true)

  useEffect(() => {
    if (isInitialPage.current) {
      isInitialPage.current = false
      return
    }

    try {
      window.fbq?.('track', 'PageView')
    } catch {
      // Analytics must never interfere with navigation.
    }
  }, [pathname])

  return null
}
