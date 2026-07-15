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
        <SectionTitle
          title={testimonials.title}
          description={testimonials.description}
          align="center"
        />
        <Box
          position="relative"
          zIndex={1}
          w="100vw"
          ml="calc(50% - 50vw)"
          mr="calc(50% - 50vw)"
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
              align="flex-start"
              px="0"
              mb={rowIndex === 0 ? { base: 4, md: 5 } : 0}
              width="max-content"
              animation={`${rowIndex === 0 ? 'reviewsMarqueeLeft' : 'reviewsMarqueeRight'} ${rowIndex === 0 ? '56s' : '60s'} linear infinite`}
              _hover={{ animationPlayState: 'paused' }}
            >
              {[...row, ...row].map((t, i) => {
                const reviewLength = typeof t.children === 'string' ? t.children.length : 100
                const cardWidth =
                  reviewLength <= 24
                    ? { base: '58vw', sm: '240px', lg: '260px' }
                    : reviewLength <= 90
                      ? { base: '70vw', sm: '300px', lg: '320px' }
                      : { base: '78vw', sm: '340px', lg: '360px' }

                return (
                  <Testimonial
                    key={`${rowIndex}-${i}`}
                    compact
                    {...t}
                    bg="linear-gradient(145deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.035) 62%, rgba(255, 255, 255, 0.055) 100%)"
                    backdropFilter="blur(18px) saturate(135%)"
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.12)"
                    boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.085), 0 12px 34px rgba(0, 0, 0, 0.14)"
                    overflow="hidden"
                    transition="transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-72px',
                      right: '-58px',
                      w: '160px',
                      h: '160px',
                      borderRadius: 'full',
                      bg: 'rgba(255, 229, 0, 0.055)',
                      filter: 'blur(34px)',
                      pointerEvents: 'none',
                    }}
                    _hover={{
                      bg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.045) 62%, rgba(255, 255, 255, 0.065) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow:
                        'inset 0 1px 0 rgba(255, 255, 255, 0.11), 0 16px 40px rgba(0, 0, 0, 0.17)',
                    }}
                    sx={{
                      width: cardWidth,
                      minWidth: cardWidth,
                      minHeight: { base: '128px', md: '132px' },
                      height: 'auto',
                      borderRadius: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}
                  />
                )
              })}
            </HStack>
          ))}
        </Box>
      </Section>
    </Box>
  )
}
