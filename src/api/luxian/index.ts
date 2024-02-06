import request from '@/utils/request'
import test from '@/utils/test'

enum API {
  GET_SILDERS = '/xunjianLX/luxian',
}

// 获取路线信息
export const reqLuXian = () => test.get<any, any>(API.GET_SILDERS)

// 增加信息
export const reqAdd = (data: any) =>
  request.post<any, any>(API.GET_SILDERS, data)
// 修改信息
export const reqUpdata = (data: any) =>
  request.post<any, any>(API.GET_SILDERS, data)
// 删除信息
export const reqDel = (id: any) =>
  request.delete<any, any>(API.GET_SILDERS,id)