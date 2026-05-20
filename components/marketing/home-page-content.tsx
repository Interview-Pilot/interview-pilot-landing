'use client'

import { Box } from '@chakra-ui/react'

import { InteractiveGridOverlay } from '#components/background/interactive-grid-overlay'
import {
  AppStoreBanner,
  CompanyLogosCarouselSection,
  DownloadOptionsSection,
  FaqSection,
  FloatingGrowthMetric,
  FeaturesSection,
  HeroSection,
  HighlightsSection,
  PricingSection,
  SystemStatus,
  TestimonialsSection,
} from '#components/sections'

export function HomePageContent() {
  return (
    <Box>
      <InteractiveGridOverlay />

      <SystemStatus />

      <HeroSection />

      <CompanyLogosCarouselSection />

      <HighlightsSection />

      <FeaturesSection />

      <DownloadOptionsSection />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />

      <AppStoreBanner />

      <FloatingGrowthMetric />

      {/* Bottom padding to prevent content from being hidden behind the mobile banner */}
      <Box pb={{ base: '16', md: '0' }} />
    </Box>
  )
}
