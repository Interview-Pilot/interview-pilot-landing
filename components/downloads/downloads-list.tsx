'use client'

import { Box, Button, HStack, Image, Link, Text, VStack } from '@chakra-ui/react'
import { FiDownload } from 'react-icons/fi'

import { ASSETS } from '#constants'
import { getTrackedDownloadHref } from '#lib/download-routing'

type DownloadItem = {
  platform: string
  description: string
  href: string | null
  action: string
  icon: string
  iconFilter?: string
  badge?: string
  badgeAlt?: string
}

const downloads: DownloadItem[] = [
  {
    platform: 'macOS',
    description: 'Download Interview Pilot Desktop for Mac.',
    href: getTrackedDownloadHref('downloads', 'macos'),
    action: 'Download for macOS',
    icon: '/static/icons/platforms/apple.svg',
    iconFilter: 'invert(1)',
  },
  {
    platform: 'Windows',
    description: 'Download Interview Pilot Desktop for Windows.',
    href: getTrackedDownloadHref('downloads', 'windows'),
    action: 'Download for Windows',
    icon: '/static/icons/platforms/windows.svg',
  },
  {
    platform: 'iOS',
    description: 'Download Interview Pilot on the App Store.',
    href: getTrackedDownloadHref('downloads', 'ios'),
    action: 'Download for iOS',
    icon: '/static/icons/platforms/app-store.svg',
    badge: ASSETS.images.appStoreBadge,
    badgeAlt: 'Download on the App Store',
  },
  {
    platform: 'Android',
    description: 'Download Interview Pilot on Google Play.',
    href: getTrackedDownloadHref('downloads', 'android'),
    action: 'Download for Android',
    icon: '/static/icons/platforms/google-play.svg',
    badge: ASSETS.images.androidBadge,
    badgeAlt: 'Get it on Google Play',
  },
]

export function DownloadsList() {
  return (
    <VStack spacing={0} align="stretch" position="relative" zIndex={1}>
      {downloads.map((download, index) => (
        <HStack
          key={download.platform}
          justify="space-between"
          spacing={6}
          py={5}
          borderBottomWidth={index === downloads.length - 1 ? '0' : '1px'}
          borderColor="whiteAlpha.300"
        >
          <Box>
            <HStack spacing={3}>
              <Image
                src={download.icon}
                alt=""
                boxSize="22px"
                filter={download.iconFilter}
              />
              <Text
                color="white"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
              >
                {download.platform}
              </Text>
            </HStack>
            <Text color="whiteAlpha.700" fontSize="sm" mt={1}>
              {download.description}
            </Text>
          </Box>

          {download.badge && download.href ? (
            <Link
              href={download.href}
              _hover={{ opacity: 0.85 }}
              transition="opacity 0.2s"
            >
              <Image
                src={download.badge}
                alt={download.badgeAlt}
                width="140px"
                height="auto"
              />
            </Link>
          ) : download.href ? (
            <Button
              as={Link}
              href={download.href}
              variant="primary"
              color="black"
              borderRadius="full"
              minW="200px"
              h="42px"
              fontWeight="bold"
              leftIcon={<FiDownload />}
              _hover={{
                bg: 'primary.300',
                textDecoration: 'none',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s ease"
            >
              {download.action}
            </Button>
          ) : (
            <Button
              isDisabled
              colorScheme="whiteAlpha"
              borderRadius="full"
              minW="200px"
              h="42px"
              fontWeight="bold"
              leftIcon={<FiDownload />}
              _hover={{
                bg: 'whiteAlpha.300',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s ease"
            >
              {download.action}
            </Button>
          )}
        </HStack>
      ))}
    </VStack>
  )
}
