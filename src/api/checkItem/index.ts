import requestJS from '../../utils/requestJS'
enum API {
  GET_ZHUHU = '/xungeng/checkcontent',
}
// 获取数据
export const itemData = (data:any) => {
  return requestJS.get<any, any>(API.GET_ZHUHU, { params : data })
}

//添加数据
export const addItemData = (data:any) => {
  return requestJS.post<any, any>(API.GET_ZHUHU, data)
}

//跟新数据
export const updItemData = (data:any) => {
  return requestJS.put<any, any>(API.GET_ZHUHU, data)
}

//删除数据
export const delItemData = (id:any) => {
  const data = { id }
  return requestJS.delete<any, any>(API.GET_ZHUHU, { data })
}

