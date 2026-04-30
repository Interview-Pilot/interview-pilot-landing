import React from 'react'
import { Box } from '@chakra-ui/react'

const Background: React.FC = () => {
  return (
    <Box position="fixed" inset={0} zIndex={0} bg="#060608" pointerEvents="none">
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`
          radial-gradient(circle at top, rgba(246, 212, 76, 0.05), transparent 34%),
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.025), transparent 26%),
          linear-gradient(180deg, #0c0d10 0%, #060608 100%)
        `}
      />
    </Box>
  )
}

export default Background
