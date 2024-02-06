import request from '@/utils/request'

enum API {
  GET_SILDERS = '/account/sysconfig',
}

// 获取配置信息
export const reqConfig = () => request.get<any, any>(API.GET_SILDERS)
