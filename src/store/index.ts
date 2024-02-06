// 创建大仓库
import { createPinia } from 'pinia' // 从pinia中引入建立大仓库的方法
// 创建大仓库 对外暴露 入口文件需要引入
let pinia = createPinia()
// 对外暴露：入口文件需要安装仓库
export default pinia
// 上面三行之后大仓库已经准备好了 下面在入口文件进行引入
