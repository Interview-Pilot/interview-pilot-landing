import {
  Box,
  IconButton,
  IconButtonProps,
  LinkProps,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import useRouteChanged from 'hooks/use-route-changed'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu } from 'react-icons/ai'

import * as React from 'react'

import { usePlatform } from '#hooks/use-platform'
import { getPrimaryDownloadHref } from '#lib/download-routing'
import siteConfig from '#data/config'

interface NavLinkProps extends LinkProps {
  label: string
  href?: string
  isActive?: boolean
}

function NavLink({ href, children, isActive, ...rest }: NavLinkProps) {
  const pathname = usePathname()

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
      color={isActive ? 'app.text.primary' : 'app.text.secondary'}
      bg={isActive ? 'app.surface.panelHover' : undefined}
      _hover={{
        bg: 'app.surface.panelHover',
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
  const platform = usePlatform()
  const primaryDownloadHref = getPrimaryDownloadHref(platform)

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

  if (!isOpen) {
    return null
  }

  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      position="absolute"
      top="100%"
      left="0"
      right="0"
      zIndex="dropdown"
      bg="app.surface.header"
      color="app.text.primary"
      borderTopWidth="0"
      borderBottomWidth="1px"
      borderColor="app.border.strong"
      borderRadius="0"
      boxShadow="0 18px 42px rgba(0, 0, 0, 0.36)"
      backdropFilter="blur(22px) saturate(1.35)"
      overflow="hidden"
    >
      <Stack alignItems="stretch" spacing="1" px="4" py="3">
        {siteConfig.header.links.map(
          ({ href, id, label, isDownload, ...props }: any, i) => (
            <NavLink
              href={isDownload ? primaryDownloadHref : href || `/#${id}`}
              key={i}
              borderRadius="xl"
              borderBottomWidth="0"
              onClick={onClose}
              {...(props as any)}
            >
              {label}
            </NavLink>
          ),
        )}
      </Stack>
    </Box>
  )
}

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: 'flex', md: 'none' }}
        fontSize="20px"
        color="app.text.primary"
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props}
        aria-label="Open menu"
      />
    )
  },
)

MobileNavButton.displayName = 'MobileNavButton'
