import requests from '@/utils/request'
import requestJS from '@/utils/requestJS'
enum API {
  GET_ZHUHU = '/account/userInfo',
}
// 获取人员 ---查找
export const reqPersonal = () => requests.get<any, any>(API.GET_ZHUHU)

// 修改
export const reqChange = (data: any) => {
  return requestJS.put<any, any>(API.GET_ZHUHU, data)
}

// 增加  这里是一个数组
export const reqAddPer = (data:any) => {
  return requestJS.post<any, any>(API.GET_ZHUHU, data)
}

// 删除角色信息
export const reqDelRole = (userid: any) => {
 const data = { userid }
 return requests.delete<any, any>(API.GET_ZHUHU,{ data })
}
