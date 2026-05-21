'use client'

import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'

export function InteractiveGridOverlay() {
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const width = 60
  const height = 60
  const horizontal = 40
  const vertical = 40

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      overflow="hidden"
    >
      <Box
        as="svg"
        width="100%"
        height="100%"
        pointerEvents="auto"
        sx={{
          maskImage: {
            base: 'radial-gradient(260px circle at center, white, transparent)',
            sm: 'radial-gradient(360px circle at center, white, transparent)',
            md: 'radial-gradient(520px circle at center, white, transparent)',
            lg: 'radial-gradient(620px circle at center, white, transparent)',
          },
          WebkitMaskImage:
            {
              base: 'radial-gradient(260px circle at center, white, transparent)',
              sm: 'radial-gradient(360px circle at center, white, transparent)',
              md: 'radial-gradient(520px circle at center, white, transparent)',
              lg: 'radial-gradient(620px circle at center, white, transparent)',
            },
        }}
      >
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const x = (index % horizontal) * width
          const y = Math.floor(index / horizontal) * height

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={width}
              height={height}
              stroke="rgba(245, 238, 221, 0.026)"
              strokeWidth="1"
              fill={
                hoveredSquare === index
                  ? 'rgba(196, 176, 136, 0.052)'
                  : 'transparent'
              }
              style={{
                transition:
                  hoveredSquare === index
                    ? 'fill 100ms ease-in-out'
                    : 'fill 1000ms ease-in-out',
              }}
              onMouseEnter={() => setHoveredSquare(index)}
              onMouseLeave={() => setHoveredSquare(null)}
            />
          )
        })}
      </Box>
    </Box>
  )
}
