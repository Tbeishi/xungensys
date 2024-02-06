import request from '@/utils/request'
// import test from '@/utils/test'

enum API {
  GET_SILDERS = '/account/getMenu', //带权限菜单
  GET_MENU = '/account/menu',
}

// 获取左侧菜单组件
// export const reqResilders = () => request.get<any, any>(API.GET_SILDERS)
// export const reqResilders = () => test.get<any, any>(API.GET_SILDERS)
// export const reqResilders = () => request.get<any, any>(API.GET_SILDERS)
// 获取所有菜单
export const reqResilders = () => request.get<any, any>(API.GET_SILDERS)
// 新增菜单
export const reqAddmenus = (data: any) =>
  request.post<any, any>(API.GET_SILDERS, data)
// 修改菜单
export const reqUpdmenus = (data: any) =>
  request.put<any, any>(API.GET_SILDERS, data)
// 删除菜单
export const reqDelmenus = (data: any) =>
  request.delete<any, any>(`API.GET_SILDERS${data}`)

// 获取菜单
export const reqMenu = (id: any) =>
  request.get<any, any>(`${API.GET_MENU}?pid=${id}`)
