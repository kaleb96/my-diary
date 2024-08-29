<template>
    <v-container class="py-6">
      <v-card class="mx-auto px-6 py-8" max-width="344" :rounded="false">
        <div>
          <div class="text-script">My diary</div>
          <div class="text-script">이야기를 작성해보세요.</div>
          <img style="cursor: pointer;" @click="loginByKakao" src="/assets/kakao/kakao_login_medium_wide.png"/>
          <div class="text-script">-------------------------- 또는 --------------------------</div>
          <v-text-field label="휴대폰 번호 또는 이메일 주소"></v-text-field>
          <v-text-field label="성명"></v-text-field>
          <v-text-field label="사용자 이름"></v-text-field>
          <v-text-field label="비밀번호"></v-text-field>
          <v-btn size="large" variant="elevated" block color="primary">가입</v-btn>
        </div>
      </v-card>
      <v-card class="mx-auto px-6 py-8 mt-4" max-width="344" :rounded="false">
      <div class="text-script">계정이 있으신가요?
        <span style="cursor: pointer;" @click="login">로그인</span>
      </div>
      </v-card>
    </v-container>
    
  </template>
    <!-- <v-btn @click="logout">Logout</v-btn> -->

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

/* TODO: 
  1. Router guard에서 로그인 여부에
  1. IndexedDB 연동
  2. 로그인 토큰을 암호화 해서 IndexedDB에 저장
  3. 로그아웃시 해당 Key를 찾아서 삭제
  4. 로그아웃 하지 않아도, 일정 시간 지나면 삭제되도록 유도
  5. Route에서 Login 이후에 이동할때에는 항상 IndexedDB를 조회해서 로그인 여부를 체크
  6. 로그인 화면을 최초 화면으로 변경
*/

// NOTE: 인가 코드 얻기
function loginByKakao() {
  // 인가 코드 받기
  api.auth.getAuthorizeCode();
} 
// NOTE: 토큰 조회
async function logout() {
  const accessToken = authStore.userInfo.accessToken;
  // console.log('accessToken = ', accessToken);
  const unLinkId = await api.auth.logout(accessToken);
  if(unLinkId) {
    authStore.clearAllInfo();
    console.log('로그아웃 성공')
    router.push('/login');
  }
}

onMounted(async () => {
  
  //NOTE: URI에서 토큰 추출
  const urlParams = new URLSearchParams(window.location.search);

  // code가 있는 경우 토큰 발급 요청

  if(urlParams.get('code')) {
    const code = urlParams.get('code');
    // 인가 토큰 얻기
    const token = await api.auth.getToken(code)
    // Access 토큰 얻기
    const accessToken = token.data.access_token;
    // 유저정보 얻기
    const userInfo = await api.auth.getUserInfo(accessToken);
    // 스토어 데이터 업데이트
    authStore.userInfo.accessToken = accessToken;
    authStore.userInfo.userId = userInfo.data.id;
    authStore.userInfo.nickName = userInfo.data.properties.nickName;
    console.log('로그인 성공');
  }
})
</script>
<style scoped>
.text-script {
  text-align: center;
  span {
    font-weight: bold;
    color: #2196F3
  }
}
</style>
