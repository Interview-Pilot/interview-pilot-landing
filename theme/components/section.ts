const Section = {
  baseStyle: {
    pt: 16,
    pb: 16,
    px: [4, null],
  },
  variants: {
    subtle: {},
    solid: {
      bg: 'primary.400',
    },
    alternate: () => ({
      bg: 'app.surface.subtle',
    }),
  },
  defaultProps: {
    variant: 'subtle',
  },
}

export default Section
