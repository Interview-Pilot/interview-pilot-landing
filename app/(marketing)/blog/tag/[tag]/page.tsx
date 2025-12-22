import { notFound } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  HStack,
  Badge,
} from '@chakra-ui/react'
import Link from 'next/link'
import { posts } from '#content'
import { PostCard } from '#components/blog'

interface TagPageProps {
  params: {
    tag: string
  }
}

/**
 * Get all unique tags from published posts
 */
function getAllTags() {
  const tagSet = new Set<string>()
  posts
    .filter((post) => post.published)
    .forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag.toLowerCase()))
    })
  return Array.from(tagSet)
}

/**
 * Get published posts with a specific tag
 */
function getPostsByTag(tag: string) {
  return posts
    .filter(
      (post) =>
        post.published &&
        post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get display name for a tag (capitalize first letter)
 */
function getTagDisplayName(tag: string) {
  return tag.charAt(0).toUpperCase() + tag.slice(1)
}

// Generate static params for all tags
export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag,
  }))
}

// Generate metadata for SEO
export function generateMetadata({ params }: TagPageProps) {
  const tagDisplay = getTagDisplayName(params.tag)
  return {
    title: `${tagDisplay} Articles | Interview Pilot Blog`,
    description: `Browse all articles about ${tagDisplay}. Expert interview strategies and tips from Interview Pilot.`,
    openGraph: {
      title: `${tagDisplay} Articles | Interview Pilot Blog`,
      description: `Browse all articles about ${tagDisplay}. Expert interview strategies and tips from Interview Pilot.`,
      type: 'website',
    },
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tagPosts = getPostsByTag(params.tag)
  const allTags = getAllTags()

  // Check if tag exists
  if (!allTags.includes(params.tag.toLowerCase())) {
    notFound()
  }

  const tagDisplay = getTagDisplayName(params.tag)

  return (
    <Box pt={20}>
      {/* Header */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Container maxW="container.xl" py={12}>
          <VStack spacing={6} textAlign="center">
            <Button
              as={Link}
              href="/blog"
              variant="ghost"
              colorScheme="blue"
              alignSelf="flex-start"
            >
              ← Back to Blog
            </Button>

            <Badge colorScheme="blue" fontSize="md" px={4} py={2}>
              {tagDisplay}
            </Badge>

            <Heading as="h1" size="2xl" fontWeight="bold">
              Articles tagged &ldquo;{tagDisplay}&rdquo;
            </Heading>

            <Text
              fontSize="lg"
              color="gray.600"
              _dark={{ color: 'gray.300' }}
              maxW="2xl"
            >
              {tagPosts.length} article{tagPosts.length !== 1 ? 's' : ''} found
            </Text>

            {/* Other Tags */}
            {allTags.length > 1 && (
              <HStack spacing={2} flexWrap="wrap" justify="center" pt={4}>
                <Text fontSize="sm" color="gray.500">
                  Other tags:
                </Text>
                {allTags
                  .filter((t) => t !== params.tag.toLowerCase())
                  .map((tag) => (
                    <Badge
                      key={tag}
                      as={Link}
                      href={`/blog/tag/${tag}`}
                      variant="subtle"
                      colorScheme="gray"
                      cursor="pointer"
                      _hover={{ colorScheme: 'blue' }}
                    >
                      {getTagDisplayName(tag)}
                    </Badge>
                  ))}
              </HStack>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Blog Posts */}
      <Box bg="gray.50" _dark={{ bg: 'gray.900' }}>
        <Container maxW="container.xl" py={12}>
          {tagPosts.length === 0 ? (
            <VStack spacing={4} py={12} textAlign="center">
              <Heading size="lg" color="gray.500" _dark={{ color: 'gray.400' }}>
                No articles found
              </Heading>
              <Text color="gray.500" _dark={{ color: 'gray.400' }}>
                There are no articles with this tag yet.
              </Text>
              <Button as={Link} href="/blog" colorScheme="blue">
                View All Articles
              </Button>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {tagPosts.map((post) => (
                <PostCard
                  key={post.slugAsParams}
                  slug={post.slugAsParams}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  author={post.author}
                  image={post.image}
                  tags={post.tags}
                  readingTime={post.readingTime}
                />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </Box>
  )
}
