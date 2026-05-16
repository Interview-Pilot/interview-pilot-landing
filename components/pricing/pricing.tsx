'use client'

// components/pricing.tsx

import {
  Box,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiLock,
  FiXCircle,
} from 'react-icons/fi'

import React from 'react'

import {
  ButtonLink,
  ButtonLinkProps,
} from '#components/button-link/button-link'
import { usePlatform } from '#hooks/use-platform'
import { getPrimaryDownloadHref } from '#lib/download-routing'
import { Section, SectionProps, SectionTitle } from '#components/section'

export interface PricingPlan {
  id: string
  title: React.ReactNode
  description: React.ReactNode
  price: React.ReactNode
  features: Array<PricingFeatureProps | null>
  action: ButtonLinkProps & { label?: string }
  isRecommended?: boolean
}

export interface PricingProps extends Omit<SectionProps, 'title'> {
  title: React.ReactNode
  description: React.ReactNode
  plans: Array<PricingPlan>
  align?: 'left' | 'center' | { base: 'center'; md: 'left' }
  titleAs?: 'h1' | 'h2'
}

export const Pricing: React.FC<PricingProps> = (props) => {
  const {
    children,
    plans,
    title,
    description,
    align,
    titleAs = 'h2',
    ...rest
  } = props
  const platform = usePlatform()
  const primaryDownloadHref = getPrimaryDownloadHref(platform)

  return (
    <Section id="pricing" {...rest}>
      {/* zIndex ensures title/description remain visible above the grid overlay */}
      <SectionTitle
        title={title}
        description={description}
        align={align}
        headingAs={titleAs}
        mb={8}
        pos="relative"
        zIndex={1}
      />
      <SimpleGrid columns={[1, null, 3]} spacing={5}>
        {plans?.map((plan) => (
          <PricingBox
            key={plan.id}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            sx={
              plan.isRecommended
                ? {
                    borderColor: 'primary.400',
                    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.2)',
                    _dark: {
                      borderColor: 'primary.400',
                      bg: 'rgba(255, 255, 255, 0.08)',
                    },
                  }
                : {}
            }
          >
            <ButtonLink
              colorScheme={plan.id === 'free' ? 'whiteAlpha' : 'primary'}
              color={plan.id === 'free' ? 'gray.900' : 'black'}
              bg={plan.id === 'free' ? 'white' : undefined}
              _hover={
                plan.id === 'free'
                  ? {
                      bg: 'gray.100',
                    }
                  : undefined
              }
              borderRadius="full"
              w="full"
              h="42px"
              px="1"
              mb="0"
              textAlign="left"
              fontWeight="bold"
              {...plan.action}
              href={primaryDownloadHref}
            >
              <HStack w="full" spacing="2.5" justify="flex-start">
                <Box
                  w="34px"
                  h="34px"
                  borderRadius="full"
                  bg="black"
                  color="white"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiArrowRight} boxSize="16px" />
                </Box>
                <Text as="span" fontWeight="bold" fontSize="lg">
                  {plan.action.label || 'Continue'}
                </Text>
              </HStack>
            </ButtonLink>
            <HStack
              mb="4"
              mt="-1"
              spacing="3"
              justify="center"
              color="whiteAlpha.500"
              fontSize="2xs"
              lineHeight="1"
              textTransform="uppercase"
            >
              <HStack spacing="1">
                <Icon as={FiLock} boxSize="12px" />
                <Text as="span">Secure Checkout</Text>
              </HStack>
              <Text as="span">|</Text>
              <HStack spacing="1">
                <Icon as={FiXCircle} boxSize="12px" />
                <Text as="span">Cancel Anytime</Text>
              </HStack>
            </HStack>
            <PricingFeatures>
              {plan.features.map((feature, i) =>
                feature ? (
                  <PricingFeature
                    key={`${plan.id}-feature-${i}`}
                    useCircleIcon={plan.id !== 'free'}
                    {...feature}
                  />
                ) : (
                  <br key={`${plan.id}-spacer-${i}`} />
                ),
              )}
            </PricingFeatures>
          </PricingBox>
        ))}
      </SimpleGrid>
      {children}
    </Section>
  )
}

const PricingFeatures: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <VStack
      align="stretch"
      justifyContent="stretch"
      spacing="4"
      mb="2"
      flex="1"
    >
      {children}
    </VStack>
  )
}

export interface PricingFeatureProps {
  title: React.ReactNode
  iconColor?: string
  useCircleIcon?: boolean
}

const PricingFeature: React.FC<PricingFeatureProps> = (props) => {
  const { title, iconColor = 'primary.400', useCircleIcon = true } = props
  return (
    <HStack>
      <Icon as={useCircleIcon ? FiCheckCircle : FiCheck} color={iconColor} />
      <Text flex="1" fontSize="sm">
        {title}
      </Text>
    </HStack>
  )
}

export interface PricingBoxProps extends Omit<StackProps, 'title'> {
  title: React.ReactNode
  description: React.ReactNode
  price: React.ReactNode
}

const PricingBox: React.FC<PricingBoxProps> = (props) => {
  const { title, description, price, children, ...rest } = props
  return (
    <VStack
      bg="rgba(255, 255, 255, 0.05)"
      backdropFilter="blur(10px)"
      borderRadius="24px"
      p="8"
      flex="1 0"
      alignItems="stretch"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
      _hover={{
        bg: "rgba(255, 255, 255, 0.08)",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)"
      }}
      transition="all 0.3s ease"
      _dark={{
        bg: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
      {...rest}
    >
      <Heading as="h3" size="md" fontWeight="bold" fontSize="xl" mb="2">
        {title}
      </Heading>
      <Box color="muted">{description}</Box>
      <Box fontSize="2xl" fontWeight="bold" pt="4" pb="2">
        {price}
      </Box>
      <VStack align="stretch" justifyContent="stretch" spacing="4" flex="1">
        {children}
      </VStack>
    </VStack>
  )
}
