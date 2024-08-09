
// Plugins
import { registerPlugins } from '@/plugins'
import router from '@/router'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// NOTE: 카카오 SDK 등록
Kakao.init(import.meta.env.VITE_KAKAO_SDK_ID);

createApp(App)
  .use(registerPlugins)
  .use(router)
  .mount('#app')
