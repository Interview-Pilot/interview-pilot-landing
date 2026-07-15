import {
  HStack,
  Flex,
  Box,
  Icon,
  Text,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react'
import { useUpdateEffect } from '@chakra-ui/react'
import { useScrollSpy } from '#hooks/use-scrollspy'
import { usePlatform } from '#hooks/use-platform'
import { getTrackedDownloadHref } from '#lib/download-routing'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { MobileNavButton } from '#components/mobile-nav'
import { MobileNavContent } from '#components/mobile-nav'
import { NavLink } from '#components/nav-link'
import siteConfig from '#data/config'

const platformLoginHref = 'https://platform.interviewpilot.app/login'

const headerDownloadOptions = [
  {
    label: 'macOS',
    detail: 'Desktop app for Mac',
    href: getTrackedDownloadHref('header', 'macos'),
    icon: '/static/icons/platforms/apple.svg',
    iconFilter: 'invert(1)',
  },
  {
    label: 'Windows',
    detail: 'Coming soon',
    href: getTrackedDownloadHref('header', 'windows'),
    icon: '/static/icons/platforms/windows.svg',
  },
  {
    label: 'iOS App Store',
    detail: 'iPhone and iPad',
    href: getTrackedDownloadHref('header', 'ios'),
    icon: '/static/icons/platforms/app-store.svg',
  },
  {
    label: 'Google Play',
    detail: 'Android app',
    href: getTrackedDownloadHref('header', 'android'),
    icon: '/static/icons/platforms/google-play.svg',
  },
]

interface NavigationProps {
  centerLinks?: boolean;
  mobileNavIsOpen?: boolean
  onMobileNavToggle?: () => void
  onMobileNavClose?: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  centerLinks = false,
  mobileNavIsOpen = false,
  onMobileNavToggle = () => {},
  onMobileNavClose = () => {},
}) => {
  const path = usePathname()
  const activeId = useScrollSpy(
    siteConfig.header.links
      .filter(({ id }) => id)
      .map(({ id }) => `[id="${id}"]`),
    {
      threshold: 0.75,
    },
  )

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>()
  const platform = usePlatform()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNavIsOpen])

  // Split the navigation - everything except the last item (Download)
  const navLinks = siteConfig.header.links.slice(0, -1)
  // Get the Download button (last item)
  const downloadButton =
    siteConfig.header.links.find((link: any) => link.isDownload) ||
    siteConfig.header.links[siteConfig.header.links.length - 1]

  // Modify download button href based on platform
  const downloadHref = getTrackedDownloadHref('header', platform)

  if (centerLinks) {
    return (
      <Flex width="100%" align="center" justify="space-between" gap={4}>
        <Box flex="1" minW={0}>
          <Flex justify="center" align="center" h="40px" minW={0}>
            {navLinks.map(({ href, id, ...props }, i) => {
              return (
                <NavLink
                  display={['none', null, 'flex']}
                  href={href || `/#${id}`}
                  key={i}
                  mx={2}
                  px={3}
                  h="36px"
                  fontSize="md"
                  borderRadius="full"
                  transition="all 0.2s ease"
                  alignItems="center"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                  isActive={
                    !!(
                      (id && activeId === id) ||
                      (href && !!path?.match(new RegExp(href)))
                    )
                  }
                  {...props}
                >
                  {props.label}
                </NavLink>
              )
            })}
          </Flex>
        </Box>

        <Box flexShrink={0}>
          <HStack spacing={3} justify="flex-end" align="center">
            <NavLink
              display={['none', null, 'flex']}
              href={platformLoginHref}
              h="38px"
              px={3}
              fontSize="md"
              borderRadius="full"
              alignItems="center"
            >
              Login
            </NavLink>

            <Menu placement="bottom-end" gutter={10}>
              <MenuButton
                as={Button}
                display={['none', null, 'inline-flex']}
                variant="primary"
                borderRadius="full"
                px="1"
                minW="164px"
                fontWeight="extrabold"
                h="38px"
              >
                <HStack w="full" spacing="2" justify="flex-start" lineHeight="1">
                  <Box
                    w="30px"
                    h="30px"
                    borderRadius="full"
                    bg="black"
                    color="white"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiChevronDown} boxSize="13px" />
                  </Box>
                  <Text as="span" flex="1" textAlign="center" fontWeight="bold" fontSize="md" pr="2">
                    {downloadButton.label}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList
                minW="260px"
                p="0"
                bg="transparent"
                border="0"
                borderRadius="0"
                outline="none"
                boxShadow="none"
                color="white"
                zIndex="popover"
              >
                <Box
                  p="2"
                  bg="#0C0C0E"
                  border="1px solid rgba(255, 255, 255, 0.22)"
                  borderRadius="18px"
                  boxShadow="0 24px 70px rgba(0, 0, 0, 0.45)"
                >
                  {headerDownloadOptions.map((option, index) => (
                    <Box key={option.href}>
                      {index > 0 ? (
                        <Box h="1px" mx="3" my="1" bg="rgba(255, 255, 255, 0.07)" />
                      ) : null}
                      <MenuItem
                        as="a"
                        href={option.href}
                        borderRadius="12px"
                        px="3"
                        py="3"
                        bg="transparent"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.100' }}
                        _focus={{ bg: 'whiteAlpha.100' }}
                      >
                        <HStack spacing="3" w="100%">
                          <Box
                            w="28px"
                            h="28px"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                          >
                            <Image
                              src={option.icon}
                              alt=""
                              boxSize="21px"
                              filter={option.iconFilter}
                            />
                          </Box>
                          <VStack align="flex-start" spacing="0" lineHeight="1.2">
                            <Text fontSize="sm" fontWeight="800" color="white">
                              {option.label}
                            </Text>
                            <Text fontSize="xs" fontWeight="500" color="whiteAlpha.600">
                              {option.detail}
                            </Text>
                          </VStack>
                        </HStack>
                      </MenuItem>
                    </Box>
                  ))}
                </Box>
              </MenuList>
            </Menu>

            <Box display={{ base: 'block', md: 'none' }}>
              <MobileNavButton
                ref={mobileNavBtnRef}
                aria-label={mobileNavIsOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileNavIsOpen}
                aria-controls="mobile-navigation"
                onClick={onMobileNavToggle}
              />
            </Box>

            <MobileNavContent isOpen={mobileNavIsOpen} onClose={onMobileNavClose} />
          </HStack>
        </Box>
      </Flex>
    )
  }

  // Original layout if centerLinks is false
  return (
    <HStack spacing="2" flexShrink={0}>
      {siteConfig.header.links.map(({ href, id, ...props }, i) => {
        // Check if this is the download button (last item)
        const isDownloadButton = i === siteConfig.header.links.length - 1
        const linkHref = isDownloadButton ? downloadHref : (href || `/#${id}`)

        return (
          <NavLink
            display={['none', null, 'block']}
            href={linkHref}
            key={i}
            isActive={
              isDownloadButton
                ? false
                : !!(
                    (id && activeId === id) ||
                    (href && !!path?.match(new RegExp(href)))
                  )
            }
            {...props}
          >
            {props.label}
          </NavLink>
        )
      })}
      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={onMobileNavToggle}
      />
      <MobileNavContent isOpen={mobileNavIsOpen} onClose={onMobileNavClose} />
    </HStack>
  )
}

export default Navigation
