'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiAlertCircle, FiAlertTriangle, FiArrowRight, FiCheck, FiClock, FiHelpCircle, FiX } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { Link } from '@saas-ui/react'

import type {
  ComparisonFeatureDetail,
  ComparisonFeatureId,
  ComparisonFeatureValue,
  ComparisonPage,
} from '#data/comparisons'
import { INTERNAL_ROUTES } from '#constants'
import { sectionContentStyles } from '#theme/styles/section-styles'

interface ComparisonPageContentProps {
  page: ComparisonPage
}

const IP_FEATURES: Record<ComparisonFeatureId, true | 'soon'> = {
  '1-second-answers': true,
  'latest-ai-models': true,
  'structured-talking-points': true,
  'usage-limit': true,
  'followup-prompts': true,
  'live-transcription': true,
  'full-mobile-app': true,
  'invisible-dock': true,
  'keyboard-shortcuts': true,
  'click-through': true,
  'user-count': true,
  'uptime': true,
  'star-rating': true,
  'macos-app': true,
  'ios-app': true,
  'android-app': true,
  'windows-app': true,
  'mock-interviews': true,
  'question-bank': true,
  'company-specific': true,
  'free-plan': true,
  'weekly-cost': true,
  'no-sessions-limit': true,
  'free-download': true,
  'refund-policy': true,
}

interface Feature {
  id: ComparisonFeatureId
  label: string
  iconSrc?: string
  iconFilter?: string
  ipText?: string
  ipSubtext?: string
}

const FEATURE_SECTIONS: { title: string; features: Feature[] }[] = [
  {
    title: 'Live Interview Support',
    features: [
      { id: '1-second-answers', label: '1s answer suggestions' },
      { id: 'latest-ai-models', label: 'Latest AI models' },
      { id: 'structured-talking-points', label: 'Structured talking points' },
      { id: 'usage-limit', label: 'Usage limit', ipText: '1,000 Copilot Use / wk' },
      { id: 'followup-prompts', label: 'Follow-up prompts' },
      { id: 'live-transcription', label: 'Live audio transcription' },
    ],
  },
  {
    title: 'Stealth & Detection',
    features: [
      { id: 'full-mobile-app', label: 'Full iOS & Android app' },
      { id: 'invisible-dock', label: 'Invisible in dock / system tray' },
      { id: 'keyboard-shortcuts', label: 'Keyboard shortcuts' },
      { id: 'click-through', label: 'Click-through support' },
    ],
  },
  {
    title: 'Proof & Trust',
    features: [
      { id: 'user-count', label: 'Verified users', ipText: '150,000+ verified' },
      { id: 'uptime', label: 'System uptime', ipText: '>99%' },
      { id: 'star-rating', label: 'Ratings & reviews', ipText: '4.9 ★', ipSubtext: '10,000+ ratings' },
    ],
  },
  {
    title: 'Platforms & Devices',
    features: [
      {
        id: 'macos-app',
        label: 'macOS app',
        iconSrc: '/static/icons/platforms/apple.svg',
        iconFilter: 'invert(1)',
      },
      { id: 'ios-app', label: 'iOS app', iconSrc: '/static/icons/platforms/app-store.svg' },
      { id: 'android-app', label: 'Android app', iconSrc: '/static/icons/platforms/google-play.svg' },
      { id: 'windows-app', label: 'Windows app', iconSrc: '/static/icons/platforms/windows.svg' },
    ],
  },
  {
    title: 'Interview Preparation',
    features: [
      { id: 'mock-interviews', label: 'AI Mock Interviews' },
      { id: 'question-bank', label: 'Question bank (10,000+ questions)' },
      { id: 'company-specific', label: 'Company & role-specific practice' },
    ],
  },
  {
    title: 'Pricing',
    features: [
      { id: 'free-plan', label: 'Free plan available' },
      { id: 'weekly-cost', label: 'Pricing', ipText: '$3.99 / week', ipSubtext: '(for first week)' },
      { id: 'no-sessions-limit', label: 'No interview sessions limit' },
      { id: 'free-download', label: 'Free download' },
      { id: 'refund-policy', label: 'Clear refund policy' },
    ],
  },
]

