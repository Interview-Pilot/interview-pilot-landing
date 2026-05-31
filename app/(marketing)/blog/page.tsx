import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'

import { PostCard } from '#components/blog'
import { blogCategories } from '#data/blog'
import { getPublishedPosts } from '#lib/blog'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Interview Pilot Blog | Interview Prep, Recruiting & AI Hiring Research',
  description:
    'Research-backed interview preparation articles, recruiting trend analysis, AI interview tool guides, career advice, and company interview insights.',
  keywords:
    'interview prep blog, recruiting trends, AI interview tools, interview research, career advice, company interviews',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Interview Pilot Blog | Interview Prep, Recruiting & AI Hiring Research',
    description:
      'Research-backed interview preparation articles, recruiting trend analysis, AI interview tool guides, career advice, and company interview insights.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Pilot Blog',
    description:
      'Interview prep, recruiting trends, AI hiring research, and career advice for job seekers.',
  },
}

export default function BlogPage() {
  const publishedPosts = getPublishedPosts()
  const featuredPosts = publishedPosts.slice(0, 3)

  return (
    <Box bg="app.bg" pt={20}>
      <Box borderBottom="1px" borderColor="app.border.subtle">
        <Container maxW="container.xl" py={{ base: 14, md: 20 }}>
          <VStack spacing={6} textAlign="center">
            <Badge colorScheme="yellow" variant="subtle" px={4} py={1.5}>
              Interview Pilot Research
            </Badge>
            <Heading as="h1" size="3xl" fontWeight="bold" maxW="4xl">
              Interview prep, recruiting trends, and AI hiring research
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="app.text.muted" maxW="3xl">
              Deep, practical articles for candidates navigating competitive interviews,
              changing hiring markets, and the rise of AI interview tools.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={{ base: 12, md: 16 }}>
        <VStack spacing={{ base: 12, md: 16 }} align="stretch">
          <Box>
            <VStack spacing={3} align="start" mb={5}>
              <Heading as="h2" size="xl">
                Browse by topic
              </Heading>
            </VStack>

            <HStack spacing={3} flexWrap="wrap">
              {blogCategories.map((category) => (
                <Box
                  key={category.slug}
                  as={Link}
                  href={`/blog/${category.slug}`}
                  px={4}
                  py={2}
                  borderWidth="1px"
                  borderRadius="full"
                  bg="whiteAlpha.50"
                  borderColor="app.border.subtle"
                  color="app.text.primary"
                  fontSize="sm"
                  fontWeight="medium"
                  textDecoration="none"
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: 'primary.400',
                    bg: 'rgba(254, 204, 4, 0.08)',
                    color: 'primary.300',
                  }}
                >
                  {category.label}
                </Box>
              ))}
            </HStack>
          </Box>

          <Box>
            <HStack justify="space-between" align="end" mb={8}>
              <VStack spacing={3} align="start">
                <Heading as="h2" size="xl">
                  Latest articles
                </Heading>
                <Text color="app.text.muted" maxW="2xl">
                  New research and interview strategy articles will appear here as the
                  editorial pipeline publishes them.
                </Text>
              </VStack>
            </HStack>

            {featuredPosts.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={{ base: 6, lg: 5 }}>
                {featuredPosts.map((post) => (
                  <PostCard
                    key={post.slugAsParams}
                    slug={post.slugAsParams}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    lastUpdated={post.lastUpdated}
                    author={post.author}
                    image={post.image}
                    imageAlt={post.imageAlt}
                    category={post.category}
                    tags={post.tags}
                    readingTime={post.readingTime}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Box
                borderWidth="1px"
                borderColor="app.border.subtle"
                borderRadius="2xl"
                bg="app.surface.card"
                px={{ base: 6, md: 10 }}
                py={{ base: 10, md: 14 }}
                textAlign="center"
              >
                <Heading as="h3" size="lg" mb={3}>
                  New research posts coming soon
                </Heading>
                <Text color="app.text.muted" maxW="2xl" mx="auto">
                  The blog is being rebuilt around deeper research, clearer topic
                  hubs, and stronger internal linking. Existing low-quality posts
                  have been removed from the publishing queue.
                </Text>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
