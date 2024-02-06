// 侧边栏
//创建用户相关的小仓库
import { defineStore } from 'pinia'
// import type { RouteRecordRaw } from 'vue-router'
import { reqResilders,reqMenu } from '../../api/silders'
// 获取用户信息
import { reqPersonal } from '@/api/personalApi'
// 引入路由【常量路由,异步路由】
import { constantRoute, asnycRoute } from '@/routes/routes'
import router from '@/routes'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
export const useSilders = defineStore('silders', {
  state: () => {
    return {
      token: `Bearer${localStorage.getItem('token')}`,
      menuRoutes: [], //仓库存储生成菜单需要数组(路由)  动态路由
      //存储当前用户是否包含某一个按钮
      constantRoute: constantRoute, // 这里存储的是常量路由
      buttons: [],
      name: '', // 用户名字
      // tele: 1, // 这个是用户账号初始值为1 是一个电话
    }
  },

  actions: {
    async getRoutes() {
      const resultRouter = await reqResilders()
      this.menuRoutes = resultRouter.data.info_list
      localStorage.setItem("routes", JSON.stringify(this.menuRoutes) )  // 这里相当于将路由保存到了本地 也不能不需要
      this.menuRoutes.forEach((item) => {
        router.addRoute(item)
      })
      return resultRouter
      // [{…}, {…}, {…}, {…}, {…}]   这里就直接是数组了
    },
    // 获取用户信息
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: any = await reqPersonal()
      console.log('user----user', result)

      // if (result !== null) {
      //   this.name=result.data.info_list.name,
      //   this.tele=result.data.info_list.tele,
      //   // //计算当前用户需要展示的异步路由
      //   // const userAsyncRoute = filterAsyncRoute(
      //   //   cloneDeep(asnycRoute),
      //   //   result.data.routes,
      //   // );

      // }
    },
       // 获取菜单
       async getMenu(id: any) {
        const result: any = await reqMenu(id)
        return result
      },
  },
  getters: {},
})
