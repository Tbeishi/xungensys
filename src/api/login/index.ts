import request from '../../utils/request'
export const reqLogin = (phone: string, passwd: string) =>
  request.get<any, any>(`/account/login?telephone=${phone}&password=${passwd}`)
