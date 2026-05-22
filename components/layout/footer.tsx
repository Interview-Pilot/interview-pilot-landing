import {
  Box,
  BoxProps,
  Container,
  Flex,
  Grid,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link, LinkProps } from '@saas-ui/react'
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import {
  APP_STORE_LINKS,
  COMPANY_LINKS,
  INTERNAL_ROUTES,
  SOCIAL_LINKS,
  SUPPORT_EMAIL,
} from '#constants'
import { comparisonPages } from '#data/comparisons'
import siteConfig from '#data/config'
import { publishedInterviewGuideRefs } from '#data/interview-guides'
import { pulseAnimation, statusDotPulseStyles } from '#theme/styles/section-styles'

export interface FooterProps extends BoxProps {
  columns?: number
}

const footerColumns = [
  {
    title: 'Product',
    groups: [
      {
        title: undefined,
        links: [
          { href: INTERNAL_ROUTES.interviewCopilot, label: 'Interview Copilot' },
          { href: INTERNAL_ROUTES.aiMockInterview, label: 'AI Mock Interview' },
          { href: INTERNAL_ROUTES.questionBank, label: 'Question Bank' },
          { href: INTERNAL_ROUTES.downloads, label: 'Downloads' },
          { href: INTERNAL_ROUTES.pricing, label: 'Pricing' },
        ],
      },
      {
        title: 'Platform',
        links: [
          { href: 'https://platform.interviewpilot.app/signup', label: 'Create account', isExternal: true },
          { href: 'https://platform.interviewpilot.app/login', label: 'Log in', isExternal: true },
          { href: APP_STORE_LINKS.ios, label: 'iOS App', isExternal: true },
          { href: APP_STORE_LINKS.android, label: 'Android App', isExternal: true },
        ],
      },
    ],
  },
  {
    title: 'Interview Guides',
    links: [
      { href: INTERNAL_ROUTES.interviewQuestions, label: 'Interview Questions' },
      ...publishedInterviewGuideRefs.map((guide) => ({
        href: `/interview-guides/${guide.slug}`,
        label: guide.linkLabel,
      })),
    ],
  },
  {
    title: 'Alternatives & Comparisons',
    links: comparisonPages.map((page) => ({
      href: `/compare/${page.slug}`,
      label: page.linkLabel,
    })),
  },
  {
    title: 'Company',
    groups: [
      {
        title: undefined,
        links: [
          { href: INTERNAL_ROUTES.blog, label: 'Blog' },
          { href: `mailto:${SUPPORT_EMAIL}`, label: 'Contact' },
          { href: COMPANY_LINKS.website, label: 'Liberace AI', isExternal: true },
        ],
      },
      {
        title: 'Legal',
        links: [
          { href: INTERNAL_ROUTES.terms, label: 'Terms of Service' },
          { href: INTERNAL_ROUTES.privacy, label: 'Privacy Policy' },
          { href: INTERNAL_ROUTES.communityGuidelines, label: 'Community Guidelines' },
        ],
      },
    ],
  },
] as const

const socialLinks = [
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: <FaLinkedinIn size="18" /> },
  { href: SOCIAL_LINKS.x, label: 'X', icon: <FaXTwitter size="18" /> },
  { href: SOCIAL_LINKS.tiktok, label: 'TikTok', icon: <FaTiktok size="18" /> },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: <FaInstagram size="18" /> },
  { href: SOCIAL_LINKS.youtube, label: 'YouTube', icon: <FaYoutube size="20" /> },
] as const

