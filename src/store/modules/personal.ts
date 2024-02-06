import { defineStore } from 'pinia'
import {
  reqPersonal,
  reqDelRole,
  reqChange,
  reqAddPer,
} from '@/api/personalApi'

export const usePersonMessage = defineStore('PerMessage', {
  state: () => {
    return {}
  },

  actions: {
    // 获取人员信息
    async getPersonal() {
      let result = await reqPersonal()
      return result
    },
    // 增加人员信息
    async addPer(data: any) {
      let result = await reqAddPer(data)
      return result
    },
    // 实现删除人员
    async delPer(id: any) {
      let result = await reqDelRole(id)
      return result
    },
    // 改变人员信息
    async changePer(data: any) {
      let result = await reqChange(data)
      return result
    },
  },
  getters: {},
})
