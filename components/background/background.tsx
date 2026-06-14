import React from 'react'
import { Box } from '@chakra-ui/react'
import { ParticleBackground } from './particle-background'

const Background: React.FC = () => {
  return (
    <Box position="fixed" inset={0} zIndex={0} bg="#0E0E10" pointerEvents="none">
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`
          radial-gradient(circle at 50% 0%, rgba(196, 176, 136, 0.24), transparent 34%),
          radial-gradient(circle at 20% 78%, rgba(245, 238, 221, 0.10), transparent 30%),
          radial-gradient(circle at 82% 72%, rgba(138, 117, 87, 0.12), transparent 28%),
          linear-gradient(180deg, #131315 0%, #0E0E10 100%)
        `}
      />
      <ParticleBackground color="#F5EEDD" quantity={60} />
    </Box>
  )
}

export default Background
