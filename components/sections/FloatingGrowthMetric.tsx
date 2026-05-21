'use client'

import { Box, HStack, Icon, IconButton, Portal, Text, VStack } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { PiSealCheckFill } from 'react-icons/pi'

import { useScrollReveal } from '#hooks/use-scroll-reveal'

interface GrowthMetricsPayload {
  total?: number
  lastUpdatedAt?: string
}

const metricsUrl =
  process.env.NEXT_PUBLIC_GROWTH_METRICS_URL ||
  'https://interview-pilot-growth-metrics-845813329194.s3.amazonaws.com/growth-metrics.json'

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
  }).format(value)
}

export function FloatingGrowthMetric() {
  const [metric, setMetric] = useState<GrowthMetricsPayload | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const mobileBannerVisible = useScrollReveal()

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
  const formattedCount = hasWeeklyMetric ? formatCount(metric.total as number) : null
  const detail = hasWeeklyMetric ? 'in the last 24 hours' : 'Trusted by job seekers worldwide'

  useEffect(() => {
    if (!hasWeeklyMetric) return

    let timeoutId: ReturnType<typeof setTimeout>

    const scheduleRefresh = () => {
      const nextDelay = 5000 + Math.random() * 9000

      timeoutId = setTimeout(() => {
        setRefreshKey((key) => key + 1)
        scheduleRefresh()
      }, nextDelay)
    }

    scheduleRefresh()

    return () => clearTimeout(timeoutId)
  }, [hasWeeklyMetric])

  return (
    <Portal>
      <Box
      position="fixed"
      left={{ base: 2, md: 3, lg: 5 }}
      right={{ base: 'auto', md: 'auto' }}
      bottom={{ base: mobileBannerVisible ? 16 : 3, md: 5 }}
      transform="none"
      zIndex="toast"
      display="block"
      pointerEvents="auto"
      transition="bottom 0.3s ease-in-out"
    >
      <HStack
        as="div"
        role={collapsed ? 'button' : undefined}
        tabIndex={collapsed ? 0 : undefined}
        aria-label={collapsed ? 'Show verified users badge' : 'Verified users this week'}
        onClick={() => {
          if (collapsed) setCollapsed(false)
        }}
        onKeyDown={(event) => {
          if (collapsed && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            setCollapsed(false)
          }
        }}
        spacing={collapsed ? 0 : { base: 2, md: 3 }}
        justifyContent={collapsed ? 'center' : 'flex-start'}
        pl={collapsed ? 0 : { base: 3, md: 4 }}
        pr={collapsed ? 0 : { base: 2.5, md: 3.5 }}
        py={0}
        borderRadius="full"
        bg="rgba(18, 19, 22, 0.9)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.14)"
        boxShadow="0 18px 55px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
        backdropFilter="blur(18px) saturate(145%)"
        w={collapsed ? { base: '48px', md: '56px' } : 'max-content'}
        h={collapsed ? { base: '48px', md: '56px' } : { base: '56px', md: '68px' }}
        position="relative"
        cursor={collapsed ? 'pointer' : 'default'}
        overflow="hidden"
        transition="width 0.34s cubic-bezier(0.22, 1, 0.36, 1), height 0.34s cubic-bezier(0.22, 1, 0.36, 1), padding 0.34s cubic-bezier(0.22, 1, 0.36, 1), gap 0.34s cubic-bezier(0.22, 1, 0.36, 1)"
      >
        <Icon
          as={PiSealCheckFill}
          boxSize={{ base: '26px', md: '32px' }}
          color="cyan.400"
          flexShrink={0}
          position={collapsed ? 'absolute' : 'static'}
          left={collapsed ? '50%' : undefined}
          top={collapsed ? '50%' : undefined}
          transform={collapsed ? 'translate(-50%, -50%)' : undefined}
        />
        <VStack
          spacing={1}
          align="flex-start"
          minW={0}
          flex="1"
          opacity={collapsed ? 0 : 1}
          maxW={collapsed ? '0px' : 'none'}
          pointerEvents={collapsed ? 'none' : 'auto'}
          transition="opacity 0.2s ease, max-width 0.34s cubic-bezier(0.22, 1, 0.36, 1)"
        >
          <Text color="app.text.primary" fontSize={{ base: 'sm', md: 'lg' }} fontWeight="800" lineHeight="1.35">
            {hasWeeklyMetric ? (
              <>
                <Box
                  key={refreshKey}
                  as="span"
                  display="inline-block"
                  animation="metricRefresh 1.35s ease-out"
                  sx={{
                    '@keyframes metricRefresh': {
                      '0%, 68%, 100%': {
                        opacity: 1,
                        transform: 'translateY(0) rotateX(0deg)',
                      },
                      '78%': {
                        opacity: 0,
                        transform: 'translateY(-8px) rotateX(78deg)',
                      },
                      '79%': {
                        opacity: 0,
                        transform: 'translateY(8px) rotateX(-78deg)',
                      },
                      '92%': {
                        opacity: 1,
                        transform: 'translateY(0) rotateX(0deg)',
                      },
                    },
                  }}
                >
                  {formattedCount}
                </Box>{' '}
                users this week
              </>
            ) : (
              'Join 120,000+ users'
            )}
          </Text>
          {hasWeeklyMetric ? (
            <Text color="app.text.faint" fontSize={{ base: '10px', md: 'xs' }} fontWeight="600" lineHeight="1.35">
              <Box as="span" color="cyan.400" fontWeight="700">
                Verified
              </Box>{' '}
              {detail}
            </Text>
          ) : (
            <Text color="app.text.faint" fontSize={{ base: '10px', md: 'xs' }} fontWeight="600" lineHeight="1.35">
              {detail}
            </Text>
          )}
        </VStack>
        <IconButton
          aria-label="Hide verified users badge"
          icon={<FiX />}
          size="xs"
          variant="ghost"
          minW="24px"
          h="24px"
          fontSize="18px"
          color="app.text.faint"
          opacity={collapsed ? 0 : 1}
          pointerEvents={collapsed ? 'none' : 'auto'}
          transition="opacity 0.18s ease"
          _hover={{ color: 'app.text.primary', bg: 'whiteAlpha.100' }}
          onClick={(event) => {
            event.stopPropagation()
            setCollapsed(true)
          }}
        />
      </HStack>
      </Box>
    </Portal>
  )
}
