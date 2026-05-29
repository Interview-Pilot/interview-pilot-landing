import { chakra, HTMLChakraProps, Image, Flex, Text } from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'div'>> = (props) => {
  return (
    <chakra.div
      textDecoration="none"
      _hover={{
        textDecoration: 'none',
        '.logo-text': {
          opacity: 0.82,
        },
      }}
      {...props}
    >
      <Flex align="center" h="40px">
        <Image
          className="logo-icon"
          src="/static/images/interview_pilot_logo_ui.png"
          alt="Interview Pilot Logo"
          h="36px"
          w="auto"
        />
        <Text
          className="logo-text"
          ml={3}
          fontSize="22px"
          fontWeight="semibold"
          color="app.text.primary"
          fontFamily="var(--font-dm-sans)"
          letterSpacing="-0.5px"
          lineHeight="1"
          transition="opacity 0.2s ease"
        >
          Interview Pilot
        </Text>
      </Flex>
    </chakra.div>
  )
}
