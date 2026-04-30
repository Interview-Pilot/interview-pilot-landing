import { chakra, HTMLChakraProps, Image, Flex, Text, useColorModeValue } from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const textColor = useColorModeValue('#231f20', '#fff')

  return (
    <chakra.div
      textDecoration="none"
      transition="opacity 0.2s ease"
      _hover={{ textDecoration: 'none', opacity: 0.82 }}
      {...props}
    >
      <Flex align="center" h="40px">
        <Image
          src="/static/images/interviewpilot_newlogo.png"
          alt="Interview Pilot Logo"
          h="36px"
          w="auto"
        />
        <Text
          ml={3}
          fontSize="2xl"
          fontWeight="bold"
          color={textColor}
          fontFamily="var(--font-dm-sans)"
          letterSpacing="-0.8px"
          lineHeight="1"
        >
          Interview Pilot
        </Text>
      </Flex>
    </chakra.div>
  )
}
