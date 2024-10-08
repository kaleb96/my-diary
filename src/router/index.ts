import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // NOTE: 스크롤 설정
  scrollBehavior: () => ({ left: 0, top: 0}),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  /* 
    TODO: 라우터 이동 전 스피터 구현
  */
  const authStore = useAuthStore();

  // NOTE: 인증 후 서비스 진입
  if(to.path === '/login') {
    next();
  } else {
    if(authStore.checkLoginInfoAll()) {
      next();
    } else {
      next('/login');
    }
  }

})

export default router;