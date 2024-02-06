import { defineStore } from 'pinia'
import { reqPlan,reqUpdPlan,reqAddPlan,reqDelPlan } from '../../api/plan'
export const usePlanInfo = defineStore('PlanInfo', {
  state: () => ({}),
  actions: {
    async getPlan() {
      let result = await reqPlan()
      return result
    },
    async updPlan(data: any) {
      let result = await reqUpdPlan(data)
      return result
    },
    async delPlan(id: any) {
      let result = await reqDelPlan(id)
      return result
    },
    async addPlan(data: any) {
      let result = await reqAddPlan(data)
      return result
    },
  },
  getters: {},
})
