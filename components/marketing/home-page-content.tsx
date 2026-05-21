'use client'

import { Box } from '@chakra-ui/react'

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
      {/* Grid overlay intentionally disconnected from the homepage.
          The implementation is kept at #components/background/interactive-grid-overlay
          for possible future reuse. */}

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
