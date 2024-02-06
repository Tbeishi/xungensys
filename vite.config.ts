// vite.config.ts
// loadEnv 可以加载对应环境的变量
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig(({ command, mode }) => {
  // commit 是为了检查当前的开发环境的
  // 获取各种环境下对应的变量 mode 默认是开发环境
  // process.cwd() vite 中规定的项目的根目录 indx.html 所在的位置
  let env = loadEnv(mode, process.cwd()) //方法执行是返回当前开发环境的对象  【mode 需要传入的参数 回调会注入mode模式】
  return {
    publicPath: 'https://gitee.com/jch1011/guiguzhenxuan',
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 解决代理跨域的问题  server 服务器
    server: {
      proxy: {
        // 对应环境下代理跨域需要带的环境
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写  把api 替换为空号
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
