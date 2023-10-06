import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: {
      50: '#E6F6F7',
      100: '#C1E7E9',
      200: '#9BDBE0',
      300: '#75CDD5',
      400: '#4FBFCB',
      500: '#2AADC0',
      600: '#228B9A',
      700: '#1B6973',
      800: '#12574C',
      900: '#0A353E'
    }
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Roboto, sans-serif'
  },
  styles: {
    global: {
      body: {
        bg: 'primary.50',
        color: 'gray.800'
      }
    }
  }
})

export default theme
