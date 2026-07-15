'use client'

import { Box, Button, Container, Flex, Text, VStack } from '@chakra-ui/react'
import { FiArrowRight, FiBookOpen, FiList, FiTarget } from 'react-icons/fi'

import { QuestionCard } from '#components/guide/question-card'
import { INTERNAL_ROUTES } from '#constants'
import type { QuestionBlock } from '#data/interview-guides'
import { sectionContentStyles } from '#theme/styles/section-styles'

export interface InterviewQuestionPageView {
  slug: string
  title: string
  description: string
  role: string
  guideSlug: string
  guideTitle: string
  lastUpdated: string
}

export interface InterviewQuestionSectionView {
  id: string
  title: string
  intro?: string
  questions: QuestionBlock[]
}

interface InterviewQuestionPageContentProps {
  page: InterviewQuestionPageView
  sections: InterviewQuestionSectionView[]
  totalQuestions: number
}

export function InterviewQuestionPageContent({
  page,
  sections,
  totalQuestions,
}: InterviewQuestionPageContentProps) {
  const guideHref = `/interview-guides/${page.guideSlug}`

  return (
    <Box as="article" pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      <Box pt={16} pb={14} px={[4, null]} borderBottom="1px solid rgba(255,255,255,0.06)">
        <Container maxW="container.lg">
          <VStack spacing={5} align="flex-start">
            <Flex align="center" gap={2}>
              <Box as={FiList} color="whiteAlpha.400" style={{ width: 14, height: 14 }} />
              <Text
                fontSize="11px"
                fontWeight="700"
                color="whiteAlpha.400"
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                Interview Questions
              </Text>
            </Flex>

            <Text
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="800"
              color="white"
              lineHeight="1.05"
              letterSpacing="-0.03em"
            >
              {page.title}
            </Text>

            <Text
              color="whiteAlpha.700"
              fontSize={{ base: 'md', md: 'lg' }}
              lineHeight="1.8"
              maxW="660px"
            >
              {page.description} Use this as a focused question list alongside the full{' '}
              <Box as="a" href={guideHref} color="primary.400" fontWeight="700">
                {page.guideTitle}
              </Box>
              .
            </Text>

            <Flex gap={5} flexWrap="wrap" align="center" pt={1}>
              {[
                `${totalQuestions} questions`,
                `${sections.length} categories`,
                page.role,
                `Updated ${new Date(page.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
              ].map((item, i) => (
                <Flex key={item} align="center" gap={2}>
                  {i > 0 && <Box w="3px" h="3px" borderRadius="full" bg="whiteAlpha.200" />}
                  <Text fontSize="sm" color="whiteAlpha.350">
                    {item}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </VStack>
        </Container>
      </Box>

      <Box py={{ base: 12, md: 16 }} px={[4, null]}>
        <Container maxW="container.lg">
          <Flex gap={16} align="flex-start">
            <Box
              w="220px"
              flexShrink={0}
              alignSelf="flex-start"
              position="sticky"
              top="96px"
              display={{ base: 'none', xl: 'block' }}
            >
              <Box as="nav" aria-label="Question categories">
                <Text
                  fontSize="11px"
                  fontWeight="800"
                  color="whiteAlpha.300"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  mb={4}
                >
                  Categories
                </Text>
                <VStack spacing={2} align="stretch">
                  {sections.map((section) => (
                    <Box
                      key={section.id}
                      as="a"
                      href={`#${section.id}`}
                      color="whiteAlpha.550"
                      fontSize="13px"
                      lineHeight="1.5"
                      _hover={{ color: 'primary.400', textDecoration: 'none' }}
                    >
                      {section.title}
                    </Box>
                  ))}
                </VStack>

                <Box
                  mt={8}
                  p={4}
                  borderRadius="xl"
                  border="1px solid rgba(255,229,0,0.18)"
                  bg="rgba(255,229,0,0.05)"
                >
                  <Text color="white" fontSize="13px" fontWeight="700" lineHeight="1.4" mb={1}>
                    Need the full prep plan?
                  </Text>
                  <Text color="whiteAlpha.500" fontSize="12px" lineHeight="1.5" mb={3}>
                    Read the full guide for frameworks, concepts, and prep strategy.
                  </Text>
                  <Flex
                    as="a"
                    href={guideHref}
                    align="center"
                    gap="6px"
                    color="primary.400"
                    fontWeight="700"
                    fontSize="12px"
                    _hover={{ textDecoration: 'none', color: 'primary.300' }}
                  >
                    Open guide
                    <Box as={FiArrowRight} style={{ width: 13, height: 13 }} />
                  </Flex>
                </Box>
              </Box>
            </Box>

            <Box flex="1" minW={0}>
              <VStack spacing={16} align="stretch">
                {sections.map((section) => (
                  <Box
                    key={section.id}
                    as="section"
                    id={section.id}
                    sx={{ scrollMarginTop: '100px' }}
                  >
                    <Flex align="center" gap={3} mb={3}>
                      <Box as={FiTarget} color="primary.400" style={{ width: 15, height: 15 }} />
                      <Text
                        as="h2"
                        fontSize={{ base: 'xl', md: '2xl' }}
                        fontWeight="800"
                        color="white"
                        letterSpacing="-0.02em"
                      >
                        {section.title}
                      </Text>
                    </Flex>
                    {section.intro ? (
                      <Text color="whiteAlpha.700" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8" mb={5}>
                        {section.intro}
                      </Text>
                    ) : null}
                    <Box borderTop="1px solid rgba(255,255,255,0.07)">
                      {section.questions.map((question) => (
                        <QuestionCard key={question.question} block={question} />
                      ))}
                    </Box>
                  </Box>
                ))}
              </VStack>

              <Box mt={20} pt={12} borderTop="1px solid rgba(255,255,255,0.06)">
                <Text
                  as="h2"
                  fontSize={{ base: '2xl', md: '4xl' }}
                  fontWeight="800"
                  color="white"
                  letterSpacing="-0.02em"
                  mb={3}
                >
                  Practice these answers live
                </Text>
                <Text
                  color="whiteAlpha.700"
                  fontSize={{ base: 'md', md: 'lg' }}
                  maxW="560px"
                  lineHeight="1.8"
                  mb={7}
                >
                  Interview Pilot gives you real-time Copilot answer suggestions during live
                  interviews, so you can respond clearly when these questions come up.
                </Text>
                <Flex gap={3} flexWrap="wrap">
                  <Button
                    as="a"
                    href={INTERNAL_ROUTES.downloads}
                    variant="primary"
                    color="black"
                    borderRadius="full"
                    size="lg"
                    fontWeight="700"
                    rightIcon={<Box as={FiArrowRight} style={{ width: 18, height: 18 }} />}
                  >
                    Try Interview Pilot free
                  </Button>
                  <Button
                    as="a"
                    href={guideHref}
                    variant="outline"
                    borderRadius="full"
                    size="lg"
                    fontWeight="700"
                    leftIcon={<Box as={FiBookOpen} style={{ width: 17, height: 17 }} />}
                  >
                    Read the guide
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
