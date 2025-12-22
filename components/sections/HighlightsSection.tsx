'use client'

import {
  Box,
  Flex,
  IconButton,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { FiCheck, FiCopy } from 'react-icons/fi'

import {
  Highlights,
  HighlightsItem,
} from '#components/highlights'
import { Em } from '#components/typography'
import { sectionContentStyles, glassmorphicCardStyles } from '#theme/styles/section-styles'

const INDUSTRY_TAGS = [
  'consulting',
  'product management',
  'data science',
  'software engineering',
  'graphic design',
  'sales',
  'recruiting',
  'customer success',
  'finance',
  'operations',
  'legal',
  'marketing',
  'public relations',
  'business development',
  'human resources',
  'project management',
  'strategy',
  'analytics',
] as const

/**
 * Highlights section showcasing key features and benefits
 */
export function HighlightsSection() {
  const { onCopy, hasCopied } = useClipboard('#interviewpilot')

  return (
    <Box sx={sectionContentStyles}>
      <Highlights>
        <HighlightsItem colSpan={[1, null, 2]} title="Accurate. Instant. Tailored.">
          <VStack alignItems="flex-start" spacing="8" position="relative" zIndex={1}>
            <Text color="muted" fontSize="xl">
              Ace any technical or behavioral questions with{' '}
              <Em>our most intelligent Copilot model</Em>. Upload your resume, job
              details and more for <Em>full Copilot customization</Em>. Choose your
              desired Copilot answer style, and review all your past interviews in
              one place.
            </Text>

            <Flex
              rounded="full"
              flexDirection="row"
              alignItems="center"
              py="1"
              ps="8"
              pe="2"
              _dark={{ bg: 'gray.900' }}
              sx={glassmorphicCardStyles}
            >
              <Box>
                <Text color="yellow.400" display="inline">
                  shareyoursuccess
                </Text>{' '}
                <Text color="cyan.300" display="inline">
                  #interviewpilot
                </Text>
              </Box>
              <IconButton
                icon={hasCopied ? <FiCheck /> : <FiCopy />}
                aria-label="Copy hashtag"
                onClick={onCopy}
                variant="ghost"
                ms="4"
                isRound
                color="white"
              />
            </Flex>
          </VStack>
        </HighlightsItem>

        <HighlightsItem title="Voice Recognition">
          <Text color="muted" fontSize="lg" position="relative" zIndex={1}>
            Ranked 1st worldwide, Whisper is the world&apos;s most accurate AI
            speech recognition (ASR).
            <br />
            <br />
            Interview Pilot is capable of detecting almost all languages and
            accents.
          </Text>
        </HighlightsItem>

        <HighlightsItem title="Full Privacy">
          <Text color="muted" fontSize="lg" position="relative" zIndex={1}>
            Your data is secure and owned by you. All data processing uses
            industry-standard encryption.
            <br />
            <br />
            We never store your app usage data.
          </Text>
        </HighlightsItem>

        <HighlightsItem colSpan={[1, null, 2]} title="Get Ahead of Your Peers">
          <Text color="muted" fontSize="lg" position="relative" zIndex={1}>
            We take care of the trouble of recruiting and interviewing, so you
            can focus on what really matters: growing your skillset and career.
          </Text>
          <Wrap mt="8" position="relative" zIndex={1}>
            {INDUSTRY_TAGS.map((tag) => (
              <Tag
                key={tag}
                variant="subtle"
                colorScheme="yellow"
                rounded="full"
                px="3"
              >
                {tag}
              </Tag>
            ))}
          </Wrap>
        </HighlightsItem>
      </Highlights>
    </Box>
  )
}
