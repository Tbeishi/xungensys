import request from '@/utils/request'
import test from '@/utils/test'

enum API {
  GET_SILDERS = '/xunjiantask/task',
}

// 获取巡检计划信息
export const reqTask = () => test.get<any, any>(API.GET_SILDERS)

// 增加信息
export const reqAddTask  = (data: any) =>
  request.post<any, any>(API.GET_SILDERS, data)
// 修改信息
export const reqUpdTask  = (data: any) =>
  request.post<any, any>(API.GET_SILDERS, data)
// 删除信息
export const reqDelTask  = (id: any) =>
  request.delete<any, any>(API.GET_SILDERS,id)