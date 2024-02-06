import { defineStore } from 'pinia'
import { itemData } from '../../api/checkItem/index'
import { useRouter } from 'vue-router'
const router = useRouter()
export const usecheckInfo = defineStore('checkInfo', {
  state: () => ({}),
  actions: {
    async getItem() {
      let result = await itemData()      
      return result
    },
  },
  getters: {},
})
