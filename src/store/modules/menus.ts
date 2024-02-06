import { defineStore } from 'pinia'
import { reqResilders,reqAddmenus,reqUpdmenus,reqDelmenus } from '@/api/silders'
export const useMenuInfo = defineStore('menuInfo', {
  state: () => ({}),
  actions: {
    async getMenu() {
      let result = await reqResilders()
      return result
    },
    async updmenus(data: any) {
      let result = await reqUpdmenus(data)
      return result
    },
    async delmenus(id: any) {
      let result = await reqDelmenus(id)
      return result
    },
    async addmenus(data: any) {
      let result = await reqAddmenus(data)
      return result
    },
  },
  getters: {},
})
