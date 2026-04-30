'use client'

import { Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { pulseAnimation, statusDotPulseStyles } from '#theme/styles/section-styles'

/**
 * SystemStatus component displays a floating status indicator
 * that shows/hides based on scroll direction
 */
export function SystemStatus() {
  return null

  const [visible, setVisible] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const isVisible = scrollPos > currentScrollPos || currentScrollPos < 10

      setScrollPos(currentScrollPos)
      setVisible(isVisible)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPos])

  return (
    <Box
      position="fixed"
      top="calc(80px + var(--announcement-offset, 42px))"
      left="50%"
      transform={`translateX(-50%) ${visible ? 'translateY(0)' : 'translateY(-150%)'}`}
      opacity={visible ? 1 : 0}
      transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
      zIndex="1000"
      px="3"
      py="2"
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.15)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.2)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="2"
    >
      <Box
        w="10px"
        h="10px"
        bg="green.400"
        alignSelf="center"
        sx={{
          ...statusDotPulseStyles,
          '@keyframes pulseRing': pulseAnimation['@keyframes pulseRing'],
        }}
      />
      <Text
        fontWeight="medium"
        color="white"
        fontSize="sm"
        lineHeight="1"
        alignSelf="center"
      >
        All Systems Online
      </Text>
    </Box>
  )
}
