'use client'

import { Box, Button, Container, Flex, Text, VStack } from '@chakra-ui/react'
import { FiArrowRight, FiBookOpen, FiClock } from 'react-icons/fi'

import { QuestionCard } from '#components/guide/question-card'
import { GuideToc } from '#components/guide/guide-toc'
import type {
  BulletListBlock,
  ComparisonTableBlock,
  ConceptBlock,
  DoDontBlock,
  FormulaBlock,
  GuideBlock,
  GuideSection,
  InterviewGuide,
  KeyTakeawayBlock,
  KeyTermBlock,
  NumberedListBlock,
  ParagraphBlock,
  QuestionBlock,
  StatsBlock,
  TipBlock,
  WarningBlock,
  WorkedExampleBlock,
} from '#data/interview-guides'
import { INTERNAL_ROUTES } from '#constants'
import { sectionContentStyles } from '#theme/styles/section-styles'

// ── Block renderers ────────────────────────────────────────────────────────────

function Paragraph({ block }: { block: ParagraphBlock }) {
  return (
    <Text color="whiteAlpha.800" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.9">
      {block.text}
    </Text>
  )
}

function TipCallout({ block }: { block: TipBlock }) {
  return (
    <Box pl={4} borderLeft="2px solid rgba(254,204,4,0.45)">
      {block.title ? (
        <Text
          fontSize="11px"
          fontWeight="800"
          color="primary.400"
          letterSpacing="0.1em"
          textTransform="uppercase"
          mb="6px"
        >
          {block.title}
        </Text>
      ) : null}
      <Text color="whiteAlpha.800" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8">
        {block.text}
      </Text>
    </Box>
  )
}

function WarningCallout({ block }: { block: WarningBlock }) {
  return (
    <Box pl={4} borderLeft="2px solid rgba(239,68,68,0.45)">
      {block.title ? (
        <Text
          fontSize="11px"
          fontWeight="800"
          color="#ef4444"
          letterSpacing="0.1em"
          textTransform="uppercase"
          mb="6px"
        >
          {block.title}
        </Text>
      ) : null}
      <Text color="whiteAlpha.800" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8">
        {block.text}
      </Text>
    </Box>
  )
}

