import { SystemStyleObject } from '@chakra-ui/react'

/**
 * Shared styles for section components
 * Ensures consistent z-index handling across all sections
 */
export const sectionContentStyles: SystemStyleObject = {
  '& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & p, & span, & svg, & .chakra-icon': {
    position: 'relative',
    zIndex: 1,
  },
}

/**
 * Glassmorphic card styles for consistent card appearance
 */
export const glassmorphicCardStyles: SystemStyleObject = {
  bg: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  borderWidth: '1px',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  _hover: {
    bg: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
  },
  transition: 'all 0.3s ease',
}

/**
 * Pulse animation keyframes for status indicators
 */
export const pulseAnimation = {
  '@keyframes pulseRing': {
    '0%': {
      opacity: 0.22,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.28,
      transform: 'scale(2.15)',
    },
    '100%': {
      opacity: 0.22,
      transform: 'scale(1)',
    },
  },
}

export const statusDotPulseStyles: SystemStyleObject = {
  position: 'relative',
  borderRadius: 'full',
  _before: {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'full',
    bg: 'green.400',
    opacity: 0.22,
    transformOrigin: 'center',
    animation: 'pulseRing 1.9s ease-in-out infinite',
  },
}

/**
 * Hero pulse animation with vertical centering
 */
export const heroPulseAnimation = {
  position: 'relative',
  borderRadius: 'full',
  _before: {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'full',
    bg: 'green.400',
    opacity: 0.22,
    transformOrigin: 'center',
    animation: 'heroPulseRing 1.9s ease-in-out infinite',
  },
  '@keyframes heroPulseRing': {
    '0%': {
      opacity: 0.22,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.24,
      transform: 'scale(1.7)',
    },
    '100%': {
      opacity: 0.22,
      transform: 'scale(1)',
    },
  },
}
