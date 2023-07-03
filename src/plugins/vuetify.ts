// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

let darkTheme = false;
if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkTheme = true;
}

export default createVuetify({
  theme: {
    defaultTheme: darkTheme ? 'dark' : 'light',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#0d8e63',
          secondary: '#732d99',
          accent: '#00bd7e',
          error: '#bd00b7'
        }
      },
    },
  }
})
