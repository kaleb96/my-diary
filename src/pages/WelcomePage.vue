<template>
    <v-container class="py-6">
      <v-card class="mx-auto px-10 py-8 card-outline" max-width="350" :rounded="false" variant="outlined">
        <div >
          <div class="text-script dancing-script-unique text-h4">My diary</div>
          <div class="text-script welcome text-subtitle-1 mt-3">이야기를 작성하려면 가입하세요.</div>
          <img class="mt-3" style="cursor: pointer; width: 268px" @click="loginByKakao" src="/assets/kakao/kakao_login_medium_wide.png"/>
          <div class="text-script mt-3" style="color: #616161">
            <span class="text-spacing">-----------------------------</span> 
            <span class="px-4" style="font-weight: 600;">또는</span>
            <span class="text-spacing">-----------------------------</span>
          </div>
            <v-text-field
            bg-color="#FAFAFA"
            class="mt-3 my-2"
            density="compact"
            :hide-details="true"
            variant="outlined"
            placeholder="휴대폰 번호 또는 이메일 주소" 
            type="input"
            v-model="userContact"
            validate-on="blur"
            :append-inner-icon="isValidate ? validation.contact ? 'mdi-check-circle-outline' : 'mdi-alpha-x-circle-outline' : '' "
            :rules="[rules.contact, rules.required]"
            />
          <v-text-field
            bg-color="#FAFAFA"
            class="my-2 field"
            placeholder="성명"
            :hide-details="true"
            type="input"
            density="compact"
            variant="outlined"
            validate-on="blur"
            :rules="[rules.required]"
            :append-inner-icon="isValidate ? validation.required ? 'mdi-check-circle-outline' : 'mdi-alpha-x-circle-outline' : '' "
            v-model="userName"/>
          <v-text-field
            bg-color="#FAFAFA"
            class="my-2"
            placeholder="사용자 별명" 
            type="input"
            variant="outlined"
            :hide-details="true"
            density="compact"
            validate-on="blur"
            :rules="[rules.required]"
            :append-inner-icon="isValidate ? validation.required ? 'mdi-check-circle-outline' : 'mdi-alpha-x-circle-outline' : '' "
            v-model="userNickname"/>
          <v-text-field
            bg-color="#FAFAFA"
            class="my-2"
            placeholder="비밀번호" 
            type="password"
            :hide-details="true"
            variant="outlined"
            density="compact"
            validate-on="blur"
            :rules="[rules.password, rules.required]"
            :append-inner-icon="isValidate ? validation.password ? 'mdi-check-circle-outline' : 'mdi-alpha-x-circle-outline' : '' "
            v-model="userPassword"/>
          </div>
          <v-btn size="large" variant="elevated" block color="primary" @click="join()">가입</v-btn>
      </v-card>
      <v-card class="mx-auto px-10 py-5 mt-4 card-outline" max-width="350px" :rounded="false" variant="outlined">
      <div class="text-script">계정이 있으신가요?
        <span class="highlight" style="cursor: pointer;" @click="router.push('/login')">로그인</span>
      </div>
      </v-card>
    </v-container>
    
  </template>
    <!-- <v-btn @click="logout">Logout</v-btn> -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { registerUser, userInfo } from '@/assets/databases';
import { emailRegex, mobleRegex, passwordRegex } from '@/assets/constants';

// Refs
const userContact = ref<string>('');
const userName = ref<string>('');
const userNickname = ref<string>('');
const userPassword = ref<string>('');
const isValidate = ref<boolean>(false);
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

// NOTE: 회원가입
async function join() {
  isValidate.value = true;

  if(!isValidate ||
    !validation.value.contact ||
    !validation.value.password ||
    !validation.value.required
  ) {
    console.log('가입정보 내용 부실');
    return;
  }

  // 데이터 셋팅
  const userInfo: userInfo = {
    id: generateRandomId(),
    user_contact: userContact.value,
    user_name: userName.value,
    user_nickname: userNickname.value,
    user_password: userPassword.value,
  }
  console.log('login = ', userInfo);
  // DB에 데이터 등록
  await registerUser(userInfo);
  router.push('/login');
  // DB 조회
  // const response = await getAllUsers();
}

// NOTE: 카카오 로그인
function loginByKakao() {
  // 인가 코드 받기
  api.auth.getAuthorizeCode();
}

// NOTE: 고유 ID 난수 생성
function generateRandomId(): string {
  const randomId = Math.floor(1000 + Math.random() * 90000)
  return randomId.toString();
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

.v-field__outline {
  border-width: 1px; /* 테두리 두께 */
  border-color: #BDBDBD;
}
</style>
