const SectionTitle = {
  parts: ['wrapper', 'title', 'description'],
  baseStyle: {
    wrapper: {
      spacing: [2, null, 3],
      mb: '10',
      textAlign: ['left', null, 'center'],
      position: 'relative',
      zIndex: 1,
    },
    title: {
      width: '100%',
    },
    description: {
      fontWeight: 'normal',
      width: '100%',
    },
  },
  variants: {
    default: () => ({
      title: {},
      description: {
        color: 'app.text.muted',
      },
    }),
    dark: {
      title: {
        color: 'app.text.primary',
      },
      description: {
        color: 'app.text.muted',
      },
    },
    light: () => ({
      title: {
        color: 'app.text.primary',
      },
      description: {
        color: 'app.text.muted',
      },
    }),
  },
  defaultProps: {
    variant: 'default',
    size: 'xl',
  },
  sizes: {
    lg: {
      title: {
        size: '2xl',
      },
      description: {
        fontSize: 'xl',
      },
    },
    xl: {
      wrapper: {
        mb: 14,
        spacing: [2, null, 3],
      },
      title: {
        fontSize: { base: '4xl', lg: '4xl' },
      },
      description: {
        fontSize: { base: 'xl', lg: '2xl' },
      },
    },
  },
}

export default SectionTitle
