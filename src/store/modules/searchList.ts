import { defineStore } from 'pinia'
import { reqSearchList } from '../../api/searchList'
export const useSearchInfo = defineStore('searchInfo', {
  state: () => ({}),
  actions: {
    async getList() {
      let result = await reqSearchList()
      return result
    },
  },
  getters: {},
})
