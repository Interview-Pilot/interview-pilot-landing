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
    label?: string
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
      price: (
        <VStack spacing="1" align="flex-start">
          <Text
            fontSize="xl"
            fontWeight="normal"
            visibility="hidden"
            userSelect="none"
          >
            $12.99 / week
          </Text>
          <Text fontSize="5xl" fontWeight="bold">
            Free
          </Text>
        </VStack>
      ),
      features: [
        { title: '3 Sessions Weekly' },
        { title: '10 Copilot Use Weekly' },
        { title: 'Normal Copilot Models' },
      ],
      action: {
        href: APP_STORE_LINKS.ios,
        label: 'Get Started',
      },
    },
    {
      id: 'weekly',
      title: 'Weekly',
      description: 'Popular',
      price: (
        <VStack spacing="1" align="flex-start">
          <Text
            fontSize="xl"
            color="gray.500"
            textDecoration="line-through"
            fontWeight="normal"
          >
            $12.99 / week
          </Text>
          <HStack spacing="2" align="baseline">
            <Text fontSize="5xl" fontWeight="bold" color="green.500">
              $3.99
            </Text>
            <Text fontSize="md" color="muted" fontWeight="normal">
              / week for first week
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
        { title: 'Full Question Bank (10,000 Qns)' },
        { title: 'Practice Mock Interviews with AI' },
        { title: 'Priority Customer Support' },
        null,
        {
          title: 'Promotion: Get 1,000 Copilot use weekly for a limited time!',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: APP_STORE_LINKS.ios,
        label: 'Continue',
      },
    },
    {
      id: 'monthly',
      title: 'Monthly',
      description: 'Best Value',
      price: (
        <VStack spacing="1" align="flex-start">
          <Text
            fontSize="xl"
            color="gray.500"
            textDecoration="line-through"
            fontWeight="normal"
          >
            $49.99 / month
          </Text>
          <HStack spacing="2" align="baseline">
            <Text fontSize="5xl" fontWeight="bold" color="green.500">
              $29.99
            </Text>
            <Text fontSize="md" color="muted" fontWeight="normal">
              / month
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
        { title: 'Full Question Bank (10,000 Qns)' },
        { title: 'Practice Mock Interviews with AI' },
        { title: 'Priority Customer Support' },
        null,
        {
          title: 'Promotion: Get 1,000 Copilot use weekly for a limited time!',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: APP_STORE_LINKS.ios,
        label: 'Continue',
      },
    },
  ],
}

export default pricing
