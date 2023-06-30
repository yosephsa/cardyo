// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#0d8e63',
          secondary: '#732d99',
          accent: '#00bd7e',
          error: '#bd00b7',
        }
      },
    },
  }
})
