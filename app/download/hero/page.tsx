// app/download/hero/page.tsx
'use client'

import { useEffect } from 'react'
import {
  detectPlatformFromUserAgent,
  getPrimaryDownloadHref,
} from '#lib/download-routing'

export default function DownloadHero() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    const platform = detectPlatformFromUserAgent(userAgent)

    window.location.href = getPrimaryDownloadHref(platform)
  }, [])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <p>Redirecting to download...</p>
    </div>
  )
}
