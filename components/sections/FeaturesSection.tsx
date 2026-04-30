'use client'

import { Box, Heading, Text } from '@chakra-ui/react'
import { Br } from '@saas-ui/react'
import {
  FiBox,
  FiBriefcase,
  FiSmile,
} from 'react-icons/fi'

import { Features } from '#components/features'
import { sectionContentStyles } from '#theme/styles/section-styles'

const STEP_FEATURES = [
  {
    title: <Text fontSize={['4xl', '5xl', '6xl']} fontWeight="medium" mb={3}>Step 1</Text>,
    icon: FiSmile,
    description: (
      <>
        <Br />
        Upload your personal details and job info.
      </>
    ),
    variant: 'inline' as const,
  },
  {
    title: <Text fontSize={['4xl', '5xl', '6xl']} fontWeight="medium" mb={3}>Step 2</Text>,
    icon: FiBriefcase,
    description: (
      <>
        <Br />
        Choose a response style, depending on what fits you.
      </>
    ),
    variant: 'inline' as const,
  },
  {
    title: <Text fontSize={['4xl', '5xl', '6xl']} fontWeight="medium" mb={3}>Interview</Text>,
    icon: FiBox,
    description: (
      <>
        <Br />
        Record a question. Generate an answer.
      </>
    ),
    variant: 'inline' as const,
    iconColor: 'cyan.400',
    iconBg: 'rgba(207, 250, 254, 0.2)',
  },
]

/**
 * Features section showing how to use the app step by step
 */
export function FeaturesSection() {
  return (
    <Box sx={sectionContentStyles}>
      <Features
        id="features"
        title={
          <Heading
            lineHeight="short"
            fontSize={['4xl', null, '4xl']}
            textAlign="center"
            as="p"
            className="main-title"
            sx={{
              fontSize: { base: '4xl', md: '4xl', lg: '4xl' },
            }}
          >
            How to Use
          </Heading>
        }
        description="Fully Undetectable. Completely fuss-free and easy to use."
        align="center"
        columns={[1, 2, 3]}
        iconSize={5}
        spacing={14}
        sx={{
          '.chakra-simple-grid': {
            rowGap: '4rem',
          },
          '.feature-item, .saas-feature, & > div, & svg, & .chakra-icon, & [role="img"]': {
            position: 'relative',
            zIndex: 1,
          },
        }}
        features={STEP_FEATURES}
      />
    </Box>
  )
}
