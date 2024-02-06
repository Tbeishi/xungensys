import { defineStore } from 'pinia'
// import requests from '../../utils/request'

// 获取巡检点相关的所有接口
import {
  reqGetDots,
  reqUploadDots,
  reqDelDots,
  reqAddDots,
} from '@/api/inspectionPoint'
export const useDotsStore = defineStore('dotsStore ', {
  // 状态
  state: () => ({}),
  //  方法
  actions: {
    // 获取所有的巡检点
    async getDots() {
      let result = reqGetDots()
      return result
    },
    // 增加巡检点
    async addDots(form: any) {
      console.log('storeForm', form)
      let result = await reqAddDots(form)
      console.log('增加巡检点--result', result)
      return result
    },
    // 删除巡检点
    async delDots(id:any){
      let result = await reqDelDots(id)
      return result
    },
    // 修改巡检点
    async upDateDots(form:any){
      let result = await reqUploadDots(form)
      return result
    }
  },
  getters: {},
})
