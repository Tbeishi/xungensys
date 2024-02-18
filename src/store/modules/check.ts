import { defineStore } from 'pinia'
import { itemData,addItemData,delItemData,updItemData } from '../../api/checkItem/index'
export const usecheckInfo = defineStore('checkInfo', {
  state: () => ({}),
  actions: {
    async getItem(data:any) {
      console.log(data);
      let result = await itemData(data) 
      return result
    },
    async addItem(data:any) {
      let result = await addItemData(data) 
      return result
    },
    async delItem(id:any) {
      let result = await delItemData(id) 
      return result
    },
    async updItem(data:any) {
      let result = await updItemData(data) 
      return result
    },
  },
  getters: {},
})
