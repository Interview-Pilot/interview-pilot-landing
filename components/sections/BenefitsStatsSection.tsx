'use client'

import { FiGlobe, FiShield, FiZap } from 'react-icons/fi'

import { Features } from '#components/features'
import { sectionContentStyles } from '#theme/styles/section-styles'

export function BenefitsStatsSection() {
  return (
    <Features
      id="benefits"
      columns={[1, 2, 3]}
      iconSize={4}
      innerWidth="1120px"
      spacing={{ base: 10, md: 12, lg: 14 }}
      pt={{ base: '12', lg: '16' }}
      sx={{
        '.chakra-heading': { fontSize: '2xl' },
        '.chakra-text': { fontSize: 'lg' },
        ...sectionContentStyles,
      }}
      features={[
        {
          title: '1s Responses',
          icon: FiZap,
          description: 'Copilot generates responses instantly, so you always have the answer',
          iconPosition: 'left',
          delay: 0.6,
        },
        {
          title: '99+ Languages',
          icon: FiGlobe,
          description: 'Supports over 99 languages, and any accents',
          iconPosition: 'left',
          delay: 1,
        },
        {
          title: 'Full Privacy',
          icon: FiShield,
          description: 'All data uses industry-standard encryption. We never store your usage data',
          iconPosition: 'left',
          delay: 1.1,
        },
      ]}
    />
  )
}
