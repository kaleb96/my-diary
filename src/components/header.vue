<template>
  <div class="d-flex justify-space-between">
    <div>Header</div>
    <div class="d-flex">
      <div>{{ userInfo?.user_nickname}}😀</div>
      <div class="px-1">|</div>
      <div @click="logout" style="cursor: pointer;">로그아웃</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'

// Routes
const router = useRouter();

// Interface
interface userInfoType {
  user_id: string;
  user_contact: string;
  user_nickname: string
  user_name: string;
}
// Refs
const userInfo = ref<userInfoType>();

// NOTE: 카카오 로그아웃
async function logout() {

if(sessionStorage.getItem('loginInfo')) {
  // 로그아웃
  sessionStorage.removeItem('loginInfo')
  console.log('로그아웃 성공');
  router.push('/welcome')
}
// NOTE: 카카오톡 로그아웃임
// const unLinkId = await api.auth.logout(accessToken);
  
//   if(unLinkId) {
//     authStore.clearAllInfo();
//     console.log('로그아웃 성공')
//     router.push('/login');
//   }
}

onMounted(async() => {
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
  userInfo.value = loginInfo;
})
</script>