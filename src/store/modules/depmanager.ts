// 获取部门管理中的数据
import { defineStore } from 'pinia'
// 引入接口
import { reqGetDep, reqPostDep, reqPutDep, reqDelDep } from '@/api/department'
import { useRouter } from 'vue-router'
import { log } from 'console'
const router = useRouter()
export const useDepInfo = defineStore('depInfo', {
  state: () => ({}),
  actions: {
    async getDep() {
      let result = await reqGetDep()
      return result
    },
    async postDep(data: any) {
      let result = await reqPostDep(data)
      return result
    },
    async putDep(data: any) {
      console.log('11111111111134343111111', data)
      console.log('修改部门信息的操作执行到了仓库', data)
      let result = await reqPutDep(data)

      return result
    },
    async delDep(data: any) {
      console.log('57777777777777777777777777')

      console.log('执行部门删除操作的时候传给1222222222仓库的参数', data)

      let result = await reqDelDep(data)
      return result
    },
  },
  getters: {},
})
