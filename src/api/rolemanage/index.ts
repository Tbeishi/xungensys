import request from '@/utils/request'
import requestJS from '@/utils/requestJS'

enum API {
  GET_SILDERS = '/account/role',
  PUT_ROLE = '/account/permission_allocation'
}

// 获取角色信息
export const reqRole = () => request.get<any, any>(API.GET_SILDERS)

// 增加信息
export const reqAddRole = (data: any) =>
requestJS.post<any, any>(API.GET_SILDERS, data)
// 修改信息
export const reqUpdRole =  (data: any) =>
  request.put<any, any>(API.GET_SILDERS, data)
// 删除信息
export const reqDelRole =  (roleid: any) =>{
  const data  = { roleid } 
  return request.delete<any, any>(API.GET_SILDERS,{ data })
}

// 角色权限分配
export const reqRoleMessage = (Data: any) => 
requestJS.put<any, any>(API.PUT_ROLE,Data)
