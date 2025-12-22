import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { posts } from '#content'
import { PostCard } from '#components/blog'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Interview Preparation Blog | Interview Pilot',
  description:
    "Expert interview strategies, AI preparation tips, and career insights. Learn how to ace technical and behavioral interviews with Interview Pilot's comprehensive guides.",
  keywords:
    'interview preparation, AI interview assistant, technical interviews, behavioral interviews, job search tips, career advice',
  openGraph: {
    title: 'Interview Preparation Blog | Interview Pilot',
    description:
      'Expert interview strategies, AI preparation tips, and career insights to help you land your dream job.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Preparation Blog | Interview Pilot',
    description:
      'Expert interview strategies and AI preparation tips for job seekers.',
  },
}

/**
 * Get published posts sorted by date (newest first)
 */
function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const publishedPosts = getPublishedPosts()

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
            <Heading as="h1" size="2xl" fontWeight="bold">
              Interview Pilot Blog
            </Heading>
            <Text
              fontSize="xl"
              color="gray.600"
              _dark={{ color: 'gray.300' }}
              maxW="2xl"
            >
              Expert interview strategies, AI-powered preparation tips, and
              career insights to help you land your dream job. Master technical
              and behavioral interviews with confidence.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Blog Posts */}
      <Box bg="gray.50" _dark={{ bg: 'gray.900' }}>
        <Container maxW="container.xl" py={12}>
          {publishedPosts.length === 0 ? (
            <VStack spacing={4} py={12} textAlign="center">
              <Heading size="lg" color="gray.500" _dark={{ color: 'gray.400' }}>
                Coming Soon: Interview Success Stories
              </Heading>
              <Text color="gray.500" _dark={{ color: 'gray.400' }}>
                We&apos;re preparing expert guides on interview preparation, AI
                tools, and career advancement. Check back soon for insider tips
                that will transform your interview game!
              </Text>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {publishedPosts.map((post) => (
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
