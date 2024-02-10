//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由--- 模块路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      icon: '',
    },
    redirect: '/login',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
]
//异步路由
export const asnycRoute = [
  {
    path: '/searchList',
    component: () => import('@/layout/index.vue'),
    name: 'searchList',
    meta: {
      title: '查询统计',
    },
    redirect: '/searchList/search',
    children: [
      {
        path: '/searchList/search',
        component: () => import('@/views/searchList/index.vue'),
        name: 'search',
        meta: {
          title: '查询',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/checklist',
    component: () => import('@/layout/index.vue'),
    name: 'checklist',
    meta: {
      title: '检查清单',
    },
    redirect: '/checklist/checkdot',
    children: [
      {
        path: '/checklist/checkdot',
        component: () => import('@/views/checklist/checkdot.vue'),
        name: 'checkdot',
        meta: {
          title: '检查点',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/xuanjianluxian',
    component: () => import('@/layout/index.vue'),
    name: 'xuanjianluxian',
    meta: {
      title: '巡检路线',
    },
    redirect: '/xuanjianluxian/setLuxian',
    children: [
      {
        path: '/xuanjianluxian/setLuxian',
        component: () => import('@/views/xuanjianluxian/setLuxian.vue'),
        name: 'setLuxian',
        meta: {
          title: '路线设置',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/xunjiandian',
    component: () => import('@/layout/index.vue'),
    name: 'xunjiandian',
    meta: {
      title: '巡检点',
    },
    redirect: '/xunjiandian/setxunjiandot',
    children: [
      {
        path: '/xunjiandian/setxunjiandot',
        component: () => import('@/views/xunjiandian/setxunjiandot.vue'),
        name: 'setxunjiandot',
        meta: {
          title: '点位设置',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/xunjianjihua',
    component: () => import('@/layout/index.vue'),
    name: 'xunjianjihua',
    meta: {
      title: '巡检计划',
    },
    redirect: '/xunjianjihua/setjihua',
    children: [
      {
        path: '/xunjianjihua/setjihua',
        component: () => import('@/views/xunjianjihua/setjihua.vue'),
        name: 'setjihua',
        meta: {
          title: '计划设置',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/xunjianrenwu',
    component: () => import('@/layout/index.vue'),
    name: 'xunjianrenwu',
    meta: {
      title: '巡检任务',
    },
    redirect: '/xunjianrenwu/setrenwu',
    children: [
      {
        path: '/xunjianrenwu/setrenwu',
        component: () => import('@/views/xunjianrenwu/setrenwu.vue'),
        name: 'setrenwu',
        meta: {
          title: '任务设置',
          hidden: true,
        },
      },
    ],
  },
  // 菜单管理
  {
    path: '/system',
    component: () => import('@/layout/index.vue'),
    name: 'system',
    meta: {
      title: '系统设置',
    },
    redirect: '/system/rolemanager',
    children: [
      {
        path: '/system/usermanager',
        component: () => import('@/views/system/usermanager.vue'),
        name: 'usermanager',
        meta: {
          title: '人员管理',
          hidden: true,
        },
      },
      {
        path: '/system/rolemanager',
        component: () => import('@/views/system/role.vue'),
        name: 'rolemanager',
        meta: {
          title: '角色管理',
          hidden: true,
        },
      },
      {
        path: '/system/usermanager',
        component: () => import('@/views/system/usermanager.vue'),
        name: 'usermanager',
        meta: {
          title: '人员管理',
          hidden: true,
        },
      },
      {
        path: '/system/manager',
        component: () => import('@/views/system/manager.vue'),
        name: 'manager',
        meta: {
          title: '部门管理',
          hidden: true,
        },
      },
      {
        path: '/system/sys',
        component: () => import('@/views/system/sys.vue'),
        name: 'sys',
        meta: {
          title: '系统配置',
          hidden: true,
        },
      },
    ],
  },
]
