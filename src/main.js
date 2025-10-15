import { Buffer } from 'buffer';
window.Buffer = Buffer; // 重新手动挂载到全局 window 对象

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
