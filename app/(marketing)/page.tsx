//app/(marketing)/page.tsx

'use client'

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { Br, Link } from '@saas-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiMic,
  FiBriefcase,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
  FiZap,
  FiGlobe,
  FiShield,
  FiHeadphones,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { Features } from '#components/features'
import Background from '#components/background/background'
import { InteractiveGridOverlay } from '#components/background/interactive-grid-overlay'
import { Hero } from '#components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
// Removed logo components import as we'll use Image directly
import { FallInPlace } from '#components/motion/fall-in-place'
import { Pricing } from '#components/pricing/pricing'
import { Testimonial, Testimonials } from '#components/testimonials'
import { Em } from '#components/typography'
import faq from '#data/faq'
import pricing from '#data/pricing'
import testimonials from '#data/testimonials'

// export const metadata: Metadata = {
//  title: 'Saas UI Landingspage',
//  description: 'Free SaaS landingspage starter kit',
// }

// Add this function to handle Download button clicks
const handleDownloadClick = () => {
  // This will show up as a page view in Vercel Analytics
  window.location.href = '/download/hero';
};

// Hook to detect platform
const usePlatform = () => {
  const [platform, setPlatform] = React.useState<'ios' | 'android' | 'desktop'>('desktop');

  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }
  }, []);

  return platform;
};

const SystemStatus = () => {
  const [visible, setVisible] = React.useState(true);
  const [scrollPos, setScrollPos] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Make banner visible when scrolling up or at the top
      // Hide when scrolling down and not at the top
      const isVisible = (scrollPos > currentScrollPos) || currentScrollPos < 10;

      setScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPos]);

  return (
    <Box
      position="fixed"
      top="80px"
      left="50%"
      transform={`translateX(-50%) ${visible ? 'translateY(0)' : 'translateY(-150%)'}`}
      opacity={visible ? 1 : 0}
      transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
      zIndex="1000"
      px="3"
      py="2"
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.15)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.2)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="2"
    >
      <Box
        w="8px"
        h="8px"
        borderRadius="full"
        bg="green.400"
        animation="statusPulse 2s infinite"
        alignSelf="center"
        sx={{
          '@keyframes statusPulse': {
            '0%': {
              transform: 'scale(0.95)',
              boxShadow: '0 0 0 0 rgba(72, 187, 120, 0.7)',
            },
            '70%': {
              transform: 'scale(1)',
              boxShadow: '0 0 0 10px rgba(72, 187, 120, 0)',
            },
            '100%': {
              transform: 'scale(0.95)',
              boxShadow: '0 0 0 0 rgba(72, 187, 120, 0)',
            },
          },
        }}
      />
      <Text
        fontWeight="medium"
        color="white"
        fontSize="sm"
        lineHeight="1"
        alignSelf="center"
      >
        All Systems Online
      </Text>
    </Box>
  );
};

const AppStoreBanner = () => {
  const [visible, setVisible] = React.useState(true);
  const [scrollPos, setScrollPos] = React.useState(0);
  const platform = usePlatform();

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Only update visibility if there's a significant change in scroll position
      if (Math.abs(scrollPos - currentScrollPos) > 10) {
        const isVisible = (scrollPos > currentScrollPos) || currentScrollPos < 10;
        setScrollPos(currentScrollPos);
        setVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPos]);

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="rgba(0, 0, 0, 0.85)"
      backdropFilter="blur(10px)"
      py="3"
      px="4"
      display={{ base: 'flex', md: 'none' }} // Only visible on mobile
      alignItems="center"
      justifyContent="space-between"
      borderTop="1px solid rgba(255, 255, 255, 0.1)"
      zIndex="1000"
      boxShadow="0 -4px 10px rgba(0, 0, 0, 0.1)"
      transform={visible ? 'translateY(0)' : 'translateY(100%)'}
      transition="transform 0.3s ease-in-out"
    >
      {/* Banner content remains the same */}
      <Stack direction="row" spacing="3" align="center" flex="1">
        <Image
          src="/static/images/interviewpilot_newlogo.png"
          width={40}
          height={40}
          alt="App Icon"
          style={{ borderRadius: '8px' }}
        />
        <VStack align="flex-start" spacing="0">
          <HStack spacing="2" align="center">
            <Text color="white" fontWeight="bold" fontSize="sm">
              Interview Pilot
            </Text>
            <Text color="yellow.400" fontSize="xs" fontWeight="medium">
              4.9 / 5 ★
            </Text>
          </HStack>
          <Text color="gray.300" fontSize="xs">
            {platform === 'ios' ? 'Download on the App Store' : 'Get it on Google Play'}
          </Text>
        </VStack>
      </Stack>

      <ButtonLink
        href="/download/hero"
        colorScheme="primary"
        size="sm"
        color="black"
        fontWeight="bold"
        leftIcon={
          platform === 'ios' ? (
            <Image
              src="/static/images/apple_appstore.png"
              width={14}
              height={14}
              alt="Apple"
            />
          ) : (
            <Image
              src="/static/images/google_playstore.png"
              width={14}
              height={14}
              alt="Google Play"
            />
          )
        }
      >
        Try It Now
      </ButtonLink>

    </Box>
  );
};

