'use client'

import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import Image from 'next/image'

import { Section, SectionTitle } from '#components/section'
import { APP_STORE_LINKS, ASSETS, PLATFORM_LINKS } from '#constants'
import { sectionContentStyles } from '#theme/styles/section-styles'

interface DownloadOptionsSectionProps {
  title?: React.ReactNode
  description?: React.ReactNode
  largeTitle?: boolean
}

/**
 * Download options section with links to both app stores
 */
export function DownloadOptionsSection(props: DownloadOptionsSectionProps) {
  const {
    title = 'Download',
    description = 'Choose your platform to download Interview Pilot',
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
      <Section id="download-options" innerWidth="container.md">
        <SectionTitle
          title={sectionTitle}
          description={description}
          align="center"
          mb={8}
        />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={6}
          width="100%"
          justify="center"
          align="center"
          position="relative"
          zIndex={1}
        >
          <Link
            href={APP_STORE_LINKS.ios}
            isExternal
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          >
            <Image
              src={ASSETS.images.appStoreBadge}
              alt="Download on the App Store"
              width={180}
              height={60}
              style={{ height: '60px', width: 'auto' }}
            />
          </Link>

          <Link
            href={APP_STORE_LINKS.android}
            isExternal
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          >
            <Image
              src={ASSETS.images.androidBadge}
              alt="Get it on Google Play"
              width={180}
              height={60}
              style={{ height: '60px', width: 'auto' }}
            />
          </Link>
        </Flex>

        <Text
          mt="8"
          textAlign="center"
          fontSize="sm"
          color="whiteAlpha.700"
          position="relative"
          zIndex={1}
        >
          For desktop (macOS), download{' '}
          <Link
            href={PLATFORM_LINKS.desktopDownload}
            isExternal
            color="white"
            textDecoration="underline"
            _hover={{ color: 'whiteAlpha.900' }}
          >
            here
          </Link>
          .
        </Text>
      </Section>
    </Box>
  )
}
