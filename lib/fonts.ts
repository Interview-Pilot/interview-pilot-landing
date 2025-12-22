import localFont from 'next/font/local'

/**
 * DM Sans - Used for Interview Pilot logo and brand text
 * Variable font supporting weights 100-1000
 */
export const dmSans = localFont({
  src: '../public/fonts/DMSans-Variable.ttf',
  variable: '--font-dm-sans',
  display: 'swap',
  weight: '100 1000',
})
