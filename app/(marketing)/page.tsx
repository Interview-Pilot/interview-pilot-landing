'use client'

import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

import Background from '#components/background/background'
import { InteractiveGridOverlay } from '#components/background/interactive-grid-overlay'
import {
  AppStoreBanner,
  DownloadOptionsSection,
  FaqSection,
  FeaturesSection,
  HeroSection,
  HighlightsSection,
  PricingSection,
  SystemStatus,
  TestimonialsSection,
} from '#components/sections'

/**
 * Main landing page component
 * Composed of modular section components for maintainability
 */
const Home: NextPage = () => {
  return (
    <Box>
      <Background />
      <InteractiveGridOverlay />

      <SystemStatus />

      <HeroSection />

      <HighlightsSection />

      <FeaturesSection />

      <DownloadOptionsSection />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />

      <AppStoreBanner />

      {/* Bottom padding to prevent content from being hidden behind the mobile banner */}
      <Box pb={{ base: '16', md: '0' }} />
    </Box>
  )
}

export default Home
