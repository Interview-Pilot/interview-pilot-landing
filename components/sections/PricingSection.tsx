'use client'

import { Box, HStack, Icon, Link, Text } from '@chakra-ui/react'
import { HiShieldCheck } from 'react-icons/hi'

import { Pricing } from '#components/pricing/pricing'
import { sectionContentStyles } from '#theme/styles/section-styles'

import pricing from '../../data/pricing'

/**
 * Pricing section displaying subscription tiers
 */
interface PricingSectionProps {
  largeTitle?: boolean
  title?: string
  description?: string
}

export function PricingSection(props: PricingSectionProps) {
  const {
    largeTitle = false,
    title: titleText = 'Pricing',
    description,
  } = props
  const title = largeTitle ? (
    <Text as="span" display="block" fontSize={{ base: '6xl', md: '7xl' }}>
      {titleText}
    </Text>
  ) : (
    titleText
  )

  return (
    <Box sx={sectionContentStyles}>
      <Pricing
        {...pricing}
        title={title}
        description={description ?? pricing.description}
        align="center"
        innerWidth="1080px"
      >
        <HStack
          p="8"
          spacing="2"
          justify="center"
          align="flex-start"
          color="whiteAlpha.600"
          position="relative"
          zIndex={1}
        >
          <Icon as={HiShieldCheck} boxSize="16px" mt="0.5" flexShrink={0} />
          <Text textAlign="center" fontSize="md">
            U.S. Dollars. Prices may differ slightly depending on your location.{' '}
            For Desktop, billed separately, please visit the platform{' '}
            <Link
              href="https://platform.interviewpilot.app"
              isExternal
              color="white"
              textDecoration="underline"
              _hover={{ color: 'whiteAlpha.900' }}
            >
              here
            </Link>
            .
          </Text>
        </HStack>
      </Pricing>
    </Box>
  )
}
