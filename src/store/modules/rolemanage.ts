import { defineStore } from 'pinia'
import { reqRole,reqUpdRole,reqAddRole,reqDelRole,reqRoleMessage } from '../../api/rolemanage'
export const useRoleInfo = defineStore('RoleInfo', {
  state: () => ({}),
  actions: {
    async getRole() {
      let result = await reqRole()
      return result
    },
    async updRole(data: any) {
      let result = await reqUpdRole(data)
      return result
    },
    async delRole(id: any) {
      let result = await reqDelRole(id)
      return result
    },
    async addRole(data: any) {
      let result = await reqAddRole(data)
      return result
    },
    //角色权限分配
    async RoleMessage(Data: any) {
      let result = await reqRoleMessage(Data)
      return result
    },
  },
  getters: {},
})
