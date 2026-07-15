import { Container, ContainerProps, Flex, FlexProps, Text, VStack } from '@chakra-ui/react'

interface HeroProps extends Omit<FlexProps, 'title'> {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  containerProps?: ContainerProps
}

export const Hero = ({ title, description, children, containerProps, ...rest }: HeroProps) => {
  return (
    <Flex py="20" alignItems="center" {...rest}>
      <Container {...containerProps}>
        <VStack spacing={{ base: 6, md: 8 }} alignItems={{ base: 'center', md: 'flex-start' }}>
          <Text as="h1" textStyle="h1" textAlign={{ base: 'center', md: 'left' }}>
            {title}
          </Text>
          <Text
            as="div"
            textStyle="subtitle"
            align={{ base: 'center', md: 'left' }}
            color="app.text.muted"
          >
            {description}
          </Text>
        </VStack>
        {children}
      </Container>
    </Flex>
  )
}
