'use client'

import { Box, Spinner } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'

import { resolveTrackedDownloadHref } from '#lib/download-routing'

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

    const redirectTimer = window.setTimeout(() => {
      window.location.replace(destination)
    }, 150)

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
