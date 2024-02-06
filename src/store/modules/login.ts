import { defineStore } from 'pinia'
import { reqLogin } from '../../api/login'
import { useRouter } from 'vue-router'
const router = useRouter()
export const useUserInfo = defineStore('userInfo', {
  state: () => ({}),
  actions: {
    async loginIn(phone: any, passwd: any) {
      let result = await reqLogin(phone, passwd)
      return result
    },
  },
  getters: {},
})
