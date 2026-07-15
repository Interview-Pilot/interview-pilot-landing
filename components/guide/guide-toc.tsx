'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'

import type { GuideSection } from '#data/interview-guides'
import { INTERNAL_ROUTES } from '#constants'

type SectionRef = Pick<GuideSection, 'id' | 'title' | 'group'>

interface GuideTocProps {
  sections: SectionRef[]
}

/** Groups consecutive sections that share the same `group` label */
function buildGroups(sections: SectionRef[]) {
  const groups: Array<{ group?: string; items: SectionRef[] }> = []
  for (const section of sections) {
    const last = groups[groups.length - 1]
    if (last && last.group === section.group) {
      last.items.push(section)
    } else {
      groups.push({ group: section.group, items: [section] })
    }
  }
  return groups
}

export function GuideToc({ sections }: GuideTocProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')
  const scrollingRef = useRef(false)

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -65% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    scrollingRef.current = true
    setActiveId(id)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => { scrollingRef.current = false }, 800)
  }

  const groups = buildGroups(sections)

  return (
    <Box
      as="nav"
      aria-label="Page sections"
      maxH="calc(100vh - 120px)"
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': { width: '3px' },
        '&::-webkit-scrollbar-track': { bg: 'transparent' },
        '&::-webkit-scrollbar-thumb': { bg: 'rgba(255,255,255,0.08)', borderRadius: '2px' },
      }}
    >
      <Text
        fontSize="11px"
        fontWeight="800"
        color="whiteAlpha.300"
        letterSpacing="0.12em"
        textTransform="uppercase"
        mb={4}
        pl="22px"
      >
        On this page
      </Text>

      {/* ── Vertical bar track ── */}
      <Box position="relative">
        {/* The continuous track line */}
        <Box
          position="absolute"
          left="7px"
          top={0}
          bottom={0}
          w="1px"
          bg="rgba(255,255,255,0.08)"
        />

        <VStack spacing={0} align="stretch">
          {groups.map(({ group, items }) => (
            <Box key={group ?? '__ungrouped__'} mb={2}>
              {/* Group label */}
              {group ? (
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  color="whiteAlpha.250"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={1}
                  pl="22px"
                >
                  {group}
                </Text>
              ) : null}

              {/* Section links */}
              {items.map(({ id, title }) => {
                const isActive = activeId === id
                return (
                  <Box
                    key={id}
                    as="a"
                    href={`#${id}`}
                    display="flex"
                    alignItems="center"
                    gap="10px"
                    py="6px"
                    pr={2}
                    transition="all 0.15s"
                    _hover={{ textDecoration: 'none' }}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      handleClick(id)
                    }}
                  >
                    {/* Dot marker */}
                    <Box
                      flexShrink={0}
                      position="relative"
                      zIndex={1}
                      w="15px"
                      h="15px"
                      borderRadius="full"
                      border="1.5px solid"
                      borderColor={isActive ? 'primary.400' : 'rgba(255,255,255,0.15)'}
                      bg={isActive ? 'primary.400' : 'rgba(14,14,16,1)'}
                      transition="all 0.15s"
                      _groupHover={{ borderColor: 'rgba(255,255,255,0.3)' }}
                    />

                    {/* Label */}
                    <Text
                      fontSize="13px"
                      fontWeight={isActive ? '600' : '400'}
                      color={isActive ? 'primary.400' : 'whiteAlpha.500'}
                      transition="color 0.15s"
                      lineHeight="1.4"
                      _hover={{ color: isActive ? 'primary.400' : 'whiteAlpha.700' }}
                    >
                      {title}
                    </Text>
                  </Box>
                )
              })}
            </Box>
          ))}
        </VStack>
      </Box>

      {/* ── Sidebar CTA ── */}
      <Box
        mt={6}
        p={4}
        borderRadius="xl"
        border="1px solid rgba(255,229,0,0.18)"
        bg="rgba(255,229,0,0.05)"
      >
        <Text color="white" fontSize="13px" fontWeight="700" lineHeight="1.4" mb={1}>
          Practice these questions live
        </Text>
        <Text color="whiteAlpha.500" fontSize="12px" lineHeight="1.5" mb={3}>
          Get real-time Copilot answers during live interviews.
        </Text>
        <Flex
          as="a"
          href={INTERNAL_ROUTES.downloads}
          align="center"
          gap="6px"
          px={3}
          py="7px"
          borderRadius="full"
          bg="primary.400"
          color="black"
          fontWeight="700"
          fontSize="12px"
          _hover={{ bg: 'primary.300' }}
          transition="background 0.15s"
          display="inline-flex"
        >
          Try Interview Pilot
          <Box as={FiArrowRight} style={{ width: 13, height: 13 }} />
        </Flex>
      </Box>
    </Box>
  )
}
