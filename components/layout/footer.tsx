import {
  Box,
  BoxProps,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Link, LinkProps } from '@saas-ui/react'
import siteConfig from '#data/config'

export interface FooterProps extends BoxProps {
  columns?: number
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 2, ...rest } = props
  
  return (
    <Box bg="white" _dark={{ bg: 'gray.900' }} width="100%" position="relative" 
      zIndex={1} {...rest}>
      <Container maxW="container.2xl" px="8" pt="6" pb="8" width="100%">
        {/* Change columns to be responsive - 1 on mobile, 2 on larger screens */}
        <SimpleGrid columns={{ base: 1, md: columns }} spacing={{ base: 8, md: 0 }}>
          <Stack spacing="8">
            <Stack alignItems="flex-start" spacing="4">
              <Flex>
                <Box as={siteConfig.logo} flex="1" height="32px" />
              </Flex>
              <Text fontSize="md" color="muted">
                {siteConfig.seo.description}
              </Text>
            </Stack>
            <Stack spacing="4">
              <Stack direction={{ base: "column", md: "row" }} gap="4" alignItems={{ base: "flex-start", md: "center" }}>
                <Box
                  border="1px solid"
                  borderColor="gray.600"
                  borderRadius="md"
                  px="3"
                  display="inline-flex"
                  alignItems="center"
                  gap="2"
                  width="fit-content"
                  height="40px"
                >
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg="green.400"
                    animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                    sx={{
                      '@keyframes pulse': {
                        '0%, 100%': {
                          opacity: 1,
                        },
                        '50%': {
                          opacity: 0.5,
                        },
                      },
                    }}
                  />
                  <Text fontSize="sm" color="white" fontWeight="medium">
                    All Systems Online
                  </Text>
                </Box>
                <Flex gap="4" alignItems="center">
                  <Link
                    href="https://apps.apple.com/us/app/interview-pilot-ai-copilot/id6743263009"
                    isExternal
                    _hover={{ opacity: 0.8 }}
                    transition="opacity 0.2s"
                  >
                    <Image
                      src="/static/images/appstore_badge.png"
                      alt="Download on the App Store"
                      height="40px"
                    />
                  </Link>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.liberace.interviewpilot"
                    isExternal
                    _hover={{ opacity: 0.8 }}
                    transition="opacity 0.2s"
                  >
                    <Image
                      src="/static/images/android_badge.png"
                      alt="Get it on Google Play"
                      height="40px"
                    />
                  </Link>
                </Flex>
              </Stack>
              <Copyright>{siteConfig.footer.copyright}</Copyright>
            </Stack>
          </Stack>
          
          {/* Use Wrap for better mobile layout of links */}
          <Stack spacing="4" alignSelf={{ base: "flex-start", md: "flex-end" }} width={{ base: "100%", md: "auto" }}>
            <Stack direction={{ base: "column", md: "row" }} spacing="4" alignItems={{ base: "flex-start", md: "center" }} justify={{ base: "flex-start", md: "flex-end" }}>
              {/* Text links */}
              <Wrap justify={{ base: "flex-start", md: "flex-end" }} spacing="4">
                {siteConfig.footer?.links?.slice(0, 3).map(({ href, label }) => (
                  <WrapItem key={href}>
                    <FooterLink href={href}>
                      {label}
                    </FooterLink>
                  </WrapItem>
                ))}
              </Wrap>
              {/* Social icons */}
              <Wrap justify={{ base: "flex-start", md: "flex-end" }} spacing="4">
                {siteConfig.footer?.links?.slice(3).map(({ href, label }) => (
                  <WrapItem key={href}>
                    <FooterLink href={href}>
                      {label}
                    </FooterLink>
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export interface CopyrightProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const Copyright: React.FC<CopyrightProps> = ({
  title,
  children,
}: CopyrightProps) => {
  let content
  if (title && !children) {
    content = `&copy; ${new Date().getFullYear()} - ${title}`
  }
  return (
    <Text color="muted" fontSize="sm">
      {content || children}
    </Text>
  )
}

export const FooterLink: React.FC<LinkProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Link
      color="muted"
      fontSize="sm"
      textDecoration="none"
      _hover={{
        color: 'white',
        transition: 'color .2s ease-in',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}