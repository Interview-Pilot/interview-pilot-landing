'use client'

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Image as ChakraImage,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import Image from 'next/image'
import { FiDownload } from 'react-icons/fi'

import { Section } from '#components/section'
import { ASSETS } from '#constants'
import { getTrackedDownloadHref } from '#lib/download-routing'
import { sectionContentStyles } from '#theme/styles/section-styles'

interface DownloadOptionsSectionProps {
  title?: React.ReactNode
  description?: React.ReactNode
  largeTitle?: boolean
}

const downloadOptions = [
  {
    platform: 'macOS',
    description: 'Download the Interview Pilot desktop app for Mac.',
    href: getTrackedDownloadHref('download-options', 'macos'),
    action: 'Download',
    icon: '/static/icons/platforms/apple.svg',
    iconFilter: 'invert(1)',
  },
  {
    platform: 'Windows',
    description: 'Download the Interview Pilot desktop app for Windows.',
    href: getTrackedDownloadHref('download-options', 'windows'),
    action: 'Download',
    icon: '/static/icons/platforms/windows.svg',
  },
  {
    platform: 'iPhone & iPad',
    description: 'Use Interview Pilot from a separate iOS device.',
    href: getTrackedDownloadHref('download-options', 'ios'),
    action: 'Download on the App Store',
    icon: '/static/icons/platforms/app-store.svg',
    badge: ASSETS.images.appStoreBadge,
    badgeAlt: 'Download on the App Store',
  },
  {
    platform: 'Android',
    description: 'Use Interview Pilot from a separate Android device.',
    href: getTrackedDownloadHref('download-options', 'android'),
    action: 'Get it on Google Play',
    icon: '/static/icons/platforms/google-play.svg',
    badge: ASSETS.images.androidBadge,
    badgeAlt: 'Get it on Google Play',
  },
]

/**
 * Download options section with links to all supported platforms.
 */
export function DownloadOptionsSection(props: DownloadOptionsSectionProps) {
  const {
    title = 'Downloads',
    description = 'Choose the version of Interview Pilot that fits your interview setup.',
    largeTitle = false,
  } = props
  const sectionTitle = largeTitle ? (
    <Text as="span" display="block" fontSize={{ base: '6xl', md: '7xl' }}>
      {title}
    </Text>
  ) : (
    title
  )

  return (
    <Box sx={sectionContentStyles}>
      <Section id="download-options" innerWidth="container.xl">
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={{ base: 10, xl: 20 }}
          alignItems="start"
          position="relative"
          zIndex={1}
        >
          <Box maxW={{ base: '100%', xl: '430px' }} pt={{ base: 0, xl: 2 }}>
            <Text
              mb="4"
              fontSize="sm"
              fontWeight="800"
              color="primary.400"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              Download
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              lineHeight="0.95"
              letterSpacing="-0.045em"
              fontWeight="semibold"
              color="app.text.primary"
            >
              {sectionTitle}
            </Heading>
            <Text mt="5" fontSize={{ base: 'lg', md: 'xl' }} color="muted" lineHeight="1.55">
              {description}
            </Text>
            <Text mt="2" fontSize={{ base: 'sm', md: 'md' }} color="app.text.primary">
              One subscription works across all platforms.
            </Text>
          </Box>

          <VStack
            spacing="0"
            align="stretch"
            minW={0}
            borderTop="1px solid"
            borderColor="app.border.subtle"
          >
            {downloadOptions.map((option) => (
              <Flex
                key={option.platform}
                direction={{ base: 'column', sm: 'row' }}
                align={{ base: 'stretch', sm: 'center' }}
                justify="space-between"
                gap={{ base: 4, sm: 6 }}
                py={{ base: 5, md: 6 }}
                borderBottom="1px solid"
                borderColor="app.border.subtle"
              >
                <HStack spacing="4" align="center" minW={0}>
                  <ChakraImage
                    src={option.icon}
                    alt=""
                    boxSize={{ base: '26px', md: '30px' }}
                    objectFit="contain"
                    filter={option.iconFilter}
                    flexShrink={0}
                  />
                  <Box minW={0}>
                    <Text
                      color="app.text.primary"
                      fontSize={{ base: 'xl', md: '2xl' }}
                      fontWeight="semibold"
                      letterSpacing="-0.03em"
                    >
                      {option.platform}
                    </Text>
                    <Text color="muted" fontSize={{ base: 'sm', md: 'md' }} mt="1">
                      {option.description}
                    </Text>
                  </Box>
                </HStack>

                {option.badge ? (
                  <Link
                    href={option.href}
                    alignSelf={{ base: 'flex-start', sm: 'center' }}
                    flexShrink={0}
                    _hover={{ opacity: 0.85 }}
                    transition="opacity 0.2s"
                  >
                    <Image
                      src={option.badge}
                      alt={option.badgeAlt}
                      width={150}
                      height={50}
                      style={{ height: '50px', width: 'auto' }}
                    />
                  </Link>
                ) : (
                  <Button
                    as="a"
                    href={option.href}
                    variant="primary"
                    color="black"
                    borderRadius="full"
                    minW={{ base: '100%', sm: '164px' }}
                    flexShrink={0}
                    h="38px"
                    px="1"
                    fontWeight="bold"
                    _hover={{
                      bg: 'primary.300',
                      textDecoration: 'none',
                      transform: 'translateY(-1px)',
                    }}
                    transition="all 0.2s ease"
                  >
                    <HStack w="full" spacing="2" justify="flex-start" lineHeight="1">
                      <Box
                        w="30px"
                        h="30px"
                        borderRadius="full"
                        bg="black"
                        color="white"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Icon as={FiDownload} boxSize="13px" />
                      </Box>
                      <Text
                        as="span"
                        flex="1"
                        textAlign="center"
                        fontWeight="bold"
                        fontSize="md"
                        pr="2"
                      >
                        {option.action}
                      </Text>
                    </HStack>
                  </Button>
                )}
              </Flex>
            ))}
          </VStack>
        </SimpleGrid>
      </Section>
    </Box>
  )
}
