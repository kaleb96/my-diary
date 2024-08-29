import { defineStore } from 'pinia'
import api from '@/api'
export const useAuthStore = defineStore('auth', {

  state: () => ({
    userInfo: {
      accessToken: '',
      userId: '',
      nickName: '',
    }
  }),
  
  actions: {
    // NOTE: 세션 타이머 생성
    setSessionTimer(time: any) {
      setTimeout(() => {
        api.auth.logout(this.userInfo.accessToken);
        console.log('Session Timeout');
      }, time)
    },

    //NOTE: 라우트에서 로그인 정보 확인
    checkLoginInfoAll(): boolean {
      if(this.userInfo.accessToken) {
        return true;
      } else {
        console.log('로그인 정보를 다시 확인해주세요.')
        return false;
      }
    },

    clearAllInfo() {
      this.userInfo.userId = '';
      this.userInfo.accessToken = '';
      this.userInfo.nickName = '';
      console.log('auth Store is cleared');
    }
  },

})