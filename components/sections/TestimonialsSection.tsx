'use client'

import { Box, HStack } from '@chakra-ui/react'

import { Section, SectionTitle } from '#components/section'
import { Testimonial } from '#components/testimonials'
import testimonials from '../../data/testimonials'
import { sectionContentStyles } from '#theme/styles/section-styles'

/**
 * Testimonials section displaying user reviews in a 3-column grid
 */
export function TestimonialsSection() {
  const firstRow = testimonials.items.filter((_, index) => index % 2 === 0)
  const secondRow = testimonials.items.filter((_, index) => index % 2 === 1)

  return (
    <Box sx={sectionContentStyles}>
      <Section
        id="testimonials"
        innerWidth="container.xl"
      >
        <SectionTitle title={testimonials.title} align="center" />
        <Box
          position="relative"
          zIndex={1}
          mx={{ base: -4, md: 0 }}
          overflow="hidden"
          py={2}
          sx={{
            _before: {
              content: '""',
              position: 'absolute',
              zIndex: 2,
              top: 0,
              bottom: 0,
              left: 0,
              width: { base: '36px', md: '72px' },
              pointerEvents: 'none',
              background:
                'linear-gradient(to right, #0E0E10 0%, rgba(14, 14, 16, 0.72) 45%, rgba(14, 14, 16, 0) 100%)',
            },
            _after: {
              content: '""',
              position: 'absolute',
              zIndex: 2,
              top: 0,
              bottom: 0,
              right: 0,
              width: { base: '36px', md: '72px' },
              pointerEvents: 'none',
              background:
                'linear-gradient(to left, #0E0E10 0%, rgba(14, 14, 16, 0.72) 45%, rgba(14, 14, 16, 0) 100%)',
            },
            '@keyframes reviewsMarqueeLeft': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            },
            '@keyframes reviewsMarqueeRight': {
              from: { transform: 'translateX(-50%)' },
              to: { transform: 'translateX(0)' },
            },
          }}
        >
          {[firstRow, secondRow].map((row, rowIndex) => (
            <HStack
              key={rowIndex}
              spacing={{ base: 4, md: 5 }}
              align="stretch"
              px={{ base: 4, md: 0 }}
              mb={rowIndex === 0 ? { base: 4, md: 5 } : 0}
              width="max-content"
              animation={`${rowIndex === 0 ? 'reviewsMarqueeLeft' : 'reviewsMarqueeRight'} ${rowIndex === 0 ? '56s' : '60s'} linear infinite`}
              _hover={{ animationPlayState: 'paused' }}
            >
              {[...row, ...row].map((t, i) => (
                <Testimonial
                  key={`${rowIndex}-${i}`}
                  compact
                  {...t}
                  bg="rgba(255, 255, 255, 0.05)"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
                  _dark={{
                    bg: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                  transition="all 0.3s ease"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.08)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
                  }}
                  sx={{
                    width: { base: '78vw', sm: '340px', lg: '360px' },
                    minWidth: { base: '78vw', sm: '340px', lg: '360px' },
                    height: { base: '190px', md: '178px' },
                    borderRadius: 'xl',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}
                />
              ))}
            </HStack>
          ))}
        </Box>
      </Section>
    </Box>
  )
}
