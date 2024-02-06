// 巡检点的相关接口
import requests from '@/utils/request'
import axios from 'axios'
enum API {
  GET_XUNJIANDIAN = '/xungeng/xunjiandian',
}
// 获取巡检点   请求返回的类型  请求的参数类型
export const reqGetDots = () => {
  return requests.get<any, any>(API.GET_XUNJIANDIAN)
}
// 更新巡检点
export const reqUploadDots = (data: any) => {
  console.log(data);
  return requests.put<any, any>(API.GET_XUNJIANDIAN, data)
}
// 删除巡检点  id 这里是string
export const reqDelDots = (id: any) => {
  const data = { id }
  return requests.delete<any, any>(API.GET_XUNJIANDIAN, { data })
}
// 增加巡检点s
export const reqAddDots = async (data: any) => {
  console.log('输出data', data)
  // console.log('触
  // const datas = { ...data }
  return requests.post<any, any>(API.GET_XUNJIANDIAN, data)
}
// export const reqAddDots = (data: any) => {
//   return requests.post<any, any>(API.GET_XUNJIANDIAN, data)
// }

// 这里是接口相关的类型定义
// 获取所有的巡检点
export interface GetDots {
  id: string
  dotname: string // 测试点
  address: string // 地点
  Longitude: string // 经度
  Latitude: string // 维度
  note: string // 拍照--备注 ？
}
// 新增巡检点
export interface AddDots {
  dotname: string // 测试点
  address: string // 地点
  Longitude: string // 经度
  Latitude: string // 维度
  note: string // 拍照--备注 ？
}

// // 巡检点的相关接口
// import requests from '@/utils/request'
// import axios from 'axios'
// enum API {
//   GET_XUNJIANDIAN = '/xungeng/xunjiandian',
// }
// // 获取巡检点   请求返回的类型  请求的参数类型
// export const reqGetDots = () => {
//   return requests.get<any, any>(API.GET_XUNJIANDIAN)
// }
// // 更新巡检点
// export const reqUploadDots = (data: GetDots) => {
//   return requests.put<any, any>(API.GET_XUNJIANDIAN, data)
// }
// // 删除巡检点  id 这里是string
// export const reqDelDots = (id: any) => {
//   return requests.delete<any, any>(API.GET_XUNJIANDIAN, id)
// }
// // 增加巡检点s
// export const reqAddDots = (data: any) => {
//   return requests.post<any, any>(API.GET_XUNJIANDIAN, data)
// }

// // 这里是接口相关的类型定义
// // 获取所有的巡检点
// export interface GetDots {
//   id: string
//   dotname: string // 测试点
//   address: string // 地点
//   Longitude: string // 经度
//   Latitude: string // 维度
//   note: string // 拍照--备注 ？
// }
// // 新增巡检点
// export interface AddDots {
//   dotname: string // dotname: string // 测试点
//   address: string // 地点
//   Longitude: string // 经度
//   Latitude: string // 维度
//   note: string // 拍照--备注 ？
// }
