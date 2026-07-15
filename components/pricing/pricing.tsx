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
import { getTrackedDownloadHref } from '#lib/download-routing'
import { Section, SectionProps, SectionTitle } from '#components/section'

export interface PricingPlan {
  id: string
  title: React.ReactNode
  description: React.ReactNode
  price: React.ReactNode
  features: Array<PricingFeatureProps | null>
  action: ButtonLinkProps & { label?: string }
  isRecommended?: boolean
  visibility?: 'all' | 'mobile' | 'desktop'
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
  const primaryDownloadHref = getTrackedDownloadHref('pricing', platform)

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
            isRecommended={plan.isRecommended}
            display={{
              base: plan.visibility === 'desktop' ? 'none' : 'flex',
              md: plan.visibility === 'mobile' ? 'none' : 'flex',
            }}
          >
            <ButtonLink
              colorScheme="primary"
              color="black"
              bg="primary.400"
              _hover={{ bg: 'primary.300' }}
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
  isRecommended?: boolean
}

const PricingBox: React.FC<PricingBoxProps> = (props) => {
  const {
    title,
    description,
    price,
    children,
    isRecommended = false,
    ...rest
  } = props
  return (
    <VStack
      position="relative"
      overflow="hidden"
      bg={
        isRecommended
          ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.115) 0%, rgba(255, 229, 0, 0.055) 52%, rgba(255, 255, 255, 0.05) 100%)'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.032) 58%, rgba(255, 255, 255, 0.052) 100%)'
      }
      backdropFilter="blur(18px) saturate(135%)"
      borderRadius="28px"
      px="6"
      pt="6"
      pb="5"
      flex="1 0"
      alignItems="stretch"
      border="1px solid"
      borderColor={
        isRecommended
          ? 'rgba(255, 229, 0, 0.34)'
          : 'rgba(255, 255, 255, 0.12)'
      }
      boxShadow={
        isRecommended
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 18px 48px rgba(0, 0, 0, 0.2), 0 0 42px rgba(255, 229, 0, 0.045)'
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 14px 38px rgba(0, 0, 0, 0.14)'
      }
      _before={{
        content: '""',
        position: 'absolute',
        top: '-100px',
        right: '-90px',
        w: '220px',
        h: '220px',
        borderRadius: 'full',
        bg: isRecommended
          ? 'rgba(255, 229, 0, 0.1)'
          : 'rgba(255, 229, 0, 0.045)',
        filter: 'blur(42px)',
        pointerEvents: 'none',
      }}
      _hover={{
        borderColor: isRecommended
          ? 'rgba(255, 229, 0, 0.48)'
          : 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-3px)',
        boxShadow: isRecommended
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 22px 54px rgba(0, 0, 0, 0.24), 0 0 50px rgba(255, 229, 0, 0.065)'
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.11), 0 18px 44px rgba(0, 0, 0, 0.18)',
      }}
      transition="transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease"
      {...rest}
    >
      <Heading
        as="h3"
        size="md"
        fontWeight="bold"
        fontSize="xl"
        mb="2"
        position="relative"
        zIndex="1"
      >
        {title}
      </Heading>
      <Box color="muted" position="relative" zIndex="1">
        {description}
      </Box>
      <Box
        fontSize="2xl"
        fontWeight="bold"
        pt="4"
        pb="2"
        position="relative"
        zIndex="1"
      >
        {price}
      </Box>
      <VStack
        align="stretch"
        justifyContent="stretch"
        spacing="4"
        flex="1"
        position="relative"
        zIndex="1"
      >
        {children}
      </VStack>
    </VStack>
  )
}
