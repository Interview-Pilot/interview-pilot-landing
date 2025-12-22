'use client'

import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ButtonLink } from '#components/button-link/button-link'
import { usePlatform } from '#hooks/use-platform'
import { ASSETS, INTERNAL_ROUTES } from '#constants'

/**
 * AppStoreBanner component displays a fixed bottom banner on mobile
 * that promotes the app download with platform-specific messaging
 */
export function AppStoreBanner() {
  const [visible, setVisible] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)
  const platform = usePlatform()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      // Only update visibility if there's a significant change in scroll position
      if (Math.abs(scrollPos - currentScrollPos) > 10) {
        const isVisible = scrollPos > currentScrollPos || currentScrollPos < 10
        setScrollPos(currentScrollPos)
        setVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPos])

  const storeImage = platform === 'ios'
    ? ASSETS.images.appleAppStore
    : ASSETS.images.googlePlayStore

  const storeText = platform === 'ios'
    ? 'Download on the App Store'
    : 'Get it on Google Play'

  return (
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
      zIndex="1000"
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
            <Text color="white" fontWeight="bold" fontSize="sm">
              Interview Pilot
            </Text>
            <Text color="yellow.400" fontSize="xs" fontWeight="medium">
              4.9 / 5 ★
            </Text>
          </HStack>
          <Text color="gray.300" fontSize="xs">
            {storeText}
          </Text>
        </VStack>
      </Stack>

      <ButtonLink
        href={INTERNAL_ROUTES.downloadHero}
        colorScheme="primary"
        size="sm"
        color="black"
        fontWeight="bold"
        leftIcon={
          <Image
            src={storeImage}
            width={14}
            height={14}
            alt={platform === 'ios' ? 'Apple' : 'Google Play'}
          />
        }
      >
        Try It Now
      </ButtonLink>
    </Box>
  )
}
