'use client'

import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { FiGlobe, FiShield, FiZap } from 'react-icons/fi'

import { Section } from '#components/section'
import { sectionContentStyles } from '#theme/styles/section-styles'

const BENEFITS = [
  {
    metric: '1s',
    label: 'Responses',
    icon: FiZap,
    description: 'Copilot generates responses instantly, so you always have the answer',
  },
  {
    metric: '99+',
    label: 'Languages',
    icon: FiGlobe,
    description: 'Supports over 99 languages, and any accents',
  },
  {
    metric: 'Full',
    label: 'Privacy',
    icon: FiShield,
    description: 'All data uses industry-standard encryption. We never store your usage data',
  },
] as const

type Benefit = (typeof BENEFITS)[number]

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const canTiltRef = useRef(false)

  useEffect(() => {
    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    const updateTiltSupport = () => {
      canTiltRef.current = media.matches
    }

    updateTiltSupport()
    media.addEventListener('change', updateTiltSupport)

    return () => {
      media.removeEventListener('change', updateTiltSupport)
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!canTiltRef.current) return
    rectRef.current = event.currentTarget.getBoundingClientRect()
  }

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!canTiltRef.current || !rectRef.current) return

    pointerRef.current = { x: event.clientX, y: event.clientY }
    if (frameRef.current !== null) return

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      const card = cardRef.current
      const rect = rectRef.current
      if (!card || !rect) return

      const horizontal = (pointerRef.current.x - rect.left) / rect.width - 0.5
      const vertical = (pointerRef.current.y - rect.top) / rect.height - 0.5
      const rotateX = vertical * -4
      const rotateY = horizontal * 5

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`
    })
  }

  const handleMouseLeave = () => {
    rectRef.current = null
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
    }
  }

  return (
    <Box
      ref={cardRef}
      position="relative"
      display="flex"
      flexDirection="column"
      minH={{ base: '178px', md: '184px' }}
      overflow="hidden"
      px={{ base: 5, lg: 6 }}
      py={{ base: 5, lg: 5 }}
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.12)"
      borderRadius="22px"
      bg="linear-gradient(145deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.035) 58%, rgba(255, 255, 255, 0.055) 100%)"
      backdropFilter="blur(18px) saturate(135%)"
      boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 14px 38px rgba(0, 0, 0, 0.14)"
      transform="perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)"
      transformOrigin="center"
      willChange="transform"
      style={{ transformStyle: 'preserve-3d' }}
      transition="transform 140ms ease-out, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      _before={{
        content: '""',
        position: 'absolute',
        top: '-70px',
        right: '-60px',
        w: '170px',
        h: '170px',
        borderRadius: 'full',
        bg: 'rgba(255, 229, 0, 0.07)',
        filter: 'blur(34px)',
        pointerEvents: 'none',
      }}
      _hover={{
        borderColor: 'rgba(255, 255, 255, 0.2)',
        bg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.105) 0%, rgba(255, 255, 255, 0.045) 58%, rgba(255, 255, 255, 0.065) 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(255, 255, 255, 0.11), 0 18px 44px rgba(0, 0, 0, 0.18)',
      }}
    >
      <HStack align="flex-start" justify="space-between" spacing="4">
        <Box>
          <Heading
            as="h3"
            fontSize={{ base: '4xl', lg: '5xl' }}
            lineHeight="0.88"
            letterSpacing="-0.055em"
            fontWeight="semibold"
            color="app.text.primary"
          >
            {benefit.metric}
          </Heading>
          <Text
            mt="2"
            color="app.text.primary"
            fontSize={{ base: 'lg', lg: 'xl' }}
            lineHeight="1"
            letterSpacing="-0.035em"
            fontWeight="semibold"
          >
            {benefit.label}
          </Text>
        </Box>
        <Icon
          as={benefit.icon}
          boxSize={{ base: '18px', lg: '20px' }}
          color="primary.400"
          flexShrink={0}
        />
      </HStack>

      <Text
        mt="auto"
        pt={{ base: 3, md: 4 }}
        color="app.text.muted"
        fontSize="sm"
        lineHeight="1.5"
      >
        {benefit.description}
      </Text>
    </Box>
  )
}

export function BenefitsStatsSection() {
  return (
    <Box sx={sectionContentStyles}>
      <Section
        id="benefits"
        aria-label="Interview Pilot benefits"
        innerWidth="1120px"
        pt={{ base: 12, lg: 16 }}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }}>
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.label} benefit={benefit} />
          ))}
        </SimpleGrid>
      </Section>
    </Box>
  )
}
