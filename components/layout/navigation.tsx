import { HStack, Flex, Box, Grid, GridItem } from '@chakra-ui/react'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { useScrollSpy } from '#hooks/use-scrollspy'
import { usePlatform } from '#hooks/use-platform'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
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
        <GridItem>
          <Flex justify="center">
            {navLinks.map(({ href, id, ...props }, i) => {
              return (
                <NavLink
                  display={['none', null, 'block']}
                  href={href || `/#${id}`}
                  key={i}
                  mx={2}
                  px={3}
                  borderRadius="md"
                  transition="all 0.2s ease"
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
        <GridItem>
          {/* Apply right padding conditionally based on screen size and mobileMode */}
          <HStack
            spacing={2}
            justify="flex-end"
            pr={insetButtons ? { base: mobileMode ? 0 : 6, lg: 8 } : 0}
          >
            <NavLink
              display={['none', null, 'block']}
              href={downloadHref}
              borderRadius="full"
              px={4}           // Increase horizontal padding
              py={0}           // Add vertical padding
              fontSize="md"
              fontWeight="bold"
              isActive={
                !!(
                  (downloadButton.id && activeId === downloadButton.id) ||
                  (downloadButton.href && !!path?.match(new RegExp(downloadButton.href)))
                )
              }
              {...downloadButton}
            >
              {downloadButton.label}
            </NavLink>

            <Box>
              <ThemeToggle />
            </Box>

            <Box>
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