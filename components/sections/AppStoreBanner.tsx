'use client'

import { Box, HStack, Portal, Stack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'

import { ButtonLink } from '#components/button-link/button-link'
import { ASSETS } from '#constants'
import { usePlatform } from '#hooks/use-platform'
import { useScrollReveal } from '#hooks/use-scroll-reveal'
import { getPrimaryDownloadHref } from '#lib/download-routing'

/**
 * AppStoreBanner component displays a fixed bottom banner on mobile
 * that promotes the app download with platform-specific messaging
 */
export function AppStoreBanner() {
  const platform = usePlatform()
  const visible = useScrollReveal()
  const primaryDownloadHref = getPrimaryDownloadHref(platform)

  const isIOS = platform === 'ios'
  const isAndroid = platform === 'android'
  const isMacOS = platform === 'macos'

  const storeIcon = isIOS
    ? '/static/icons/platforms/apple.svg'
    : isAndroid
      ? '/static/icons/platforms/google-play.svg'
      : null

  const storeText = isIOS
    ? 'Download on the App Store'
    : isAndroid
      ? 'Get it on Google Play'
      : isMacOS
        ? 'Download for macOS'
        : 'View download options'

  return (
    <Portal>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="rgba(0, 0, 0, 0.85)"
        backdropFilter="blur(10px)"
        py="3"
        px="4"
        display={{ base: 'flex', md: 'none' }}
        alignItems="center"
        justifyContent="space-between"
        borderTop="1px solid rgba(255, 255, 255, 0.1)"
        zIndex="toast"
        boxShadow="0 -4px 10px rgba(0, 0, 0, 0.1)"
        transform={visible ? 'translateY(0)' : 'translateY(100%)'}
        transition="transform 0.3s ease-in-out"
      >
        <Stack direction="row" spacing="3" align="center" flex="1">
          <Image
            src={ASSETS.images.logo}
            width={40}
            height={40}
            alt="App Icon"
            style={{ borderRadius: '8px' }}
          />
          <VStack align="flex-start" spacing="0">
            <HStack spacing="2" align="center">
              <Text
                color="white"
                fontWeight="bold"
                fontSize="sm"
                fontFamily="var(--font-dm-sans)"
              >
                Interview Pilot
              </Text>
              <Text color="primary.400" fontSize="xs" fontWeight="medium">
                4.9 / 5 ★
              </Text>
            </HStack>
            <Text color="gray.300" fontSize="xs">
              {storeText}
            </Text>
          </VStack>
        </Stack>

        <ButtonLink
          href={primaryDownloadHref}
          variant="primary"
          size="sm"
          color="black"
          fontWeight="bold"
          leftIcon={
            storeIcon ? (
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                boxSize="14px"
                flexShrink={0}
              >
                <Image
                  src={storeIcon}
                  width={14}
                  height={14}
                  alt={isIOS ? 'Apple' : 'Google Play'}
                  style={{ display: 'block' }}
                />
              </Box>
            ) : undefined
          }
        >
          Try It FREE
        </ButtonLink>
      </Box>
    </Portal>
  )
}
