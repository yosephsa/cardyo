import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

loadFonts()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(ContextMenu);

app.mount('#app')
