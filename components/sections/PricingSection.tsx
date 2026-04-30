'use client'

import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { HiShieldCheck } from 'react-icons/hi'

import { Pricing } from '#components/pricing/pricing'
import pricing from '../../data/pricing'
import { sectionContentStyles } from '#theme/styles/section-styles'

/**
 * Pricing section displaying subscription tiers
 */
export function PricingSection() {
  return (
    <Box sx={sectionContentStyles}>
      <Pricing {...pricing} align="center" innerWidth="1080px">
        <HStack
          p="8"
          spacing="2"
          justify="center"
          color="whiteAlpha.600"
          position="relative"
          zIndex={1}
        >
          <Icon as={HiShieldCheck} boxSize="16px" />
          <Text textAlign="center" fontSize="sm">
            U.S. Dollars. Prices may differ slightly depending on your location.
          </Text>
        </HStack>
      </Pricing>
    </Box>
  )
}
