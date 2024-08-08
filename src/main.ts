
// Plugins
import { registerPlugins } from '@/plugins'
import router from '@/router'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

createApp(App)
  .use(registerPlugins)
  .use(router)
  .mount('#app')
