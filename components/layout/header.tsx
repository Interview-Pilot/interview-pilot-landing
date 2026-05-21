import {
  Box,
  BoxProps,
  Container,
  Flex,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
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
  const mobileNav = useDisclosure()
  const hasHeaderSurface = isScrolled || mobileNav.isOpen

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
        px={{ base: 0, md: '4', lg: '12' }}
        py={isScrolled ? { base: 0, md: 3 } : 0}
        transition="padding 0.32s cubic-bezier(0.22, 1, 0.36, 1)"
      >
        <Flex
          width="full"
          align="center"
          gap="4"
          py={isScrolled ? { base: 4, md: 3 } : 4}
          pl={isScrolled ? { base: 4, md: 6 } : { base: 4, md: 0 }}
          pr={isScrolled ? { base: 4, md: 4 } : { base: 4, md: 0 }}
          bg={hasHeaderSurface ? 'app.surface.header' : 'transparent'}
          borderWidth={hasHeaderSurface ? { base: '0 0 1px', md: '1px' } : '0'}
          borderColor={hasHeaderSurface ? 'rgba(255,255,255,0.14)' : 'transparent'}
          borderRadius={isScrolled ? { base: '0', md: 'full' } : '0'}
          boxShadow={
            hasHeaderSurface
              ? {
                  base: '0 10px 28px rgba(0,0,0,0.22)',
                  md: '0 16px 48px rgba(0,0,0,0.38), 0 2px 12px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.035)',
                }
              : '0 0 0 rgba(0,0,0,0), inset 0 0 0 rgba(255,255,255,0)'
          }
          backdropFilter={hasHeaderSurface ? 'blur(22px) saturate(1.35)' : 'none'}
          transform={isScrolled ? 'translateY(0)' : { base: 'translateY(0)', md: 'translateY(-2px)' }}
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
            <Navigation
              centerLinks
              mobileNavIsOpen={mobileNav.isOpen}
              onMobileNavToggle={mobileNav.onToggle}
              onMobileNavClose={mobileNav.onClose}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
