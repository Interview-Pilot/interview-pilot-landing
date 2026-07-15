import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'

import { DownloadsList } from '#components/downloads/downloads-list'
import { sectionContentStyles } from '#theme/styles/section-styles'

export const metadata = {
  title: 'Downloads',
  description:
    'Download Interview Pilot for macOS, Windows, iPhone, and Android.',
  alternates: {
    canonical: '/downloads',
  },
  openGraph: {
    title: 'Downloads',
    description:
      'Download Interview Pilot for macOS, Windows, iPhone, and Android.',
    url: '/downloads',
  },
}

export default function DownloadsPage() {
  return (
    <Box pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      <Box pt={16} pb={16} px={[4, null]}>
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 10, lg: 20 }}
            alignItems="start"
          >
            <Box maxW={{ base: '100%', lg: '430px' }} pt={{ base: 0, lg: 2 }}>
              <Text
                mb="4"
                fontSize="sm"
                fontWeight="800"
                color="primary.400"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                Download
              </Text>
              <Text
                as="h1"
                fontSize={{ base: '6xl', md: '7xl', lg: '8xl' }}
                fontWeight="semibold"
                color="white"
                lineHeight="0.95"
                letterSpacing="-0.055em"
              >
                Downloads
              </Text>
              <Text color="whiteAlpha.700" fontSize={{ base: 'lg', md: 'xl' }} mt={5} lineHeight="1.55">
                Choose the version of Interview Pilot that fits your interview setup.
              </Text>
              <Text color="white" fontSize={{ base: 'sm', md: 'md' }} mt={2}>
                One subscription works across all platforms.
              </Text>
            </Box>

            <DownloadsList />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}
