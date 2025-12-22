import { HStack, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { APP_STORE_LINKS } from '#constants'

/**
 * Pricing data for the landing page
 */

interface PricingFeature {
  title: string
  iconColor?: string
}

interface PricingPlan {
  id: string
  title: string
  description: string
  price: ReactNode
  features: (PricingFeature | null)[]
  action: {
    href: string
  }
  isRecommended?: boolean
}

interface PricingData {
  title: string
  description: string
  plans: PricingPlan[]
}

const pricing: PricingData = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for all',
  plans: [
    {
      id: 'free',
      title: 'Free',
      description: 'Try full features for FREE',
      price: 'Free',
      features: [
        { title: '3 Sessions Weekly' },
        { title: '10 Copilot Use Weekly' },
        { title: 'Normal Copilot Models' },
      ],
      action: {
        href: APP_STORE_LINKS.ios,
      },
    },
    {
      id: 'monthly',
      title: 'Monthly',
      description: 'Popular',
      price: (
        <VStack spacing="1" align="flex-start">
          <Text
            fontSize="lg"
            color="gray.500"
            textDecoration="line-through"
            fontWeight="normal"
          >
            $29 / month
          </Text>
          <HStack spacing="2" align="baseline">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              $14.99
            </Text>
            <Text fontSize="sm" color="muted">
              / month
            </Text>
          </HStack>
        </VStack>
      ),
      isRecommended: true,
      features: [
        { title: '1,000 Copilot Use Weekly' },
        { title: 'Unlimited Sessions Weekly' },
        { title: 'Most Powerful Copilot Models' },
        { title: 'Full Profile & Documents' },
        { title: 'Full Copilot Customization' },
        { title: 'Unlimited Interview History' },
        { title: 'Priority Customer Support' },
        null,
        {
          title: 'Promotion: Get 1,000 Copilot use weekly for a limited time!',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: APP_STORE_LINKS.ios,
      },
    },
    {
      id: 'quarterly',
      title: 'Quarterly',
      description: 'Best Value',
      price: (
        <VStack spacing="1" align="flex-start">
          <Text
            fontSize="lg"
            color="gray.500"
            textDecoration="line-through"
            fontWeight="normal"
          >
            $80 / 3 months
          </Text>
          <HStack spacing="2" align="baseline">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              $39
            </Text>
            <Text fontSize="sm" color="muted">
              / 3 months
            </Text>
          </HStack>
        </VStack>
      ),
      features: [
        { title: '1,000 Copilot Use Weekly' },
        { title: 'Unlimited Sessions Weekly' },
        { title: 'Most Powerful Copilot Models' },
        { title: 'Full Profile & Documents' },
        { title: 'Full Copilot Customization' },
        { title: 'Unlimited Interview History' },
        { title: 'Priority Customer Support' },
        null,
        {
          title: 'Promotion: Get 1,000 Copilot use weekly for a limited time!',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: APP_STORE_LINKS.ios,
      },
    },
  ],
}

export default pricing
