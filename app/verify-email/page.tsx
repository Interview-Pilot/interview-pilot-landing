'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Spinner,
  Icon,
} from '@chakra-ui/react'
import { FiCheckCircle, FiXCircle, FiSmartphone } from 'react-icons/fi'

type VerificationState = 'loading' | 'success' | 'error'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [state, setState] = useState<VerificationState>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setState('error')
      setErrorMessage('No verification token provided')
    }
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('https://api.interviewpilot.app/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (response.ok) {
        setState('success')
      } else {
        setState('error')
        setErrorMessage(data.error || 'Verification failed')
      }
    } catch (error) {
      setState('error')
      setErrorMessage('Unable to connect to server. Please try again.')
    }
  }

  const openApp = () => {
    window.location.href = 'interviewpilot://home'
  }

  return (
    <Container maxW="container.sm" py={16}>
      <VStack spacing={8} textAlign="center" minH="60vh" justify="center">
        {state === 'loading' && (
          <>
            <Spinner size="xl" color="green.500" thickness="4px" />
            <Heading as="h1" size="lg">
              Verifying your email...
            </Heading>
            <Text color="gray.600">
              Please wait while we verify your email address.
            </Text>
          </>
        )}

        {state === 'success' && (
          <>
            <Icon as={FiCheckCircle} boxSize={16} color="green.500" />
            <Heading as="h1" size="xl" color="green.600">
              Email Verified!
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Your email has been successfully verified. You can now access all features of Interview Pilot.
            </Text>
            <Button
              size="lg"
              colorScheme="green"
              leftIcon={<FiSmartphone />}
              onClick={openApp}
              mt={4}
            >
              Open App
            </Button>
            <Text color="gray.500" fontSize="sm">
              If the app doesn&apos;t open, please open Interview Pilot manually.
            </Text>
          </>
        )}

        {state === 'error' && (
          <>
            <Icon as={FiXCircle} boxSize={16} color="red.500" />
            <Heading as="h1" size="xl" color="red.600">
              Verification Failed
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {errorMessage}
            </Text>
            <Box mt={4}>
              <Text color="gray.500" fontSize="sm">
                This can happen if:
              </Text>
              <VStack spacing={1} mt={2} color="gray.500" fontSize="sm">
                <Text>• The link has expired (valid for 24 hours)</Text>
                <Text>• The link has already been used</Text>
                <Text>• The link was copied incorrectly</Text>
              </VStack>
            </Box>
            <Button
              size="lg"
              colorScheme="green"
              leftIcon={<FiSmartphone />}
              onClick={openApp}
              mt={4}
            >
              Open App to Resend
            </Button>
          </>
        )}
      </VStack>
    </Container>
  )
}
