<template>
    <v-container>
      <v-row>
        <v-col class="bg-surface-variant" align="center">
          <v-card
            color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
            max-width="340"
            subtitle="Make a story of yourself"
            title="My Diary"
          />
        </v-col>
        <v-divider/>
        <v-col class="bg-surface-variant" align="center">
          <img @click="loginByKakao" src="/assets/kakao/kakao_login_medium_wide.png"/>
        </v-col>
        <v-divider/>
        <v-col class="bg-surface-variant" align="center">
          <v-btn @click="logout">Logout</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter();
const token = ref('');

/* TODO: 
  1. IndexedDB 연동
  2. 로그인 토큰을 암호화 해서 IndexedDB에 저장
  3. 로그아웃시 해당 Key를 찾아서 삭제
  4. 로그아웃 하지 않아도, 일정 시간 지나면 삭제되도록 유도
  5. Route에서 Login 이후에 이동할때에는 항상 IndexedDB를 조회해서 로그인 여부를 체크
  6. 로그인 화면을 최초 화면으로 변경
*/

// NOTE: 인가 코드 얻기
function loginByKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3001/login',
  });
} 

// NOTE: 
async function getKakaoToken(code) {
  try {
    const data = {
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_REST_API_ID,
      redirect_uri: 'http://localhost:3001/login',
      code: code,
    };

    const queryString = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
    console.log('queryString = ', queryString);

    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8',
        }
      }
    )
    token.value = result;
    return result;
  } catch(e) {
    console.log('e = ', e);
  }
}
async function getKakaoUserInfo() {
  let data = ''
  await Kakao.API.request({
    url: '/v2/user/me',
  })
  .then((response) => {
    console.log('api response = ', response);
    data = response;
  })
  .catch((error) => {
    console.log('error');
  })
  return data;
}

// NOTE: 사용자 정보 조회
async function setUserInfo() {
  const response = await getKakaoUserInfo();
  console.log('response = ', response);
}

// NOTE: 토큰 조회
async function setKakaoToken(code) {
  const { data } = await getKakaoToken(code);
  if(data.error) {
    return;
  }
  Kakao.Auth.setAccessToken(data.access_token);
  await setUserInfo();
  router.push('/login')
  
}

function logout() {

  // NOTE: 로그아웃
  Kakao.Auth.logout()
  .then((response) => {
    console.log(Kakao.Auth.getAccessToken());
  })
  .catch((error) => {
    console.log('Logout Error = ', error );
  })

  // NOTE: 연결 끊기
  Kakao.API.request({
    url: '/v1/user/unlink',
  })
  .then((response) => {
    console.log('response = ', response);
  })
  .catch((error) => {
    console.log('Unlink Error = ', error);
  })
}

onMounted(() => {
  
  //NOTE: URI에서 토큰 추출
  const urlParams = new URLSearchParams(window.location.search);

  //code가 있는 경우 토큰 발급 요청
  if(urlParams.get('code')) {
    const code = urlParams.get('code');
    setKakaoToken(code);
  }
})

</script>