function IconCell({ value }: { value: ComparisonFeatureValue }) {
  if (value === true) {
    return (
      <Flex justify="center" align="center">
        <Box as={FiCheck} color="#22c55e" style={{ width: 22, height: 22, strokeWidth: 2.5 }} />
      </Flex>
    )
  }
  if (value === 'soon') {
    return (
      <Flex justify="center" align="center">
        <Flex align="center" gap="4px" px="8px" py="3px" borderRadius="full" bg="rgba(255,229,0,0.08)" border="1px solid rgba(255,229,0,0.18)">
          <Box as={FiClock} color="primary.300" style={{ width: 10, height: 10 }} />
          <Text fontSize="10px" fontWeight="700" color="primary.300" letterSpacing="0.05em">SOON</Text>
        </Flex>
      </Flex>
    )
  }
  if (value === 'limited') {
    return (
      <Flex justify="center" align="center">
        <Flex align="center" gap="4px" px="8px" py="3px" borderRadius="full" bg="rgba(239,68,68,0.08)" border="1px solid rgba(239,68,68,0.18)">
          <Box as={FiAlertCircle} color="#ef4444" style={{ width: 10, height: 10 }} />
          <Text fontSize="10px" fontWeight="700" color="#ef4444" letterSpacing="0.05em">LIMITED</Text>
        </Flex>
      </Flex>
    )
  }
  if (value === false) {
    return (
      <Flex justify="center" align="center">
        <Box as={FiX} color="#ef4444" style={{ width: 20, height: 20, strokeWidth: 2.5 }} />
      </Flex>
    )
  }

  return (
    <Flex justify="center" align="center">
      <Flex align="center" gap="4px" px="8px" py="3px" borderRadius="full" bg="rgba(255,255,255,0.05)" border="1px solid rgba(255,255,255,0.12)">
        <Box as={FiHelpCircle} color="whiteAlpha.500" style={{ width: 10, height: 10 }} />
        <Text fontSize="10px" fontWeight="700" color="whiteAlpha.600" letterSpacing="0.05em">CHECK</Text>
      </Flex>
    </Flex>
  )
}

function IpCell({ feature }: { feature: Feature }) {
  const value = IP_FEATURES[feature.id] ?? false
  if (feature.ipText) {
    return (
      <Flex direction="column" align="center" justify="center" gap="2px">
        <Text color="#22c55e" fontSize="md" fontWeight="700" textAlign="center">{feature.ipText}</Text>
        {feature.ipSubtext && (
          <Text color="whiteAlpha.400" fontSize="11px" fontWeight="500" textAlign="center">{feature.ipSubtext}</Text>
        )}
      </Flex>
    )
  }
  return <IconCell value={value} />
}

function CompetitorCell({ detail }: { detail: ComparisonFeatureDetail }) {
  if (detail.text) {
    return (
      <Flex direction="column" align="center" justify="center" gap="2px">
        {detail.href ? (
          <Link
            href={detail.href}
            isExternal
            color={
              detail.value === 'verify'
                ? 'whiteAlpha.700'
                : detail.value === 'limited'
                  ? '#ef4444'
                  : '#22c55e'
            }
            fontSize="md"
            fontWeight="700"
            textAlign="center"
            textDecoration="underline"
            textUnderlineOffset="2px"
            _hover={{ opacity: 0.8 }}
          >
            {detail.text}
          </Link>
        ) : (
          <Text
            color={
              detail.value === 'verify'
                ? 'whiteAlpha.700'
                : detail.value === 'limited'
                  ? '#ef4444'
                  : '#22c55e'
            }
            fontSize="md"
            fontWeight="700"
            textAlign="center"
          >
            {detail.text}
          </Text>
        )}
        {detail.subtext ? (
          <Text color="whiteAlpha.400" fontSize="11px" fontWeight="500" textAlign="center">
            {detail.subtext}
          </Text>
        ) : null}
      </Flex>
    )
  }

  return <IconCell value={detail.value} />
}

