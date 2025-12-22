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
  borderRadius: 'xl',
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
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(72, 187, 120, 0.7)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 10px rgba(72, 187, 120, 0)',
    },
    '100%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(72, 187, 120, 0)',
    },
  },
}

/**
 * Hero pulse animation with vertical centering
 */
export const heroPulseAnimation = {
  '@keyframes pulse': {
    '0%': {
      transform: 'translateY(-50%) scale(0.95)',
      boxShadow: '0 0 0 0 rgba(72, 187, 120, 0.7)',
    },
    '70%': {
      transform: 'translateY(-50%) scale(1.2)',
      boxShadow: '0 0 0 18px rgba(72, 187, 120, 0)',
    },
    '100%': {
      transform: 'translateY(-50%) scale(0.95)',
      boxShadow: '0 0 0 0 rgba(72, 187, 120, 0)',
    },
  },
}
