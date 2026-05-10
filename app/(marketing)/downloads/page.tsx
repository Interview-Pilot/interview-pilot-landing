import { Box, Container, Text, VStack } from '@chakra-ui/react'

import { DownloadsList } from '#components/downloads/downloads-list'
import { sectionContentStyles } from '#theme/styles/section-styles'

export const metadata = {
  title: 'Downloads',
  description:
    'Download Interview Pilot for macOS, iPhone, and Android. Windows support is coming soon.',
}

export default function DownloadsPage() {
  return (
    <Box pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      <Box pt={16} pb={16} px={[4, null]}>
        <Container maxW="container.md">
          <VStack spacing={10} align="stretch">
            <Box textAlign="center">
              <Text
                as="h1"
                fontSize={{ base: '6xl', md: '7xl' }}
                fontWeight="bold"
                color="white"
                lineHeight="1"
              >
                Downloads
              </Text>
              <Text color="whiteAlpha.700" fontSize={{ base: 'lg', md: 'xl' }} mt={4}>
                Choose your platform to download Interview Pilot
              </Text>
            </Box>

            <DownloadsList />
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
