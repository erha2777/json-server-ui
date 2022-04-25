import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/normalize.css'
import './styles/common.css'
import ElementPlus from 'element-plus'
import { isValidKey } from './utils/utils' // 转类型函数
import * as ElIcons from '@element-plus/icons-vue' // 引入icon组件
import 'element-plus/dist/index.css'

const app = createApp(App).use(store).use(router)
app.use(ElementPlus)

Object.keys(ElIcons).forEach(key => { // 全局注册icon组件
  if (isValidKey(key, ElIcons)) {
    app.component(key, ElIcons[key])
  }
})
app.mount('#app')
