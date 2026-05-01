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
        style={{ cursor: 'crosshair' }}
        sx={{
          maskImage: 'radial-gradient(620px circle at center, white, transparent)',
          WebkitMaskImage:
            'radial-gradient(620px circle at center, white, transparent)',
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
              stroke="rgba(245, 238, 221, 0.048)"
              strokeWidth="1"
              fill={
                hoveredSquare === index
                  ? 'rgba(196, 176, 136, 0.07)'
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
