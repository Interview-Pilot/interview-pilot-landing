import {
  Box,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  IconButtonProps,
  LinkProps,
  Portal,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from '@saas-ui/react'
import useRouteChanged from 'hooks/use-route-changed'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'

import * as React from 'react'

import { Logo } from '#components/layout/logo'
import siteConfig from '#data/config'

const MotionFlex = motion(Flex)

interface NavLinkProps extends LinkProps {
  label: string
  href?: string
  isActive?: boolean
}

function NavLink({ href, children, isActive, ...rest }: NavLinkProps) {
  const pathname = usePathname()
  const bgActiveHoverColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
  const activeBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const activeColor = useColorModeValue('gray.900', 'white')
  const defaultColor = useColorModeValue('gray.700', 'whiteAlpha.800')

  const [, group] = href?.split('/') || []
  isActive = isActive ?? pathname?.includes(group)

  return (
    <Link
      href={href}
      display="inline-flex"
      flex="1"
      w="100%"
      minH="40px"
      px="6"
      py="3"
      transition="0.2s all"
      fontWeight={isActive ? 'semibold' : 'medium'}
      color={isActive ? activeColor : defaultColor}
      bg={isActive ? activeBg : undefined}
      _hover={{
        bg: bgActiveHoverColor,
        textDecoration: 'none',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose = () => {} } = props
  const closeBtnRef = React.useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const backdropColor = useColorModeValue('rgba(15, 23, 42, 0.28)', 'rgba(0, 0, 0, 0.45)')
  const panelColor = useColorModeValue('white', '#111215')
  const panelTextColor = useColorModeValue('gray.900', 'white')
  const panelBorderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')

  useRouteChanged(onClose)
  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <Portal>
          <RemoveScroll forwardProps>
            <Box
              pos="fixed"
              inset="0"
              zIndex="modal"
              bg={backdropColor}
              backdropFilter="blur(8px)"
              onClick={onClose}
            >
              <MotionFlex
                direction="column"
                w="min(288px, 78vw)"
                maxW="100%"
                bg={panelColor}
                color={panelTextColor}
                h="100vh"
                overflow="auto"
                pos="absolute"
                top="0"
                right="0"
                bottom="0"
                boxShadow="-24px 0 60px rgba(0, 0, 0, 0.25)"
                borderLeftWidth="1px"
                borderColor={panelBorderColor}
                pb="8"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <Box>
                  <Flex justify="space-between" align="center" px="5" pt="5" pb="4">
                    <Logo />
                    <HStack spacing="3">
                      <CloseButton ref={closeBtnRef} onClick={onClose} />
                    </HStack>
                  </Flex>
                  <Stack alignItems="stretch" spacing="1" px="3">
                    {siteConfig.header.links.map(
                      ({ href, id, label, ...props }, i) => {
                        return (
                          <NavLink
                            href={href || `/#${id}`}
                            key={i}
                            borderRadius="xl"
                            borderBottomWidth="0"
                            {...(props as any)}
                          >
                            {label}
                          </NavLink>
                        )
                      },
                    )}
                  </Stack>
                </Box>
              </MotionFlex>
            </Box>
          </RemoveScroll>
        </Portal>
      )}
    </>
  )
}

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: 'flex', md: 'none' }}
        fontSize="20px"
        color={useColorModeValue('gray.800', 'inherit')}
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props}
        aria-label="Open menu"
      />
    )
  },
)

MobileNavButton.displayName = 'MobileNavButton'