const Home: NextPage = () => {
  return (
    <Box>
      <Background />
      <InteractiveGridOverlay />

      <SystemStatus />

      <HeroSection />

      <HighlightsSection />

      <FeaturesSection />

      <DownloadOptionsSection />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />

      {/* Add the AppStoreBanner component here */}
      <AppStoreBanner />

      {/* Add padding at the bottom of the page to prevent content from being hidden behind the banner on mobile */}
      <Box pb={{ base: "16", md: "0" }}></Box>
    </Box>
  )
}

const HeroSection: React.FC = () => {
  const platform = usePlatform();

  return (
    <Box overflow="hidden">
      <Container maxW="container.xl" pt={{ base: 36, lg: 48 }} pb="0">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          spacing={{ base: 12, sm: 60, md: 16, lg: 0 }}
        >
          {/* Text content - below video for mobile, left for desktop */}
          <Hero
            id="home"
            justifyContent="flex-start"
            px={{ base: "4", md: "20" }}
            order={{ base: 2, lg: 1 }}
            mt={{ base: 12, sm: 10, md: 8, lg: 0 }}
            width={{ base: "100%", lg: "60%" }}
            title={
              <FallInPlace>
                {/* Adjusted font size (smaller) and weight (heavier) */}
                <Box
                  fontSize={{ base: "36px", sm: "42px", md: "48px", lg: "60px" }}
                  fontWeight="extrabold"  /* Changed from bold to extrabold */
                  lineHeight="1.1"
                  position="relative"
                  zIndex={1}
                >
                  <Box as="span" position="relative" display="inline">
                    <Box
                      position="absolute"
                      display="inline-block"
                      right="-40px"
                      top="50%"
                      transform="translateY(-50%)"
                      w={4}
                      h={4}
                      borderRadius="full"
                      bg="green.400"
                      animation="pulse 2s infinite"
                      sx={{
                        '@keyframes pulse': {
                          '0%': {
                            transform: 'translateY(-50%) scale(0.95)',
                            boxShadow: '0 0 0 0 rgba(72, 187, 120, 0.7)',
                          },
                          '70%': {
                            transform: 'translateY(-50%) scale(1.2)',
                            boxShadow: '0 0 0 18px rgba(72, 187, 120, 0)',
                          },
                          '100%': {
                            transform: 'translateY(-50%) scale(0.95)',
                            boxShadow: '0 0 0 0 rgba(72, 187, 120, 0)',
                          },
                        },
                      }}
                    />
                    Live AI
                  </Box>
                  <Br /> Interview Copilot
                </Box>
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                <Text fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} position="relative" zIndex={1}>  {/* Slightly reduced */}
                  Get <Em>real-time</Em> interview answers
                  <Br /> during your interview with <Em>Copilot</Em><Br />{' '}
                </Text>
              </FallInPlace>
            }
          >
            {/* Rest of the content remains the same */}
            <FallInPlace delay={0.8}>
              <HStack pt="8" pb="12" spacing="8" position="relative" zIndex={1}>
                <Image
                  src="/static/images/openailogo.png"
                  width={125}
                  height={20}
                  alt="OpenAI Logo"
                />
                <Image
                  src="/static/images/whisperlogo.png"
                  width={140}
                  height={20}
                  alt="Whisper Logo"
                />
              </HStack>

              <VStack spacing={4} alignItems="flex-start" position="relative" zIndex={1}>
                <ButtonGroup spacing={4} alignItems="center">
                  <ButtonLink
                    colorScheme="primary"
                    color="black"
                    size="lg"
                    href={platform === 'desktop' ? '#download-options' : '/download/hero'}
                    fontWeight="bold"
                    onClick={platform === 'desktop' ? undefined : handleDownloadClick}
                    borderRadius="full"
                    leftIcon={
                      platform === 'ios' ? (
                        <Image
                          src="/static/images/apple_appstore.png"
                          width={14}
                          height={14}
                          alt="Apple"
                        />
                      ) : platform === 'android' ? (
                        <Image
                          src="/static/images/google_playstore.png"
                          width={14}
                          height={14}
                          alt="Google Play"
                        />
                      ) : (
                        <Image
                          src="/static/images/apple_appstore.png"
                          width={14}
                          height={14}
                          alt="Apple"
                        />
                      )
                    }
                  >
                    Download
                  </ButtonLink>
                  <ButtonLink
                    size="lg"
                    href="#features"
                    variant="outline"
                    borderRadius="full"
                    rightIcon={
                      <Icon
                        as={FiArrowRight}
                        sx={{
                          transitionProperty: 'common',
                          transitionDuration: 'normal',
                          '.chakra-button:hover &': {
                            transform: 'translate(5px)',
                          },
                        }}
                      />
                    }
                  >
                    Learn More
                  </ButtonLink>
                </ButtonGroup>
                <Link
                  href="#download-options"
                  fontSize="sm"
                  color="muted"
                  textDecoration="underline"
                  _hover={{ color: 'white' }}
                >
                  More download options
                </Link>
              </VStack>
            </FallInPlace>
          </Hero>


          {/* Video container - above for mobile, right for desktop */}
          <Box
            width={{ base: "100%", lg: "50%" }}
            height={{ base: "400px", md: "500px", lg: "600px" }}
            position={{ base: "relative", lg: "relative" }}  // Changed to relative for all views
            display="block"
            order={{ base: 1, lg: 2 }}
            mb={{ base: 0, sm: 0, md: 40, lg: 0 }}  // Increased bottom margin for mobile views
          >
            <FallInPlace delay={1}>
              <Box
                overflow="hidden"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                zIndex={1}
              >

                <Box
                  borderRadius="48px"
                  overflow="hidden"
                >
                  <Image
                    src="/static/screenshots/hand1.png"
                    width={580}
                    height={578}
                    alt="Interview Pilot App Screenshot"
                    priority
                    style={{
                      width: '100%',
                      maxWidth: '610px',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </Box>
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 3]}
        iconSize={4}
        innerWidth="container.lg"
        pt={{ base: "12", lg: "36" }}
        sx={{
          ".chakra-heading": { fontSize: "2xl" },
          ".chakra-text": { fontSize: "lg" },
          "& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & > div, & > div > div, .feature-item, .saas-feature, & svg, & .chakra-icon, & [role='img']": {
            position: "relative",
            zIndex: 1
          }
        }}
        features={[
          {
            title: '1s Responses',
            icon: FiZap,
            description: 'Copilot generates responses instantly, so you always have the answer',
            iconPosition: 'left',
            delay: 0.6,
          },
          /*
          {
            title: '99% Accuracy',
            icon: FiHeadphones,
            description:
              'Interview Pilot uses the ranked No. 1 ASR technology for speech recognition.',
            iconPosition: 'left',
            delay: 0.8,
          },
          */
          {
            title: '99+ Languages',
            icon: FiGlobe,
            description:
              'Supports over 99 languages, and any accents',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: 'Full Privacy',
            icon: FiShield,
            description:
              'All data uses industry-standard encryption. We never store your usage data',
            iconPosition: 'left',
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard('#interviewpilot')

  return (
    <Box
      sx={{
        "& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & p, & span, & svg, & .chakra-icon": {
          position: "relative",
          zIndex: 1,
        }
      }}
    >
      <Highlights>
        <HighlightsItem colSpan={[1, null, 2]} title="Accurate. Instant. Tailored.">
          <VStack alignItems="flex-start" spacing="8" position="relative" zIndex={1}>
            <Text color="muted" fontSize="xl">
              Ace any technical or behavioral questions with <Em>our most intelligent Copilot model</Em>.
              Upload your resume, job details and more for <Em>full Copilot customization</Em>.
              Choose your desired Copilot answer style, and review all your past interviews in one place.
            </Text>

            <Flex
              rounded="full"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="rgba(255, 255, 255, 0.1)"
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
              _hover={{
                bg: "rgba(255, 255, 255, 0.08)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)"
              }}
              transition="all 0.3s ease"
              flexDirection="row"
              alignItems="center"
              py="1"
              ps="8"
              pe="2"
              _dark={{ bg: 'gray.900' }}
            >
              <Box>
                <Text color="yellow.400" display="inline">
                  shareyoursuccess
                </Text>{' '}
                <Text color="cyan.300" display="inline">
                  #interviewpilot
                </Text>
              </Box>
              <IconButton
                icon={hasCopied ? <FiCheck /> : <FiCopy />}
                aria-label="Copy install command"
                onClick={onCopy}
                variant="ghost"
                ms="4"
                isRound
                color="white"
              />
            </Flex>
          </VStack>
        </HighlightsItem>
        <HighlightsItem title="Voice Recognition">
          <Text color="muted" fontSize="lg" position="relative" zIndex={1}>
            Ranked 1st worldwide, Whisper is the world&apos;s most accurate AI speech recognition (ASR).<br></br><br></br>Interview Pilot is capable of detecting almost all languages and accents.
          </Text>
        </HighlightsItem>
        <HighlightsItem title="Full Privacy">
          <Text color="muted" fontSize="lg" position="relative" zIndex={1}>
            Your data is secure and owned by you. All data processing uses industry-standard encryption.<br></br><br></br>We never store your app usage data.
          </Text>
        </HighlightsItem>
        <HighlightsItem
          colSpan={[1, null, 2]}
          title="Get Ahead of Your Peers"
        >
          <Text color="muted" fontSize="lg" position="relative" zIndex={1}>
            We take care of the trouble of recruiting and interviewing, so you can focus on what really matters: growing your skillset and career.
          </Text>
          <Wrap mt="8" position="relative" zIndex={1}>
            {[
              'consulting',
              'product management',
              'data science',
              'software engineering',
              'graphic design',
              'sales',
              'recruiting',
              'customer success',
              'finance',
              'operations',
              'legal',
              'marketing',
              'public relations',
              'business development',
              'human resources',
              'project management',
              'strategy',
              'analytics',

            ].map((value) => (
              <Tag
                key={value}
                variant="subtle"
                colorScheme="yellow"
                rounded="full"
                px="3"
              >
                {value}
              </Tag>
            ))}
          </Wrap>
        </HighlightsItem>
      </Highlights>
    </Box>
  )
}

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        "& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & p, & svg, & .chakra-icon": {
          position: "relative",
          zIndex: 1
        }
      }}
    >
      <Features
        id="features"
        title={
          <Heading
            lineHeight="short"
            fontSize={['4xl', null, '4xl']}
            textAlign="center"
            as="p"
            className="main-title"
            sx={{
              fontSize: { base: '4xl', md: '4xl', lg: '4xl' }
            }}
          >
            How to Use
          </Heading>
        }
        description={
          <>
            Fully Undetectable. Completely fuss-free and easy to use.
          </>
        }
        align="center"
        columns={[1, 2, 3]}
        iconSize={4}
        spacing={14}
        sx={{
          ".chakra-simple-grid": {
            rowGap: "4rem" // Add extra space between rows
          },
          ".feature-item, .saas-feature, & > div, & svg, & .chakra-icon, & [role='img']": {
            position: "relative",
            zIndex: 1
          }
        }}
        features={[
          {
            title: <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" mb={3}>Step 1</Text>,
            icon: FiSmile,
            description: (
              <>
                <Br />
                Upload your resume and personal details.
              </>
            ),
            variant: 'inline',
          },
          {
            title: <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" mb={3}>Step 2</Text>,
            icon: FiBriefcase,
            description: (
              <>
                <Br />
                Enter your job description and anything else important.
              </>
            ),
            variant: 'inline',
          },
          {
            title: <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" mb={3}>Step 3</Text>,
            icon: FiBox,
            description: (
              <>
                <Br />
                Choose a response style, depending on what fits you.
              </>
            ),
            variant: 'inline',
          },
          {
            title: <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" mb={3}>Interview</Text>,
            icon: FiMic,
            description: (
              <>
                <Br />
                Record a question. Generate an answer.
              </>
            ),
            variant: 'inline',
            iconColor: "cyan.400",  // Changed from blue.500 to cyan.500
            iconBg: "rgba(207, 250, 254, 0.2)"
          },
          {
            title: <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" mb={3}>Review</Text>,
            icon: FiFlag,
            description: (
              <>
                <Br />
                Save and review all your past interviews to learn.
              </>
            ),
            variant: 'inline',
            iconColor: "cyan.400",  // Changed from blue.500 to cyan.500
            iconBg: "rgba(207, 250, 254, 0.2)"
          },
        ]}
      />
    </Box>
  )
}

