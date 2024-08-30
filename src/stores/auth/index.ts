import { defineStore } from 'pinia'
import api from '@/api'

export interface tokenInfoType {
  accessToken: string;
  id: string;
  nickName: string;
}
export const useAuthStore = defineStore('auth', {

  
  state: () => ({
    // 토큰 정보
    tokenInfo: {
      accessToken: '',
      id: '',
      nickName: ''
    } as tokenInfoType,
  }),
  
  actions: {
    // NOTE: 세션 타이머 생성
    setSessionTimer(time: any) {
      setTimeout(() => {
        api.auth.logout(this.tokenInfo.accessToken);
        console.log('Session Timeout');
      }, time)
    },

    //NOTE: 라우트에서 로그인 정보 확인
    checkLoginInfoAll(): boolean {
      if(this.tokenInfo.accessToken) {
        return true;
      } else {
        console.log('로그인 정보를 다시 확인해주세요.')
        return false;
      }
    },

    clearAllInfo() {
      this.tokenInfo.id = '';
      this.tokenInfo.accessToken = '';
      this.tokenInfo.nickName = '';
      console.log('auth Store is cleared');
    }
  },

})