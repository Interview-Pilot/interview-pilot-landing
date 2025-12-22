'use client'

import { Box, Text } from '@chakra-ui/react'

import { Pricing } from '#components/pricing/pricing'
import pricing from '../../data/pricing'
import { sectionContentStyles } from '#theme/styles/section-styles'

/**
 * Pricing section displaying subscription tiers
 */
export function PricingSection() {
  return (
    <Box sx={sectionContentStyles}>
      <Pricing {...pricing} align="center">
        <Text p="8" textAlign="center" color="muted" position="relative" zIndex={1}>
          U.S. Dollars. Prices may differ slightly depending on your location.
        </Text>
      </Pricing>
    </Box>
  )
}
