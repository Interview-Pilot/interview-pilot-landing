'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Icon,
  InputGroup,
  InputRightElement,
  IconButton,
  List,
  ListItem,
  ListIcon,
  Spinner,
} from '@chakra-ui/react'
import { FiCheckCircle, FiXCircle, FiSmartphone, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi'

type ResetState = 'form' | 'loading' | 'success' | 'error'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <Container maxW="container.sm" py={16}>
        <VStack spacing={8} textAlign="center" minH="60vh" justify="center">
          <Spinner size="xl" color="green.500" thickness="4px" />
          <Heading as="h1" size="lg">Loading...</Heading>
        </VStack>
      </Container>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [state, setState] = useState<ResetState>(token ? 'form' : 'error')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(token ? '' : 'No reset token provided')

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
  ]

  const allRequirementsMet = passwordRequirements.every((req) => req.met)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!allRequirementsMet || !passwordsMatch) {
      return
    }

    setState('loading')

    try {
      const response = await fetch('https://api.interviewpilot.app/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      })

      const data = await response.json()

      if (response.ok) {
        setState('success')
      } else {
        setState('error')
        setErrorMessage(data.error || 'Password reset failed')
      }
    } catch (error) {
      setState('error')
      setErrorMessage('Unable to connect to server. Please try again.')
    }
  }

  const openApp = () => {
    window.location.href = 'interviewpilot://login'
  }

  return (
    <Container maxW="container.sm" py={16}>
      <VStack spacing={8} textAlign="center" minH="60vh" justify="center">
        {state === 'form' && (
          <Box w="100%" maxW="400px">
            <Heading as="h1" size="xl" mb={2}>
              Reset Password
            </Heading>
            <Text color="gray.600" mb={8}>
              Enter your new password below.
            </Text>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      size="lg"
                    />
                    <InputRightElement h="full">
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Box textAlign="left" fontSize="sm">
                  <List spacing={1}>
                    {passwordRequirements.map((req, index) => (
                      <ListItem key={index} color={req.met ? 'green.500' : 'gray.500'}>
                        <ListIcon as={req.met ? FiCheck : FiX} />
                        {req.label}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <FormControl isInvalid={confirmPassword.length > 0 && !passwordsMatch}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    size="lg"
                  />
                  <FormErrorMessage>Passwords do not match</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  colorScheme="green"
                  isDisabled={!allRequirementsMet || !passwordsMatch}
                  mt={4}
                >
                  Reset Password
                </Button>
              </VStack>
            </form>
          </Box>
        )}

        {state === 'loading' && (
          <>
            <Heading as="h1" size="lg">
              Resetting password...
            </Heading>
          </>
        )}

        {state === 'success' && (
          <>
            <Icon as={FiCheckCircle} boxSize={16} color="green.500" />
            <Heading as="h1" size="xl" color="green.600">
              Password Reset!
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Your password has been successfully reset. You can now log in with your new password.
            </Text>
            <Button
              size="lg"
              colorScheme="green"
              leftIcon={<FiSmartphone />}
              onClick={openApp}
              mt={4}
            >
              Open App to Login
            </Button>
          </>
        )}

        {state === 'error' && (
          <>
            <Icon as={FiXCircle} boxSize={16} color="red.500" />
            <Heading as="h1" size="xl" color="red.600">
              Reset Failed
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {errorMessage}
            </Text>
            <Box mt={4}>
              <Text color="gray.500" fontSize="sm">
                This can happen if:
              </Text>
              <VStack spacing={1} mt={2} color="gray.500" fontSize="sm">
                <Text>• The link has expired (valid for 1 hour)</Text>
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
              Open App
            </Button>
          </>
        )}
      </VStack>
    </Container>
  )
}
