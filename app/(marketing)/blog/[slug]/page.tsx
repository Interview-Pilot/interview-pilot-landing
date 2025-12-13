import { notFound } from 'next/navigation';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  HStack,
  VStack,
  Badge,
  Button,
  Divider,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '../../../../lib/blog';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const post = await getPostBySlug(params.slug);
    
    return {
      title: `${post.title} | Interview Pilot`,
      description: post.excerpt,
      keywords: post.tags?.join(', '),
      authors: post.author ? [{ name: post.author }] : undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
        tags: post.tags,
        images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.image ? [post.image] : undefined,
      },
      alternates: {
        canonical: `/blog/${params.slug}`,
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const baseUrl = 'https://interviewpilot.app'

// JSON-LD structured data for better SEO
function generateStructuredData(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    author: {
      '@type': 'Person',
      name: post.author || 'Interview Pilot Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Interview Pilot',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/static/images/interviewpilot_newlogo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
  };
}

// Breadcrumb structured data for navigation
function generateBreadcrumbData(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  let relatedPosts;

  try {
    post = await getPostBySlug(params.slug);
    const allPosts = await getAllPosts();
    // Get up to 3 related posts, excluding the current one
    relatedPosts = allPosts
      .filter((p) => p.slug !== params.slug)
      .slice(0, 3);
  } catch {
    notFound();
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbData(post)),
        }}
      />

      <Box bg="white" _dark={{ bg: 'gray.800' }}>
        {/* Navigation */}
        <Box borderBottom="1px" borderColor="gray.200" bg="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600' }}>
          <Container maxW="container.lg" py={4}>
            <Button
              as={Link}
              href="/blog"
              variant="ghost"
              colorScheme="blue"
            >
              ← Back to Blog
            </Button>
          </Container>
        </Box>

        {/* Article Header */}
        <Container maxW="container.lg" pt={12} pb={8}>
          <VStack spacing={6} textAlign="center">
            {/* Hero Image */}
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                maxH="400px"
                w="100%"
                objectFit="cover"
                borderRadius="lg"
                shadow="lg"
              />
            )}

            <Heading 
              as="h1" 
              size="2xl" 
              fontWeight="bold" 
              lineHeight="1.2"
              textAlign="center"
              maxW="4xl"
            >
              {post.title}
            </Heading>
            
            <HStack 
              spacing={6} 
              flexWrap="wrap" 
              justify="center" 
              color="gray.600"
              fontSize="sm"
            >
              <HStack>
                <Text>📅</Text>
                <Text as="time" dateTime={post.date}>
                  {formatDate(post.date)}
                </Text>
              </HStack>
              
              <HStack>
                <Text>🕐</Text>
                <Text>{post.readTime} min read</Text>
              </HStack>
              
              {post.author && (
                <HStack>
                  <Text>👤</Text>
                  <Text>{post.author}</Text>
                </HStack>
              )}
            </HStack>

            {post.tags && post.tags.length > 0 && (
              <HStack spacing={2} flexWrap="wrap" justify="center">
                {post.tags.map((tag) => (
                  <Badge key={tag} colorScheme="blue" variant="subtle" px={3} py={1}>
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}
          </VStack>
        </Container>

        <Divider />

        {/* Article Content */}
        <Container maxW="container.md" py={12}>
          <Box
            className="blog-content"
            sx={{
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                fontWeight: 'bold',
                color: 'inherit',
                lineHeight: '1.3',
                mb: 4,
                mt: 8,
              },
              '& h1': { fontSize: '2xl' },
              '& h2': { fontSize: 'xl' },
              '& h3': { fontSize: 'lg' },
              '& p': {
                mb: 4,
                lineHeight: '1.7',
                color: 'gray.700',
                _dark: { color: 'gray.300' },
              },
              '& a': {
                color: 'blue.500',
                textDecoration: 'underline',
                _hover: { color: 'blue.600' },
              },
              '& ul, & ol': {
                mb: 4,
                pl: 6,
                '& li': {
                  mb: 2,
                  lineHeight: '1.6',
                },
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'blue.500',
                bg: 'blue.50',
                _dark: { bg: 'blue.900' },
                p: 4,
                mb: 6,
                fontStyle: 'italic',
                borderRadius: 'md',
              },
              '& pre': {
                bg: 'gray.900',
                color: 'gray.100',
                p: 4,
                borderRadius: 'md',
                overflow: 'auto',
                mb: 6,
                fontSize: 'sm',
              },
              '& code': {
                bg: 'gray.100',
                _dark: { bg: 'gray.700' },
                px: 1,
                py: 0.5,
                borderRadius: 'sm',
                fontSize: 'sm',
              },
              '& pre code': {
                bg: 'transparent',
                p: 0,
              },
              '& img': {
                borderRadius: 'lg',
                shadow: 'md',
                maxW: '100%',
                height: 'auto',
                mb: 6,
              },
              '& table': {
                width: '100%',
                borderCollapse: 'collapse',
                mb: 6,
                '& th, & td': {
                  border: '1px solid',
                  borderColor: 'gray.200',
                  _dark: { borderColor: 'gray.600' },
                  p: 3,
                  textAlign: 'left',
                },
                '& th': {
                  bg: 'gray.50',
                  _dark: { bg: 'gray.700' },
                  fontWeight: 'bold',
                },
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <Box borderTop="1px" borderColor="gray.200" _dark={{ borderColor: 'gray.600' }}>
            <Container maxW="container.lg" py={12}>
              <VStack spacing={8} align="stretch">
                <Heading size="lg" textAlign="center">
                  More Articles
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {relatedPosts.map((relatedPost) => (
                    <LinkBox
                      key={relatedPost.slug}
                      as="article"
                      p={5}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg="white"
                      _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
                      _hover={{
                        shadow: 'md',
                        borderColor: 'blue.500',
                      }}
                      transition="all 0.2s"
                    >
                      {relatedPost.image && (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          borderRadius="md"
                          mb={4}
                          h="140px"
                          w="100%"
                          objectFit="cover"
                        />
                      )}
                      <VStack align="start" spacing={2}>
                        <LinkOverlay as={Link} href={`/blog/${relatedPost.slug}`}>
                          <Heading size="md" noOfLines={2}>
                            {relatedPost.title}
                          </Heading>
                        </LinkOverlay>
                        <Text color="gray.600" _dark={{ color: 'gray.400' }} fontSize="sm" noOfLines={2}>
                          {relatedPost.excerpt}
                        </Text>
                        <HStack spacing={2} fontSize="xs" color="gray.500">
                          <Text>{formatDate(relatedPost.date)}</Text>
                          <Text>•</Text>
                          <Text>{relatedPost.readTime} min read</Text>
                        </HStack>
                      </VStack>
                    </LinkBox>
                  ))}
                </SimpleGrid>
                <Box textAlign="center">
                  <Button
                    as={Link}
                    href="/blog"
                    variant="outline"
                    colorScheme="blue"
                  >
                    View All Articles
                  </Button>
                </Box>
              </VStack>
            </Container>
          </Box>
        )}

        {/* Newsletter CTA */}
        <Box bg="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600' }} borderTop="1px" borderColor="gray.200">
          <Container maxW="container.md" py={12} textAlign="center">
            <VStack spacing={6}>
              <Heading size="lg">
                Stay Updated
              </Heading>
              <Text color="gray.600" maxW="md">
                Get the latest interview tips and AI insights delivered to your inbox.
              </Text>
              <HStack spacing={4} maxW="md" w="100%">
                <Box flex="1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                    }}
                  />
                </Box>
                <Button colorScheme="blue" size="lg">
                  Subscribe
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Box>
    </>
  );
}