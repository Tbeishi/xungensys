// 部门管理的相关接口
// 这里要求传输的数据格式是 application/json
import requestJS from '@/utils/requestJS'
enum API {
  GET_DEPARTMENT = '/account/department',
}
// 获取所有的部门信息
export const reqGetDep = () => {
  return requestJS.get<any, any>(API.GET_DEPARTMENT)
}
// 新增部门信息
export const reqPostDep = (data: any) => {
  return requestJS.post<any, any>(API.GET_DEPARTMENT, data)
}
// 修改部门信息
export const reqPutDep = (data: any) => {
  return requestJS.put<any, any>(API.GET_DEPARTMENT, data)
}
// 删除部门信息
export const reqDelDep = (departmentid: any) => {
  console.log('departmentid--departmentid-api', departmentid)

  return requestJS.delete<any, any>(API.GET_DEPARTMENT, {
    data: { departmentid },
  })
}
