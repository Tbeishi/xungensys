import { defineStore } from 'pinia'
import { reqConfig } from '../../api/sysconfig'
export const useConfigInfo  = defineStore('ConfigInfo', {
  state: () => ({}),
  actions: {
    async getConfig() {
      let result = await reqConfig()
      return result
    },
  },
  getters: {},
})
