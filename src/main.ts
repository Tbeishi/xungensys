import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'

//引入仓库
import pinia from './store'
//引入路由
import router from './routes'
const app = createApp(App)
//注册模板路由
app.use(router)
app.use(ElementPlus)
app.use(pinia)
//svg插件需要配置代码
import 'virtual:svg-icons-register'
app.mount('#app')
