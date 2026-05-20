'use client'

import { Box, HStack, Text, VStack } from '@chakra-ui/react'

import { useEffect, useState } from 'react'

interface GrowthMetricsPayload {
  total?: number
  label?: string
  lastUpdatedAt?: string
}

const metricsUrl =
  process.env.NEXT_PUBLIC_GROWTH_METRICS_URL ||
  'https://interview-pilot-growth-metrics-845813329194.s3.amazonaws.com/growth-metrics.json'

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value)
}

export function FloatingGrowthMetric() {
  const [metric, setMetric] = useState<GrowthMetricsPayload | null>(null)

  useEffect(() => {
    if (!metricsUrl) return

    let cancelled = false

    async function loadMetric() {
      try {
        const response = await fetch(metricsUrl as string, {
          cache: 'no-store',
        })

        if (!response.ok) return

        const data = (await response.json()) as GrowthMetricsPayload

        if (!cancelled) {
          setMetric(data)
        }
      } catch {
        if (!cancelled) {
          setMetric(null)
        }
      }
    }

    loadMetric()

    return () => {
      cancelled = true
    }
  }, [])

  const hasWeeklyMetric = typeof metric?.total === 'number' && metric.total > 0
  const headline = hasWeeklyMetric
    ? `${formatCount(metric.total as number)} ${metric?.label || 'new downloads this week'}`
    : 'Join 120,000+ users'
  const detail = hasWeeklyMetric ? 'Updated daily from App Store reports' : 'Trusted by job seekers worldwide'

  return (
    <Box
      position="fixed"
      left={{ base: 4, lg: 6 }}
      bottom={{ base: 20, md: 6 }}
      zIndex="sticky"
      display={{ base: 'none', md: 'block' }}
      pointerEvents="none"
    >
      <HStack
        spacing={3}
        px={4}
        py={3}
        borderRadius="2xl"
        bg="rgba(18, 19, 22, 0.9)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.14)"
        boxShadow="0 18px 55px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
        backdropFilter="blur(18px) saturate(145%)"
      >
        <Box
          boxSize="10px"
          borderRadius="full"
          bg="primary.400"
          boxShadow="0 0 0 6px rgba(254, 204, 4, 0.14)"
          flexShrink={0}
        />
        <VStack spacing={0} align="flex-start">
          <Text color="app.text.primary" fontSize="sm" fontWeight="800" lineHeight="1.2">
            {headline}
          </Text>
          <Text color="app.text.faint" fontSize="xs" fontWeight="600" lineHeight="1.2">
            {detail}
          </Text>
        </VStack>
      </HStack>
    </Box>
  )
}
