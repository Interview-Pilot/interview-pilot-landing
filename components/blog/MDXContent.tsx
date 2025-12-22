'use client'

import { Box } from '@chakra-ui/react'
import * as runtime from 'react/jsx-runtime'
import { useMemo } from 'react'

/**
 * Custom components for MDX rendering
 * These replace default HTML elements with styled versions
 */
const mdxComponents = {
  // Add custom components here as needed
  // Example: Callout, CodeBlock, etc.
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
          color: 'yellow.400',
          textDecoration: 'underline',
          _hover: {
            color: 'yellow.300',
          },
        },

        // Lists
        '& ul, & ol': {
          pl: 6,
          mb: 4,
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
          borderColor: 'yellow.400',
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
          mb: 4,
          borderCollapse: 'collapse',
        },
        '& th, & td': {
          border: '1px solid',
          borderColor: 'whiteAlpha.200',
          p: 3,
          textAlign: 'left',
        },
        '& th': {
          bg: 'whiteAlpha.100',
          fontWeight: 'bold',
        },
        '& tr:nth-of-type(even)': {
          bg: 'whiteAlpha.50',
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
