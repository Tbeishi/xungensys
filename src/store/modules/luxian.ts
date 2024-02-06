import { defineStore } from 'pinia'
import { reqLuXian,reqUpdata,reqAdd,reqDel } from '../../api/luxian'
export const useLuXianInfo = defineStore('LuXianInfo', {
  state: () => ({}),
  actions: {
    async getLuXian() {
      let result = await reqLuXian()
      return result
    },
    async upDataLuXian(data: any) {
      let result = await reqUpdata(data)
      return result
    },
    async delLuXian(id: any) {
      let result = await reqDel(id)
      return result
    },
    async addLuXian(data: any) {
      let result = await reqAdd(data)
      return result
    },
  },
  getters: {},
})
