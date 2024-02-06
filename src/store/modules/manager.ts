// 获取部门管理中的数据
import { defineStore } from 'pinia'
import { itemData } from '../../api/checkItem/index'
import { useRouter } from 'vue-router'
const router = useRouter()
export const usemanagerInfo = defineStore('managerInfo', {
  state: () => ({}),
  actions: {
    async getItem() {
      let result = await itemData()      
      return result
    },
  },
  getters: {},
})
