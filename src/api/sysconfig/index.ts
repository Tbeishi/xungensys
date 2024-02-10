import request from '@/utils/request'

enum API {
  GET_SILDERS = '/account/sysconfig',
}

// 获取配置信息
export const reqConfig = () => request.get<any, any>(API.GET_SILDERS)
//更新
export const updataConfig = (data:any) => request.post<any, any>(API.GET_SILDERS,data)
