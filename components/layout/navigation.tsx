import { HStack, Flex, Box, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { useScrollSpy } from '#hooks/use-scrollspy'
import { usePlatform } from '#hooks/use-platform'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MobileNavButton } from '#components/mobile-nav'
import { MobileNavContent } from '#components/mobile-nav'
import { NavLink } from '#components/nav-link'
import siteConfig from '#data/config'
import ThemeToggle from './theme-toggle'
import { INTERNAL_ROUTES } from '#constants'

interface NavigationProps {
  centerLinks?: boolean;
  insetButtons?: boolean;
  mobileMode?: boolean; // Added new prop
}

const Navigation: React.FC<NavigationProps> = ({
  centerLinks = false,
  insetButtons = false,
  mobileMode = false
}) => {
  const mobileNav = useDisclosure()
  const router = useRouter()
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
  }, [mobileNav.isOpen])

  // Split the navigation - everything except the last item (Download)
  const navLinks = siteConfig.header.links.slice(0, -1)
  // Get the Download button (last item)
  const downloadButton = siteConfig.header.links[siteConfig.header.links.length - 1]

  // Modify download button href based on platform
  const downloadHref = platform === 'desktop'
    ? INTERNAL_ROUTES.downloadOptions
    : (downloadButton.href || `/#${downloadButton.id}`)

  if (centerLinks) {
    return (
      <Grid templateColumns="1fr auto 1fr" width="100%" gap={4}>
        {/* Left column - empty to balance with right column */}
        <GridItem />

        {/* Center column - navigation links */}
        <GridItem display="flex" alignItems="center">
          <Flex justify="center" align="center" h="40px">
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
                  borderRadius="md"
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
        </GridItem>

        {/* Right column - Download button, theme toggle, mobile nav */}
        <GridItem display="flex" alignItems="center" justifyContent="flex-end">
          <HStack
            spacing={3}
            justify="flex-end"
            align="center"
            pr={insetButtons ? { base: mobileMode ? 0 : 6, lg: 8 } : 0}
          >
            <NavLink
              display={['none', null, 'flex']}
              href={downloadHref}
              borderRadius="full"
              px="1"
              minW="148px"
              fontWeight="extrabold"
              h="38px"
              position="relative"
              alignItems="center"
              justifyContent="flex-start"
              isActive={
                !!(
                  (downloadButton.id && activeId === downloadButton.id) ||
                  (downloadButton.href && !!path?.match(new RegExp(downloadButton.href)))
                )
              }
              {...downloadButton}
            >
              <Box
                position="absolute"
                left="4px"
                top="50%"
                transform="translateY(-50%)"
                w="30px"
                h="30px"
                borderRadius="full"
                bg="black"
                color="white"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiArrowRight} boxSize="13px" />
              </Box>
              <Box
                position="absolute"
                left="36px"
                right="8px"
                top="50%"
                transform="translateY(-50%)"
                textAlign="center"
                lineHeight="1"
              >
                <Text as="span" fontWeight="bold" fontSize="md">
                  {downloadButton.label}
                </Text>
              </Box>
            </NavLink>

            <ThemeToggle />

            <Box display={{ base: 'block', md: 'none' }}>
              <MobileNavButton
                ref={mobileNavBtnRef}
                aria-label="Open Menu"
                onClick={mobileNav.onOpen}
              />
            </Box>

            <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
          </HStack>
        </GridItem>
      </Grid>
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
      <ThemeToggle />
      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </HStack>
  )
}

export default Navigation
