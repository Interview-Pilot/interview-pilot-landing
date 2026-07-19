import {
  Flex,
  HTMLChakraProps,
  Text,
  chakra,
} from '@chakra-ui/react'
import Image from 'next/image'

export interface LogoProps extends HTMLChakraProps<'div'> {
  imagePriority?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  imagePriority = false,
  ...props
}) => {
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
          width={36}
          height={36}
          priority={imagePriority}
        />
        <Flex align="center" gap="1.5" ml="3">
          <Text
            className="logo-text"
            fontSize="25px"
            fontWeight="semibold"
            color="app.text.primary"
            fontFamily="var(--font-dm-sans)"
            letterSpacing="-0.5px"
            lineHeight="1"
            transition="opacity 0.2s ease"
          >
            Interview Pilot
          </Text>
          <Image
            src="/static/images/ai-chat-badge-glossy.png"
            alt="AI"
            width={24}
            height={24}
            priority={imagePriority}
          />
        </Flex>
      </Flex>
    </chakra.div>
  )
}
