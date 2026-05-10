import { Box, Container, HStack, Stack, Text, VStack } from '@chakra-ui/react'

import { sectionContentStyles } from '#theme/styles/section-styles'

type FeaturePageShellProps = {
  title: string
  description: string
  bullets: string[]
}

export function FeaturePageShell(props: FeaturePageShellProps) {
  const { title, description, bullets } = props

  return (
    <Box pt={{ base: 24, md: 28 }} sx={sectionContentStyles}>
      <Box pt={16} pb={16} px={[4, null]}>
        <Container maxW="container.md">
          <VStack spacing={10} align="stretch">
            <Box textAlign="center">
              <Text
                as="h1"
                fontSize={{ base: '6xl', md: '7xl' }}
                fontWeight="bold"
                lineHeight="1"
                color="white"
              >
                {title}
              </Text>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="whiteAlpha.700"
                mt={4}
              >
                {description}
              </Text>
            </Box>

            <Box
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="2xl"
              bg="whiteAlpha.50"
              px={{ base: 5, md: 7 }}
              py={{ base: 5, md: 6 }}
            >
              <Stack spacing={4}>
                {bullets.map((bullet) => (
                  <HStack key={bullet} align="flex-start" spacing="3">
                    <Box
                      mt="9px"
                      w="8px"
                      h="8px"
                      borderRadius="full"
                      bg="primary.400"
                      flexShrink={0}
                    />
                    <Text color="whiteAlpha.800" lineHeight="1.8">
                      {bullet}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
