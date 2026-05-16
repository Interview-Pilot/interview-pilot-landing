import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { publishedInterviewQuestionRefs } from '#data/interview-question-refs'
import { sectionContentStyles } from '#theme/styles/section-styles'

export const metadata = {
  title: 'Interview Questions',
  description:
    'Practice role-specific interview questions for investment banking, product management, software engineering, data, consulting, and more.',
  alternates: {
    canonical: '/interview-questions',
  },
  openGraph: {
    title: 'Interview Questions',
    description:
      'Practice role-specific interview questions for investment banking, product management, software engineering, data, consulting, and more.',
    url: '/interview-questions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Questions | Interview Pilot',
    description:
      'Practice role-specific interview questions for investment banking, product management, software engineering, data, consulting, and more.',
  },
}

export default function InterviewQuestionsPage() {
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
                Interview Questions
              </Text>
              <Text
                as="h1"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="800"
                color="white"
                lineHeight="1.05"
                letterSpacing="-0.03em"
              >
                Interview Questions
              </Text>
              <Text
                maxW="680px"
                color="whiteAlpha.700"
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight="1.8"
              >
                Role-specific interview question lists for technical, behavioral,
                and industry-specific interview preparation.
              </Text>
            </VStack>

            <VStack spacing={0} align="stretch" borderTop="1px solid rgba(255,255,255,0.08)">
              {publishedInterviewQuestionRefs.map((page) => (
                <Flex
                  key={page.slug}
                  as="a"
                  href={`/interview-questions/${page.slug}`}
                  align={{ base: 'flex-start', md: 'center' }}
                  justify="space-between"
                  gap={6}
                  py={7}
                  borderBottom="1px solid rgba(255,255,255,0.08)"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box>
                    <Text color="white" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="800">
                      {page.title}
                    </Text>
                    <Text color="whiteAlpha.700" fontSize="md" lineHeight="1.7" mt={2} maxW="700px">
                      {page.description}
                    </Text>
                    <Text color="whiteAlpha.400" fontSize="sm" mt={3}>
                      {page.industry} · {page.role}
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
