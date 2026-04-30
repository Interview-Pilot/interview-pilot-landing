'use client'

import { Box, Flex } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import Image from 'next/image'

import { Section, SectionTitle } from '#components/section'
import { APP_STORE_LINKS, ASSETS } from '#constants'
import { sectionContentStyles } from '#theme/styles/section-styles'

/**
 * Download options section with links to both app stores
 */
export function DownloadOptionsSection() {
  return (
    <Box sx={sectionContentStyles}>
      <Section id="download-options" innerWidth="container.md">
        <SectionTitle
          title="Download"
          description="Choose your platform to download Interview Pilot"
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
      </Section>
    </Box>
  )
}
