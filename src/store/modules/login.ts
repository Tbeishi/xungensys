import { defineStore } from 'pinia'
import { reqLogin, reqChangePas } from '../../api/login'
// const router = useRouter()
export const useUserInfo = defineStore('userInfo', {
  state: () => ({
    telephone: '',
    password: '',
  }),
  actions: {
    async loginIn(telephone: any, password: any) {
      let result = await reqLogin(telephone, password)
      if (result && result.code === '200') {
        ;(this.telephone = result.data.telephone),
          (this.password = result.data.password)
      }
      console.log('登录之后获取用户信息2111111111111的方法', result)
      return result
    },
    // 实现修改密码的操作
    // 实现修改密码的操作
    async changePas(data: any) {
      console.log('data---data', data)
      let result: any = await reqChangePas(data)
      return result
    },
  },

  getters: {},
})
