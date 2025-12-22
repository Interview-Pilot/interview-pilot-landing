'use client'

import { Box, Heading, Text, Badge, HStack, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '#lib/utils'

interface PostCardProps {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  image?: string
  tags?: string[]
  readingTime?: number
}

export function PostCard({
  slug,
  title,
  description,
  date,
  author,
  image,
  tags = [],
  readingTime,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        overflow="hidden"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        transition="all 0.3s ease"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {image && (
          <Box position="relative" height="200px" overflow="hidden">
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}

        <VStack
          p={6}
          spacing={3}
          align="stretch"
          flex="1"
          justify="space-between"
        >
          <Box>
            <HStack spacing={2} mb={2} flexWrap="wrap">
              <Text fontSize="sm" color="gray.400">
                {formatDate(date)}
              </Text>
              {readingTime && (
                <>
                  <Text fontSize="sm" color="gray.500">
                    •
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    {readingTime} min read
                  </Text>
                </>
              )}
            </HStack>

            <Heading
              as="h3"
              size="md"
              mb={2}
              noOfLines={2}
              _dark={{ color: 'white' }}
              _light={{ color: 'gray.800' }}
            >
              {title}
            </Heading>

            <Text
              color="gray.400"
              fontSize="sm"
              noOfLines={3}
              lineHeight="1.6"
            >
              {description}
            </Text>
          </Box>

          <Box>
            {author && (
              <Text fontSize="xs" color="gray.500" mb={2}>
                By {author}
              </Text>
            )}

            {tags.length > 0 && (
              <HStack spacing={2} flexWrap="wrap">
                {tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    colorScheme="yellow"
                    variant="subtle"
                    fontSize="xs"
                    px={2}
                    py={0.5}
                    borderRadius="full"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 2 && (
                  <Text fontSize="xs" color="gray.500">
                    +{tags.length - 2}
                  </Text>
                )}
              </HStack>
            )}
          </Box>
        </VStack>
      </Box>
    </Link>
  )
}
