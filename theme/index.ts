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
          bg: 'gray.900',
          color: 'white',
        },
        body: {
          color: 'white',
          bg: 'gray.900',
          fontSize: 'lg',
          _dark: {
            color: 'white',
            bg: 'gray.900',
          },
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
