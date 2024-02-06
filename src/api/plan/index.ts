import request from '@/utils/request'
import test from '@/utils/test'

enum API {
  GET_SILDERS = '/xunjianplan/plan',
}

// 获取巡检计划信息
export const reqPlan = () => test.get<any, any>(API.GET_SILDERS)

// 增加信息
export const reqAddPlan = (data: any) =>
  request.post<any, any>(API.GET_SILDERS, data)
// 修改信息
export const reqUpdPlan = (data: any) =>
  request.post<any, any>(API.GET_SILDERS, data)
// 删除信息
export const reqDelPlan = (id: any) =>
  request.delete<any, any>(API.GET_SILDERS,id)