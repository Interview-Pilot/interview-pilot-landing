import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'
import components from './components'
import { fontSizes } from './foundations/typography'

// Define your custom colors
const colors = {
  primary: {
    50: '#fff9e0',
    100: '#fff0ad',
    200: '#ffe375',
    300: '#ffd73d',
    400: '#FECC04', // Main yellow
    500: '#d9ad00',  // This replaces the purple as primary color
    600: '#aa8700',
    700: '#7a6100',
    800: '#493a00',
    900: '#1a1400',
  },
  app: {
    bg: '#0E0E10',
    surface: {
      header: 'rgba(18, 19, 22, 0.92)',
      panel: '#111215',
      panelHover: 'rgba(255, 255, 255, 0.10)',
      card: 'rgba(255, 255, 255, 0.05)',
      cardHover: 'rgba(255, 255, 255, 0.08)',
      subtle: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.86)',
      muted: 'rgba(255, 255, 255, 0.70)',
      faint: 'rgba(255, 255, 255, 0.48)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.10)',
      strong: 'rgba(255, 255, 255, 0.14)',
    },
    overlay: {
      nav: 'rgba(0, 0, 0, 0.45)',
    },
  },
  // You can keep or modify other colors as needed
}

export const theme = extendTheme(
  baseTheme,
  {
    colors,
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles: {
      global: (props: any) => ({
        html: {
          bg: 'app.bg',
          color: 'app.text.primary',
          colorScheme: 'dark',
        },
        body: {
          color: 'app.text.primary',
          bg: 'app.bg',
          fontSize: 'lg',
          colorScheme: 'dark',
        },
      }),
    },
    fonts: {
      heading: 'Inter Variable, Inter, sans-serif',
      body: 'Inter Variable, Inter, sans-serif',
    },
    fontSizes,
    components,
  },
)
