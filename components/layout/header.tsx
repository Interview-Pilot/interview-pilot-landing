import {
  Box,
  BoxProps,
  Container,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import * as React from 'react'
import { Logo } from './logo'
import Navigation from './navigation'

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

export const Header = (props: HeaderProps) => {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}
  const { scrollY } = useScroll()
  
  React.useEffect(() => {
    return scrollY.on('change', () => setY(scrollY.get()))
  }, [scrollY])

  const isScrolled = y > height
  const bg = useColorModeValue('whiteAlpha.800', 'rgba(20, 22, 26, 0.82)')

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      position="fixed"
      zIndex="sticky"
      pointerEvents="none"
      {...props}
    >
      <Container
        maxW="container.xl"
        px={{ base: '4', lg: '12' }}
        py={isScrolled ? 3 : 0}
        transition="padding 0.32s cubic-bezier(0.22, 1, 0.36, 1)"
      >
        <Flex
          width="full"
          align="center"
          gap="4"
          py={isScrolled ? 3 : 4}
          px={isScrolled ? { base: 3, md: 4 } : 0}
          bg={isScrolled ? bg : 'transparent'}
          borderWidth={isScrolled ? '1px' : '0'}
          borderColor={isScrolled ? 'rgba(255,255,255,0.14)' : 'transparent'}
          borderRadius={isScrolled ? 'full' : '0'}
          boxShadow={
            isScrolled
              ? '0 16px 48px rgba(0,0,0,0.38), 0 2px 12px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.035)'
              : '0 0 0 rgba(0,0,0,0), inset 0 0 0 rgba(255,255,255,0)'
          }
          backdropFilter={isScrolled ? 'blur(18px) saturate(1.22)' : 'none'}
          transform={isScrolled ? 'translateY(0)' : 'translateY(-2px)'}
          transitionProperty="padding, background-color, border-color, border-radius, box-shadow, backdrop-filter, transform"
          transitionDuration="0.32s"
          transitionTimingFunction="cubic-bezier(0.22, 1, 0.36, 1)"
          pointerEvents="auto"
        >
          <Box flexShrink={0}>
            <Logo
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault()
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              }}
            />
          </Box>

          <Box flex="1" minW={0}>
            <Navigation centerLinks />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
