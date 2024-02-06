// 角色管理对应的接口
import requests from '@/utils/request'
enum API {
  GET_ROLE = '/account/role',
}
// 获取所有角色
export const reqRole = () => requests.get<any, any>(API.GET_ROLE)
// 新增角色   需要注意这里的数据格式是json
export const reqAddRole = (data: any) =>
  requests.post<any, any>(API.GET_ROLE, data)

// 修改角色  roleid rolename  form-data
export const reqUpdRole = (data: any) =>
  requests.put<any, any>(API.GET_ROLE, data)

// 删除角色  form-data
export const reqDelRole = (roleid: any) =>
  requests.delete<any, any>(`API.GET_ROLE?roleid=${roleid}`)
