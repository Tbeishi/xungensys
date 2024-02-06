import { defineStore } from 'pinia'
import { reqRole, reqUpdRole, reqAddRole, reqDelRole } from '../../api/role'
export const useRoleInfo = defineStore('RoleInfo', {
  state: () => ({}),
  actions: {
    async reqRole() {
      let result = await reqRole()
      return result
    },
    async updRole(data: any) {
      let result = await reqUpdRole(data)
      return result
    },
    async delRole(roleid: any) {
      let result = await reqDelRole(roleid)
      return result
    },
    async addRole(data: any) {
      let result = await reqAddRole(data)
      return result
    },
  },
  getters: {},
})