function BulletList({ block }: { block: BulletListBlock }) {
  return (
    <Box>
      {block.title ? (
        <Text
          fontSize="11px"
          fontWeight="700"
          color="whiteAlpha.350"
          letterSpacing="0.1em"
          textTransform="uppercase"
          mb={4}
        >
          {block.title}
        </Text>
      ) : null}
      <VStack spacing="10px" align="stretch">
        {block.items.map((item, i) => (
          <Flex key={i} gap={3} align="flex-start">
            <Text
              color="rgba(255,255,255,0.2)"
              fontSize="md"
              lineHeight="1.8"
              flexShrink={0}
              userSelect="none"
            >
              —
            </Text>
            <Text color="whiteAlpha.800" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8">
              {item}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
}

function NumberedList({ block }: { block: NumberedListBlock }) {
  return (
    <Box>
      {block.title ? (
        <Text
          fontSize="11px"
          fontWeight="700"
          color="whiteAlpha.350"
          letterSpacing="0.1em"
          textTransform="uppercase"
          mb={4}
        >
          {block.title}
        </Text>
      ) : null}
      <VStack spacing={5} align="stretch">
        {block.items.map((item, i) => (
          <Flex key={i} gap={4} align="flex-start">
            <Text
              flexShrink={0}
              fontSize="12px"
              fontWeight="800"
              color="primary.400"
              lineHeight="1.8"
              w="16px"
            >
              {i + 1}
            </Text>
            <Text color="whiteAlpha.800" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8">
              {item}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
}

function StatsRow({ block }: { block: StatsBlock }) {
  return (
    <Flex borderTop="1px solid rgba(255,255,255,0.07)" borderBottom="1px solid rgba(255,255,255,0.07)">
      {block.stats.map((stat, i) => (
        <Box
          key={stat.label}
          flex="1"
          px={{ base: 4, md: 6 }}
          py={5}
          borderLeft={i > 0 ? '1px solid rgba(255,255,255,0.07)' : undefined}
        >
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="800"
            color="white"
            lineHeight="1"
            letterSpacing="-0.02em"
          >
            {stat.value}
          </Text>
          <Text mt={2} fontSize="12px" color="whiteAlpha.350" fontWeight="500" lineHeight="1.4">
            {stat.label}
          </Text>
        </Box>
      ))}
    </Flex>
  )
}

function Concept({ block }: { block: ConceptBlock }) {
  return (
    <Box
      pl={5}
      pr={4}
      py={4}
      borderLeft="2px solid rgba(255,255,255,0.12)"
      bg="rgba(255,255,255,0.03)"
      borderRadius="0 8px 8px 0"
    >
      <Text
        fontSize="11px"
        fontWeight="800"
        color="whiteAlpha.400"
        letterSpacing="0.12em"
        textTransform="uppercase"
        mb={2}
      >
        Concept
      </Text>
      <Text
        fontSize="13px"
        fontWeight="700"
        color="white"
        mb={2}
        lineHeight="1.4"
      >
        {block.title}
      </Text>
      <Text color="whiteAlpha.800" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8">
        {block.body}
      </Text>
    </Box>
  )
}

function Formula({ block }: { block: FormulaBlock }) {
  return (
    <Box>
      <Text
        fontSize="11px"
        fontWeight="800"
        color="primary.400"
        letterSpacing="0.12em"
        textTransform="uppercase"
        mb={3}
      >
        {block.label}
      </Text>
      <Box
        px={5}
        py={4}
        bg="rgba(0,0,0,0.35)"
        borderRadius="8px"
        border="1px solid rgba(255,255,255,0.07)"
        mb={block.variables || block.note ? 4 : 0}
      >
        <Text
          fontFamily="mono"
          fontSize={{ base: 'sm', md: 'md' }}
          color="white"
          fontWeight="600"
          letterSpacing="0.02em"
          lineHeight="1.6"
          whiteSpace="pre-wrap"
        >
          {block.formula}
        </Text>
      </Box>
      {block.variables && block.variables.length > 0 && (
        <Box>
          {block.variables.map(({ symbol, definition }) => (
            <Flex key={symbol} gap={3} py="5px" borderBottom="1px solid rgba(255,255,255,0.05)" align="baseline">
              <Text
                fontFamily="mono"
                fontSize="13px"
                fontWeight="700"
                color="primary.400"
                flexShrink={0}
                w="56px"
              >
                {symbol}
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700" lineHeight="1.6">
                {definition}
              </Text>
            </Flex>
          ))}
        </Box>
      )}
      {block.note && (
        <Text fontSize="12px" color="whiteAlpha.400" lineHeight="1.6" mt={3} fontStyle="italic">
          {block.note}
        </Text>
      )}
    </Box>
  )
}

function DoDont({ block }: { block: DoDontBlock }) {
  return (
    <Flex gap={4} flexDirection={{ base: 'column', md: 'row' }}>
      {/* DO */}
      <Box flex="1" borderRadius="8px" border="1px solid rgba(34,197,94,0.2)" bg="rgba(34,197,94,0.04)" p={4}>
        <Text
          fontSize="11px"
          fontWeight="800"
          color="#22c55e"
          letterSpacing="0.12em"
          textTransform="uppercase"
          mb={3}
        >
          ✓ Do
        </Text>
        <VStack spacing="8px" align="stretch">
          {block.dos.map((item, i) => (
            <Flex key={i} gap={2} align="flex-start">
              <Text color="rgba(34,197,94,0.5)" fontSize="md" lineHeight="1.7" flexShrink={0}>—</Text>
              <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.7">{item}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
      {/* DON'T */}
      <Box flex="1" borderRadius="8px" border="1px solid rgba(239,68,68,0.2)" bg="rgba(239,68,68,0.04)" p={4}>
        <Text
          fontSize="11px"
          fontWeight="800"
          color="#ef4444"
          letterSpacing="0.12em"
          textTransform="uppercase"
          mb={3}
        >
          ✗ Don&apos;t
        </Text>
        <VStack spacing="8px" align="stretch">
          {block.donts.map((item, i) => (
            <Flex key={i} gap={2} align="flex-start">
              <Text color="rgba(239,68,68,0.5)" fontSize="md" lineHeight="1.7" flexShrink={0}>—</Text>
              <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.7">{item}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Flex>
  )
}

function ComparisonTable({ block }: { block: ComparisonTableBlock }) {
  return (
    <Box overflowX="auto">
      <Box as="table" w="full" style={{ borderCollapse: 'collapse' }}>
        <Box as="thead">
          <Box as="tr">
            <Box
              as="th"
              w="30%"
              px={4}
              py={3}
              textAlign="left"
              borderBottom="1px solid rgba(255,255,255,0.1)"
            />
            <Box
              as="th"
              px={4}
              py={3}
              textAlign="left"
              borderBottom="1px solid rgba(255,255,255,0.1)"
              borderLeft="1px solid rgba(255,255,255,0.06)"
            >
              <Text fontSize="12px" fontWeight="800" color="primary.400" letterSpacing="0.08em" textTransform="uppercase">
                {block.columnA}
              </Text>
            </Box>
            <Box
              as="th"
              px={4}
              py={3}
              textAlign="left"
              borderBottom="1px solid rgba(255,255,255,0.1)"
              borderLeft="1px solid rgba(255,255,255,0.06)"
            >
              <Text fontSize="12px" fontWeight="800" color="whiteAlpha.500" letterSpacing="0.08em" textTransform="uppercase">
                {block.columnB}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box as="tbody">
          {block.rows.map((row, i) => (
            <Box as="tr" key={i} _hover={{ bg: 'rgba(255,255,255,0.02)' }}>
              <Box
                as="td"
                px={4}
                py={3}
                borderBottom="1px solid rgba(255,255,255,0.05)"
              >
                <Text fontSize="12px" fontWeight="700" color="whiteAlpha.500" letterSpacing="0.05em" textTransform="uppercase">
                  {row.label}
                </Text>
              </Box>
              <Box
                as="td"
                px={4}
                py={3}
                borderBottom="1px solid rgba(255,255,255,0.05)"
                borderLeft="1px solid rgba(255,255,255,0.06)"
              >
                <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.6">{row.a}</Text>
              </Box>
              <Box
                as="td"
                px={4}
                py={3}
                borderBottom="1px solid rgba(255,255,255,0.05)"
                borderLeft="1px solid rgba(255,255,255,0.06)"
              >
                <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.6">{row.b}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

function KeyTerms({ block }: { block: KeyTermBlock }) {
  return (
    <Box>
      {block.title && (
        <Text
          fontSize="11px"
          fontWeight="700"
          color="whiteAlpha.350"
          letterSpacing="0.1em"
          textTransform="uppercase"
          mb={4}
        >
          {block.title}
        </Text>
      )}
      <VStack spacing={0} align="stretch">
        {block.terms.map(({ term, definition }, i) => (
          <Flex
            key={i}
            gap={{ base: 3, md: 6 }}
            py={4}
            borderBottom="1px solid rgba(255,255,255,0.05)"
            flexDirection={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'baseline' }}
          >
            <Text
              fontSize="13px"
              fontWeight="700"
              color="primary.400"
              flexShrink={0}
              w={{ base: 'auto', md: '160px' }}
              lineHeight="1.5"
            >
              {term}
            </Text>
            <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.7" flex="1">
              {definition}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
}

function WorkedExample({ block }: { block: WorkedExampleBlock }) {
  return (
    <Box>
      <Text
        fontSize="11px"
        fontWeight="800"
        color="primary.400"
        letterSpacing="0.12em"
        textTransform="uppercase"
        mb={2}
      >
        Worked Example
      </Text>
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        fontWeight="700"
        color="white"
        mb={4}
        lineHeight="1.4"
      >
        {block.title}
      </Text>
      {/* Scenario */}
      <Box
        px={4}
        py={3}
        mb={5}
        bg="rgba(255,255,255,0.03)"
        borderRadius="6px"
        border="1px solid rgba(255,255,255,0.07)"
      >
        <Text fontSize="sm" color="whiteAlpha.700" lineHeight="1.7" fontStyle="italic">
          {block.scenario}
        </Text>
      </Box>
      {/* Steps */}
      <VStack spacing={4} align="stretch">
        {block.steps.map(({ label, content }, i) => (
          <Flex key={i} gap={4} align="flex-start">
            <Box
              flexShrink={0}
              w="22px"
              h="22px"
              borderRadius="full"
              bg="rgba(254,204,4,0.12)"
              border="1px solid rgba(254,204,4,0.3)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt="1px"
            >
              <Text fontSize="11px" fontWeight="800" color="primary.400" lineHeight="1">
                {i + 1}
              </Text>
            </Box>
            <Box flex="1">
              <Text fontSize="12px" fontWeight="700" color="whiteAlpha.500" letterSpacing="0.06em" textTransform="uppercase" mb={1}>
                {label}
              </Text>
              <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.7">
                {content}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
      {/* Result */}
      {block.result && (
        <Box
          mt={5}
          px={4}
          py={3}
          borderLeft="2px solid rgba(254,204,4,0.45)"
          bg="rgba(254,204,4,0.04)"
          borderRadius="0 6px 6px 0"
        >
          <Text fontSize="11px" fontWeight="800" color="primary.400" letterSpacing="0.1em" textTransform="uppercase" mb={1}>
            Result
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.7">{block.result}</Text>
        </Box>
      )}
    </Box>
  )
}

function KeyTakeaway({ block }: { block: KeyTakeawayBlock }) {
  return (
    <Box
      px={5}
      py={4}
      borderRadius="8px"
      bg="rgba(254,204,4,0.06)"
      border="1px solid rgba(254,204,4,0.2)"
    >
      <Text
        fontSize="11px"
        fontWeight="800"
        color="primary.400"
        letterSpacing="0.12em"
        textTransform="uppercase"
        mb={2}
      >
        Key Takeaway
      </Text>
      <Text color="whiteAlpha.900" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8" fontWeight="500">
        {block.text}
      </Text>
    </Box>
  )
}

// ── Block dispatcher ───────────────────────────────────────────────────────────

function BlockRenderer({ block }: { block: GuideBlock }) {
  // Questions are rendered directly — their own bottom border handles separation
  if (block.type === 'question') {
    return <QuestionCard block={block as QuestionBlock} />
  }
  // Non-question blocks get consistent vertical spacing
  return (
    <Box py={1}>
      {block.type === 'paragraph' && <Paragraph block={block as ParagraphBlock} />}
      {block.type === 'tip' && <TipCallout block={block as TipBlock} />}
      {block.type === 'warning' && <WarningCallout block={block as WarningBlock} />}
      {block.type === 'bullets' && <BulletList block={block as BulletListBlock} />}
      {block.type === 'numbered' && <NumberedList block={block as NumberedListBlock} />}
      {block.type === 'stats' && <StatsRow block={block as StatsBlock} />}
      {block.type === 'concept' && <Concept block={block as ConceptBlock} />}
      {block.type === 'formula' && <Formula block={block as FormulaBlock} />}
      {block.type === 'dodont' && <DoDont block={block as DoDontBlock} />}
      {block.type === 'comparison-table' && <ComparisonTable block={block as ComparisonTableBlock} />}
      {block.type === 'key-term' && <KeyTerms block={block as KeyTermBlock} />}
      {block.type === 'worked-example' && <WorkedExample block={block as WorkedExampleBlock} />}
      {block.type === 'key-takeaway' && <KeyTakeaway block={block as KeyTakeawayBlock} />}
    </Box>
  )
}

// ── Section renderer ───────────────────────────────────────────────────────────

function SectionRenderer({ section, isFirst }: { section: GuideSection; isFirst: boolean }) {
  return (
    <Box
      as="section"
      id={section.id}
      pt={isFirst ? 0 : 16}
      borderTop={isFirst ? undefined : '1px solid rgba(255,255,255,0.06)'}
      sx={{ scrollMarginTop: '100px' }}
    >
      {/* Section heading */}
      <Text
        as="h2"
        fontSize={{ base: 'xl', md: '2xl' }}
        fontWeight="700"
        color="white"
        letterSpacing="-0.02em"
        mb={section.intro ? 3 : 7}
      >
        {section.title}
      </Text>

      {/* Optional intro */}
      {section.intro ? (
        <Text
          color="whiteAlpha.700"
          fontSize={{ base: 'sm', md: 'md' }}
          lineHeight="1.85"
          mb={8}
        >
          {section.intro}
        </Text>
      ) : null}

      {/* Blocks */}
      <VStack spacing={6} align="stretch">
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </VStack>
    </Box>
  )
}

// ── Bottom CTA ─────────────────────────────────────────────────────────────────

function GuideCta({ guide }: { guide: InterviewGuide }) {
  return (
    <Box mt={20} pt={12} borderTop="1px solid rgba(255,255,255,0.06)">
      <Text
        as="h2"
        fontSize={{ base: '2xl', md: '4xl' }}
        fontWeight="800"
        color="white"
        letterSpacing="-0.02em"
        mb={3}
      >
        Practice these questions live
      </Text>
      <Text
        color="whiteAlpha.700"
        fontSize={{ base: 'md', md: 'lg' }}
        maxW="480px"
        lineHeight="1.8"
        mb={7}
      >
        Interview Pilot gives you real-time Interview Copilot answer suggestions during
        live interviews, so you can respond clearly when {guide.role} questions come up.
      </Text>
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
    </Box>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────

interface GuidePageContentProps {
  guide: InterviewGuide
}

export function GuidePageContent({ guide }: GuidePageContentProps) {
  const tocSections = guide.sections.map(({ id, title, group }) => ({ id, title, group }))

  const totalQuestions = guide.sections
    .flatMap((s) => s.blocks)
    .filter((b) => b.type === 'question').length

  return (
    <Box as="article" pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      {/* ── Hero ── */}
      <Box pt={16} pb={14} px={[4, null]} borderBottom="1px solid rgba(255,255,255,0.06)">
        <Container maxW="container.lg">
          <VStack spacing={5} align="flex-start">
            {/* Eyebrow */}
            <Flex align="center" gap={2}>
              <Box as={FiBookOpen} color="whiteAlpha.400" style={{ width: 13, height: 13 }} />
              <Text
                fontSize="11px"
                fontWeight="700"
                color="whiteAlpha.400"
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                Interview Guide
              </Text>
            </Flex>

            {/* Title */}
            <Text
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="800"
              color="white"
              lineHeight="1.05"
              letterSpacing="-0.03em"
            >
              {guide.title}
            </Text>

            {/* Description */}
            <Text
              color="whiteAlpha.700"
              fontSize={{ base: 'md', md: 'lg' }}
              lineHeight="1.8"
              maxW="600px"
            >
              {guide.description}
            </Text>

            {/* Meta row */}
            <Flex gap={5} flexWrap="wrap" align="center" pt={1}>
              {[
                `${guide.readingTimeMinutes} min read`,
                `${totalQuestions} questions`,
                guide.role,
                `Updated ${new Date(guide.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
              ].map((item, i) => (
                <Flex key={i} align="center" gap={2}>
                  {i > 0 && (
                    <Box w="3px" h="3px" borderRadius="full" bg="whiteAlpha.200" />
                  )}
                  <Text fontSize="sm" color="whiteAlpha.350">
                    {item}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Box py={{ base: 12, md: 16 }} px={[4, null]}>
        <Container maxW="container.lg">
          <Flex gap={16} align="flex-start">
            {/* Sidebar TOC — desktop only */}
            <Box
              w="220px"
              flexShrink={0}
              alignSelf="flex-start"
              position="sticky"
              top="96px"
              display={{ base: 'none', xl: 'block' }}
            >
              <GuideToc sections={tocSections} />
            </Box>

            {/* Article body */}
            <Box flex="1" minW={0}>
              {guide.sections.map((section, i) => (
                <SectionRenderer key={section.id} section={section} isFirst={i === 0} />
              ))}
              <GuideCta guide={guide} />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