export function ComparisonPageContent({ page }: ComparisonPageContentProps) {
  const competitorSet = new Set<ComparisonFeatureId>(page.competitorHasFeatures)
  const getCompetitorDetail = (featureId: ComparisonFeatureId): ComparisonFeatureDetail => {
    return page.competitorFeatureDetails?.[featureId] ?? {
      value: competitorSet.has(featureId) ? true : 'verify',
    }
  }

  return (
    <Box pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      <Box pt={16} pb={{ base: 20, md: 32 }} px={[4, null]}>
        <Container maxW="container.lg">
          <VStack spacing={{ base: 16, md: 20 }} align="stretch">

            {/* ── Hero ── */}
            <VStack spacing={5} textAlign="center" align="center">
              <Flex
                px={4} py="6px"
                borderRadius="full"
                border="1px solid rgba(255,229,0,0.25)"
                bg="rgba(255,229,0,0.07)"
                display="inline-flex"
              >
                <Text color="primary.300" fontSize="xs" fontWeight="800" letterSpacing="0.1em" textTransform="uppercase">
                  Alternative & Comparison
                </Text>
              </Flex>

              <Text
                as="h1"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="800"
                color="white"
                lineHeight="1.05"
                letterSpacing="-0.02em"
              >
                Interview Pilot{' '}
                <Text as="span" color="whiteAlpha.400">vs</Text>{' '}
                {page.competitor}
              </Text>

              <Text
                maxW="620px"
                color="whiteAlpha.600"
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight="1.75"
              >
                {page.description}
              </Text>
            </VStack>

            {/* ── Key Risks ── */}
            {page.risks && page.risks.length > 0 && (
              <Box as="section" aria-label={`Key risks with ${page.competitor}`}>
                {/* Header */}
                <Text as="h2" color="white" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="700" letterSpacing="-0.01em" mb={5}>
                  Key Risks with {page.competitor}
                </Text>

                {/* Risk list */}
                <VStack spacing={4} align="stretch">
                  {page.risks.map((risk, idx) => (
                    <Flex
                      key={idx}
                      align="flex-start"
                      gap={4}
                    >
                      <Box as={FiAlertTriangle} color="#ef4444" style={{ width: 28, height: 28, flexShrink: 0, strokeWidth: 2 }} />
                      {typeof risk === 'string' ? (
                        <Text color="white" fontSize={{ base: 'xl', md: '2xl' }} lineHeight="1.5">
                          {risk}
                        </Text>
                      ) : (
                        <Text color="white" fontSize={{ base: 'xl', md: '2xl' }} lineHeight="1.5">
                          {risk.linkText && risk.href && risk.text.includes(risk.linkText) ? (
                            <>
                              {risk.text.slice(0, risk.text.indexOf(risk.linkText))}
                              <Link
                                href={risk.href}
                                isExternal
                                color="white"
                                textDecoration="underline"
                                textUnderlineOffset="3px"
                                _hover={{ color: 'white' }}
                              >
                                {risk.linkText}
                              </Link>
                              {risk.text.slice(risk.text.indexOf(risk.linkText) + risk.linkText.length)}
                            </>
                          ) : (
                            risk.text
                          )}
                        </Text>
                      )}
                    </Flex>
                  ))}
                </VStack>
              </Box>
            )}

            {/* ── Comparison table ── */}
            <Box as="section" aria-label="Feature comparison">
              <Flex align="center" mb={5}>
                <Text as="h2" flex="1" color="white" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="700" letterSpacing="-0.01em">
                  Feature comparison
                </Text>
              </Flex>

              {/* Outer wrapper for border + radius — separate from the table so overflow:hidden doesn't clip box-shadow */}
              <Box
                borderRadius="2xl"
                overflow="hidden"
                border="1px solid rgba(255,255,255,0.08)"
              >
                <Box
                  as="table"
                  w="full"
                  display={{ base: 'none', md: 'table' }}
                  sx={{ borderCollapse: 'collapse' }}
                >
                  <colgroup>
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: '260px' }} />
                    <col style={{ width: '260px' }} />
                  </colgroup>

                  <Box as="thead">
                    <Box as="tr">
                      {/* Empty header for the feature-label column */}
                      <Box
                        as="th"
                        scope="col"
                        px={{ base: 4, md: 7 }}
                        py={5}
                        textAlign="left"
                        borderBottom="1px solid rgba(255,255,255,0.08)"
                      />

                      {/* Interview Pilot column header */}
                      <Box
                        as="th"
                        scope="col"
                        px={3}
                        py={5}
                        textAlign="center"
                        bg="rgba(255,229,0,0.06)"
                        borderLeft="1px solid rgba(255,229,0,0.15)"
                        borderTop="2px solid"
                        borderTopColor="primary.400"
                        borderBottom="1px solid rgba(255,255,255,0.08)"
                      >
                        <Flex direction="column" align="center" gap={3}>
                          {/* Name */}
                          <Flex align="center" gap={2}>
                            <Box as={AiFillStar} color="primary.400" style={{ width: 22, height: 22, flexShrink: 0 }} />
                            <Text
                              color="white"
                              fontSize={{ base: 'xl', md: '3xl' }}
                              fontWeight="bold"
                              fontFamily="var(--font-dm-sans)"
                              letterSpacing="-0.8px"
                              lineHeight="1"
                            >
                              Interview Pilot
                            </Text>
                          </Flex>

                          {/* Recommended badge */}
                          <Flex
                            align="center"
                            px={2}
                            py="2px"
                            borderRadius="full"
                            bg="rgba(255,229,0,0.12)"
                            border="1px solid rgba(255,229,0,0.28)"
                            whiteSpace="nowrap"
                            display="inline-flex"
                          >
                            <Text color="primary.400" fontSize="11px" fontWeight="800" letterSpacing="0.06em" textTransform="uppercase">
                              Recommended
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>

                      {/* Competitor column header */}
                      <Box
                        as="th"
                        scope="col"
                        px={3}
                        py={5}
                        textAlign="center"
                        borderLeft="1px solid rgba(255,255,255,0.06)"
                        borderBottom="1px solid rgba(255,255,255,0.08)"
                      >
                        <Text
                          color="whiteAlpha.500"
                          fontSize={{ base: 'lg', md: '2xl' }}
                          fontWeight="700"
                        >
                          {page.competitor}
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box as="tbody">
                    {FEATURE_SECTIONS.map((section, sIdx) => (
                      <React.Fragment key={section.title}>

                        {/* Section header row */}
                        <Box
                          as="tr"
                          bg="rgba(255,255,255,0.025)"
                          borderTop={sIdx > 0 ? '1px solid rgba(255,255,255,0.07)' : undefined}
                        >
                          <Box
                            as="th"
                            scope="colgroup"
                            colSpan={3}
                            px={{ base: 4, md: 7 }}
                            py="10px"
                            textAlign="left"
                          >
                            <Text
                              color="primary.400"
                              fontSize="13px"
                              fontWeight="800"
                              letterSpacing="0.1em"
                              textTransform="uppercase"
                            >
                              {section.title}
                            </Text>
                          </Box>
                        </Box>

                        {/* Feature rows */}
                        {section.features.map((feature) => {
                          const compDetail = getCompetitorDetail(feature.id)

                          return (
                            <Box
                              as="tr"
                              key={feature.id}
                              borderTop="1px solid rgba(255,255,255,0.05)"
                              sx={{
                                '&:hover td, &:hover th': {
                                  bg: 'rgba(255,255,255,0.02)',
                                },
                              }}
                            >
                              {/* Feature label */}
                              <Box
                                as="th"
                                scope="row"
                                px={{ base: 4, md: 7 }}
                                py={{ base: 4, md: 5 }}
                                textAlign="left"
                                fontWeight="500"
                              >
                                <Flex align="center" gap={2}>
                                  {feature.iconSrc && (
                                    <Image
                                      src={feature.iconSrc}
                                      alt=""
                                      boxSize="18px"
                                      flexShrink={0}
                                      filter={feature.iconFilter}
                                    />
                                  )}
                                  <Text color="white" fontSize={{ base: 'md', md: 'lg' }} fontWeight="500">
                                    {feature.label}
                                  </Text>
                                </Flex>
                              </Box>

                              {/* Interview Pilot cell */}
                              <Box
                                as="td"
                                px={3}
                                py={{ base: 4, md: 5 }}
                                bg="rgba(255,229,0,0.04)"
                                borderLeft="1px solid rgba(255,229,0,0.1)"
                                transition="background 0.12s"
                              >
                                <IpCell feature={feature} />
                              </Box>

                              {/* Competitor cell */}
                              <Box
                                as="td"
                                px={3}
                                py={{ base: 4, md: 5 }}
                                borderLeft="1px solid rgba(255,255,255,0.05)"
                                transition="background 0.12s"
                              >
                                <CompetitorCell detail={compDetail} />
                              </Box>
                            </Box>
                          )
                        })}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>

                <VStack display={{ base: 'flex', md: 'none' }} spacing={0} align="stretch">
                  {FEATURE_SECTIONS.map((section) => (
                    <Box key={section.title}>
                      <Box
                        px={4}
                        py={3}
                        bg="rgba(255,255,255,0.035)"
                        borderTop="1px solid rgba(255,255,255,0.08)"
                      >
                        <Text
                          color="primary.400"
                          fontSize="12px"
                          fontWeight="800"
                          letterSpacing="0.1em"
                          textTransform="uppercase"
                        >
                          {section.title}
                        </Text>
                      </Box>

                      {section.features.map((feature) => {
                        const compDetail = getCompetitorDetail(feature.id)

                        return (
                          <Box
                            key={feature.id}
                            px={4}
                            py={4}
                            borderTop="1px solid rgba(255,255,255,0.06)"
                          >
                            <Flex align="center" gap={2} mb={4}>
                              {feature.iconSrc && (
                                <Image
                                  src={feature.iconSrc}
                                  alt=""
                                  boxSize="18px"
                                  flexShrink={0}
                                  filter={feature.iconFilter}
                                />
                              )}
                              <Text color="white" fontSize="md" fontWeight="700">
                                {feature.label}
                              </Text>
                            </Flex>

                            <Flex
                              borderRadius="xl"
                              overflow="hidden"
                              border="1px solid rgba(255,255,255,0.08)"
                            >
                              <VStack
                                flex="1"
                                spacing={3}
                                align="center"
                                justify="space-between"
                                p={3}
                                bg="rgba(255,229,0,0.05)"
                              >
                                <Text color="white" fontSize="xs" fontWeight="800" textAlign="center">
                                  Interview Pilot
                                </Text>
                                <IpCell feature={feature} />
                              </VStack>

                              <VStack
                                flex="1"
                                spacing={3}
                                align="center"
                                justify="space-between"
                                p={3}
                                borderLeft="1px solid rgba(255,255,255,0.08)"
                              >
                                <Text color="whiteAlpha.600" fontSize="xs" fontWeight="800" textAlign="center">
                                  {page.competitor}
                                </Text>
                                <CompetitorCell detail={compDetail} />
                              </VStack>
                            </Flex>
                          </Box>
                        )
                      })}
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Box>


            {/* ── CTA ── */}
            <VStack spacing={4} align="center">
              <Button
                as="a"
                href={INTERNAL_ROUTES.downloads}
                variant="primary"
                color="black"
                borderRadius="full"
                size="lg"
                fontWeight="700"
                rightIcon={<FiArrowRight />}
              >
                Try Interview Pilot free
              </Button>
              <Text color="whiteAlpha.400" fontSize="xs">
                {page.competitor} is a trademark of its respective owner. Interview Pilot is not affiliated with or endorsed by {page.competitor}.
              </Text>
            </VStack>

          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
