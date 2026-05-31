'use client'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogCategoryLabel } from '#data/blog'
import { formatDate } from '#lib/utils'

interface PostCardProps {
  slug: string
  title: string
  description: string
  date: string
  lastUpdated?: string
  author?: string
  image?: string
  imageAlt?: string
  category?: string
  tags?: string[]
  readingTime?: number
}

export function PostCard({
  slug,
  title,
  description,
  date,
  lastUpdated,
  image,
  imageAlt,
  category,
  readingTime,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(10px)"
        borderRadius="3xl"
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
          <Box
            position="relative"
            height={{ base: '190px', lg: '160px' }}
            overflow="hidden"
            m={3}
            mb={0}
            borderRadius="xl"
          >
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, (max-width: 1439px) 33vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}

        <VStack p={{ base: 5, lg: 4 }} spacing={2.5} align="stretch" flex="1">
          {category && (
            <Text color="primary.300" fontSize="sm" fontWeight="medium">
              {getBlogCategoryLabel(category)}
            </Text>
          )}

          <Heading
            as="h3"
            size="md"
            noOfLines={2}
            color="app.text.primary"
          >
            {title}
          </Heading>

          <Text color="gray.400" fontSize="sm" noOfLines={2} lineHeight="1.6">
            {description}
          </Text>

          <Text fontSize="xs" color="gray.500" mt="auto">
            {formatDate(lastUpdated || date)}
            {readingTime ? ` · ${readingTime} min read` : ''}
          </Text>
        </VStack>
      </Box>
    </Link>
  )
}