export const Footer: React.FC<FooterProps> = (props) => {
  const { ...rest } = props

  return (
    <Box
      as="footer"
      bg="rgba(8, 8, 8, 0.96)"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      width="100%"
      position="relative"
      zIndex={1}
      {...rest}
    >
      <Container maxW="container.2xl" px={{ base: 6, md: 8 }} py={{ base: 10, md: 12 }}>
        <Stack spacing={{ base: 10, md: 12 }}>
          <Grid
            templateColumns={{ base: '1fr', lg: '0.82fr 1.18fr' }}
            gap={{ base: 10, lg: 14, xl: 18 }}
          >
            <VStack align="flex-start" spacing={6}>
              <Stack align="flex-start" spacing={4} maxW="420px">
                <Flex>
                  <Box as={siteConfig.logo} flex="1" height="32px" />
                </Flex>
                <Text fontSize="md" color="whiteAlpha.700" lineHeight="1.7">
                  {siteConfig.seo.description}
                </Text>
              </Stack>

              <Stack spacing={7}>
                <HStack
                  borderRadius="full"
                  display="inline-flex"
                  alignItems="center"
                  gap="2.5"
                  width="fit-content"
                  pl="2"
                >
                  <Box
                    w="10px"
                    h="10px"
                    bg="green.400"
                    sx={{
                      ...statusDotPulseStyles,
                      '@keyframes pulseRing': pulseAnimation['@keyframes pulseRing'],
                    }}
                  />
                  <Text fontSize="sm" color="whiteAlpha.800" fontWeight="medium" lineHeight="1">
                    All Systems Online
                  </Text>
                </HStack>

                <Flex gap="4" alignItems="center" flexWrap="wrap">
                  <Link
                    href={APP_STORE_LINKS.ios}
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
                    href={APP_STORE_LINKS.android}
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
            </VStack>

            <SimpleGrid
              columns={{ base: 2, md: 3, xl: 4 }}
              spacing={{ base: 8, md: 10, xl: 12 }}
            >
              {footerColumns.map((column) => (
                <Stack key={column.title} spacing={4} align="flex-start">
                  <Text
                    color="white"
                    fontSize="sm"
                    fontWeight="800"
                    letterSpacing="0.02em"
                  >
                    {column.title}
                  </Text>
                  {'groups' in column ? (
                    <Stack spacing={7} align="stretch" width="100%">
                      {column.groups.map((group, groupIndex) => (
                        <Stack
                          key={`${column.title}-${groupIndex}`}
                          spacing={3}
                          align="flex-start"
                          pt={groupIndex === 0 ? 0 : 7}
                          borderTop={groupIndex === 0 ? '0' : '1px solid'}
                          borderColor="whiteAlpha.100"
                        >
                          {group.title ? (
                            <Text
                              color="white"
                              fontSize="sm"
                              fontWeight="800"
                              letterSpacing="0.02em"
                            >
                              {group.title}
                            </Text>
                          ) : null}
                          {group.links.map((link) => (
                            <FooterLink
                              key={`${column.title}-${link.label}`}
                              href={link.href}
                              isExternal={'isExternal' in link ? (link as { isExternal?: boolean }).isExternal : undefined}
                            >
                              {link.label}
                            </FooterLink>
                          ))}
                        </Stack>
                      ))}
                    </Stack>
                  ) : (
                    <Stack spacing={3} align="flex-start">
                      {column.links.map((link) => (
                        <FooterLink
                          key={`${column.title}-${link.label}`}
                          href={link.href}
                          isExternal={'isExternal' in link ? (link as { isExternal?: boolean }).isExternal : undefined}
                        >
                          {link.label}
                        </FooterLink>
                      ))}
                    </Stack>
                  )}
                </Stack>
              ))}
            </SimpleGrid>
          </Grid>

          <Flex
            pt={6}
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'center' }}
            gap={5}
          >
            <Copyright>{siteConfig.footer.copyright}</Copyright>

            <HStack spacing={4}>
              {socialLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} isExternal aria-label={link.label}>
                  {link.icon}
                </FooterLink>
              ))}
            </HStack>
          </Flex>
        </Stack>
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
    <Text color="whiteAlpha.600" fontSize="sm">
      {content || children}
    </Text>
  )
}

export const FooterLink: React.FC<LinkProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Link
      color="whiteAlpha.650"
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
