// Create: app/subscription/weekly/page.tsx
'use client'

import React from 'react'
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  HStack,
  Icon,
  Stack
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import { ButtonLink } from '#components/button-link/button-link'
import { BackgroundGradient } from '#components/gradients/background-gradient'

export default function SubscriptionPage() {
  // Add smart app banner via useEffect if needed
  React.useEffect(() => {
    const metaTag = document.createElement('meta')
    metaTag.name = 'apple-itunes-app'
    metaTag.content = 'app-id=6743263009, app-argument=interviewpilot://subscription/weekly'
    document.head.appendChild(metaTag)
    
    return () => {
      document.head.removeChild(metaTag)
    }
  }, [])

  return (
    <Box position="relative" minH="100vh">
      <BackgroundGradient height="100%" zIndex="-1" />
      
      <Container maxW="container.md" py="20">
        <VStack spacing="8" textAlign="center">
          <VStack spacing="4">
            <Heading
              fontSize={['3xl', '4xl', '5xl']}
              fontWeight="extrabold"
              color="white"
              fontFamily="var(--font-dm-sans)"
            >
              Interview Pilot Pro
            </Heading>
            <Text
              fontSize={['lg', 'xl']}
              color="whiteAlpha.900"
              fontWeight="medium"
            >
              Ace your interviews with AI
            </Text>
          </VStack>
          
          <VStack spacing="4" align="center" maxW="md" w="full">
            <HStack spacing="3" align="center">
              <Icon as={FiCheck} color="green.400" boxSize={5} />
              <Text color="whiteAlpha.900" fontSize="lg">
                1,000 Copilot Uses Weekly
              </Text>
            </HStack>
            
            <HStack spacing="3" align="center">
              <Icon as={FiCheck} color="green.400" boxSize={5} />
              <Text color="whiteAlpha.900" fontSize="lg">
                Advanced Voice Recognition
              </Text>
            </HStack>
            
            <HStack spacing="3" align="center">
              <Icon as={FiCheck} color="green.400" boxSize={5} />
              <Text color="whiteAlpha.900" fontSize="lg">
                Full Copilot Customization
              </Text>
            </HStack>
            
            <HStack spacing="3" align="center">
              <Icon as={FiCheck} color="green.400" boxSize={5} />
              <Text color="whiteAlpha.900" fontSize="lg">
                Unlimited Interview History
              </Text>
            </HStack>
          </VStack>
          
          <Stack spacing="4" pt="4">
            <ButtonLink
              href="https://apps.apple.com/app/id6743263009"
              colorScheme="primary"
              size="lg"
              color="black"
              fontWeight="bold"
              px="8"
            >
              Open Interview Pilot
            </ButtonLink>
            
            <Text
              fontSize="sm"
              color="whiteAlpha.700"
            >
              Already have the app? It should open automatically.
            </Text>
          </Stack>
        </VStack>
      </Container>
    </Box>
  )
}