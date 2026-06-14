'use client'

import { useEffect, useState } from 'react'
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
  FiMonitor,
  FiSmartphone,
} from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

import { ButtonLink } from '#components/button-link/button-link'
import { getPrimaryDownloadHref } from '#lib/download-routing'
import { Hero } from '#components/hero'
import { Em } from '#components/typography'
import { usePlatform } from '#hooks/use-platform'
import { ASSETS, INTERNAL_ROUTES } from '#constants'
import { heroPulseAnimation } from '#theme/styles/section-styles'

const platformSignupHref = 'https://platform.interviewpilot.app/signup'
const heroImageCycleMs = 3400
const heroImageFadeMs = 700
const heroImageManualPauseMs = 9000
type HeroImageView = 'mobile' | 'desktop'

const socialProofAvatars = [
  {
    src: '/static/social-proof/user-1.jpg',
    alt: 'Interview Pilot user profile',
  },
  {
    src: '/static/social-proof/user-2.jpg',
    alt: 'Interview Pilot user profile',
  },
  {
    src: '/static/social-proof/user-3.jpg',
    alt: 'Interview Pilot user profile',
  },
  {
    src: '/static/social-proof/user-4.jpg',
    alt: 'Interview Pilot user profile',
  },
]

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
      return {
        label: 'Get for Windows',
        iconSrc: '/static/icons/platforms/windows.svg',
        rightIcon: FiDownload,
      }
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
  const [isDesktopViewport, setIsDesktopViewport] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeHeroImage, setActiveHeroImage] =
    useState<HeroImageView>('mobile')
  const [hasManualHeroImageSelection, setHasManualHeroImageSelection] =
    useState(false)
  const visibleHeroImage = isDesktopViewport ? activeHeroImage : 'mobile'
  const heroImageTransition = prefersReducedMotion
    ? 'none'
    : `opacity ${heroImageFadeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
  const selectHeroImage = (image: HeroImageView) => {
    setHasManualHeroImageSelection(true)
    setActiveHeroImage(image)
  }

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 62em)')
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const syncMediaState = () => {
      setIsDesktopViewport(desktopQuery.matches)
      setPrefersReducedMotion(reducedMotionQuery.matches)
      setActiveHeroImage('mobile')
    }

    syncMediaState()
    desktopQuery.addEventListener('change', syncMediaState)
    reducedMotionQuery.addEventListener('change', syncMediaState)

    return () => {
      desktopQuery.removeEventListener('change', syncMediaState)
      reducedMotionQuery.removeEventListener('change', syncMediaState)
    }
  }, [])

  useEffect(() => {
    if (
      !isDesktopViewport ||
      prefersReducedMotion ||
      hasManualHeroImageSelection
    ) {
      return
    }

    const cycle = window.setInterval(() => {
      setActiveHeroImage((current) =>
        current === 'mobile' ? 'desktop' : 'mobile',
      )
    }, heroImageCycleMs)

    return () => window.clearInterval(cycle)
  }, [hasManualHeroImageSelection, isDesktopViewport, prefersReducedMotion])

  useEffect(() => {
    if (!hasManualHeroImageSelection) {
      return
    }

    const resumeRotation = window.setTimeout(() => {
      setHasManualHeroImageSelection(false)
    }, heroImageManualPauseMs)

    return () => window.clearTimeout(resumeRotation)
  }, [activeHeroImage, hasManualHeroImageSelection])

  return (
    <Box overflow="hidden">
      <Container maxW="container.xl" pt={{ base: 32, lg: 40 }} pb="0">
        <Box display="flex" justifyContent="center" mb={{ base: 5, md: 6, lg: 0 }}>
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
              Join over 121,250+ users to secure your career
            </Text>
            <Text as="span" display={{ base: 'inline', md: 'none' }}>
              Join over 121,250+ users
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
                pb="10"
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
                    p="1"
                    h="56px"
                    display="inline-grid"
                    gridTemplateColumns="46px max-content"
                    alignItems="center"
                    justifyContent="center"
                    whiteSpace="nowrap"
                    width={{ base: '100%', sm: 'auto' }}
                  >
                    <Box
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
                      justifyContent="center"
                      lineHeight="1"
                      px="8"
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
                    px="8"
                    fontSize="2xl"
                    whiteSpace="nowrap"
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
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  spacing={{ base: 3, sm: 4 }}
                  alignItems={{ base: 'center', sm: 'center' }}
                  color="white"
                  fontSize={{ base: 'sm', md: 'md' }}
                  lineHeight="1"
                  py="4"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing={{ base: 2, sm: 3 }}
                    alignItems="center"
                  >
                    <HStack spacing="0">
                      {socialProofAvatars.map((avatar, index) => (
                        <Box
                          key={avatar.src}
                          position="relative"
                          ml={index === 0 ? 0 : { base: '-1', md: '-1.5' }}
                          w={{ base: '29px', md: '33px' }}
                          h={{ base: '29px', md: '33px' }}
                          borderRadius="full"
                          overflow="hidden"
                          border="2px solid"
                          borderColor="rgba(14, 14, 16, 0.95)"
                          boxShadow="0 0 0 1px rgba(255,255,255,0.18)"
                          zIndex={socialProofAvatars.length - index}
                        >
                          <Image
                            src={avatar.src}
                            alt={avatar.alt}
                            fill
                            sizes="34px"
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                      ))}
                    </HStack>
                    <Text
                      as="span"
                      fontWeight="medium"
                      color="whiteAlpha.900"
                      whiteSpace="nowrap"
                    >
                      Trusted by <Box as="span" color="white" fontWeight="bold">121,250+</Box> job seekers
                    </Text>
                  </Stack>

                  <Box
                    display={{ base: 'none', sm: 'block' }}
                    w="1px"
                    h="18px"
                    bg="whiteAlpha.300"
                  />

                  <HStack spacing="2" color="primary.400">
                    <HStack spacing="1.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Icon key={index} as={FaStar} boxSize={{ base: '13px', md: '14px' }} />
                      ))}
                    </HStack>
                    <Text as="span" color="whiteAlpha.800" fontWeight="medium">
                      <Box as="span" color="white" fontWeight="bold">4.8</Box> / 5.0
                    </Text>
                  </HStack>
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
                overflow={{ base: 'hidden', lg: 'visible' }}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                zIndex={1}
              >
                <Box
                  overflow="visible"
                  transform={{ base: 'translate(48px, 36px)', md: 'none' }}
                  position="relative"
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
                      opacity: visibleHeroImage === 'mobile' ? 1 : 0,
                      transition: heroImageTransition,
                      maskImage:
                        'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
                    }}
                  />
                  <Box
                    display={{ base: 'none', lg: 'block' }}
                    position="absolute"
                    top="0"
                    left="0"
                    h="88%"
                    w="fit-content"
                  >
                    <HStack
                      position="absolute"
                      top="-12"
                      right="0"
                      zIndex={2}
                      p="1"
                      spacing="1"
                      borderRadius="full"
                      bg="rgba(12, 12, 14, 0.72)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      boxShadow="0 18px 55px rgba(0, 0, 0, 0.34)"
                      backdropFilter="blur(18px)"
                    >
                      {(['mobile', 'desktop'] as const).map((image) => {
                        const isSelected = visibleHeroImage === image

                        return (
                          <Box
                            key={image}
                            as="button"
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => selectHeroImage(image)}
                            px="3"
                            h="6"
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="semibold"
                            color={isSelected ? 'white' : 'whiteAlpha.700'}
                            bg={isSelected ? 'whiteAlpha.200' : 'transparent'}
                            transition="all 160ms ease"
                            _hover={{
                              color: 'white',
                              bg: isSelected
                                ? 'whiteAlpha.200'
                                : 'whiteAlpha.100',
                            }}
                          >
                            <HStack spacing="1.5">
                              <Icon
                                as={
                                  image === 'mobile'
                                    ? FiSmartphone
                                    : FiMonitor
                                }
                                boxSize="3"
                              />
                              <Text as="span">
                                {image === 'mobile' ? 'Mobile' : 'Desktop'}
                              </Text>
                            </HStack>
                          </Box>
                        )
                      })}
                    </HStack>
                    <Image
                      src="/static/screenshots/interview-copilot-desktop.png"
                      width={648}
                      height={716}
                      alt="Interview Pilot desktop Copilot app screenshot"
                      priority
                      sizes="(max-width: 1199px) 610px, 58vw"
                      style={{
                        width: 'auto',
                        height: '100%',
                        maxWidth: 'none',
                        objectFit: 'contain',
                        display: 'block',
                        opacity: visibleHeroImage === 'desktop' ? 1 : 0,
                        transition: heroImageTransition,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>

    </Box>
  )
}
