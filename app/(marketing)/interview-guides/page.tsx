import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { publishedInterviewGuideRefs } from '#data/interview-guides'
import { sectionContentStyles } from '#theme/styles/section-styles'

export const metadata = {
  title: 'Interview Guides',
  description:
    'Explore Interview Pilot guides for technical, behavioral, and role-specific interview preparation.',
  alternates: {
    canonical: '/interview-guides',
  },
  openGraph: {
    title: 'Interview Guides',
    description:
      'Explore Interview Pilot guides for technical, behavioral, and role-specific interview preparation.',
    url: '/interview-guides',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Guides | Interview Pilot',
    description:
      'Explore Interview Pilot guides for technical, behavioral, and role-specific interview preparation.',
  },
}

export default function InterviewGuidesPage() {
  return (
    <Box pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      <Box pt={16} pb={{ base: 20, md: 28 }} px={[4, null]}>
        <Container maxW="container.lg">
          <VStack spacing={{ base: 12, md: 16 }} align="stretch">
            <VStack spacing={5} align="flex-start">
              <Text
                fontSize="11px"
                fontWeight="800"
                color="primary.400"
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                Interview Guides
              </Text>
              <Text
                as="h1"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="800"
                color="white"
                lineHeight="1.05"
                letterSpacing="-0.03em"
              >
                Interview Guides
              </Text>
              <Text
                maxW="640px"
                color="whiteAlpha.700"
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight="1.8"
              >
                Role-specific interview preparation guides for technical questions,
                behavioral questions, and structured practice.
              </Text>
            </VStack>

            <VStack spacing={0} align="stretch" borderTop="1px solid rgba(255,255,255,0.08)">
              {publishedInterviewGuideRefs.map((guide) => (
                <Flex
                  key={guide.slug}
                  as="a"
                  href={`/interview-guides/${guide.slug}`}
                  align={{ base: 'flex-start', md: 'center' }}
                  justify="space-between"
                  gap={6}
                  py={7}
                  borderBottom="1px solid rgba(255,255,255,0.08)"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box>
                    <Text color="white" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="800">
                      {guide.title}
                    </Text>
                    <Text color="whiteAlpha.700" fontSize="md" lineHeight="1.7" mt={2} maxW="680px">
                      {guide.description}
                    </Text>
                    <Text color="whiteAlpha.400" fontSize="sm" mt={3}>
                      {guide.industry} · {guide.role}
                    </Text>
                  </Box>
                  <Text
                    color="primary.400"
                    flexShrink={0}
                    fontSize="2xl"
                    lineHeight="1"
                    mt={{ base: 1, md: 0 }}
                  >
                    →
                  </Text>
                </Flex>
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
