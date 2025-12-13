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
    <Box minH="70vh" display="flex" alignItems="center" justifyContent="center">
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
          <VStack spacing={3}>
            <Button
              as={Link}
              href="/"
              colorScheme="primary"
              size="lg"
            >
              Back to Home
            </Button>
            <Button
              as={Link}
              href="/blog"
              variant="ghost"
              size="md"
            >
              Read Our Blog
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
