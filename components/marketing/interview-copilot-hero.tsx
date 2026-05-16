'use client'

import {
  Box,
  Container,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Br } from '@saas-ui/react'
import Image from 'next/image'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'

import { Em } from '#components/typography'
import { ASSETS } from '#constants'
import { heroPulseAnimation } from '#theme/styles/section-styles'

export function InterviewCopilotHero() {
  return (
    <Box overflow="hidden">
      <Container maxW="container.lg" pt={{ base: 32, lg: 40 }} pb={{ base: 14, md: 20 }}>
        <VStack
          spacing={8}
          textAlign="center"
          align="center"
        >
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

          <Text
            as="h1"
            mt={8}
            fontSize={{ base: '55px', sm: '56px', md: '64px', lg: '76px' }}
            fontWeight="bold"
            lineHeight="1.05"
            position="relative"
            zIndex={1}
          >
            <Box as="span" display="inline-flex" alignItems="center" gap="6">
              <Box as="span">Copilot</Box>
              <Box
                position="relative"
                display="inline-block"
                w={4}
                h={4}
                borderRadius="full"
                bg="green.400"
                animation="pulse 2s infinite"
                sx={heroPulseAnimation}
              />
            </Box>
            <Br /> for Interview
          </Text>

          <Box fontWeight="medium">
            <Text
              maxW="780px"
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
              color="whiteAlpha.900"
              position="relative"
              zIndex={1}
            >
              Use <Em color="primary.400">Copilot for Interview</Em> to get real-time answers,
              <Br /> follow-up suggestions, and structured talking points during live interviews.
            </Text>
          </Box>

          <HStack
            spacing="8"
            position="relative"
            zIndex={1}
            justifyContent="center"
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
        </VStack>
      </Container>

      <Container maxW="container.lg" pt={{ base: 14, md: 20 }} pb={{ base: 8, md: 10 }}>
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          <Box textAlign="center" position="relative" zIndex={1}>
            <Text as="h2" fontSize={{ base: '4xl', lg: '4xl' }} fontWeight="bold" color="white">
              Desktop Copilot
            </Text>
            <Text
              mt={3}
              mx="auto"
              maxW="760px"
              fontSize={{ base: 'xl', lg: '2xl' }}
              color="gray.400"
              lineHeight="1.6"
            >
              Use the desktop app for a focused interview overlay with live answer
              guidance, follow-up suggestions, and keyboard-first controls.
            </Text>
          </Box>

          <Box position="relative" zIndex={1} maxW="860px" mx="auto">
            <Image
              src="/static/screenshots/interview-copilot-desktop.png"
              width={800}
              height={642}
              alt="Interview Pilot desktop Copilot answer interface"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>
        </VStack>
      </Container>

      <Container maxW="container.xl" pt={{ base: 8, md: 10 }} pb={{ base: 14, md: 24 }}>
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          <Box textAlign="center" position="relative" zIndex={1}>
            <Text as="h2" fontSize={{ base: '4xl', lg: '4xl' }} fontWeight="bold" color="white">
              Mobile Copilot
            </Text>
            <Text
              mt={3}
              mx="auto"
              maxW="760px"
              fontSize={{ base: 'xl', lg: '2xl' }}
              color="gray.400"
              lineHeight="1.6"
            >
              Run Interview Pilot on iOS or Android as a separate device experience.
              Get answer support without directly interacting with your desktop
              interview application.
            </Text>
          </Box>

          <Box
            position="relative"
            maxW="420px"
            mx="auto"
            sx={{
              maskImage:
                'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={ASSETS.screenshots.heroHand}
                width={420}
                height={419}
                alt="Interview Pilot mobile Copilot app"
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
