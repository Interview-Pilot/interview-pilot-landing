'use client'

import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'

import { Section } from '#components/section'
import { sectionContentStyles } from '#theme/styles/section-styles'

const STEPS = [
  {
    number: '01',
    title: 'Add profile',
    description:
      'Upload your personal details and job info. Add your resume, target role, company, and job description so Copilot can tailor answers to your actual background.',
  },
  {
    number: '02',
    title: 'Choose style',
    description:
      'Choose a response style, depending on what fits you. Use full answers, concise replies, or key talking points based on how you want to speak.',
  },
  {
    number: '03',
    title: 'Interview',
    description:
      'Record a question. Generate an answer. Interview Pilot listens, transcribes, and gives you a tailored response in seconds.',
  },
]

const dividerColor = 'rgba(255, 255, 255, 0.1)'

/**
 * How-to-use section showing the core Interview Pilot workflow.
 */
export function FeaturesSection() {
  return (
    <Box sx={sectionContentStyles}>
      <Section id="features" innerWidth="container.xl">
        <Box position="relative" zIndex={1}>
          <Box maxW={{ base: '100%', lg: '820px' }} mb={{ base: 12, md: 16 }}>
            <Text
              mb="4"
              fontSize="sm"
              fontWeight="800"
              color="primary.400"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              How to use
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
              lineHeight="0.92"
              letterSpacing="-0.06em"
              fontWeight="semibold"
              color="app.text.primary"
            >
              Set up your Copilot in three simple steps.
            </Heading>
            <Text
              mt="6"
              maxW="660px"
              fontSize={{ base: 'lg', md: 'xl' }}
              color="muted"
              lineHeight="1.55"
            >
              Give Interview Pilot the context it needs once, choose how you want
              answers to sound, then use it live when interview questions come in.
            </Text>
          </Box>

          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor={dividerColor}
          >
            {STEPS.map((step, index) => (
              <Box
                key={step.number}
                py={{ base: 8, md: 10 }}
                px={{
                  base: 0,
                  lg: index === 0 ? 0 : 10,
                }}
                pr={{ lg: index === 0 ? 10 : undefined }}
                borderTop={{
                  base: index === 0 ? '0' : '1px solid',
                  lg: '0',
                }}
                borderLeft={{
                  base: '0',
                  lg: index === 0 ? '0' : '1px solid',
                }}
                borderColor={dividerColor}
              >
                <Text
                  mb="8"
                  fontSize="sm"
                  fontWeight="700"
                  color="whiteAlpha.700"
                  letterSpacing="-0.01em"
                >
                  {step.number}
                </Text>
                <Heading
                  as="h3"
                  mb="5"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  lineHeight="1.05"
                  letterSpacing="-0.04em"
                  fontWeight="semibold"
                  color="app.text.primary"
                >
                  {step.title}
                </Heading>
                <Text
                  color="muted"
                  fontSize={{ base: 'md', md: 'lg' }}
                  lineHeight="1.65"
                >
                  {step.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Section>
    </Box>
  )
}
