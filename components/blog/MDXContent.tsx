'use client'

import {
  Badge,
  Box,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import * as runtime from 'react/jsx-runtime'
import { useMemo } from 'react'

function Callout({
  title,
  type = 'note',
  children,
}: {
  title?: string
  type?: 'quick-answer' | 'tip' | 'warning' | 'mistake' | 'takeaway' | 'note'
  children: ReactNode
}) {
  const labels = {
    'quick-answer': 'Quick answer',
    tip: 'Pro tip',
    warning: 'Watch out',
    mistake: 'Common mistake',
    takeaway: 'Key takeaway',
    note: 'Note',
  }

  return (
    <Box
      my={7}
      borderWidth="1px"
      borderColor="rgba(254, 204, 4, 0.32)"
      borderRadius="2xl"
      bg="rgba(254, 204, 4, 0.08)"
      px={{ base: 5, md: 6 }}
      py={{ base: 5, md: 6 }}
    >
      <Badge colorScheme="yellow" variant="subtle" mb={3}>
        {labels[type] || labels.note}
      </Badge>
      {title ? (
        <Heading as="h4" size="sm" mb={3}>
          {title}
        </Heading>
      ) : null}
      <Box>{children}</Box>
    </Box>
  )
}

function AnswerBlock({
  question,
  sample,
  why,
  makeItYours,
  children,
}: {
  question: string
  sample?: string
  why?: string
  makeItYours?: string
  children?: ReactNode
}) {
  return (
    <Box
      my={7}
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      bg="whiteAlpha.50"
      overflow="hidden"
    >
      <Box px={{ base: 5, md: 6 }} py={4} bg="whiteAlpha.100">
        <Text fontSize="sm" fontWeight="bold" color="primary.300" textTransform="uppercase" letterSpacing="0.08em">
          Sample answer
        </Text>
        <Heading as="h4" size="sm" mt={2}>
          {question}
        </Heading>
      </Box>
      <VStack align="stretch" spacing={4} px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }}>
        {sample ? (
          <Text color="gray.200" fontSize="lg" lineHeight="1.75">
            {sample}
          </Text>
        ) : null}
        {children ? <Box>{children}</Box> : null}
        {why ? (
          <Box>
            <Text fontWeight="bold" color="white" mb={1}>
              Why it works
            </Text>
            <Text color="gray.300">{why}</Text>
          </Box>
        ) : null}
        {makeItYours ? (
          <Box>
            <Text fontWeight="bold" color="white" mb={1}>
              Make it yours
            </Text>
            <Text color="gray.300">{makeItYours}</Text>
          </Box>
        ) : null}
      </VStack>
    </Box>
  )
}

function TemplateBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box my={7} borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="2xl" bg="gray.900" overflow="hidden">
      <Box px={{ base: 5, md: 6 }} py={4} borderBottomWidth="1px" borderColor="whiteAlpha.200">
        <Badge colorScheme="yellow" variant="outline" mb={2}>
          Template
        </Badge>
        <Heading as="h4" size="sm">
          {title}
        </Heading>
      </Box>
      <Box px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }}>
        {children}
      </Box>
    </Box>
  )
}

function Checklist({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Box my={7} borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="2xl" bg="whiteAlpha.50" px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }}>
      {title ? (
        <Heading as="h4" size="sm" mb={4}>
          {title}
        </Heading>
      ) : null}
      <Box className="checklist-content">{children}</Box>
    </Box>
  )
}

function StepList({ children }: { children: ReactNode }) {
  return (
    <Box my={7} borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="2xl" bg="whiteAlpha.50" px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }}>
      {children}
    </Box>
  )
}

function ExampleGrid({ children }: { children: ReactNode }) {
  return (
    <SimpleGrid my={7} columns={{ base: 1, md: 2 }} spacing={4}>
      {children}
    </SimpleGrid>
  )
}

function ExampleCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="2xl" bg="whiteAlpha.50" px={5} py={5}>
      <Heading as="h4" size="sm" mb={3}>
        {title}
      </Heading>
      <Box>{children}</Box>
    </Box>
  )
}

function StatCard({
  label,
  value,
  source,
  children,
}: {
  label: string
  value: string
  source?: string
  children?: ReactNode
}) {
  return (
    <Box my={7} borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="2xl" bg="whiteAlpha.50" px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }}>
      <Text color="app.text.muted" fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="0.08em">
        {label}
      </Text>
      <Text color="white" fontSize={{ base: '3xl', md: '4xl' }} fontWeight="black" letterSpacing="-0.05em" lineHeight="1" mt={2}>
        {value}
      </Text>
      {children ? (
        <>
          <Divider my={4} borderColor="whiteAlpha.200" />
          <Box>{children}</Box>
        </>
      ) : null}
      {source ? (
        <Text color="app.text.muted" fontSize="xs" mt={4}>
          Source: {source}
        </Text>
      ) : null}
    </Box>
  )
}

