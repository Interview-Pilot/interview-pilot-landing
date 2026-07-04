'use client'

import { Box, Spinner } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'

import { resolveTrackedDownloadHref } from '#lib/download-routing'

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: 'conversion',
      params: {
        send_to: string
        value: number
        currency: string
        event_callback?: () => void
      },
    ) => void
  }
}

const googleAdsDownloadConversion = {
  send_to: 'AW-11564391709/y57ZCPPP99AaEJ26qoor',
  value: 1.0,
  currency: 'SGD',
} as const

interface DownloadRedirectPageProps {
  params: {
    source: string
    platform: string
  }
}

export default function DownloadRedirectPage({
  params,
}: DownloadRedirectPageProps) {
  useEffect(() => {
    const destination = resolveTrackedDownloadHref(
      params.platform,
      window.navigator.userAgent,
    )
    let redirected = false

    const redirect = () => {
      if (redirected) return
      redirected = true
      window.location.replace(destination)
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        ...googleAdsDownloadConversion,
        event_callback: redirect,
      })
    }

    const redirectTimer = window.setTimeout(redirect, 1000)

    return () => window.clearTimeout(redirectTimer)
  }, [params.platform])

  return (
    <>
      <Analytics />
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#0E0E10"
      >
        <Spinner color="primary.400" thickness="3px" speed="0.7s" />
      </Box>
    </>
  )
}
