
// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import router from '@/router'
import { createApp } from 'vue'

// Components
import App from './App.vue'

// NOTE: Pinia 생성
const pinia = createPinia();

// NOTE: 카카오 SDK 등록
Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
console.log('init = ', Kakao.isInitialized());

createApp(App)
.use(pinia)
  .use(registerPlugins)
  .use(router)
  .mount('#app')
  