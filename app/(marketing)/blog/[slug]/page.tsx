import { notFound } from 'next/navigation'
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import NextImage from 'next/image'

import { MDXContent, PostCard } from '#components/blog'
import { blogCategories } from '#data/blog'
import {
  getBlogCategoryBySlug,
  getCategoryLabel,
  getPostBySlug,
  getPostsByCategory,
  getPublishedPosts,
  getRelatedPosts,
} from '#lib/blog'
import { formatDate, getBaseUrl } from '#lib/utils'

interface BlogRoutePageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return [
    ...blogCategories.map((category) => ({ slug: category.slug })),
    ...getPublishedPosts().map((post) => ({ slug: post.slugAsParams })),
  ]
}

export function generateMetadata({ params }: BlogRoutePageProps) {
  const category = getBlogCategoryBySlug(params.slug)

  if (category) {
    return {
      title: category.title,
      description: category.description,
      alternates: {
        canonical: `/blog/${category.slug}`,
      },
      openGraph: {
        title: category.title,
        description: category.description,
        type: 'website',
        url: `/blog/${category.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: category.h1,
        description: category.description,
      },
    }
  }

  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const dateModified = post.lastUpdated || post.date

  return {
    title: `${post.title} | Interview Pilot`,
    description: post.description,
    keywords: [
      post.primaryKeyword,
      ...(post.secondaryKeywords || []),
      ...(post.tags || []),
    ]
      .filter(Boolean)
      .join(', '),
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: {
      canonical: `/blog/${post.slugAsParams}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: dateModified,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.image ? [{ url: post.image, alt: post.imageAlt || post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

function generateBlogPostingData(post: NonNullable<ReturnType<typeof getPostBySlug>>) {
  const baseUrl = getBaseUrl()
  const dateModified = post.lastUpdated || post.date

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    author: {
      '@type': 'Organization',
      name: post.author || 'Interview Pilot',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Interview Pilot',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/static/images/interview_pilot_logo_ui.png`,
      },
    },
    datePublished: post.date,
    dateModified,
    articleSection: getCategoryLabel(post.category),
    keywords: [
      post.primaryKeyword,
      ...(post.secondaryKeywords || []),
      ...(post.tags || []),
    ].filter(Boolean),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slugAsParams}`,
    },
  }
}

function generateCollectionPageData(
  category: NonNullable<ReturnType<typeof getBlogCategoryBySlug>>
) {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.h1,
    description: category.description,
    url: `${baseUrl}/blog/${category.slug}`,
    isPartOf: {
      '@type': 'Blog',
      name: 'Interview Pilot Blog',
      url: `${baseUrl}/blog`,
    },
  }
}

function generateBreadcrumbData({
  title,
  path,
}: {
  title: string
  path: string
}) {
  const baseUrl = getBaseUrl()

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
        name: title,
        item: `${baseUrl}${path}`,
      },
    ],
  }
}

function TableOfContents({
  items,
  mobile = false,
}: {
  items: Array<{ title: string; id: string; depth: number }>
  mobile?: boolean
}) {
  if (!items.length) return null

  return (
    <Box
      as="aside"
      display={mobile ? { base: 'block', lg: 'none' } : { base: 'none', lg: 'block' }}
      position={mobile ? 'static' : 'sticky'}
      top={mobile ? undefined : '112px'}
      alignSelf="start"
      borderWidth="1px"
      borderColor="app.border.subtle"
      borderRadius="2xl"
      bg="app.surface.card"
      px={5}
      py={5}
      mb={mobile ? 8 : 0}
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        color="app.text.muted"
        textTransform="uppercase"
        letterSpacing="0.12em"
        mb={4}
      >
        On this page
      </Text>
      <VStack as="nav" align="stretch" spacing={2}>
        {items.map((item) => (
          <Box
            key={`${item.id}-${item.title}`}
            as="a"
            href={`#${item.id}`}
            color="app.text.muted"
            fontSize="sm"
            lineHeight="1.35"
            pl={item.depth === 3 ? 4 : 0}
            py={1}
            borderLeft={item.depth === 3 ? '1px solid' : '0'}
            borderColor="app.border.subtle"
            _hover={{
              color: 'primary.300',
              textDecoration: 'none',
            }}
          >
            {item.title}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

function CategoryHubPage({
  category,
}: {
  category: NonNullable<ReturnType<typeof getBlogCategoryBySlug>>
}) {
  const categoryPosts = getPostsByCategory(category.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCollectionPageData(category)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbData({
              title: category.h1,
              path: `/blog/${category.slug}`,
            })
          ),
        }}
      />

      <Box bg="app.bg" pt={20}>
        <Box borderBottom="1px" borderColor="app.border.subtle">
          <Container maxW="container.xl" py={{ base: 14, md: 20 }}>
            <VStack spacing={6} textAlign="center">
              <Button as={Link} href="/blog" variant="ghost" colorScheme="yellow">
                Back to Blog
              </Button>
              <Badge colorScheme="yellow" variant="subtle" px={4} py={1.5}>
                {category.label}
              </Badge>
              <Heading as="h1" size="3xl" fontWeight="bold" maxW="4xl">
                {category.h1}
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="app.text.muted" maxW="3xl">
                {category.intro}
              </Text>
            </VStack>
          </Container>
        </Box>

        <Container maxW="container.xl" py={{ base: 12, md: 16 }}>
          <VStack spacing={{ base: 12, md: 16 }} align="stretch">
            <Box>
              <VStack spacing={3} align="start" mb={6}>
                <Heading as="h2" size="lg">
                  Related resources
                </Heading>
                <Text color="app.text.muted">
                  Start with the highest-intent pages connected to this topic.
                </Text>
              </VStack>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                {category.relatedLinks.map((resource) => (
                  <LinkBox
                    key={resource.href}
                    p={5}
                    borderWidth="1px"
                    borderRadius="2xl"
                    bg="app.surface.card"
                    borderColor="app.border.subtle"
                    _hover={{ borderColor: 'primary.400' }}
                  >
                    <LinkOverlay as={Link} href={resource.href}>
                      <Heading as="h3" size="sm">
                        {resource.label}
                      </Heading>
                    </LinkOverlay>
                  </LinkBox>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <VStack spacing={3} align="start" mb={8}>
                <Heading as="h2" size="xl">
                  Latest {category.label.toLowerCase()} articles
                </Heading>
                <Text color="app.text.muted" maxW="2xl">
                  Articles in this hub will be curated around a clear search intent,
                  current data, and practical candidate takeaways.
                </Text>
              </VStack>

              {categoryPosts.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                  {categoryPosts.map((post) => (
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
                    Articles coming soon
                  </Heading>
                  <Text color="app.text.muted" maxW="2xl" mx="auto">
                    This category is ready for the new editorial pipeline. Future
                    posts will appear here automatically once published.
                  </Text>
                </Box>
              )}
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

function BlogArticlePage({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>
}) {
  const relatedPosts = getRelatedPosts(post)
  const dateModified = post.lastUpdated || post.date
  const tableOfContents = post.tableOfContents || []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogPostingData(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbData({
              title: post.title,
              path: `/blog/${post.slugAsParams}`,
            })
          ),
        }}
      />

      <Box bg="app.bg">
        <Box borderBottom="1px" borderColor="app.border.subtle" bg="app.surface.subtle">
          <Container maxW="container.lg" py={4}>
            <Button as={Link} href="/blog" variant="ghost" colorScheme="yellow">
              Back to Blog
            </Button>
          </Container>
        </Box>

        <Container maxW="container.lg" pt={12} pb={8}>
          <VStack spacing={6} textAlign="center">
            {post.image && (
              <Box
                position="relative"
                w="100%"
                h={{ base: '220px', md: '400px' }}
                overflow="hidden"
                borderRadius="lg"
                shadow="lg"
              >
                <NextImage
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 1024px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            )}

            <Badge as={Link} href={`/blog/${post.category}`} colorScheme="yellow" variant="subtle">
              {getCategoryLabel(post.category)}
            </Badge>

            <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="1.2" maxW="4xl">
              {post.title}
            </Heading>

            <HStack spacing={5} flexWrap="wrap" justify="center" color="app.text.muted" fontSize="sm">
              <Text as="time" dateTime={post.date}>
                Published {formatDate(post.date)}
              </Text>
              <Text>Updated {formatDate(dateModified)}</Text>
              <Text>{post.readingTime} min read</Text>
              {post.author ? <Text>{post.author}</Text> : null}
            </HStack>

            {post.tags && post.tags.length > 0 ? (
              <HStack spacing={2} flexWrap="wrap" justify="center">
                {post.tags.map((tag) => (
                  <Badge key={tag} colorScheme="gray" variant="outline" px={3} py={1}>
                    {tag}
                  </Badge>
                ))}
              </HStack>
            ) : null}
          </VStack>
        </Container>

        <Divider />

        <Container maxW="container.xl" py={12}>
          <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 1fr) 280px' }} gap={{ base: 0, lg: 12 }}>
            <Box maxW="container.md" w="100%">
              <TableOfContents items={tableOfContents} mobile />
              <MDXContent code={post.body} />
            </Box>
            <TableOfContents items={tableOfContents} />
          </Grid>
        </Container>

        {relatedPosts.length > 0 ? (
          <Box borderTop="1px" borderColor="app.border.subtle">
            <Container maxW="container.lg" py={12}>
              <VStack spacing={8} align="stretch">
                <Heading size="lg" textAlign="center">
                  Related Articles
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {relatedPosts.map((relatedPost) => (
                    <PostCard
                      key={relatedPost.slugAsParams}
                      slug={relatedPost.slugAsParams}
                      title={relatedPost.title}
                      description={relatedPost.description}
                      date={relatedPost.date}
                      lastUpdated={relatedPost.lastUpdated}
                      author={relatedPost.author}
                      image={relatedPost.image}
                      imageAlt={relatedPost.imageAlt}
                      category={relatedPost.category}
                      tags={relatedPost.tags}
                      readingTime={relatedPost.readingTime}
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            </Container>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default function BlogRoutePage({ params }: BlogRoutePageProps) {
  const category = getBlogCategoryBySlug(params.slug)
  if (category) return <CategoryHubPage category={category} />

  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return <BlogArticlePage post={post} />
}
