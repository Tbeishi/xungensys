// import request from '@/utils/request'
import test from '@/utils/test'

enum API {
  GET_SILDERS = '/seachList/list',
}

export const reqSearchList = () => test.get<any, any>(API.GET_SILDERS)
