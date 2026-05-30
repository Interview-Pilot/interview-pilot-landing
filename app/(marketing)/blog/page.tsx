import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
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
            <VStack spacing={3} align="start" mb={8}>
              <Heading as="h2" size="xl">
                Browse by topic
              </Heading>
              <Text color="app.text.muted" maxW="2xl">
                Category hubs organize articles by search intent and link related
                resources across guides, questions, and product pages.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              {blogCategories.map((category) => (
                <LinkBox
                  key={category.slug}
                  as="article"
                  p={6}
                  borderWidth="1px"
                  borderRadius="2xl"
                  bg="app.surface.card"
                  borderColor="app.border.subtle"
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: 'primary.400',
                    transform: 'translateY(-2px)',
                  }}
                >
                  <VStack align="start" spacing={3}>
                    <LinkOverlay as={Link} href={`/blog/${category.slug}`}>
                      <Heading as="h3" size="md">
                        {category.label}
                      </Heading>
                    </LinkOverlay>
                    <Text color="app.text.muted" fontSize="sm" lineHeight="1.7">
                      {category.description}
                    </Text>
                  </VStack>
                </LinkBox>
              ))}
            </SimpleGrid>
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
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
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
