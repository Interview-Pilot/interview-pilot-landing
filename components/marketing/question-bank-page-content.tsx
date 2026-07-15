'use client'

import {
  Box,
  Button,
  Container,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiChevronDown, FiEye, FiRepeat, FiSearch } from 'react-icons/fi'

import { sectionContentStyles } from '#theme/styles/section-styles'

const filters = ['Categories', 'Roles', 'Companies', 'Search']

const questions = [
  {
    category: 'Technical',
    question: 'How would you find the lowest common ancestor of two given nodes in a binary tree?',
    company: 'Google',
    logo: '/company-logos/google.svg',
    role: 'Software Engineering',
    views: '13.2k',
    practiced: '599',
  },
  {
    category: 'Technical',
    question: 'How would you value a company with negative earnings?',
    company: 'Goldman Sachs',
    logo: '/company-logos/goldman_sachs.jpeg',
    role: 'Investment Banking',
    views: '11.8k',
    practiced: '558',
  },
  {
    category: 'Technical',
    question: 'How would you approach implementing new technology or automation in an established industrial process?',
    company: 'General Electric',
    logo: '/company-logos/general_electric.png',
    role: 'Software Engineering',
    views: '4.3k',
    practiced: '225',
  },
  {
    category: 'Behavioral',
    question: 'Tell me about a time you had to collaborate with a difficult team member. How did you handle it?',
    company: 'General Electric',
    logo: '/company-logos/general_electric.png',
    role: 'Human Resources',
    views: '3.6k',
    practiced: '240',
  },
  {
    category: 'Technical',
    question: 'Describe your experience with financial modeling and performance attribution.',
    company: 'Vanguard',
    logo: '/company-logos/vanguard.svg',
    role: 'Financial Analyst',
    views: '690',
    practiced: '75',
  },
]

const categoryBadge: Record<string, { bg: string; color: string; border: string }> = {
  Technical: { bg: 'rgba(255,229,0,0.12)', color: '#FFE500', border: 'rgba(255,229,0,0.3)' },
  Behavioral: { bg: 'rgba(96,165,250,0.15)', color: '#93c5fd', border: 'rgba(96,165,250,0.3)' },
}

export function QuestionBankPageContent() {
  return (
    <Box pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      <Box pt={16} pb={{ base: 16, md: 24 }} px={[4, null]}>
        <Container maxW="container.lg">
          <VStack spacing={{ base: 12, md: 16 }} align="stretch">
            <Box textAlign="center">
              <Text
                as="h1"
                fontSize={{ base: '6xl', md: '7xl' }}
                fontWeight="bold"
                lineHeight="1"
                color="white"
              >
                Question Bank
              </Text>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="whiteAlpha.700"
                mt={4}
                mx="auto"
                maxW="760px"
                lineHeight="1.7"
              >
                Practice 10,000+ interview questions curated by company, role,
                and interview type. Focus your prep on the question types that
                actually show up.
              </Text>
            </Box>

            <Box
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="3xl"
              bg="rgba(12, 12, 12, 0.72)"
              boxShadow="0 24px 80px rgba(0, 0, 0, 0.34)"
              overflow="hidden"
            >
              <Box p={{ base: 4, md: 5 }} borderBottom="1px solid" borderColor="whiteAlpha.200">
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={3}>
                  {filters.map((filter) => (
                    <HStack
                      key={filter}
                      justify="space-between"
                      h="44px"
                      px={4}
                      borderRadius="12px"
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color={filter === 'Search' ? 'whiteAlpha.500' : 'whiteAlpha.800'}
                    >
                      <Text fontSize="sm" fontWeight="600">
                        {filter}
                      </Text>
                      {filter === 'Search'
                        ? <Icon as={FiSearch} boxSize="14px" />
                        : <Icon as={FiChevronDown} boxSize="14px" color="whiteAlpha.500" />
                      }
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>

              <VStack spacing={0} align="stretch">
                {questions.map((item, index) => {
                  const badge = categoryBadge[item.category] ?? categoryBadge.Technical
                  return (
                    <Box
                      key={`${item.company}-${item.question}`}
                      px={{ base: 5, md: 7 }}
                      py={{ base: 5, md: 6 }}
                      borderBottom={index === questions.length - 1 ? '0' : '1px solid'}
                      borderColor="whiteAlpha.200"
                      _hover={{ bg: 'whiteAlpha.50' }}
                      transition="background 0.15s"
                    >
                      <Stack spacing={4}>
                        <HStack spacing={3} flexWrap="wrap">
                          <Box
                            px={3}
                            py={1}
                            borderRadius="full"
                            bg={badge.bg}
                            color={badge.color}
                            fontSize="xs"
                            fontWeight="800"
                            border="1px solid"
                            borderColor={badge.border}
                          >
                            {item.category}
                          </Box>
                        </HStack>

                        <Text
                          color="white"
                          fontSize={{ base: 'lg', md: 'xl' }}
                          fontWeight="700"
                          lineHeight="1.45"
                        >
                          {item.question}
                        </Text>

                        <HStack justify="space-between" spacing={4} flexWrap="wrap">
                          <HStack spacing={2} color="whiteAlpha.700" flexWrap="wrap">
                            <Box
                              as="img"
                              src={item.logo}
                              alt=""
                              h="18px"
                              w="18px"
                              objectFit="contain"
                              borderRadius="6px"
                            />
                            <Text fontSize="sm" fontWeight="700" color="whiteAlpha.900">
                              {item.company}
                            </Text>
                            <Text fontSize="sm" color="whiteAlpha.400">·</Text>
                            <Text fontSize="sm" color="whiteAlpha.600">{item.role}</Text>
                          </HStack>

                          <HStack spacing={4} color="whiteAlpha.500">
                            <HStack spacing={1.5}>
                              <FiEye size={14} />
                              <Text fontSize="xs">{item.views} views</Text>
                            </HStack>
                            <HStack spacing={1.5}>
                              <FiRepeat size={14} />
                              <Text fontSize="xs">{item.practiced} practiced</Text>
                            </HStack>
                          </HStack>
                        </HStack>
                      </Stack>
                    </Box>
                  )
                })}
              </VStack>
            </Box>

            <VStack spacing={4} textAlign="center">
              <Text color="whiteAlpha.700" fontSize={{ base: 'lg', md: 'xl' }}>
                Unlock the full bank across companies, roles, and interview types.
              </Text>
              <Button
                as="a"
                href="https://platform.interviewpilot.app/question-bank"
                size="lg"
                h="54px"
                px={8}
                borderRadius="full"
                bg="primary.400"
                color="black"
                fontWeight="800"
                _hover={{ bg: 'primary.300', transform: 'translateY(-1px)' }}
              >
                Open Question Bank
              </Button>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
