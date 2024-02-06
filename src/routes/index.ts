// router/index.ts
// 这里路由模板的配置 通过vue-router 实现模板路由的配置
// 通过vue-router 插件实现路由模板的配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute, asnycRoute } from './routes'
// 创建路由
const router = createRouter({
  // 路由模式的设置hash
  history: createWebHashHistory(),
  routes: [...constantRoute, ...asnycRoute],
  // 这里是自己定义的一个动态路由的数组

  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router

// vue-router   默认为 hash 模式，使用 URL 的  hash  来模拟一个完整的 URL，当 URL 改变时，页面不会重新加载；
// #  就是  hash符号，中文名为哈希符或者锚点，在  hash  符号后的值称为  hash  值。
// 值唯一  自动去重
// Vue-Element-Admin的router总使用constantRoutes和asyncRoutes两种定义路由,在store.modules.permission.js中对于两者的权限有默认的判断方式，然后再根目录下的permission.js中进行导航守卫逻辑;
// constantRoutes:不需要动态判断权限的路由,如登录页、404、等通用页面;
// asyncRoutes:需动态判断权限并通过addRoutes动态添加的页面;
