import axios from 'axios'

export default { 
  // NOTE: 카카오톡 로그인
  async getAuthorizeCode () {
    const redirectUri = 'http://localhost:3001/login'
    Kakao.Auth.authorize({
      redirectUri: redirectUri
    })
  },

  // NOTE: 토큰 받기
  async getToken(code: string) {
    const url = "https://kauth.kakao.com/oauth/token";
    try{
      const token = await axios.post(url, null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
            redirect_uri: 'http://localhost:3001/login', 
            code: code, 
          },
        }
      )
      // console.log('token = ', token)
      return token;
    } catch (error) {
      console.log('error = ',error);
    }
  },
  async getUserInfo(accessToken: string) {
    const url = "https://kapi.kakao.com/v2/user/me";
    try{
      const userInfo = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      })
      console.log('userInfo = ', userInfo);
      return userInfo;
    } catch(error) {
      console.log('getUserInfo error');
    }
  },
// NOTE:로그아웃
  async logout(accessToken: string) {
    const url = 'https://kapi.kakao.com/v1/user/unlink';
    const { data } = await axios.post(url, '', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
    return data;
  }
}
