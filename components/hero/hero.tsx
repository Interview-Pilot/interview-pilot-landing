import { Container, Flex, FlexProps, Text, VStack } from '@chakra-ui/react'

interface HeroProps extends Omit<FlexProps, 'title'> {
  title: string | React.ReactNode
  description?: string | React.ReactNode
}

export const Hero = ({ title, description, children, ...rest }: HeroProps) => {
  return (
    <Flex py="20" alignItems="center" {...rest}>
      <Container>
        <VStack spacing={{ base: 6, md: 8 }} alignItems={{ base: 'center', md: 'flex-start' }}>
          <Text as="h1" textStyle="h1" textAlign={{ base: 'center', md: 'left' }}>
            {title}
          </Text>
          <Text
            as="div"
            textStyle="subtitle"
            align={{ base: 'center', md: 'left' }}
            color="gray.500"
            _dark={{ color: 'gray.400' }}
          >
            {description}
          </Text>
        </VStack>
        {children}
      </Container>
    </Flex>
  )
}
