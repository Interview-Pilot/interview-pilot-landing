'use client'

import {
  Box,
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
  FiCheckCircle,
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

  const downloadHref = platform === 'desktop'
    ? INTERNAL_ROUTES.downloadOptions
    : INTERNAL_ROUTES.downloadHero

  return (
    <Box overflow="hidden">
      <Container maxW="container.xl" pt={{ base: 32, lg: 40 }} pb="0">
        <Box display="flex" justifyContent="center" mb={{ base: 5, md: 6 }}>
          <Box
            display="inline-flex"
            alignItems="center"
            gap="3"
            px="4"
            py="2"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="medium"
            lineHeight="1"
            fontFamily="mono"
            textTransform="uppercase"
            letterSpacing="-0.7px"
            color="whiteAlpha.700"
            position="relative"
            zIndex={1}
            textAlign="center"
          >
            <Icon as={FiCheckCircle} boxSize="13px" color="green.300" />
            <Text as="span" display={{ base: 'none', md: 'inline' }}>
              Join over 120,000+ users to secure your career
            </Text>
            <Text as="span" display={{ base: 'inline', md: 'none' }}>
              Join over 120,000+ users
            </Text>
            <Icon as={FiArrowRight} boxSize="13px" color="whiteAlpha.700" />
          </Box>
        </Box>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          spacing={{ base: 8, sm: 60, md: 16, lg: 0 }}
        >
          <Hero
            id="home"
            justifyContent="flex-start"
            px={{ base: '4', md: '20' }}
            order={{ base: 2, lg: 1 }}
            mt={{ base: 8, sm: 10, md: 8, lg: 0 }}
            width={{ base: '100%', lg: '60%' }}
            title={
              <FallInPlace>
                <Box
                  fontSize={{ base: '55px', sm: '49px', md: '56px', lg: '66px' }}
                  fontWeight="bold"
                  lineHeight="1.1"
                  position="relative"
                  zIndex={1}
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  <Box
                    as="span"
                    display="inline-flex"
                    alignItems="center"
                    gap="6"
                    position="relative"
                    pl={{ base: '4', md: '0' }}
                  >
                    <Box as="span" position="relative" zIndex={1} display="inline">
                      Live AI
                    </Box>
                    <Box
                      position="relative"
                      display="inline-block"
                      w={4}
                      h={4}
                      borderRadius="full"
                      bg="green.400"
                      zIndex={0}
                      animation="pulse 2s infinite"
                      sx={heroPulseAnimation}
                    />
                  </Box>
                  <Br /> <Box as="span" whiteSpace={{ base: 'normal', md: 'nowrap' }}>Interview Copilot</Box>
                </Box>
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                <Text
                  fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                  position="relative"
                  zIndex={1}
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Get <Em color="primary.400">real-time</Em> interview answers
                  <Br /> during your interview with <Em color="primary.400">Copilot</Em>
                  <Br />{' '}
                </Text>
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack
                pt="8"
                pb="12"
                spacing="8"
                position="relative"
                zIndex={1}
                justifyContent={{ base: 'center', md: 'flex-start' }}
                width="100%"
              >
                <Image
                  src={ASSETS.images.openAiLogo}
                  width={140}
                  height={22}
                  alt="OpenAI Logo"
                />
                <Image
                  src={ASSETS.images.whisperLogo}
                  width={156}
                  height={22}
                  alt="Whisper Logo"
                />
              </HStack>

              <VStack
                spacing={4}
                alignItems={{ base: 'center', md: 'flex-start' }}
                position="relative"
                zIndex={1}
                width="100%"
              >
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  spacing={4}
                  alignItems={{ base: 'stretch', sm: 'flex-start' }}
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                  width={{ base: '100%', sm: 'auto' }}
                >
                  <ButtonLink
                    colorScheme="primary"
                    color="black"
                    href={downloadHref}
                    onClick={platform === 'desktop' ? undefined : handleDownloadClick}
                    borderRadius="full"
                    px="1"
                    minW="176px"
                    h="50px"
                    position="relative"
                    textAlign="left"
                    width={{ base: '100%', sm: 'auto' }}
                  >
                    <Box
                      position="absolute"
                      left="4px"
                      top="50%"
                      transform="translateY(-50%)"
                      w="42px"
                      h="42px"
                      borderRadius="full"
                      bg="black"
                      color="white"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiArrowRight} boxSize="18px" />
                    </Box>
                    <Box
                      position="absolute"
                      left={{ base: '0', sm: '50px' }}
                      right={{ base: '0', sm: '8px' }}
                      top="50%"
                      transform="translateY(-50%)"
                      textAlign="center"
                      lineHeight="1"
                    >
                      <Text as="span" fontWeight="bold" fontSize="xl">
                        Download
                      </Text>
                    </Box>
                  </ButtonLink>
                  <ButtonLink
                    href="#features"
                    variant="outline"
                    borderRadius="full"
                    h="50px"
                    minW="176px"
                    px="7"
                    fontSize="xl"
                    width={{ base: '100%', sm: 'auto' }}
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
                </Stack>
                <Link
                  href={INTERNAL_ROUTES.downloadOptions}
                  fontSize="sm"
                  color="muted"
                  textDecoration="underline"
                  textAlign={{ base: 'center', md: 'left' }}
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
                sx={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)',
                }}
              >
                <Box
                  overflow="hidden"
                  transform={{ base: 'translate(48px, 36px)', md: 'none' }}
                >
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