const DownloadOptionsSection = () => {
  return (
    <Box
      id="download-options"
      py={20}
      sx={{
        "& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & p, & svg, & .chakra-icon": {
          position: "relative",
          zIndex: 1
        }
      }}
    >
      <Container maxW="container.md">
        <VStack spacing={8} position="relative" zIndex={1}>
          <Heading
            lineHeight="short"
            fontSize={['4xl', null, '4xl']}
            textAlign="center"
            as="h2"
          >
            Download
          </Heading>
          <Text fontSize="lg" color="muted" textAlign="center">
            Choose your platform to download Interview Pilot
          </Text>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={6}
            width="100%"
            justify="center"
            align="center"
          >
            {/* iOS Download */}
            <Link
              href="https://apps.apple.com/us/app/interview-pilot-ai-copilot/id6743263009"
              isExternal
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Image
                src="/static/images/appstore_badge.png"
                alt="Download on the App Store"
                width={180}
                height={60}
                style={{ height: '60px', width: 'auto' }}
              />
            </Link>

            {/* Android Download */}
            <Link
              href="https://play.google.com/store/apps/details?id=com.liberace.interviewpilot"
              isExternal
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Image
                src="/static/images/android_badge.png"
                alt="Get it on Google Play"
                width={180}
                height={60}
                style={{ height: '60px', width: 'auto' }}
              />
            </Link>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t)
        return columns
      },
      [[], [], []],
    )
  }, [])

  return (
    <Box
      sx={{
        "& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & p, & svg, & .chakra-icon": {
          position: "relative",
          zIndex: 1
        }
      }}
    >
      <Testimonials
        id="testimonials"
        title={testimonials.title}
        columns={[1, 2, 3]}
        innerWidth="container.xl"
        align="center"
      >
        <>
          {columns.map((column, i) => (
            <Stack key={i} spacing="8" position="relative" zIndex={1}>
              {column.map((t, i) => (
                <Testimonial
                  key={i}
                  {...t}
                  height="100%"
                  // These props ensure consistent heights within the grid
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  bg="rgba(255, 255, 255, 0.05)"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.08)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)"
                  }}
                  transition="all 0.3s ease"
                />
              ))}
            </Stack>
          ))}
        </>
      </Testimonials>
    </Box>
  )
}

const PricingSection = () => {
  return (
    <Box
      sx={{
        "& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & p, & svg, & .chakra-icon": {
          position: "relative",
          zIndex: 1
        }
      }}
    >
      <Pricing {...pricing} align="center">
        <Text p="8" textAlign="center" color="muted" position="relative" zIndex={1}>
          U.S. Dollars. Prices may differ slightly depending on your location.
        </Text>
      </Pricing>
    </Box>
  )
}

const FaqSection = () => {
  return (
    <Box
      sx={{
        "& h1, & h2, & h3, & h4, & h5, & h6, & .chakra-heading, & .chakra-text, & p, & svg, & .chakra-icon": {
          position: "relative",
          zIndex: 1
        }
      }}
    >
      <Faq {...faq} align="center" />
    </Box>
  )
}

export default Home