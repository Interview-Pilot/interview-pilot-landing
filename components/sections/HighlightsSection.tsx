'use client'

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { FiCheck, FiCopy } from 'react-icons/fi'

import { Section } from '#components/section'
import { Em } from '#components/typography'
import { sectionContentStyles } from '#theme/styles/section-styles'

const INDUSTRY_TAGS = [
  'Investment Banking',
  'Management Consulting',
  'Software Engineering',
  'Product Management',
  'Data Science',
  'Machine Learning Engineer',
  'Business Analyst',
  'Corporate Finance',
  'Financial Analyst',
  'Private Equity',
  'Asset Management',
  'Marketing',
  'Sales',
  'Operations',
  'Project Management',
  'Human Resources',
  'UI/UX Design',
] as const

const dividerColor = 'rgba(255, 255, 255, 0.1)'

interface FeatureLabelProps {
  number: string
  children: React.ReactNode
}

function FeatureLabel({ number, children }: FeatureLabelProps) {
  return (
    <HStack spacing="3" mb={{ base: 8, md: 10 }}>
      <Text fontSize="sm" fontWeight="700" color="primary.400">
        {number}
      </Text>
      <Box w="24px" h="1px" bg={dividerColor} />
      <Text
        fontSize="xs"
        fontWeight="700"
        color="whiteAlpha.600"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        {children}
      </Text>
    </HStack>
  )
}

/**
 * Highlights section showcasing key features and benefits
 */
export function HighlightsSection() {
  const { onCopy, hasCopied } = useClipboard('#interviewpilot')

  return (
    <Box sx={sectionContentStyles}>
      <Section innerWidth="container.xl">
        <Grid
          templateColumns={{ base: '1fr', lg: 'repeat(12, minmax(0, 1fr))' }}
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor={dividerColor}
          position="relative"
          zIndex={1}
        >
          <GridItem
            colSpan={{ base: 1, lg: 7 }}
            py={{ base: 10, md: 12, lg: 14 }}
            pr={{ base: 0, lg: 14 }}
            borderBottom="1px solid"
            borderRight={{ base: '0', lg: '1px solid' }}
            borderColor={dividerColor}
          >
            <FeatureLabel number="01">Copilot intelligence</FeatureLabel>
            <Heading
              as="h2"
              maxW="720px"
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              lineHeight="0.95"
              letterSpacing="-0.055em"
              fontWeight="semibold"
              color="app.text.primary"
            >
              Accurate. Instant. Tailored.
            </Heading>
            <Text
              mt={{ base: 6, md: 8 }}
              maxW="680px"
              color="app.text.muted"
              fontSize={{ base: 'lg', md: 'xl' }}
              lineHeight="1.6"
            >
              Ace any technical or behavioral questions with{' '}
              <Em>our most intelligent Copilot model</Em>. Upload your resume, job
              details and more for <Em>full Copilot customization</Em>. Choose your
              desired Copilot answer style, and review all your past interviews in
              one place.
            </Text>

            <Flex mt={{ base: 8, md: 10 }} alignItems="center">
              <Text fontSize="sm" fontWeight="600" letterSpacing="-0.01em">
                <Text as="span" color="primary.400">
                  shareyoursuccess
                </Text>{' '}
                <Text as="span" color="cyan.300">
                  #interviewpilot
                </Text>
              </Text>
              <IconButton
                icon={hasCopied ? <FiCheck /> : <FiCopy />}
                aria-label="Copy hashtag"
                onClick={onCopy}
                variant="ghost"
                size="sm"
                ms="2"
                borderRadius="full"
                color="whiteAlpha.700"
              />
            </Flex>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            py={{ base: 10, md: 12, lg: 14 }}
            pl={{ base: 0, lg: 14 }}
            borderBottom="1px solid"
            borderColor={dividerColor}
          >
            <FeatureLabel number="02">Every voice</FeatureLabel>
            <Heading
              as="h3"
              fontSize={{ base: '3xl', md: '4xl' }}
              lineHeight="1"
              letterSpacing="-0.045em"
              fontWeight="semibold"
              color="app.text.primary"
            >
              Voice Recognition
            </Heading>
            <Text mt="6" color="app.text.muted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.65">
              Ranked 1st worldwide, Interview Pilot uses the world&apos;s most
              accurate AI speech recognition system (ASR).
            </Text>
            <Text mt="5" color="app.text.muted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.65">
              Interview Pilot is capable of detecting almost all languages and
              accents.
            </Text>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            py={{ base: 10, md: 12, lg: 14 }}
            pr={{ base: 0, lg: 14 }}
            borderBottom={{ base: '1px solid', lg: '0' }}
            borderRight={{ base: '0', lg: '1px solid' }}
            borderColor={dividerColor}
          >
            <FeatureLabel number="03">Private by design</FeatureLabel>
            <Heading
              as="h3"
              fontSize={{ base: '3xl', md: '4xl' }}
              lineHeight="1"
              letterSpacing="-0.045em"
              fontWeight="semibold"
              color="app.text.primary"
            >
              Full Privacy
            </Heading>
            <Text mt="6" color="app.text.muted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.65">
              Your data is secure and owned by you. All data processing uses
              industry-standard encryption.
            </Text>
            <Text mt="5" color="app.text.primary" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.65">
              We never store your app usage data.
            </Text>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, lg: 7 }}
            py={{ base: 10, md: 12, lg: 14 }}
            pl={{ base: 0, lg: 14 }}
          >
            <FeatureLabel number="04">Built for every career</FeatureLabel>
            <Heading
              as="h3"
              fontSize={{ base: '3xl', md: '4xl' }}
              lineHeight="1"
              letterSpacing="-0.045em"
              fontWeight="semibold"
              color="app.text.primary"
            >
              Get Ahead of Your Peers
            </Heading>
            <Text
              mt="6"
              maxW="720px"
              color="app.text.muted"
              fontSize={{ base: 'md', md: 'lg' }}
              lineHeight="1.65"
            >
              We take care of the trouble of recruiting and interviewing, so you
              can focus on what really matters: growing your skillset and career.
            </Text>
            <Wrap mt={{ base: 7, md: 8 }} spacing="2">
              {INDUSTRY_TAGS.map((tag) => (
                <Tag
                  key={tag}
                  variant="outline"
                  borderColor="app.border.subtle"
                  color="app.text.muted"
                  rounded="full"
                  px="3"
                  py="1"
                  fontWeight="500"
                >
                  {tag}
                </Tag>
              ))}
              <Tag
                variant="outline"
                borderColor="rgba(255, 229, 0, 0.28)"
                color="primary.400"
                rounded="full"
                px="3"
                py="1"
                fontWeight="600"
              >
                + More
              </Tag>
            </Wrap>
          </GridItem>
        </Grid>
      </Section>
    </Box>
  )
}
