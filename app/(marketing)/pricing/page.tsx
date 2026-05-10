import { Box } from '@chakra-ui/react'
import { PricingSection } from '#components/sections'

export const metadata = {
  title: 'Pricing | 50% OFF for a Limited Time',
  description:
    'Explore Interview Pilot pricing across mobile and desktop, including separate billing for platform access.',
}

export default function PricingPage() {
  return (
    <Box pt={{ base: 24, md: 28 }}>
      <PricingSection largeTitle />
    </Box>
  )
}
