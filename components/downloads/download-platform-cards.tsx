import {
  Box,
  Button,
  HStack,
  Icon,
  SimpleGrid,
  SimpleGridProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  FiArrowRight,
  FiDownload,
  FiMonitor,
  FiSmartphone,
} from 'react-icons/fi'
import { SiAndroid, SiApple } from 'react-icons/si'

import {
  APP_STORE_LINKS,
  PLATFORM_LINKS,
} from '#constants'

interface DownloadCard {
  title: string
  description: string
  note?: string
  actionLabel: string
  href?: string
  icon: React.ElementType
  isDisabled?: boolean
}

const downloadCards: DownloadCard[] = [
  {
    title: 'macOS',
    description: 'Download the Interview Pilot desktop app for macOS.',
    note: 'Desktop sign-in and subscriptions are managed on the platform site.',
    actionLabel: 'Download for Mac',
    href: PLATFORM_LINKS.macDesktopDownload,
    icon: SiApple,
  },
  {
    title: 'Windows',
    description: 'Download the Interview Pilot desktop app for Windows.',
    note: 'Desktop sign-in and subscriptions are managed on the platform site.',
    actionLabel: 'Download for Windows',
    href: PLATFORM_LINKS.windowsDesktopDownload,
    icon: FiMonitor,
  },
  {
    title: 'iPhone & iPad',
    description: 'Get Interview Pilot on the App Store.',
    note: 'Mobile subscriptions are managed separately from desktop access.',
    actionLabel: 'Open App Store',
    href: APP_STORE_LINKS.ios,
    icon: FiSmartphone,
  },
  {
    title: 'Android',
    description: 'Get Interview Pilot on Google Play.',
    note: 'Mobile subscriptions are managed separately from desktop access.',
    actionLabel: 'Open Google Play',
    href: APP_STORE_LINKS.android,
    icon: SiAndroid,
  },
]

export interface DownloadPlatformCardsProps {
  columns?: SimpleGridProps['columns']
}

export const DownloadPlatformCards: React.FC<DownloadPlatformCardsProps> = ({
  columns = { base: 1, md: 2 },
}) => {
  return (
    <SimpleGrid columns={columns} spacing={5} width="100%">
      {downloadCards.map((card) => (
        <Box
          key={card.title}
          bg="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(10px)"
          borderRadius="24px"
          p="6"
          borderWidth="1px"
          borderColor="rgba(255, 255, 255, 0.1)"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
          _hover={{
            bg: card.isDisabled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.08)',
            transform: card.isDisabled ? 'none' : 'translateY(-2px)',
            boxShadow: card.isDisabled
              ? '0 4px 20px rgba(0, 0, 0, 0.1)'
              : '0 6px 24px rgba(0, 0, 0, 0.15)',
          }}
          transition="all 0.3s ease"
        >
          <VStack align="stretch" spacing="5" height="100%">
            <HStack spacing="3" align="flex-start">
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w="44px"
                h="44px"
                borderRadius="14px"
                bg="rgba(255, 255, 255, 0.08)"
                color="white"
                flexShrink={0}
              >
                <Icon as={card.icon} boxSize="18px" />
              </Box>
              <VStack align="stretch" spacing="1">
                <Text fontSize="xl" fontWeight="bold">
                  {card.title}
                </Text>
                <Text color="whiteAlpha.800" fontSize="sm">
                  {card.description}
                </Text>
                {card.note ? (
                  <Text color="whiteAlpha.600" fontSize="xs">
                    {card.note}
                  </Text>
                ) : null}
              </VStack>
            </HStack>

            {card.href && !card.isDisabled ? (
              <Button
                as="a"
                href={card.href}
                alignSelf="flex-start"
                variant="primary"
                color="black"
                borderRadius="full"
                rel="noreferrer"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                {card.actionLabel}
              </Button>
            ) : (
              <Button
                alignSelf="flex-start"
                leftIcon={<Icon as={FiDownload} />}
                bg="rgba(255, 255, 255, 0.08)"
                color="whiteAlpha.700"
                _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                borderRadius="full"
                isDisabled
              >
                {card.actionLabel}
              </Button>
            )}
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  )
}
