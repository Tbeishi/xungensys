import test from '../../utils/test'
enum API {
  GET_ZHUHU = '/check/choose',
  GET_MANAGER = '/system/manager',
  // DEL_PERSONAL = '/customer/zuhu',
  // CHANGE_PERSONAL = '/customer/zuhu',
  // ADD_PERSONAL = '/customer/zuhu',
}
// 获取数据
export const itemData = () => test.get<any, any>(API.GET_ZHUHU)
// 获取所有部门信息重中的数据
export const managerData = () => test.get<any, any>(API.GET_MANAGER)
// 删除
export const reqDelPer = (name: any) => {
  // console.log('输出name', name)
  const data = { name }
  return test.delete<any, any>(API.GET_ZHUHU, {
    data,
  })
}

// 修改
export const reqChange = (data: any) => {
  return test.put<any, any>(API.GET_ZHUHU, data)
}

// 增加  这里是一个数组
export const reqAddPer = (name: string, role: string, tele: string) => {
  const data = { name, role, tele }
  return test.post<any, any>(API.GET_ZHUHU, data)
}
