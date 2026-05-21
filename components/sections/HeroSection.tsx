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
  FiDownload,
  FiGlobe,
  FiShield,
  FiZap,
} from 'react-icons/fi'

import { ButtonLink } from '#components/button-link/button-link'
import { getPrimaryDownloadHref } from '#lib/download-routing'
import { Features } from '#components/features'
import { Hero } from '#components/hero'
import { Em } from '#components/typography'
import { usePlatform } from '#hooks/use-platform'
import { ASSETS, INTERNAL_ROUTES } from '#constants'
import { heroPulseAnimation, sectionContentStyles } from '#theme/styles/section-styles'

const platformSignupHref = 'https://platform.interviewpilot.app/signup'

function getHeroDownloadCta(platform: ReturnType<typeof usePlatform>) {
  switch (platform) {
    case 'ios':
      return {
        label: 'Get on App Store',
        iconSrc: '/static/icons/platforms/app-store.svg',
      }
    case 'android':
      return {
        label: 'Get on Play Store',
        iconSrc: '/static/icons/platforms/google-play.svg',
      }
    case 'macos':
      return {
        label: 'Get for Mac',
        iconSrc: '/static/icons/platforms/apple.svg',
        iconFilter: 'invert(1)',
        rightIcon: FiDownload,
      }
    case 'windows':
    default:
      return {
        label: 'Download free',
        icon: FiArrowRight,
      }
  }
}

/**
 * Hero section with main value proposition, download buttons, and key features
 */
export function HeroSection() {
  const platform = usePlatform()
  const downloadHref = getPrimaryDownloadHref(platform)
  const downloadCta = getHeroDownloadCta(platform)

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
              <Box>
                <Box
                  fontSize={{ base: '57px', sm: '51px', md: '62px', lg: '70px' }}
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
              </Box>
            }
            description={
              <Box fontWeight="medium">
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
              </Box>
            }
          >
            <Box>
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
                spacing={5}
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
                    variant="primary"
                    color="black"
                    href={downloadHref}
                    borderRadius="full"
                    px="1"
                    minW="250px"
                    h="56px"
                    position="relative"
                    textAlign="left"
                    width={{ base: '100%', sm: 'auto' }}
                  >
                    <Box
                      position="absolute"
                      left="5px"
                      top="50%"
                      transform="translateY(-50%)"
                      w="46px"
                      h="46px"
                      borderRadius="full"
                      bg="black"
                      color="white"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {downloadCta.iconSrc ? (
                        <Box
                          as="img"
                          src={downloadCta.iconSrc}
                          alt=""
                          w="16px"
                          h="16px"
                          filter={downloadCta.iconFilter}
                        />
                      ) : (
                        <Icon as={downloadCta.icon} boxSize="16px" />
                      )}
                    </Box>
                    <HStack
                      spacing="2"
                      position="absolute"
                      left={{ base: '54px', sm: '58px' }}
                      right={{ base: '18px', sm: '18px' }}
                      top="50%"
                      transform="translateY(-50%)"
                      justifyContent="center"
                      lineHeight="1"
                    >
                      <Text as="span" fontWeight="semibold" fontSize="2xl">
                        {downloadCta.label}
                      </Text>
                      {downloadCta.rightIcon ? (
                        <Icon as={downloadCta.rightIcon} boxSize="18px" />
                      ) : null}
                    </HStack>
                  </ButtonLink>
                  <ButtonLink
                    href={platformSignupHref}
                    variant="outline"
                    borderRadius="full"
                    h="56px"
                    minW="190px"
                    px="8"
                    fontSize="2xl"
                    width={{ base: '100%', sm: 'auto' }}
                    rightIcon={
                      <Icon
                        as={FiArrowRight}
                        boxSize="20px"
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
                    Get Started
                  </ButtonLink>
                </Stack>
                <Link
                  href={INTERNAL_ROUTES.downloads}
                  fontSize="lg"
                  color="muted"
                  textDecoration="underline"
                  textAlign={{ base: 'center', md: 'left' }}
                  _hover={{ color: 'white' }}
                >
                  More download options
                </Link>
              </VStack>
            </Box>
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
            <Box>
              <Box
                overflow="hidden"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                zIndex={1}
                sx={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
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
                    sizes="(max-width: 767px) 82vw, (max-width: 1199px) 610px, 50vw"
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
            </Box>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 3]}
        iconSize={4}
        innerWidth="1120px"
        spacing={{ base: 10, md: 12, lg: 14 }}
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
      />
    </Box>
  )
}
