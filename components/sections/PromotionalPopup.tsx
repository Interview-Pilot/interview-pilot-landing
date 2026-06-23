'use client'

import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Link,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react'

import { useState } from 'react'
import { FiX } from 'react-icons/fi'

type PromotionConfig = {
  enabled: boolean
  headline: string
  subheadline: string
  badgeHref: string
  badgeSrc: string
  badgeAlt: string
  buttonLabel: string
  offerPrefix: string
  offerHighlight: string
  offerSuffix: string
  linkedOfferText: string
}

const activePromotion: PromotionConfig = {
  enabled: false,
  headline: 'Celebrating 100,000+ users',
  subheadline: 'Across macOS, iOS, Android, and web.',
  badgeHref:
    'https://www.producthunt.com/products/interview-pilot?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-interview-pilot',
  badgeSrc:
    'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1153018&theme=light&t=1782072254966',
  badgeAlt: 'Interview Pilot - Live AI Interview Copilot | Product Hunt',
  buttonLabel: 'Get offer',
  offerPrefix: 'Get',
  offerHighlight: '60%',
  offerSuffix: 'off to celebrate this huge milestone with us!',
  linkedOfferText: 'Support us with an upvote.',
}

export function PromotionalPopup() {
  const [dismissed, setDismissed] = useState(false)

  if (!activePromotion.enabled || dismissed) return null

  return (
    <Portal>
      <Box
        position="fixed"
        inset={0}
        zIndex="modal"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 6 }}
        pointerEvents="auto"
      >
        <Box
          position="absolute"
          inset={0}
          bg="rgba(0, 0, 0, 0.58)"
          backdropFilter="blur(3px)"
        />
        <Box
          position="relative"
          w="full"
          maxW="620px"
          borderRadius={{ base: '22px', md: '26px' }}
          border="1px solid rgba(255, 255, 255, 0.18)"
          bg="rgba(15, 16, 19, 0.94)"
          boxShadow="0 34px 120px rgba(0, 0, 0, 0.58), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
          backdropFilter="blur(26px) saturate(160%)"
          overflow="hidden"
          px={{ base: 6, md: 10 }}
          py={{ base: 7, md: 10 }}
          _before={{
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 0%, rgba(254, 204, 4, 0.18), transparent 38%), radial-gradient(circle at 12% 92%, rgba(255, 255, 255, 0.08), transparent 32%)',
            pointerEvents: 'none',
          }}
        >
          <VStack
            position="relative"
            zIndex={1}
            spacing={{ base: 5, md: 6 }}
            align="center"
          >
            <VStack spacing={3} align="center">
              <Text
                color="white"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="750"
                lineHeight="0.95"
                textAlign="center"
                letterSpacing="-0.04em"
              >
                {activePromotion.headline}
              </Text>
              <Text
                color="whiteAlpha.760"
                fontSize={{ base: 'md', md: 'lg' }}
                fontWeight="650"
                lineHeight="1.45"
                textAlign="center"
                maxW="460px"
              >
                {activePromotion.subheadline}
              </Text>
            </VStack>

            <HStack
              spacing={{ base: 3, md: 4 }}
              flexDirection={{ base: 'column', md: 'row' }}
              align="center"
            >
              <Link
                href={activePromotion.badgeHref}
                isExternal
                lineHeight={0}
                aria-label={activePromotion.linkedOfferText}
                _hover={{ transform: 'translateY(-2px)', opacity: 0.95 }}
                transition="transform 0.2s ease, opacity 0.2s ease"
              >
                <Image
                  src={activePromotion.badgeSrc}
                  alt={activePromotion.badgeAlt}
                  w={{ base: '235px', md: '300px' }}
                  h="auto"
                />
              </Link>

              <Button
                as={Link}
                href={activePromotion.badgeHref}
                isExternal
                variant="primary"
                color="black"
                borderRadius="full"
                h="54px"
                px={10}
                minW="160px"
                fontSize="2xl"
                fontWeight="600"
                lineHeight="1"
                _hover={{
                  bg: 'primary.300',
                  textDecoration: 'none',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s ease"
              >
                {activePromotion.buttonLabel}
              </Button>
            </HStack>

            <Text
              color="primary.300"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="550"
              lineHeight="1.35"
              textAlign="center"
              maxW="500px"
            >
              {activePromotion.offerPrefix}{' '}
              <Box
                as="span"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="650"
              >
                {activePromotion.offerHighlight}
              </Box>{' '}
              {activePromotion.offerSuffix}{' '}
              <Link
                href={activePromotion.badgeHref}
                isExternal
                color="primary.300"
                textDecoration="underline"
                textUnderlineOffset="3px"
                _hover={{ color: 'primary.200' }}
              >
                {activePromotion.linkedOfferText}
              </Link>
            </Text>
          </VStack>

          <IconButton
            aria-label="Dismiss promotional popup"
            icon={<FiX />}
            size="sm"
            variant="ghost"
            fontSize="20px"
            color="whiteAlpha.700"
            position="absolute"
            zIndex={2}
            top={{ base: 4, md: 5 }}
            right={{ base: 4, md: 5 }}
            borderRadius="full"
            _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
            onClick={() => setDismissed(true)}
          />
        </Box>
      </Box>
    </Portal>
  )
}
