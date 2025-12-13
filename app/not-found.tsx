'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="container.md" textAlign="center">
        <VStack spacing={6}>
          <Heading as="h1" size="4xl" color="primary.500">
            404
          </Heading>
          <Heading as="h2" size="xl">
            Page Not Found
          </Heading>
          <Text color="muted" fontSize="lg" maxW="md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Text>
          <Button
            as={Link}
            href="/"
            colorScheme="primary"
            size="lg"
          >
            Back to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}
