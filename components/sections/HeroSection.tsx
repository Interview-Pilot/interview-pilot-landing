'use client'

import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Br, Link } from '@saas-ui/react'
import Image from 'next/image'
import {
  FiArrowRight,
  FiGlobe,
  FiShield,
  FiZap,
} from 'react-icons/fi'

import { ButtonLink } from '#components/button-link/button-link'
import { Features } from '#components/features'
import { Hero } from '#components/hero'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Em } from '#components/typography'
import { usePlatform } from '#hooks/use-platform'
import { ASSETS, INTERNAL_ROUTES } from '#constants'
import { heroPulseAnimation, sectionContentStyles } from '#theme/styles/section-styles'

/**
 * Hero section with main value proposition, download buttons, and key features
 */
export function HeroSection() {
  const platform = usePlatform()

  const handleDownloadClick = () => {
    window.location.href = INTERNAL_ROUTES.downloadHero
  }

  const getDownloadIcon = () => {
    const iconSrc = platform === 'android'
      ? ASSETS.images.googlePlayStore
      : ASSETS.images.appleAppStore

    return (
      <Image
        src={iconSrc}
        width={14}
        height={14}
        alt={platform === 'android' ? 'Google Play' : 'Apple'}
      />
    )
  }

  const downloadHref = platform === 'desktop'
    ? INTERNAL_ROUTES.downloadOptions
    : INTERNAL_ROUTES.downloadHero

  return (
    <Box overflow="hidden">
      <Container maxW="container.xl" pt={{ base: 36, lg: 48 }} pb="0">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          spacing={{ base: 12, sm: 60, md: 16, lg: 0 }}
        >
          <Hero
            id="home"
            justifyContent="flex-start"
            px={{ base: '4', md: '20' }}
            order={{ base: 2, lg: 1 }}
            mt={{ base: 12, sm: 10, md: 8, lg: 0 }}
            width={{ base: '100%', lg: '60%' }}
            title={
              <FallInPlace>
                <Box
                  fontSize={{ base: '36px', sm: '42px', md: '48px', lg: '60px' }}
                  fontWeight="extrabold"
                  lineHeight="1.1"
                  position="relative"
                  zIndex={1}
                >
                  <Box as="span" position="relative" display="inline">
                    <Box
                      position="absolute"
                      display="inline-block"
                      right="-40px"
                      top="50%"
                      transform="translateY(-50%)"
                      w={4}
                      h={4}
                      borderRadius="full"
                      bg="green.400"
                      animation="pulse 2s infinite"
                      sx={heroPulseAnimation}
                    />
                    Live AI
                  </Box>
                  <Br /> Interview Copilot
                </Box>
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                <Text
                  fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                  position="relative"
                  zIndex={1}
                >
                  Get <Em>real-time</Em> interview answers
                  <Br /> during your interview with <Em>Copilot</Em>
                  <Br />{' '}
                </Text>
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="8" pb="12" spacing="8" position="relative" zIndex={1}>
                <Image
                  src={ASSETS.images.openAiLogo}
                  width={125}
                  height={20}
                  alt="OpenAI Logo"
                />
                <Image
                  src={ASSETS.images.whisperLogo}
                  width={140}
                  height={20}
                  alt="Whisper Logo"
                />
              </HStack>

              <VStack spacing={4} alignItems="flex-start" position="relative" zIndex={1}>
                <ButtonGroup spacing={4} alignItems="center">
                  <ButtonLink
                    colorScheme="primary"
                    color="black"
                    size="lg"
                    href={downloadHref}
                    fontWeight="bold"
                    onClick={platform === 'desktop' ? undefined : handleDownloadClick}
                    borderRadius="full"
                    leftIcon={getDownloadIcon()}
                  >
                    Download
                  </ButtonLink>
                  <ButtonLink
                    size="lg"
                    href="#features"
                    variant="outline"
                    borderRadius="full"
                    rightIcon={
                      <Icon
                        as={FiArrowRight}
                        sx={{
                          transitionProperty: 'common',
                          transitionDuration: 'normal',
                          '.chakra-button:hover &': {
                            transform: 'translate(5px)',
                          },
                        }}
                      />
                    }
                  >
                    Learn More
                  </ButtonLink>
                </ButtonGroup>
                <Link
                  href={INTERNAL_ROUTES.downloadOptions}
                  fontSize="sm"
                  color="muted"
                  textDecoration="underline"
                  _hover={{ color: 'white' }}
                >
                  More download options
                </Link>
              </VStack>
            </FallInPlace>
          </Hero>

          {/* Hero Image */}
          <Box
            width={{ base: '100%', lg: '50%' }}
            height={{ base: '400px', md: '500px', lg: '600px' }}
            position="relative"
            display="block"
            order={{ base: 1, lg: 2 }}
            mb={{ base: 0, sm: 0, md: 40, lg: 0 }}
          >
            <FallInPlace delay={1}>
              <Box
                overflow="hidden"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                zIndex={1}
              >
                <Box borderRadius="48px" overflow="hidden">
                  <Image
                    src={ASSETS.screenshots.heroHand}
                    width={580}
                    height={578}
                    alt="Interview Pilot App Screenshot"
                    priority
                    style={{
                      width: '100%',
                      maxWidth: '610px',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 3]}
        iconSize={4}
        innerWidth="container.lg"
        pt={{ base: '12', lg: '36' }}
        sx={{
          '.chakra-heading': { fontSize: '2xl' },
          '.chakra-text': { fontSize: 'lg' },
          ...sectionContentStyles,
        }}
        features={[
          {
            title: '1s Responses',
            icon: FiZap,
            description: 'Copilot generates responses instantly, so you always have the answer',
            iconPosition: 'left',
            delay: 0.6,
          },
          {
            title: '99+ Languages',
            icon: FiGlobe,
            description: 'Supports over 99 languages, and any accents',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: 'Full Privacy',
            icon: FiShield,
            description: 'All data uses industry-standard encryption. We never store your usage data',
            iconPosition: 'left',
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}
