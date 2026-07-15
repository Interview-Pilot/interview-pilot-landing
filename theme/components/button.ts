type Dict = Record<string, any>

export default {
  baseStyle: {
    borderRadius: 'full',
  },
  variants: {
    primary: {
      bg: 'primary.400',
      color: 'black',
      _hover: {
        bg: 'primary.300',
        color: 'black',
        _disabled: {
          bg: 'primary.400',
        },
      },
      _active: {
        bg: 'primary.500',
        color: 'black',
      },
    },
    'nav-link': (props: Dict) => {
      const { isActive } = props

      return {
        outline: 'none',
        fontWeight: '500',
        color: isActive ? 'app.text.primary' : 'app.text.muted',
        transition: 'color .2s ease-in',
        _hover: {
          textDecoration: 'none',
          color: 'app.text.primary',
        },
      }
    },
  },
}
