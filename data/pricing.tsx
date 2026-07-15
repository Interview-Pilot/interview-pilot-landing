import { HStack, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { getTrackedDownloadHref } from '#lib/download-routing'

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
  visibility?: 'all' | 'mobile' | 'desktop'
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
          <Text fontSize={{ base: '7xl', md: '8xl' }} fontWeight="semibold" lineHeight="0.95">
            Free
          </Text>
          <Text
            display={{ base: 'none', md: 'block' }}
            fontSize="sm"
            visibility="hidden"
            userSelect="none"
          >
            Billed annually
          </Text>
        </VStack>
      ),
      features: [
        { title: '3 Sessions Weekly' },
        { title: '10 Copilot Use Weekly' },
        { title: 'Normal Copilot Models' },
      ],
      action: {
        href: getTrackedDownloadHref('pricing', 'auto'),
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
            $9.99 / week
          </Text>
          <HStack spacing="2" align="baseline">
            <Text
              fontSize={{ base: '7xl', md: '8xl' }}
              fontWeight="semibold"
              lineHeight="0.95"
              color="green.500"
            >
              $3.99
            </Text>
            <Text fontSize="md" color="muted" fontWeight="normal">
              / first week
            </Text>
          </HStack>
        </VStack>
      ),
      isRecommended: true,
      visibility: 'mobile',
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
          title: 'This gets you nearly unlimited use every week!',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: getTrackedDownloadHref('pricing', 'auto'),
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
            <Text
              display={{ base: 'block', md: 'none' }}
              fontSize="7xl"
              fontWeight="semibold"
              lineHeight="0.95"
              color="green.500"
            >
              $29.99
            </Text>
            <Text
              display={{ base: 'none', md: 'block' }}
              fontSize="8xl"
              fontWeight="semibold"
              lineHeight="0.95"
              color="green.500"
            >
              $30
            </Text>
            <Text
              display={{ base: 'block', md: 'none' }}
              fontSize="md"
              color="muted"
              fontWeight="normal"
            >
              / month
            </Text>
            <Text
              display={{ base: 'none', md: 'block' }}
              fontSize="md"
              color="muted"
              fontWeight="normal"
            >
              / first month
            </Text>
          </HStack>
          <Text
            display={{ base: 'none', md: 'block' }}
            fontSize="sm"
            visibility="hidden"
            userSelect="none"
          >
            Billed annually
          </Text>
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
          title: 'This gets you nearly unlimited use every week!',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: getTrackedDownloadHref('pricing', 'auto'),
        label: 'Continue',
      },
    },
    {
      id: 'yearly',
      title: 'Yearly',
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
            <Text
              fontSize={{ base: '7xl', md: '8xl' }}
              fontWeight="semibold"
              lineHeight="0.95"
              color="green.500"
            >
              $25
            </Text>
            <Text fontSize="md" color="muted" fontWeight="normal">
              / month
            </Text>
          </HStack>
          <Text fontSize="sm" color="muted" fontWeight="normal">
            Billed annually
          </Text>
        </VStack>
      ),
      isRecommended: true,
      visibility: 'desktop',
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
          title: 'This gets you nearly unlimited use every week!',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: getTrackedDownloadHref('pricing', 'auto'),
        label: 'Continue',
      },
    },
  ],
}

export default pricing
