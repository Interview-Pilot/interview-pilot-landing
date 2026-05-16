import { Box } from '@chakra-ui/react'
import { PricingSection } from '#components/sections'

export const metadata = {
  title: 'Pricing | 50% OFF for a Limited Time',
  description:
    'Explore Interview Pilot pricing across mobile and desktop, including separate billing for platform access.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing | 50% OFF for a Limited Time',
    description:
      'Explore Interview Pilot pricing across mobile and desktop, including separate billing for platform access.',
    url: '/pricing',
  },
}

export default function PricingPage() {
  return (
    <Box pt={{ base: 24, md: 28 }}>
      <PricingSection largeTitle title="Interview Pilot Pricing" titleAs="h1" />
    </Box>
  )
}
