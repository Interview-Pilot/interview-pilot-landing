'use client'

import { useState } from 'react'
import { Box, Collapse, Flex, Text, VStack } from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import type { QuestionBlock } from '#data/interview-guides'

const DIFFICULTY_COLOR: Record<QuestionBlock['difficulty'], string> = {
  easy: '#22c55e',
  medium: '#f59e0b',
  hard: '#ef4444',
}

const DIFFICULTY_LABEL: Record<QuestionBlock['difficulty'], string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

interface QuestionCardProps {
  block: QuestionBlock
}

export function QuestionCard({ block }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box borderBottom="1px solid rgba(255,255,255,0.07)">
      {/* ── Header row ── */}
      <Flex
        as="button"
        type="button"
        w="full"
        align="flex-start"
        gap={4}
        py={5}
        textAlign="left"
        onClick={() => setIsOpen((o) => !o)}
        _hover={{}}
      >
        <VStack flex="1" align="flex-start" spacing="8px">
          {/* Meta: difficulty · category */}
          <Text fontSize="11px" fontWeight="700" letterSpacing="0.08em" lineHeight="1">
            <Text as="span" color={DIFFICULTY_COLOR[block.difficulty]}>
              {DIFFICULTY_LABEL[block.difficulty].toUpperCase()}
            </Text>
            <Text as="span" color="rgba(255,255,255,0.18)" mx="7px">·</Text>
            <Text as="span" color="rgba(255,255,255,0.28)" letterSpacing="0.07em">
              {block.category.toUpperCase()}
            </Text>
          </Text>

          {/* Question text */}
          <Text
            color={isOpen ? 'white' : 'whiteAlpha.800'}
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="500"
            lineHeight="1.65"
            transition="color 0.15s"
          >
            {block.question}
          </Text>
        </VStack>

        {/* Chevron */}
        <Box
          as={isOpen ? FiChevronUp : FiChevronDown}
          color="whiteAlpha.250"
          flexShrink={0}
          style={{ width: 15, height: 15, marginTop: '20px' }}
        />
      </Flex>

      {/* ── Expandable answer ── */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={7}>
          {/* Framework label */}
          {block.framework ? (
            <Text
              fontSize="11px"
              fontWeight="800"
              color="primary.400"
              letterSpacing="0.1em"
              textTransform="uppercase"
              mb={4}
            >
              Framework — {block.framework}
            </Text>
          ) : null}

          {/* Answer body */}
          <Text
            color="whiteAlpha.850"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="1.9"
            whiteSpace="pre-line"
          >
            {block.answer}
          </Text>

          {/* Follow-ups */}
          {block.followUps && block.followUps.length > 0 ? (
            <Box mt={6} pt={5} borderTop="1px solid rgba(255,255,255,0.06)">
              <Text
                fontSize="11px"
                fontWeight="700"
                color="whiteAlpha.400"
                letterSpacing="0.1em"
                textTransform="uppercase"
                mb={3}
              >
                Likely follow-ups
              </Text>
              <VStack align="flex-start" spacing="8px">
                {block.followUps.map((q, i) => (
                  <Text key={i} fontSize="sm" color="whiteAlpha.750" lineHeight="1.6">
                    {q}
                  </Text>
                ))}
              </VStack>
            </Box>
          ) : null}
        </Box>
      </Collapse>
    </Box>
  )
}