const mdxComponents = {
  Callout,
  AnswerBlock,
  TemplateBlock,
  Checklist,
  StepList,
  ExampleGrid,
  ExampleCard,
  StatCard,
}

interface MDXContentProps {
  code: string
}

/**
 * Execute MDX code compiled by Velite
 */
function useMDXComponent(code: string) {
  return useMemo(() => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
  }, [code])
}

/**
 * MDXContent component renders compiled MDX content
 * Uses Velite's compiled MDX code
 */
export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)

  return (
    <Box
      className="mdx-content"
      sx={{
        // Headings
        '& h1': {
          fontSize: '2.5rem',
          fontWeight: 'bold',
          mt: 8,
          mb: 4,
          lineHeight: 1.2,
        },
        '& h2': {
          fontSize: '2rem',
          fontWeight: 'bold',
          mt: 8,
          mb: 4,
          lineHeight: 1.3,
          borderBottom: '1px solid',
          borderColor: 'whiteAlpha.200',
          pb: 2,
        },
        '& h3': {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          mt: 6,
          mb: 3,
          lineHeight: 1.3,
        },
        '& h4': {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
        },

        // Paragraphs
        '& p': {
          fontSize: 'lg',
          lineHeight: 1.8,
          mb: 4,
          color: 'gray.300',
        },

        // Links
        '& a': {
          color: 'primary.400',
          textDecoration: 'underline',
          _hover: {
            color: 'primary.300',
          },
        },

        // Lists
        '& ul, & ol': {
          pl: 6,
          mb: 4,
        },
        '.checklist-content ul': {
          listStyleType: 'none',
          pl: 0,
        },
        '.checklist-content li': {
          position: 'relative',
          pl: 7,
        },
        '.checklist-content li::before': {
          content: '"✓"',
          position: 'absolute',
          left: 0,
          top: 0,
          color: 'primary.300',
          fontWeight: 'bold',
        },
        '& ol': {
          counterReset: 'ordered-list',
        },
        '& li': {
          fontSize: 'lg',
          lineHeight: 1.8,
          mb: 2,
          color: 'gray.300',
        },

        // Blockquotes
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'primary.400',
          pl: 4,
          py: 2,
          my: 4,
          bg: 'whiteAlpha.50',
          borderRadius: 'md',
          fontStyle: 'italic',
          '& p': {
            mb: 0,
          },
        },

        // Code
        '& code': {
          bg: 'whiteAlpha.100',
          px: 1.5,
          py: 0.5,
          borderRadius: 'md',
          fontSize: 'sm',
          fontFamily: 'mono',
        },
        '& pre': {
          bg: 'gray.900',
          p: 4,
          borderRadius: 'lg',
          overflowX: 'auto',
          mb: 4,
          '& code': {
            bg: 'transparent',
            p: 0,
          },
        },

        // Tables
        '& table': {
          width: '100%',
          my: 6,
          borderCollapse: 'separate',
          borderSpacing: 0,
          overflow: 'hidden',
          borderRadius: 'xl',
          border: '1px solid',
          borderColor: 'whiteAlpha.200',
          display: 'block',
          maxWidth: '100%',
          overflowX: 'auto',
        },
        '& th, & td': {
          borderBottom: '1px solid',
          borderRight: '1px solid',
          borderColor: 'whiteAlpha.200',
          px: 4,
          py: 3,
          textAlign: 'left',
          minWidth: '160px',
        },
        '& th': {
          bg: 'whiteAlpha.100',
          fontWeight: 'bold',
          color: 'white',
        },
        '& tr:nth-of-type(even)': {
          bg: 'whiteAlpha.50',
        },
        '& tr:last-of-type td': {
          borderBottom: 0,
        },
        '& th:last-of-type, & td:last-of-type': {
          borderRight: 0,
        },

        // Images
        '& img': {
          borderRadius: 'lg',
          my: 4,
          maxWidth: '100%',
          height: 'auto',
        },

        // Horizontal rule
        '& hr': {
          border: 'none',
          borderTop: '1px solid',
          borderColor: 'whiteAlpha.200',
          my: 8,
        },

        // Strong and emphasis
        '& strong': {
          fontWeight: 'bold',
          color: 'white',
        },
        '& em': {
          fontStyle: 'italic',
        },
      }}
    >
      <Component components={mdxComponents} />
    </Box>
  )
}
