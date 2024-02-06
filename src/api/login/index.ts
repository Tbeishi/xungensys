import { log } from 'console'
import requestJS from '../../utils/requestJS'
enum API {
  CHANGE_PASSWORD = '/account/updateUserInfo',
}
export const reqLogin = (telephone: string, password: string) =>
  requestJS.get<any, any>(
    `/account/login?telephone=${telephone}&password=${password}`
  )
// 点击修改密码的时候
export const reqChangePas = (password: any) => {
  console.log('data--api', password)
  let password01 = { password }
  console.log('password=--password', password)
  return requestJS.put<any, any>(API.CHANGE_PASSWORD, password01)
}
