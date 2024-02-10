import { defineStore } from 'pinia'
import { reqConfig,updataConfig } from '../../api/sysconfig'
export const useConfigInfo  = defineStore('ConfigInfo', {
  state: () => ({}),
  actions: {
    async getConfig() {
      let result = await reqConfig()
      return result
    },
    async updataConfig(data:any) {
      let result = await updataConfig(data)
      return result
    },
  },
  getters: {},
})
