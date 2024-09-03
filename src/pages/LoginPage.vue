<template>
  <v-container class="py-6">
    <v-card class="mx-auto px-10 py-8 card-outline" max-width="350" :rounded="false" variant="outlined">
      <div>
        <div class="text-script dancing-script-unique text-h4 mt-2 mb-9">My diary</div>
        <v-text-field
          density="compact"
          placeholder="휴대폰 번호 또는 이메일 주소" 
          type="input"
          v-model="userContact"
          variant="outlined"
          validate-on="blur"
          :append-inner-icon="isValidate ? validation.contact ? 'mdi-check-circle-outline' : 'mdi-alpha-x-circle-outline' : '' "
          :rules="[rules.contact, rules.required]"
          />
        <v-text-field
          placeholder="비밀번호" 
          type="password"
          variant="outlined"
          density="compact"
          validate-on="blur"
          :rules="[rules.password, rules.required]"
          :append-inner-icon="isValidate ? validation.password ? 'mdi-check-circle-outline' : 'mdi-alpha-x-circle-outline' : '' "
          v-model="userPassword"/>

          <v-btn size="large" variant="elevated" block color="primary" @click="login()">로그인</v-btn>
          <div class="text-script mt-3" style="color: #616161">
            <span class="text-spacing">-----------------------------</span> 
            <span class="px-4" style="font-weight: 600;">또는</span>
            <span class="text-spacing">-----------------------------</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <img class="mt-3" style="cursor: pointer;" @click="loginByKakao" src="/assets/kakao/kakao_login_small.png"/>
            <div class="text-button" style="color: #2196F3; cursor: pointer;" @click="findPassword()">비밀번호를 잊으셨나요?</div>
          </div>
      </div>
    </v-card>
    <v-card class="mx-auto px-8 py-5 mt-4 card-outline" max-width="350px" :rounded="false" variant="outlined">
    <div class="text-script text-body-2">계정이 없으신가요?
      <span class="highlight" style="cursor: pointer;" @click="router.push('/welcome')">가입하기</span>
    </div>
    </v-card>
  </v-container>
  
  <v-dialog v-model="showDialog" width="auto">
    <v-card
      max-width="400"
      title="로그인에 문제가 있나요?"
      text="비밀번호 찾기는 아직 서비스 준비중입니다."
    >
      <template v-slot:actions>
        <v-btn text="알겠습니다." @click="showDialog= false"></v-btn>
      </template>

    </v-card>
  </v-dialog>
</template>
  <!-- <v-btn @click="logout">Logout</v-btn> -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { getLoginInfo, loginInfo, } from '@/assets/databases/auth';
import { emailRegex, mobleRegex, passwordRegex } from '@/assets/constants';

// Refs
const userContact = ref<string>('');
const userPassword = ref<string>('');
const isValidate = ref<boolean>(false);
const showDialog = ref<boolean>(false);
const validation = ref({
contact: false,
password: false,
required: false,
})

// Stores
const authStore = useAuthStore();
const router = useRouter();

// input 규칙
const rules = {
contact: (value: string) => emailRegex.test(value)|| mobleRegex.test(value) ? validation.value.contact = true : validation.value.contact = false,
password: (value: string) => passwordRegex.test(value) ? validation.value.password = true : validation.value.password = false,
required: (value: string) => value != '' ? validation.value.required = true : validation.value.required = false,
}

// NOTE: 일반 로그인
async function login() {
  isValidate.value = true;

  if(!isValidate ||
    !validation.value.contact ||
    !validation.value.password ||
    !validation.value.required
  ) {
    console.log('로그인 입력 내용 부실');
    return;
  }

  const loginData: loginInfo = {
    user_contact: userContact.value,
    user_password: userPassword.value,
  }

  const response = await getLoginInfo(loginData);
  console.log('response = ',response);
  if(response != undefined) {
    if(response.user_password === loginData.user_password) {
      const btoaUserId = btoa(response.id);
      const user_info = {
        user_id: btoaUserId,
        user_contact: response.user_contact,
        user_nickname: response.user_nickname,
        user_name: response.user_name,
      }
      sessionStorage.setItem('loginInfo', JSON.stringify(user_info))
      // 세션에 로그인 정보 저장
      authStore.tokenInfo.accessToken = sessionStorage.getItem('loginInfo') as string;
      router.push('/')
    }
  }
  // 데이터 셋팅
  // DB 조회
}

// NOTE: 카카오 로그인
function loginByKakao() {
// 인가 코드 받기
api.auth.getAuthorizeCode();
}

// TODO: 비밀번호 확인 클라이언트에서 구현하는 방법 찾기
function findPassword() {
  showDialog.value = true;
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
    authStore.tokenInfo.accessToken = accessToken;
    authStore.tokenInfo.id = userInfo.data.id;
    authStore.tokenInfo.nickName = userInfo.data.properties.nickName;
    console.log('로그인 성공');
  }
})
</script>

<style scoped>
.text-script {
text-align: center;
}
.highlight {
font-weight: bold;
color: #2196F3
}
.dancing-script-unique {
font-family: "Dancing Script", cursive;
font-weight: 700;
font-style: normal;
font-size: 2rem;
}
.welcome {
font-weight: 700;
color: #616161
}
.card-outline {
border-color: #BDBDBD;
}
.text-spacing {
letter-spacing: -1px;
opacity: 55%;
}
</style>