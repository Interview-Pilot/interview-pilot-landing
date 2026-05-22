'use client'

import { Box, Container, HStack, Image, Text } from '@chakra-ui/react'

import { sectionContentStyles } from '#theme/styles/section-styles'

const COMPANY_LOGOS = [
  { name: 'OpenAI', src: '/static/company-logos-carousel/logo_openai.svg' },
  { name: 'Meta', src: '/static/company-logos-carousel/logo_meta.svg' },
  { name: 'Goldman Sachs', src: '/static/company-logos-carousel/logo_goldman.svg' },
  { name: 'McKinsey', src: '/static/company-logos-carousel/logo_mckinsey.svg' },
  { name: 'Google', src: '/static/company-logos-carousel/logo_google.svg' },
  { name: 'BCG', src: '/static/company-logos-carousel/logo_bcg.svg' },
  { name: 'Amazon', src: '/static/company-logos-carousel/logo_amazon.svg' },
  { name: 'JPMorgan', src: '/static/company-logos-carousel/logo_jpmorgan.svg' },
  { name: 'Microsoft', src: '/static/company-logos-carousel/logo_microsoft.svg' },
  { name: 'Bain', src: '/static/company-logos-carousel/logo_bain.svg' },
  { name: 'Morgan Stanley', src: '/static/company-logos-carousel/logo_morganstanley.svg' },
] as const

export function CompanyLogosCarouselSection() {
  return (
    <Box sx={sectionContentStyles} pt={{ base: 10, md: 12 }} pb={{ base: 4, md: 5 }}>
      <Container maxW="container.xl">
          <Text
            color="white"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            lineHeight="short"
            textAlign="center"
            mb={{ base: 5, md: 6 }}
            px={{ base: 6, md: 0 }}
          >
            Your first job matters.
            <Box as="br" display={{ base: 'block', md: 'none' }} /> Secure your career today.
          </Text>
          <Box
            position="relative"
            overflow="hidden"
            mx={{ base: -4, md: 0 }}
            py={2}
            sx={{
              _before: {
                content: '""',
                position: 'absolute',
                zIndex: 2,
                top: 0,
                bottom: 0,
                left: 0,
                width: { base: '44px', md: '96px' },
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
                width: { base: '44px', md: '96px' },
                pointerEvents: 'none',
                background:
                  'linear-gradient(to left, #0E0E10 0%, rgba(14, 14, 16, 0.72) 45%, rgba(14, 14, 16, 0) 100%)',
              },
              '@keyframes companyLogoMarquee': {
                from: { transform: 'translateX(0)' },
                to: { transform: 'translateX(-50%)' },
              },
            }}
          >
            <HStack
              spacing={{ base: 5, md: 7 }}
              width="max-content"
              px={{ base: 4, md: 0 }}
              animation="companyLogoMarquee 34s linear infinite"
              _hover={{ animationPlayState: 'paused' }}
            >
              {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, index) => (
                <Box
                  key={`${logo.name}-${index}`}
                  w={{ base: '116px', md: '136px' }}
                  h={{ base: '50px', md: '56px' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    maxW={{ base: '102px', md: '120px' }}
                    maxH={{ base: '30px', md: '34px' }}
                    objectFit="contain"
                  />
                </Box>
              ))}
            </HStack>
          </Box>
      </Container>
    </Box>
  )
}
