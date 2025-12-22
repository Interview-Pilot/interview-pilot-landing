'use client'

import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import Image from 'next/image'

import { APP_STORE_LINKS, ASSETS } from '#constants'
import { sectionContentStyles } from '#theme/styles/section-styles'

/**
 * Download options section with links to both app stores
 */
export function DownloadOptionsSection() {
  return (
    <Box id="download-options" py={20} sx={sectionContentStyles}>
      <Container maxW="container.md">
        <VStack spacing={8} position="relative" zIndex={1}>
          <Heading
            lineHeight="short"
            fontSize={['4xl', null, '4xl']}
            textAlign="center"
            as="h2"
          >
            Download
          </Heading>
          <Text fontSize="lg" color="muted" textAlign="center">
            Choose your platform to download Interview Pilot
          </Text>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={6}
            width="100%"
            justify="center"
            align="center"
          >
            {/* iOS Download */}
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

            {/* Android Download */}
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
        </VStack>
      </Container>
    </Box>
  )
}
