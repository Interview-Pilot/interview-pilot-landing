'use client'

import { Box } from '@chakra-ui/react'

import { Section, SectionTitle } from '#components/section'
import { sectionContentStyles } from '#theme/styles/section-styles'

import { DownloadPlatformCards } from './download-platform-cards'

export const DownloadsPageContent: React.FC = () => {
  return (
    <Box sx={sectionContentStyles}>
      <Section innerWidth="container.lg" pt={{ base: '24', lg: '32' }}>
        <SectionTitle
          title="Downloads"
          description="Download Interview Pilot for macOS, Windows, iPhone, or Android."
          align="center"
          mb={10}
        />
        <DownloadPlatformCards />
      </Section>
    </Box>
  )
}
