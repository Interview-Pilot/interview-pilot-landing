import {
  VStack,
  Heading,
  Box,
  StackProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface SectionTitleProps extends Omit<StackProps, 'title'> {
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center' | { base?: 'left' | 'center'; md?: 'left' | 'center' }
  variant?: string
  headingAs?: HeadingTag
}

export const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const {
    title,
    description,
    align = 'center',
    variant,
    headingAs = 'h2',
    ...rest
  } = props
  const styles = useMultiStyleConfig('SectionTitle', { variant })

  // Handle responsive align values for alignItems
  const getAlignItems = () => {
    if (typeof align === 'string') {
      return align === 'left' ? 'flex-start' : 'center'
    }
    // Handle responsive object
    return {
      base: align.base === 'left' ? 'flex-start' : 'center',
      md: align.md === 'left' ? 'flex-start' : 'center',
    }
  }

  // Handle responsive align values for textAlign
  const getTextAlign = () => {
    if (typeof align === 'string') {
      return align
    }
    // Handle responsive object - return the raw values for textAlign
    return {
      base: align.base || 'center',
      md: align.md || 'center',
    }
  }

  return (
    <VStack
      sx={styles.wrapper}
      alignItems={getAlignItems()}
      spacing={4}
      {...rest}
    >
      <Heading sx={styles.title} as={headingAs} textAlign={getTextAlign()}>
        {title}
      </Heading>
      {description && (
        <Box sx={styles.description} textAlign={getTextAlign()}>
          {description}
        </Box>
      )}
    </VStack>
  )
}
